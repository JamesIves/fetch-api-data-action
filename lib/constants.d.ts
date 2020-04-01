export interface ActionInterface {
    /** The primary endpoint to fetch data from. */
    endpoint: string;
    /** The configuration for the primary endpoint. Must be a stringified JSON object. */
    configuration: string;
    /** The token endpoint to fetch data from. */
    tokenEndpoint?: string;
    /** The configuration for the token endpoint. Must be a stringified JSON object. */
    tokenConfiguration?: string;
    /** The save location of the exported JSON file. */
    saveLocation?: string;
    /** The save name of the exported JSON file. */
    saveName?: string;
}
export interface DataInterface {
    /** The endpoint to make the API request to. */
    endpoint: string;
    /** Optional configuration settings that map to the fetch API configuration object. */
    configuration?: string;
    /** Optional data fetched from the previous endpoint. This data can be accessed via the mustache syntax. */
    auth?: object;
    /** Tells the log if the action is fetching from the token endpoint or not. */
    isTokenRequest?: boolean | null;
}
export interface ExportInterface {
    /** The data to save. */
    data: object;
    /** The save location. */
    saveLocation?: string;
    /** The name of the file to save. */
    saveName?: string;
}
export declare const action: {
    endpoint: string;
    configuration: string;
    tokenEndpoint: string;
    tokenConfiguration: string;
    saveLocation: string;
    saveName: string;
};
