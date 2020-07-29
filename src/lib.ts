import {info, setFailed} from '@actions/core'
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
    info(`
    Fetch API Data Action 📦 🚚

    🚀 Getting Started Guide: https://github.com/marketplace/actions/fetch-api-data
    🔧 Support: https://github.com/JamesIves/fetch-api-data-action/issues
    ⭐ Contribute: https://github.com/JamesIves/fetch-api-data-action/blob/dev/CONTRIBUTING.md
    
    📣 Maintained by James Ives (https://jamesiv.es)`)

    info('Checking configuration and initializing… 🚚')
    hasRequiredParameters(settings)

    let auth: object = {}
    if (settings.tokenEndpoint) {
      auth = await retrieveData({
        configuration: settings.tokenConfiguration,
        endpoint: settings.tokenEndpoint,
        isTokenRequest: true,
        retry: settings.retry
      })
    }

    const data = await retrieveData({
      auth,
      configuration: settings.configuration,
      endpoint: settings.endpoint,
      retry: settings.retry
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
    info(
      `${
        errorState
          ? 'There was an error fetching the data. ❌'
          : 'The data was succesfully retrieved and saved! ✅ 🚚'
      }`
    )
  }
}

export {retrieveData, generateExport, ActionInterface}
