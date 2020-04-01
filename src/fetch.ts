import {exportVariable} from '@actions/core'
import {mkdirP} from '@actions/io'
import 'cross-fetch/polyfill'
import {promises as fs} from 'fs'
import {render} from 'mustache'
import retryRequest from 'async-retry'
import {DataInterface, ExportInterface} from './constants'

/** Fetches or Posts data to an API. If auth is provided it will replace the mustache variables with the data from it. */
export async function retrieveData({
  endpoint,
  configuration,
  auth,
  isTokenRequest,
  retry
}: DataInterface): Promise<object> {
  try {
    console.log(
      isTokenRequest
        ? 'Fetching credentials from the token endpoint... 🎟️'
        : 'Fetching the requested data... 📦'
    )

    const settings = configuration
      ? JSON.parse(render(configuration, auth))
      : {}

    if (settings.body) {
      // Ensures the body is stringified in the case of a post request being made.
      settings.body = JSON.stringify(settings.body)
    }

    return await retryRequest(
      async (bail: (arg: Error) => void) => {
        // if anything throws, we retry
        const response = await fetch(endpoint, settings)

        if (!response.ok) {
          const error = await response.text()
          console.log(
            'An error was encountered in the fetch request, retrying...'
          )

          bail(new Error(error))
        }

        return await response.json()
      },
      {
        retries: retry ? 5 : 0
      }
    )
  } catch (error) {
    throw new Error(`There was an error fetching from the API: ${error}`)
  }
}

/** Saves the data to the local file system and exports an environment variable containing the retrieved data. */
export async function generateExport({
  data,
  saveLocation,
  saveName
}: ExportInterface): Promise<void> {
  console.log('Saving the data... 📁')
  const output = JSON.stringify(data)
  await mkdirP(`${saveLocation ? saveLocation : 'fetch-api-data-action'}`)
  await fs.writeFile(
    `${saveLocation ? saveLocation : 'fetch-api-data-action'}/${
      saveName ? saveName : 'data'
    }.json`,
    output,
    'utf8'
  )
  exportVariable('FETCH_API_DATA', output)
}
