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
exports.generateExport = exports.retrieveData = void 0;
const core_1 = require("@actions/core");
const constants_1 = require("./constants");
const fetch_1 = require("./fetch");
Object.defineProperty(exports, "generateExport", { enumerable: true, get: function () { return fetch_1.generateExport; } });
Object.defineProperty(exports, "retrieveData", { enumerable: true, get: function () { return fetch_1.retrieveData; } });
const util_1 = require("./util");
/** Initializes and runs the action.
 *
 * @param {ActionInterface} configuration - The configuration object.
 */
function run(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        let status = constants_1.Status.RUNNING;
        const settings = Object.assign(Object.assign({}, constants_1.action), configuration);
        try {
            (0, core_1.info)(`
    Fetch API Data Action 📦 🚚

    💖 Support: https://github.com/sponsors/JamesIves
    📣 Maintained by James Ives: https://jamesiv.es

    🚀 Getting Started Guide: https://github.com/JamesIves/fetch-api-data-action
    ❓ Discussions / Q&A: https://github.com/JamesIves/fetch-api-data-action/discussions
    🔧 Report a Bug: https://github.com/JamesIves/fetch-api-data-action/issues`);
            (0, core_1.info)('Checking configuration and initializing… 🚚');
            (0, util_1.hasRequiredParameters)(settings);
            let auth = '';
            if (settings.tokenEndpoint) {
                auth = yield (0, fetch_1.retrieveData)({
                    debug: settings.debug,
                    configuration: settings.tokenConfiguration,
                    endpoint: settings.tokenEndpoint,
                    isTokenRequest: true,
                    retry: settings.retry
                });
            }
            const data = yield (0, fetch_1.retrieveData)({
                auth,
                debug: settings.debug,
                configuration: settings.configuration,
                endpoint: settings.endpoint,
                retry: settings.retry
            });
            status = yield (0, fetch_1.generateExport)({
                data,
                saveLocation: settings.saveLocation,
                saveName: settings.saveName,
                format: settings.format
            });
        }
        catch (error) {
            status = constants_1.Status.FAILED;
            (0, core_1.setFailed)((0, util_1.extractErrorMessage)(error));
        }
        finally {
            (0, core_1.info)(`${status === constants_1.Status.FAILED
                ? 'There was an error fetching the data. ❌'
                : 'The data was succesfully retrieved and saved! ✅ 🚚'}`);
        }
    });
}
exports.default = run;
