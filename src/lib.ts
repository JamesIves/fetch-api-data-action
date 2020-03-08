import {setFailed} from '@actions/core'
import {action, ActionInterface} from './constants'
import {generateExport, retrieveData} from './fetch'
import {hasRequiredParameters} from './util'

/** Initializes and runs the action.
 *
 * @param {ActionInterface} configuration - The configuration object.
 */
export default async function run(
  configuration: ActionInterface
): Promise<void> {
  let errorState = false

  const settings = {
    ...action,
    ...configuration
  }

  try {
    console.log('Checking configuration and initializing... 🚚')
    hasRequiredParameters(settings)

    let auth: object = {}
    if (settings.tokenEndpoint) {
      auth = await retrieveData({
        endpoint: settings.tokenEndpoint,
        configuration: settings.tokenConfiguration,
        isTokenRequest: true
      })
    }

    const data = await retrieveData({
      endpoint: settings.endpoint,
      configuration: settings.configuration,
      auth
    })

    await generateExport({
      data,
      saveLocation: settings.saveLocation,
      saveName: settings.saveName
    })
  } catch (error) {
    errorState = true
    setFailed(error.message)
  } finally {
    console.log(
      `${
        errorState
          ? 'There was an error fetching the data. ❌'
          : 'The data was succesfully retrieved and saved! ✅ 🚚'
      }`
    )
  }
}

export {retrieveData, generateExport, ActionInterface}
