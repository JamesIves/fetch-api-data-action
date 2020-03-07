import {ActionInterface} from './constants'
import {generateExport, retrieveData} from './fetch'
/** Initializes and runs the action. */
export default function run(configuration: ActionInterface): Promise<void>
export {retrieveData, generateExport, ActionInterface}
