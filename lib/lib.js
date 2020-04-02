"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const constants_1 = require("./constants");
const fetch_1 = require("./fetch");
exports.generateExport = fetch_1.generateExport;
exports.retrieveData = fetch_1.retrieveData;
const util_1 = require("./util");
/** Initializes and runs the action.
 *
 * @param {ActionInterface} configuration - The configuration object.
 */
function run(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        let errorState = false;
        const settings = Object.assign(Object.assign({}, constants_1.action), configuration);
        try {
            core_1.info('Checking configuration and initializing… 🚚');
            util_1.hasRequiredParameters(settings);
            let auth = {};
            if (settings.tokenEndpoint) {
                auth = yield fetch_1.retrieveData({
                    configuration: settings.tokenConfiguration,
                    endpoint: settings.tokenEndpoint,
                    isTokenRequest: true,
                    retry: settings.retry
                });
            }
            const data = yield fetch_1.retrieveData({
                auth,
                configuration: settings.configuration,
                endpoint: settings.endpoint,
                retry: settings.retry
            });
            yield fetch_1.generateExport({
                data,
                saveLocation: settings.saveLocation,
                saveName: settings.saveName
            });
        }
        catch (error) {
            errorState = true;
            core_1.setFailed(error.message);
        }
        finally {
            core_1.info(`${errorState
                ? 'There was an error fetching the data. ❌'
                : 'The data was succesfully retrieved and saved! ✅ 🚚'}`);
        }
    });
}
exports.default = run;
