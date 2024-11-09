import { ActionInterface } from './constants';
/**
 * Checks to see if a value is null or undefined.
 */
export declare const isNullOrUndefined: (value: string | undefined | null) => boolean;
/**
 *  Checks to see if the action has the required parameters to run.
 */
export declare const hasRequiredParameters: (action: ActionInterface) => void;
/**
 * Extracts the error message from an error object or string.
 */
export declare const extractErrorMessage: (error: unknown) => string;
/**
 * Parses a string into a JSON object.
 */
export declare const parseData: (data: string) => Record<string, unknown> | null;
