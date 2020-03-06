export interface actionInterface {
    /** The primary endpoint to fetch data from. */
    endpoint: string;
    /** The configuration for the primary endpoint. Must be a stringified JSON object. */
    configuration: string;
    /** The token endpoint to fetch data from. */
    tokenEndpoint?: string;
    /** The configuration for the token endpoint. Must be a stringified JSON object. */
    tokenConfiguration?: string;
    /** The save location of the exported JSON file. */
    saveLocation: string;
}
export interface dataInterface {
    /** The endpoint to make the API request to. */
    endpoint: string;
    /** Optional configuration settings. Maps to the fetch API configuration object. */
    configuration?: string;
    /** Optional data fetched from the previous endpoint. This data can be accessed via the mustache syntax. */
    auth?: object;
}
export declare const action: {
    endpoint: string;
    configuration: string;
    tokenEndpoint: string;
    tokenConfiguration: string;
    saveLocation: string;
};
