package controllers

import (
	"backend/dto"
	"backend/services"
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetCustomerProfile(c *gin.Context) {

	userID := c.MustGet("user_id").(string)

	response, err := services.GetCustomerProfileService(userID)

	if err != nil {

		utils.ErrorResponse(
			c,
			http.StatusNotFound,
			err.Error(),
		)
		return
	}

	utils.SuccessResponse(
		c,
		http.StatusOK,
		"Customer profile fetched successfully",
		response,
	)
}

func UpdateCustomerProfile(c *gin.Context) {

	userID := c.MustGet("user_id").(string)

	var req dto.EditProfileRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		utils.ErrorResponse(
			c,
			http.StatusBadRequest,
			err.Error(),
		)
		return
	}

	response, err := services.UpdateCustomerProfileService(
		userID,
		req,
	)

	if err != nil {

		utils.ErrorResponse(
			c,
			http.StatusBadRequest,
			err.Error(),
		)
		return
	}

	utils.SuccessResponse(
		c,
		http.StatusOK,
		"Customer profile updated successfully",
		response,
	)
}
