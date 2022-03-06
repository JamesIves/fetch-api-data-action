"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.action = void 0;
const core_1 = require("@actions/core");
const util_1 = require("./util");
// Required action data that gets initialized when running within the GitHub Actions environment.
exports.action = {
    debug: !(0, util_1.isNullOrUndefined)((0, core_1.getInput)('debug'))
        ? (0, core_1.getInput)('debug').toLowerCase() === 'true'
        : false,
    encoding: (0, core_1.getInput)('encoding'),
    endpoint: (0, core_1.getInput)('endpoint'),
    configuration: (0, core_1.getInput)('configuration'),
    tokenEndpoint: (0, core_1.getInput)('token-endpoint'),
    retry: !(0, util_1.isNullOrUndefined)((0, core_1.getInput)('retry'))
        ? (0, core_1.getInput)('retry').toLowerCase() === 'true'
        : false,
    tokenConfiguration: (0, core_1.getInput)('token-configuration'),
    saveLocation: (0, core_1.getInput)('save-location'),
    saveName: (0, core_1.getInput)('save-name'),
    setOutput: !(0, util_1.isNullOrUndefined)((0, core_1.getInput)('set-output'))
        ? (0, core_1.getInput)('set-output').toLowerCase() === 'true'
        : false,
    format: (0, core_1.getInput)('format')
};
/** Status codes for the action. */
var Status;
(function (Status) {
    Status["SUCCESS"] = "success";
    Status["FAILED"] = "failed";
    Status["RUNNING"] = "running";
    Status["SKIPPED"] = "skipped";
})(Status = exports.Status || (exports.Status = {}));
