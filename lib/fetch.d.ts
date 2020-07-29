import 'cross-fetch/polyfill';
import { DataInterface, ExportInterface } from './constants';
export declare function retrieveData({ endpoint, configuration, auth, isTokenRequest, retry }: DataInterface): Promise<object>;
export declare function generateExport({ data, saveLocation, saveName }: ExportInterface): Promise<void>;
