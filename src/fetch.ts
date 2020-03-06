import {exportVariable} from '@actions/core'
import {mkdirP} from '@actions/io'
import fetch from 'cross-fetch'
import {promises as fs} from 'fs'
import {render} from 'mustache'
import {dataInterface} from './constants'

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

export async function generateExport(data: object, saveLocation?: string) {
  try {
    const output = JSON.stringify(data)
    await mkdirP(`${saveLocation ? saveLocation : 'fetch-api-data-action'}`)
    await fs.writeFile(
      `${saveLocation ? saveLocation : 'fetch-api-data-action'}/data.json`,
      output,
      'utf8'
    )
    exportVariable('FETCH_API_DATA', output)
  } catch (error) {
    throw new Error(`There was an error generating the JSON file: ${error}`)
  }
}
