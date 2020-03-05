import {actionInterface, action, dataInterface} from './constants'
import {render} from 'mustache'
import fetch from 'cross-fetch'
import {promises as fs} from 'fs'
import {isNullOrUndefined} from './util'
import {exportVariable} from '@actions/core'

/** Fetches or Posts data to an API. If auth is provided it will replace the mustache variables with the data from it. */
export async function retrieveData({
  endpoint,
  configuration,
  auth
}: dataInterface) {
  try {
    const settings = JSON.parse(render(configuration || '', auth))

    if (settings.body) {
      // Ensures the body is stringified in the case of a post request being made.
      settings.body = JSON.stringify(settings.body)
    }

    const response = await fetch(endpoint, settings)
    return await response.json()
  } catch (error) {
    throw new Error(`There was an error fetching from the API: ${error}`)
  }
}

export async function generateExport(data: object, save?: boolean | string) {
  try {
    if (save) {
      await fs.writeFile('fetch-api-data-action/data.json', data, 'utf8')
    }

    exportVariable('FETCH_API_DATA', JSON.stringify(data))
  } catch (error) {
    throw new Error(`There was an error generating the JSON file: ${error}`)
  }
}
