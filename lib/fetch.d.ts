import 'cross-fetch/polyfill';
import { DataInterface, ExportInterface, Status } from './constants';
export declare function retrieveData({ debug: requestDebug, endpoint, configuration, auth, isTokenRequest, retry }: DataInterface): Promise<string>;
export declare function generateExport({ data, saveLocation, saveName }: ExportInterface): Promise<Status>;
