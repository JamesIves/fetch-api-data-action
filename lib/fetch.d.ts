import { DataInterface, ExportInterface, Status } from './constants';
/**
 * Retrieves data from an API endpoint.
 */
export declare function retrieveData({ debug: requestDebug, endpoint, configuration, auth, isTokenRequest, retry }: DataInterface): Promise<string>;
/**
 * Generates an export file from the data provided.
 */
export declare function generateExport({ data, encoding, format, saveLocation, saveName, setOutput, variableName }: ExportInterface): Promise<Status>;
