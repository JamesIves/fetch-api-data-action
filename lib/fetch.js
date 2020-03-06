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
const core_1 = require("@actions/core");
const io_1 = require("@actions/io");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const fs_1 = require("fs");
const mustache_1 = require("mustache");
/** Fetches or Posts data to an API. If auth is provided it will replace the mustache variables with the data from it. */
function retrieveData({ endpoint, configuration, auth }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const settings = JSON.parse(mustache_1.render(configuration || '', auth));
            if (settings.body) {
                // Ensures the body is stringified in the case of a post request being made.
                settings.body = JSON.stringify(settings.body);
            }
            const response = yield cross_fetch_1.default(endpoint, settings);
            return yield response.json();
        }
        catch (error) {
            throw new Error(`There was an error fetching from the API: ${error}`);
        }
    });
}
exports.retrieveData = retrieveData;
function generateExport(data, saveLocation) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const output = JSON.stringify(data);
            yield io_1.mkdirP(`${saveLocation ? saveLocation : 'fetch-api-data-action'}`);
            yield fs_1.promises.writeFile(`${saveLocation ? saveLocation : 'fetch-api-data-action'}/data.json`, output, 'utf8');
            core_1.exportVariable('FETCH_API_DATA', output);
        }
        catch (error) {
            throw new Error(`There was an error generating the JSON file: ${error}`);
        }
    });
}
exports.generateExport = generateExport;
