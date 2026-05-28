package utils

import (
	"backend/dto"

	"github.com/gin-gonic/gin"
)

func SuccessResponse(
	c *gin.Context,
	statusCode int,
	message string,
	data interface{},
) {
	response := dto.SuccessAPIResponse{
		Message: message,
		Data:    data,
	}

	c.JSON(statusCode, response)
}

func ErrorResponse(
	c *gin.Context,
	statusCode int,
	message string,
) {
	c.JSON(statusCode, struct {
		Error string `json:"error"`
	}{
		Error: message,
	})
}
