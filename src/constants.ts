import {getInput} from '@actions/core'

export interface ActionInterface {
  /** The primary endpoint to fetch data from. */
  endpoint: string
  /** The configuration for the primary endpoint. Must be a stringified JSON object. */
  configuration: string
  /** The token endpoint to fetch data from. */
  tokenEndpoint?: string
  /** The configuration for the token endpoint. Must be a stringified JSON object. */
  tokenConfiguration?: string
  /** The save location of the exported JSON file. */
  saveLocation?: string
  /** The save name of the exported JSON file. */
  saveName?: string
  /** Optional configuration that allows the fetch request to make a series of retry requests before failing. */
  retry?: boolean | null
}

export interface DataInterface {
  /** The endpoint to make the API request to. */
  endpoint: string
  /** Optional configuration settings that map to the fetch API configuration object. */
  configuration?: string
  /** Optional data fetched from the previous endpoint. This data can be accessed via the mustache syntax. */
  auth?: object
  /** Tells the log if the action is fetching from the token endpoint or not. */
  isTokenRequest?: boolean | null
  /** Optional configuration that allows the fetch request to make a series of retry requests before failing. */
  retry?: boolean | null
}

export interface ExportInterface {
  /** The data to save. */
  data: object
  /** The save location. */
  saveLocation?: string
  /** The name of the file to save. */
  saveName?: string
}

// Required action data that gets initialized when running within the GitHub Actions environment.
export const action = {
  endpoint: getInput('ENDPOINT'),
  configuration: getInput('CONFIGURATION'),
  tokenEndpoint: getInput('TOKEN_ENDPOINT'),
  retry: getInput('RETRY'),
  retryAttempts: getInput('RETRY_ATTEMPTS'),
  tokenConfiguration: getInput('TOKEN_CONFIGURATION'),
  saveLocation: getInput('SAVE_LOCATION'),
  saveName: getInput('SAVE_NAME')
}