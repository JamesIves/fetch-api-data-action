import {ActionInterface} from './constants'

/* Utility function that checks to see if a value is undefined or not. */
export const isNullOrUndefined = (value: string | undefined | null): boolean =>
  typeof value === 'undefined' || value === null || value === ''

/* Checks for the required inputs. Throws an error if any case is matched. */
export const hasRequiredParameters = (action: ActionInterface): void => {
  if (isNullOrUndefined(action.endpoint)) {
    throw new Error(
      'You must provide the action with at least an endpoint to retrieve data from.'
    )
  }
}

export const extractErrorMessage = (error: unknown): string =>
  error instanceof Error
    ? error.message
    : typeof error == 'string'
      ? error
      : JSON.stringify(error)

/* Attempt to parse data as JSON and catch any errors. */
export const parseData = (data: string): Record<string, unknown> | null => {
  try {
    return JSON.parse(data)
  } catch {
    return null
  }
}
