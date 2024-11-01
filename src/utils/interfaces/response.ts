/**
 * Interface for the response object.
 */
export interface ResponseObject<T> {
  success: boolean
  data: T | null
  error: ErrorResponseObject | null
}

/**
 * Interface for the error response object.
 */
export interface ErrorResponseObject {
  code: number
  message: string | string[]
}
