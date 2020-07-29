"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRequiredParameters = exports.isNullOrUndefined = void 0;
/* Utility function that checks to see if a value is undefined or not. */
exports.isNullOrUndefined = (value) => typeof value === 'undefined' || value === null || value === '';
/* Checks for the required inputs. Throws an error if any case is matched. */
exports.hasRequiredParameters = (action) => {
    if (exports.isNullOrUndefined(action.endpoint)) {
        throw new Error('You must provide the action with at least an endpoint to retrieve data from.');
    }
};
