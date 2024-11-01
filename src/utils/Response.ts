import { ErrorResponseObject, ResponseObject } from '@utils/interfaces/response'

/**
 * Generate a response object based on the provided options.
 * @param {Object} options - Options for generating the response.
 * @param {boolean} options.success - Indicates if the operation was successful.
 * @param {T | null} options.data - Data to include in the response.
 * @param {ErrorResponseObject | null} options.error - Error information to include in the response.
 * @returns {ResponseObject<T>} - Response object.
 */
export const generateResponse = <T>(options: {
  success: boolean
  data: T | null
  error: ErrorResponseObject | null
}): ResponseObject<T> => {
  const { success, data, error } = options
  return {
    success,
    data: success ? data : null, // Set data: null for error responses
    error: success ? null : error, // Set error: null for successful responses
  }
}

/**
 * Generate an error response based on the provided options.
 * @param {Object} options - Options for generating the error response.
 * @param {number} options.code - Error code.
 * @param {string} options.message - Error message.
 * @returns {ResponseObject<null>} - Error response object.
 */
export const templateError = (options: {
  code: number
  message: string | string[]
}): ResponseObject<null> => {
  const { code, message } = options
  const error: ErrorResponseObject = { code, message }
  return generateResponse({ success: false, data: null, error })
}

/**
 * Generate a success response with the provided data.
 * @param {T} data - Data to include in the success response.
 * @returns {ResponseObject<T>} - Success response object.
 */
export const templateSuccess = <T>(data: T): ResponseObject<T> => {
  return generateResponse({ success: true, data, error: null })
}
