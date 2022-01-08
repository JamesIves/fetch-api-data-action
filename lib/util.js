"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseData = exports.extractErrorMessage = exports.hasRequiredParameters = exports.isNullOrUndefined = void 0;
/* Utility function that checks to see if a value is undefined or not. */
const isNullOrUndefined = (value) => typeof value === 'undefined' || value === null || value === '';
exports.isNullOrUndefined = isNullOrUndefined;
/* Checks for the required inputs. Throws an error if any case is matched. */
const hasRequiredParameters = (action) => {
    if ((0, exports.isNullOrUndefined)(action.endpoint)) {
        throw new Error('You must provide the action with at least an endpoint to retrieve data from.');
    }
};
exports.hasRequiredParameters = hasRequiredParameters;
const extractErrorMessage = (error) => error instanceof Error
    ? error.message
    : typeof error == 'string'
        ? error
        : JSON.stringify(error);
exports.extractErrorMessage = extractErrorMessage;
/* Attempt to parse data as JSON and catch any errors. */
const parseData = (data) => {
    try {
        return JSON.parse(data);
    }
    catch (_a) {
        return null;
    }
};
exports.parseData = parseData;
