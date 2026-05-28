package controllers

import (
	"backend/dto"
	"backend/services"
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {

	var req dto.RegisterRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		utils.ErrorResponse(
			c,
			http.StatusBadRequest,
			err.Error(),
		)
		return
	}

	if err := services.RegisterUser(req); err != nil {

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
		"User registered successfully",
		nil,
	)
}

func Login(c *gin.Context) {

	var req dto.LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		utils.ErrorResponse(
			c,
			http.StatusBadRequest,
			err.Error(),
		)
		return
	}

	response, err := services.LoginUser(req)

	if err != nil {

		utils.ErrorResponse(
			c,
			http.StatusUnauthorized,
			err.Error(),
		)
		return
	}

	utils.SuccessResponse(
		c,
		http.StatusOK,
		"Login success",
		response,
	)
}
