import {setFailed} from '@actions/core'
import {action, actionInterface} from './constants'
import {generateExport, retrieveData} from './fetch'

/** Initializes and runs the action. */
export default async function run(
  configuration: actionInterface
): Promise<void> {
  let errorState: boolean = false

  const settings = {
    ...action,
    ...configuration
  }

  try {
    console.log('Initializing... 🚚')

    let auth: object = {}

    if (settings.tokenEndpoint) {
      console.log('Fetching data from the token endpoint... 🎟️')

      auth = await retrieveData({
        endpoint: settings.tokenEndpoint,
        configuration: settings.tokenConfiguration
      })
    }

    const data = await retrieveData({
      endpoint: settings.endpoint,
      configuration: settings.configuration,
      auth
    })

    await generateExport(data, settings.saveLocation, settings.saveName)
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

export {retrieveData, generateExport}
