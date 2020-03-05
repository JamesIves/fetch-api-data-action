import {actionInterface} from './constants'
import {render} from 'mustache'
import fetch from 'cross-fetch';

export async function retrieveTokens(action: actionInterface) {
  try {
    // TODO: Need to throw here if this data is not provided.
    const configuration = JSON.parse(action.configurationSecondary || '')

    if (configuration.body) {
      configuration.body = JSON.stringify(configuration.body)
    }

    const response = await fetch(action.endpointSecondary || '', configuration)

    return await response.json()
  } catch (error) {
    throw new Error(`There was an error fetching the secondary API data: ${error}`)
  }
}

export async function retrieveData(action: actionInterface) {
  try {
    let auth: object = {}
    if (action.endpointSecondary && action.endpointSecondary) {
      auth = await retrieveTokens(action)
    }

    const configuration = JSON.parse(render(action.configuration, auth))

    const response = await fetch(action.endpoint, configuration)
    return await response.json()
  } catch (error) {
    throw new Error(`There was an error fetching the data: ${error}`)
  }
}

export async function generateFile() {
  try {
    console.log('should be saving here...')
  } catch(error) {
    throw new Error(`There was an error generating the JSON file: ${error}`)
  }
}
