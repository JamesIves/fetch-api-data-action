import { dataInterface } from './constants';
/** Fetches or Posts data to an API. If auth is provided it will replace the mustache variables with the data from it. */
export declare function retrieveData({ endpoint, configuration, auth }: dataInterface): Promise<any>;
export declare function generateExport(data: object, saveLocation?: string): Promise<void>;
