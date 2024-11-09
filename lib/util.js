"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseData = exports.extractErrorMessage = exports.hasRequiredParameters = exports.isNullOrUndefined = void 0;
/**
 * Checks to see if a value is null or undefined.
 */
const isNullOrUndefined = (value) => typeof value === 'undefined' || value === null || value === '';
exports.isNullOrUndefined = isNullOrUndefined;
/**
 *  Checks to see if the action has the required parameters to run.
 */
const hasRequiredParameters = (action) => {
    if ((0, exports.isNullOrUndefined)(action.endpoint)) {
        throw new Error('You must provide the action with at least an endpoint to retrieve data from.');
    }
};
exports.hasRequiredParameters = hasRequiredParameters;
/**
 * Extracts the error message from an error object or string.
 */
const extractErrorMessage = (error) => error instanceof Error
    ? error.message
    : typeof error == 'string'
        ? error
        : JSON.stringify(error);
exports.extractErrorMessage = extractErrorMessage;
/**
 * Parses a string into a JSON object.
 */
const parseData = (data) => {
    try {
        return JSON.parse(data);
    }
    catch (_a) {
        return null;
    }
};
exports.parseData = parseData;
