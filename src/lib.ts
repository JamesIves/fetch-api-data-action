import {info, setFailed} from '@actions/core'
import {action, ActionInterface, Status} from './constants'
import {generateExport, retrieveData} from './fetch'
import {extractErrorMessage, hasRequiredParameters} from './util'

/** Initializes and runs the action.
 *
 * @param {ActionInterface} configuration - The configuration object.
 */
export default async function run(
  configuration: ActionInterface
): Promise<void> {
  let status: Status = Status.RUNNING

  const settings = {
    ...action,
    ...configuration
  }

  try {
    info(`
    Fetch API Data Action 📦 🚚

    💖 Support: https://github.com/sponsors/JamesIves
    📣 Maintained by James Ives: https://jamesiv.es

    🚀 Getting Started Guide: https://github.com/JamesIves/fetch-api-data-action
    ❓ Discussions / Q&A: https://github.com/JamesIves/fetch-api-data-action/discussions
    🔧 Report a Bug: https://github.com/JamesIves/fetch-api-data-action/issues`)

    info('Checking configuration and initializing… 🚚')
    hasRequiredParameters(settings)

    let auth = ''
    if (settings.tokenEndpoint) {
      auth = await retrieveData({
        debug: settings.debug,
        configuration: settings.tokenConfiguration,
        endpoint: settings.tokenEndpoint,
        isTokenRequest: true,
        retry: settings.retry
      })
    }

    const data = await retrieveData({
      auth,
      debug: settings.debug,
      configuration: settings.configuration,
      endpoint: settings.endpoint,
      retry: settings.retry
    })

    status = await generateExport({
      data,
      encoding: settings.encoding,
      saveLocation: settings.saveLocation,
      saveName: settings.saveName,
      format: settings.format
    })
  } catch (error) {
    status = Status.FAILED
    setFailed(extractErrorMessage(error))
  } finally {
    info(
      `${
        status === Status.FAILED
          ? 'There was an error fetching the data. ❌'
          : 'The data was succesfully retrieved and saved! ✅ 🚚'
      }`
    )
  }
}

export {retrieveData, generateExport, ActionInterface}
