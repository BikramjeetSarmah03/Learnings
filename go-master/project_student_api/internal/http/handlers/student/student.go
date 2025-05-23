package student

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"

	"github.com/bikramjeetsarmah03/students-api/internal/types"
	"github.com/bikramjeetsarmah03/students-api/internal/utils/response"
	"github.com/go-playground/validator/v10"
)

func New() http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {

		var student types.Student

		// we need to decode the request
		err := json.NewDecoder(r.Body).Decode(&student)
		if errors.Is(err, io.EOF) {
			response.WriteJson(w, http.StatusBadRequest, response.GeneralError(fmt.Errorf("empty body")))
			return
		}

		if err != nil {
			response.WriteJson(w, http.StatusBadRequest, response.GeneralError(err))
			return
		}

		// validating request
		if err := validator.New().Struct(student); err != nil {
			validateErrs := err.(validator.ValidationErrors)
			response.WriteJson(w, http.StatusBadRequest, response.ValidationError(validateErrs))
			return
		}

		slog.Info("Creating a student")

		response.WriteJson(w, http.StatusCreated, map[string]string{"success": "OK"})
	}

}
