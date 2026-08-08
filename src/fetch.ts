import {
  info,
  exportVariable,
  setOutput as setEnvironmentOutput,
  debug
} from '@actions/core'
import {mkdirP} from '@actions/io'
import {promises as fs} from 'fs'
import mustache from 'mustache'
import retryRequest from 'async-retry'
import {DataInterface, ExportInterface, Status} from './constants.js'
import {parseData} from './util.js'

/**
 * Retrieves data from an API endpoint.
 */
export async function retrieveData({
  debug: requestDebug,
  endpoint,
  configuration,
  auth,
  isTokenRequest,
  retry
}: DataInterface): Promise<string> {
  try {
    info(
      isTokenRequest
        ? 'Fetching credentials from the token endpoint… 🎟️'
        : 'Fetching the requested data… 📦'
    )

    const settings = configuration
      ? JSON.parse(
          mustache.render(configuration, auth ? parseData(auth) : null)
        )
      : {}

    if (settings.body) {
      // Ensures the body is stringified in the case of a post request being made.
      settings.body = JSON.stringify(settings.body)
    }

    return await retryRequest(
      async () => {
        // If anything throws the request is retried.
        const response = await fetch(endpoint, settings)
        const data = await response.text()

        if (!response.ok) {
          throw new Error(data)
        }

        if (requestDebug) {
          info('📡  Request Response Debug: ')
          info(JSON.stringify(data))
        }

        return data
      },
      {
        retries: retry ? 3 : 0,
        onRetry: (error: Error) => {
          debug(error.message)
          info(`There was an error with the request, retrying… ⏳`)
        }
      }
    )
  } catch (error) {
    throw new Error(`There was an error fetching from the API: ${error} ❌`, {
      cause: error
    })
  }
}

/**
 * Generates an export file from the data provided.
 */
export async function generateExport({
  data,
  encoding,
  format,
  saveLocation,
  saveName,
  setOutput,
  variableName
}: ExportInterface): Promise<Status> {
  info('Saving the data... 📁')
  const file = `${saveLocation ? saveLocation : 'fetch-api-data-action'}/${
    saveName ? saveName : 'data'
  }.${format ? format : 'json'}`
  const dataEncoding = encoding ? encoding : 'utf8'
  const defaultVariableName = 'fetchApiData'
  const environmentVariableName = variableName
    ? variableName
    : defaultVariableName

  try {
    await mkdirP(`${saveLocation ? saveLocation : 'fetch-api-data-action'}`)
    await fs.writeFile(file, data, dataEncoding)

    info(`Saved ${file} 💾`)

    if (setOutput) {
      exportVariable(environmentVariableName, data)
      setEnvironmentOutput(defaultVariableName, data)
    }

    return Status.SUCCESS
  } catch (error) {
    throw new Error(
      `There was an error generating the export file: ${error} ❌`,
      {cause: error}
    )
  }
}
