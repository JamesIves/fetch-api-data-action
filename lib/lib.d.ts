import { ActionInterface } from './constants.js';
import { generateExport, retrieveData } from './fetch.js';
/**
 * Initializes and runs the action.
 */
export default function run(configuration?: ActionInterface): Promise<void>;
export { retrieveData, generateExport };
export type { ActionInterface };
