package utils

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/shinebarbhuiya/simple-podcast/pkg/errors"
)

// ReadJSON reads JSON from request body into data.
func ReadJSON(r *http.Request, data interface{}) error {
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()

	if err := decoder.Decode(data); err != nil {
		return errors.BadRequest("Invalid JSON", err.Error())
	}

	return nil
}

// WriteJSON writes the data as JSON to the response.
func WriteJSON(w http.ResponseWriter, status int, data interface{}) error {
	js, err := json.Marshal(data)
	if err != nil {
		return err
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(js)

	return nil
}

// GetIntParam extracts and parses an integer parameter from URL query.
func GetIntParam(r *http.Request, param string, defaultValue int) int {
	valueStr := r.URL.Query().Get(param)
	if valueStr == "" {
		return defaultValue
	}

	value, err := strconv.Atoi(valueStr)
	if err != nil {
		return defaultValue
	}

	return value
}
