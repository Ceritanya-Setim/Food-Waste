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

	userID := c.MustGet("user_id").(string)

	var user models.User

	if err := database.DB.
		Where("id = ?", userID).
		First(&user).Error; err != nil {

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

	userID := c.MustGet("user_id").(string)

	var user models.User

	if err := database.DB.
		Where("id = ?", userID).
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

	updates := map[string]interface{}{}

	if input.FullName != "" {
		updates["full_name"] = input.FullName
	}

	if input.PhoneNumber != "" {
		updates["phone_number"] = input.PhoneNumber
	}

	if input.ProfileImageURL != "" {
		updates["profile_image_url"] = input.ProfileImageURL
	}

	if input.Password != "" {

		hash, err := bcrypt.GenerateFromPassword(
			[]byte(input.Password),
			bcrypt.DefaultCost,
		)

		if err != nil {

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to hash password",
			})
			return
		}

		updates["password_hash"] = string(hash)
	}

	if len(updates) == 0 {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No data to update",
		})
		return
	}

	if err := database.DB.
		Model(&user).
		Updates(updates).Error; err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update profile",
		})
		return
	}

	if err := database.DB.
		Where("id = ?", userID).
		First(&user).Error; err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch updated user",
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
		"message": "Profile updated successfully",
		"data":    response,
	})
}
