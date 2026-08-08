import { getInput } from '@actions/core';
import { isNullOrUndefined } from './util.js';
/**
 * Required action data that gets initialized when running within the GitHub Actions environment.
 */
export const action = {
    debug: !isNullOrUndefined(getInput('debug'))
        ? getInput('debug').toLowerCase() === 'true'
        : false,
    encoding: getInput('encoding'),
    endpoint: getInput('endpoint'),
    configuration: getInput('configuration'),
    tokenEndpoint: getInput('token-endpoint'),
    retry: !isNullOrUndefined(getInput('retry'))
        ? getInput('retry').toLowerCase() === 'true'
        : false,
    tokenConfiguration: getInput('token-configuration'),
    saveLocation: getInput('save-location'),
    saveName: getInput('save-name'),
    setOutput: !isNullOrUndefined(getInput('set-output'))
        ? getInput('set-output').toLowerCase() === 'true'
        : false,
    format: getInput('format'),
    variableName: getInput('variable-name')
};
/** Status codes for the action. */
export var Status;
(function (Status) {
    Status["SUCCESS"] = "success";
    Status["FAILED"] = "failed";
    Status["RUNNING"] = "running";
    Status["SKIPPED"] = "skipped";
})(Status || (Status = {}));
