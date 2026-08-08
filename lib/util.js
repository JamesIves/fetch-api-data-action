/**
 * Checks to see if a value is null or undefined.
 */
export const isNullOrUndefined = (value) => typeof value === 'undefined' || value === null || value === '';
/**
 *  Checks to see if the action has the required parameters to run.
 */
export const hasRequiredParameters = (action) => {
    if (isNullOrUndefined(action.endpoint)) {
        throw new Error('You must provide the action with at least an endpoint to retrieve data from.');
    }
};
/**
 * Extracts the error message from an error object or string.
 */
export const extractErrorMessage = (error) => error instanceof Error
    ? error.message
    : typeof error == 'string'
        ? error
        : JSON.stringify(error);
/**
 * Parses a string into a JSON object.
 */
export const parseData = (data) => {
    try {
        return JSON.parse(data);
    }
    catch {
        return null;
    }
};
