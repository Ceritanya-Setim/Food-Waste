package controllers

import (
	"backend/dto"
	"backend/services"
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMerchantProfile(c *gin.Context) {
	userID := c.MustGet("user_id").(string)
	response, err := services.GetMerchantProfileService(userID)

	if err != nil {
		utils.ErrorResponse(
			c, http.StatusInternalServerError, err.Error(),
		)
		return
	}

	utils.SuccessResponse(
		c, http.StatusOK, "Merchant profile viewed successfully", response,
	)
}

func UpdateMerchantProfile(c *gin.Context) {
	userID := c.MustGet("user_id").(string)
	var req dto.UpdateMerchantProfileRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(
			c, http.StatusInternalServerError, err.Error(),
		)
		return
	}

	response, err := services.UpdateMerchantProfileService(
		userID,
		req,
	)

	if err != nil {
		utils.ErrorResponse(
			c, http.StatusInternalServerError, err.Error(),
		)
		return
	}

	utils.SuccessResponse(
		c, http.StatusOK, "Merchant profile updated successfully", response,
	)

}

func GetMerchantDashboard(c *gin.Context) {
	userID := c.MustGet("user_id").(string)
	response, err := services.GetMerchantDashboardService(userID)

	if err != nil {
		utils.ErrorResponse(
			c, http.StatusInternalServerError, err.Error(),
		)
		return
	}

	utils.SuccessResponse(
		c, http.StatusOK, "Merchant dashboard viewed successfully", response,
	)
}
