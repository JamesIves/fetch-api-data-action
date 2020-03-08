import 'cross-fetch/polyfill'
import {DataInterface, ExportInterface} from './constants'
/** Fetches or Posts data to an API. If auth is provided it will replace the mustache variables with the data from it. */
export declare function retrieveData({
  endpoint,
  configuration,
  auth,
  isTokenRequest
}: DataInterface): Promise<object>
/** Saves the data to the local file system and exports an environment variable containing the retrieved data. */
export declare function generateExport({
  data,
  saveLocation,
  saveName
}: ExportInterface): Promise<void>
