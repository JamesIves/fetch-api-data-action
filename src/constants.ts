import {getInput} from '@actions/core'

export interface actionInterface {
  /** The primary endpoint to fetch data from. */
  endpoint: string
  /** The configuration for the primary endpoint. Must be a stringified JSON object. */
  configuration: string
  /** The secondary endpoint to fetch data from. */
  tokenEndpoint?: string
  /** The configuration for the secondary endpoint. Must be a stringified JSON object. */
  tokenConfiguration?: string
  /** Determines if the data should be saved as a JSON file or not. */
  save: boolean | string
}

export interface dataInterface {
  /** The endpoint to make the API request to. */
  endpoint: string;
  /** Optional configuration settings. Maps to the fetch API configuration object. */
  configuration?: string;
  /** Optional data fetched from the previous endpoint. This data can be accessed via the mustache syntax. */
  auth?: object;
}

// Required action data that gets initialized when running within the GitHub Actions environment.
export const action = {
  endpoint: getInput('ENDPOINT'),
  configuration: getInput('CONFIGURATION'),
  tokenEndpoint: getInput('TOKEN_ENDPOINT'),
  tokenConfiguration: getInput('TOKEN_CONFIGURATION'),
  save: getInput('SAVE')
}
