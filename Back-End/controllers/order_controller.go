package controllers

import (
	"backend/dto"
	"backend/services"
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateOrder(c *gin.Context) {

	var req dto.OrderRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		utils.ErrorResponse(
			c,
			http.StatusBadRequest,
			err.Error(),
		)
		return
	}

	userID := c.MustGet("user_id").(string)

	response, err := services.CreateOrder(
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
		"Order created successfully",
		response,
	)
}

func GetOrderHistory(c *gin.Context) {

	userID := c.MustGet("user_id").(string)

	var req dto.OrderHistoryRequest

	if err := c.ShouldBindQuery(&req); err != nil {

		utils.ErrorResponse(
			c,
			http.StatusBadRequest,
			err.Error(),
		)
		return
	}

	response, err := services.GetOrderHistory(
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
		"Order history fetched successfully",
		response,
	)
}
