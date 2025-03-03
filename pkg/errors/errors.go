package errors

import (
	"fmt"
	"net/http"
)

// ApiError represents a standard API error
type ApiError struct {
	StatusCode int    `json:"-"`
	Code       string `json:"code"`
	Message    string `json:"message"`
	Details    any    `json:"details,omitempty"`
}

// Error implements the error interface
func (e ApiError) Error() string {
	return fmt.Sprintf("status: %d, code: %s, message: %s", e.StatusCode, e.Code, e.Message)
}

// New creates a new ApiError
func New(statusCode int, code, message string, details any) ApiError {
	return ApiError{
		StatusCode: statusCode,
		Code:       code,
		Message:    message,
		Details:    details,
	}
}

// BadRequest returns a 400 Bad Request error
func BadRequest(message string, details any) ApiError {
	return New(http.StatusBadRequest, "BAD_REQUEST", message, details)
}

// NotFound returns a 404 Not Found error
func NotFound(message string) ApiError {
	return New(http.StatusNotFound, "NOT_FOUND", message, nil)
}

// InternalServerError returns a 500 Internal Server Error
func InternalServerError(message string) ApiError {
	return New(http.StatusInternalServerError, "INTERNAL_SERVER_ERROR", message, nil)
}

// ServiceUnavailable returns a 503 Service Unavailable error
func ServiceUnavailable(message string) ApiError {
	return New(http.StatusServiceUnavailable, "SERVICE_UNAVAILABLE", message, nil)
}
