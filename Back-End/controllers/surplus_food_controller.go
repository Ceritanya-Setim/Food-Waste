package controllers

import (
	"backend/database"
	"backend/dto"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetSurplusFood(c *gin.Context) {
	var req dto.SurplusFoodRequest

	if err := c.ShouldBindQuery(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	var surplusFoods []models.SurplusFood
	query := database.DB.Model(&models.SurplusFood{}).
		Joins("JOIN business_locations ON business_locations.id = surplus_foods.business_location_id").
		Joins("JOIN businesses ON businesses.id = business_locations.business_id").
		Preload("BusinessLocation").
		Preload("BusinessLocation.Business")

	if req.Keyword != "" {
		query = query.Where(
			"surplus_foods.title LIKE ? OR surplus_foods.description LIKE ?",
			"%"+req.Keyword+"%",
			"%"+req.Keyword+"%",
		)
	}

	if req.Category != "" {
		query = query.Where(
			"LOWER(businesses.category) = LOWER(?)",
			req.Category,
		)
	}

	if err := query.Find(&surplusFoods).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	var response []dto.SurplusFoodResponse

	for _, food := range surplusFoods {
		response = append(response, dto.SurplusFoodResponse{
			Title:         food.Title,
			Description:   food.Description,
			OriginalPrice: food.OriginalPrice,
			DiscountPrice: food.DiscountPrice,
			PickupEndTime: food.PickupEndTime,
			ExpiryTime:    food.ExpiryTime,
			Status:        string(food.Status),
			BusinessName:  food.BusinessLocation.Business.BusinessName,
			Category:      string(food.BusinessLocation.Business.Category),
			City:          food.BusinessLocation.City,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"data": response,
	})
}
