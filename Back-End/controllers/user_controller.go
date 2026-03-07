package controllers

import (
	"backend/database"
	"backend/dto"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func GetUserProfile(c *gin.Context) {
	id := c.Param("id")

	var user models.User
	if err := database.DB.Where("id=?", id).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	response := dto.UserProfileResponse{
		FullName:        user.FullName,
		Email:           user.Email,
		PhoneNumber:     user.PhoneNumber,
		Role:            string(user.Role),
		ProfileImageURL: user.ProfileImageURL,
		RegisteredSince: user.CreatedAt.Format("2006-01-02"),
		LastUpdated:     user.UpdatedAt.Format("2006-01-02"),
	}

	c.JSON(http.StatusOK, gin.H{
		"data": response,
	})

}

func UpdateUserProfile(c *gin.Context) {
	id := c.Param("id")
	var user models.User

	if err := database.DB.
		Where("id=?", id).
		First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	var input dto.EditProfileRequest

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	if input.Password != "" {
		hash, _ := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
		input.Password = string(hash)
	}

	database.DB.Model(&user).Updates(input)

	editResponse := dto.UserProfileResponse{
		FullName:        user.FullName,
		Email:           user.Email,
		PhoneNumber:     user.PhoneNumber,
		Role:            string(user.Role),
		ProfileImageURL: user.ProfileImageURL,
		RegisteredSince: user.CreatedAt.Format("2006-01-02"),
		LastUpdated:     user.UpdatedAt.Format("2006-01-02"),
	}

	c.JSON(http.StatusOK, gin.H{
		"data": editResponse,
	})
}
