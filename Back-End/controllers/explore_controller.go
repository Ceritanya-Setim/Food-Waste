package controllers

import (
	"backend/services"
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetExplore(c *gin.Context) {

	response, err := services.GetExploreData()

	if err != nil {

		utils.ErrorResponse(
			c,
			http.StatusInternalServerError,
			"Failed to fetch explore data",
		)
		return
	}

	utils.SuccessResponse(
		c,
		http.StatusOK,
		"Explore data fetched successfully",
		response,
	)
}
