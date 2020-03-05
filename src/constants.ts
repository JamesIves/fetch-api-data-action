export interface actionInterface {
  /** The primary endpoint to fetch data from. */
  endpoint: string
  /** The configuration for the primary endpoint. Must be a stringified JSON object. */
  configuration: string
  /** The secondary endpoint to fetch data from. */
  endpointSecondary: string;
  /** The configuration for the secondary endpoint. Must be a stringified JSON object. */
  configurationSecondary?: string
}

export const action = {}
