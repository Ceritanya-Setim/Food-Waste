package controllers

import (
	"backend/dto"
	"backend/services"
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetSurplusFood(c *gin.Context) {

	var req dto.SurplusFoodRequest

	if err := c.ShouldBindQuery(&req); err != nil {

		utils.ErrorResponse(
			c,
			http.StatusBadRequest,
			err.Error(),
		)
		return
	}

	response, err := services.GetSurplusFoods(req)

	if err != nil {

		utils.ErrorResponse(
			c,
			http.StatusInternalServerError,
			err.Error(),
		)
		return
	}

	utils.SuccessResponse(
		c,
		http.StatusOK,
		"Surplus foods fetched successfully",
		response,
	)
}
