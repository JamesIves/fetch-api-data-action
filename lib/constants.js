"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const core_1 = require("@actions/core");
const util_1 = require("./util");
// Required action data that gets initialized when running within the GitHub Actions environment.
exports.action = {
    endpoint: core_1.getInput('ENDPOINT'),
    configuration: core_1.getInput('CONFIGURATION'),
    tokenEndpoint: core_1.getInput('TOKEN_ENDPOINT'),
    retry: !util_1.isNullOrUndefined(core_1.getInput('RETRY'))
        ? core_1.getInput('RETRY').toLowerCase() === 'true'
        : false,
    tokenConfiguration: core_1.getInput('TOKEN_CONFIGURATION'),
    saveLocation: core_1.getInput('SAVE_LOCATION'),
    saveName: core_1.getInput('SAVE_NAME')
};
