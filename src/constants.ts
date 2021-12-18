import {getInput} from '@actions/core'
import {isNullOrUndefined} from './util'

export interface ActionInterface {
  /** Allows you to log the retrieved data to the terminal. */
  debug?: boolean
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
  /** Allows you to log the retrieved data to the terminal. */
  debug?: boolean
  /** The endpoint to make the API request to. */
  endpoint: string
  /** Optional configuration settings that map to the fetch API configuration object. */
  configuration?: string
  /** Optional data fetched from the previous endpoint. This data can be accessed via the mustache syntax. */
  auth?: Record<string, unknown>
  /** Tells the log if the action is fetching from the token endpoint or not. */
  isTokenRequest?: boolean | null
  /** Optional configuration that allows the fetch request to make a series of retry requests before failing. */
  retry?: boolean | null
}

export interface ExportInterface {
  /** The data to save. */
  data: Record<string, unknown>
  /** The save location. */
  saveLocation?: string
  /** The name of the file to save. */
  saveName?: string
}

// Required action data that gets initialized when running within the GitHub Actions environment.
export const action = {
  debug: !isNullOrUndefined(getInput('debug'))
    ? getInput('clean').toLowerCase() === 'true'
    : false,
  endpoint: getInput('endpoint'),
  configuration: getInput('configuration'),
  tokenEndpoint: getInput('token-endpoint'),
  retry: !isNullOrUndefined(getInput('retry'))
    ? getInput('retry').toLowerCase() === 'true'
    : false,
  tokenConfiguration: getInput('token-configuration'),
  saveLocation: getInput('save-location'),
  saveName: getInput('save-name')
}

/** Status codes for the action. */
export enum Status {
  SUCCESS = 'success',
  FAILED = 'failed',
  RUNNING = 'running',
  SKIPPED = 'skipped'
}
