"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
// Required action data that gets initialized when running within the GitHub Actions environment.
exports.action = {
    endpoint: core_1.getInput('ENDPOINT'),
    configuration: core_1.getInput('CONFIGURATION'),
    tokenEndpoint: core_1.getInput('TOKEN_ENDPOINT'),
    tokenConfiguration: core_1.getInput('TOKEN_CONFIGURATION'),
    saveLocation: core_1.getInput('SAVE_LOCATION')
};
