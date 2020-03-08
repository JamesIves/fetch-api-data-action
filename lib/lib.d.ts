import {ActionInterface} from './constants'
import {generateExport, retrieveData} from './fetch'
/** Initializes and runs the action.
 *
 * @param {ActionInterface} configuration - The configuration object.
 */
export default function run(configuration: ActionInterface): Promise<void>
export {retrieveData, generateExport, ActionInterface}
