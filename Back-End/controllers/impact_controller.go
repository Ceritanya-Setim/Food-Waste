package controllers

import (
	"backend/services"
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetImpactController(c *gin.Context) {

	response, err := services.GetImpactService()

	if err != nil {

		utils.ErrorResponse(
			c,
			http.StatusInternalServerError,
			"failed to get impact data",
		)

		return
	}

	utils.SuccessResponse(
		c,
		http.StatusOK,
		"impact data fetched successfully",
		response,
	)
}
