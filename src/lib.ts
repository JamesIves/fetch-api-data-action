import {setFailed} from '@actions/core'
import {retrieveData, retrieveTokens, generateFile} from './fetch'
import {action, actionInterface} from './constants'

/** Initializes and runs the action. */
export default async function run(
  configuration: actionInterface
): Promise<void> {
  let errorState: boolean = false

  const settings = {
    ...action,
    ...configuration
  }

  try {
    const data = await retrieveData(settings)
  } catch (error) {
    errorState = true
    setFailed(error.message)
  } finally {
    console.log(
      `${
        errorState
          ? 'There was an error fetching the data. ❌'
          : 'Data has been fetched! ✅'
      }`
    )
  }
}

export {retrieveTokens, retrieveData, generateFile}
