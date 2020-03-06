import { actionInterface } from './constants';
import { generateExport, retrieveData } from './fetch';
/** Initializes and runs the action. */
export default function run(configuration: actionInterface): Promise<void>;
export { retrieveData, generateExport };
