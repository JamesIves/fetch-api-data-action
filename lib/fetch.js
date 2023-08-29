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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExport = exports.retrieveData = void 0;
const core_1 = require("@actions/core");
const io_1 = require("@actions/io");
require("cross-fetch/polyfill");
const fs_1 = require("fs");
const mustache_1 = require("mustache");
const async_retry_1 = __importDefault(require("async-retry"));
const constants_1 = require("./constants");
const util_1 = require("./util");
/* Fetches or Posts data to an API. If auth is provided it will replace the mustache variables with the data from it. */
function retrieveData({ debug: requestDebug, endpoint, configuration, auth, isTokenRequest, retry }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, core_1.info)(isTokenRequest
                ? 'Fetching credentials from the token endpoint… 🎟️'
                : 'Fetching the requested data… 📦');
            const settings = configuration
                ? JSON.parse((0, mustache_1.render)(configuration, auth ? (0, util_1.parseData)(auth) : null))
                : {};
            if (settings.body) {
                // Ensures the body is stringified in the case of a post request being made.
                settings.body = JSON.stringify(settings.body);
            }
            return yield (0, async_retry_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                // If anything throws the request is retried.
                const response = yield fetch(endpoint, settings);
                const data = yield response.text();
                if (!response.ok) {
                    throw new Error(data);
                }
                if (requestDebug) {
                    (0, core_1.info)('📡  Request Response Debug: ');
                    (0, core_1.info)(JSON.stringify(data));
                }
                return data;
            }), {
                retries: retry ? 3 : 0,
                onRetry: (error) => {
                    (0, core_1.debug)(error.message);
                    (0, core_1.info)(`There was an error with the request, retrying… ⏳`);
                }
            });
        }
        catch (error) {
            throw new Error(`There was an error fetching from the API: ${error} ❌`);
        }
    });
}
exports.retrieveData = retrieveData;
/* Saves the data to the local file system and exports an environment variable containing the retrieved data. */
function generateExport({ data, encoding, format, saveLocation, saveName, setOutput }) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, core_1.info)('Saving the data... 📁');
        const file = `${saveLocation ? saveLocation : 'fetch-api-data-action'}/${saveName ? saveName : 'data'}.${format ? format : 'json'}`;
        const dataEncoding = encoding ? encoding : 'utf8';
        try {
            yield (0, io_1.mkdirP)(`${saveLocation ? saveLocation : 'fetch-api-data-action'}`);
            yield fs_1.promises.writeFile(file, data, dataEncoding);
            (0, core_1.info)(`Saved ${file} 💾`);
            if (setOutput) {
                (0, core_1.exportVariable)('fetchApiData', data);
                (0, core_1.setOutput)('fetchApiData', data);
            }
            return constants_1.Status.SUCCESS;
        }
        catch (error) {
            throw new Error(`There was an error generating the export file: ${error} ❌`);
        }
    });
}
exports.generateExport = generateExport;
