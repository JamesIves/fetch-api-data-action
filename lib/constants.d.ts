/// <reference types="node" />
export interface ActionInterface {
    /** Allows you to log the retrieved data to the terminal. */
    debug?: boolean;
    /** The encoding of the data to be finally stored */
    encoding?: BufferEncoding;
    /** The primary endpoint to fetch data from. */
    endpoint: string;
    /** The configuration for the primary endpoint. Must be a stringified JSON object. */
    configuration: string;
    /** The token endpoint to fetch data from. */
    tokenEndpoint?: string;
    /** The configuration for the token endpoint. Must be a stringified JSON object. */
    tokenConfiguration?: string;
    /** The save location of the exported file. */
    saveLocation?: string;
    /** The save name of the exported file. */
    saveName?: string;
    /** The format of the file being saved. */
    format?: string;
    /** Optional configuration that allows the fetch request to make a series of retry requests before failing. */
    retry?: boolean | null;
}
export interface DataInterface {
    /** Allows you to log the retrieved data to the terminal. */
    debug?: boolean;
    /** The endpoint to make the API request to. */
    endpoint: string;
    /** Optional configuration settings that map to the fetch API configuration object. */
    configuration?: string;
    /** Optional data fetched from the previous endpoint. This data can be accessed via the mustache syntax. */
    auth?: string;
    /** Tells the log if the action is fetching from the token endpoint or not. */
    isTokenRequest?: boolean | null;
    /** Optional configuration that allows the fetch request to make a series of retry requests before failing. */
    retry?: boolean | null;
}
export interface ExportInterface {
    /** The data to save. */
    data: string;
    /** The encoding of the data to be finally stored */
    encoding?: BufferEncoding;
    /** The save location. */
    saveLocation?: string;
    /** The name of the file to save. */
    saveName?: string;
    /** The format of the file to save. */
    format?: string;
}
export declare const action: {
    debug: boolean;
    encoding: BufferEncoding;
    endpoint: string;
    configuration: string;
    tokenEndpoint: string;
    retry: boolean;
    tokenConfiguration: string;
    saveLocation: string;
    saveName: string;
    format: string;
};
/** Status codes for the action. */
export declare enum Status {
    SUCCESS = "success",
    FAILED = "failed",
    RUNNING = "running",
    SKIPPED = "skipped"
}
