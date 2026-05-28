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

func CreateMerchantSurplusFood(c *gin.Context) {

	var req dto.CreateSurplusFoodRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		utils.ErrorResponse(
			c,
			http.StatusBadRequest,
			err.Error(),
		)
		return
	}

	userID := c.MustGet("user_id").(string)

	response, err := services.
		CreateMerchantSurplusFood(
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
		http.StatusCreated,
		"Food created successfully",
		response,
	)
}

func GetMerchantFoodDetail(c *gin.Context) {

	userID := c.MustGet("user_id").(string)
	foodID := c.Param("id")

	response, err := services.
		GetMerchantSurplusFoodDetail(
			userID,
			foodID,
		)

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
		"Food fetched successfully",
		response,
	)
}

func UpdateMerchantFood(c *gin.Context) {

	userID := c.MustGet("user_id").(string)
	foodID := c.Param("id")

	var req dto.UpdateSurplusFoodRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		utils.ErrorResponse(
			c,
			http.StatusBadRequest,
			err.Error(),
		)
		return
	}

	response, err := services.
		UpdateMerchantSurplusFood(
			userID,
			foodID,
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
		"Food updated successfully",
		response,
	)
}

func DeleteMerchantFood(c *gin.Context) {

	userID := c.MustGet("user_id").(string)
	foodID := c.Param("id")

	err := services.DeleteMerchantSurplusFood(
		userID,
		foodID,
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
		"Food deleted successfully",
		nil,
	)
}
