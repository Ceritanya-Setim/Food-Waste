package controllers

import (
	"backend/database"
	"backend/dto"
	"backend/models"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func GetMerchantProfile(c *gin.Context) {

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

	var business models.Business

	if err := database.DB.
		Where("owner_id = ?", userID).
		First(&business).Error; err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"error": "Business not found",
		})
		return
	}

	var location models.BusinessLocation

	if err := database.DB.
		Where("business_id = ?", business.ID).
		First(&location).Error; err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"error": "Business location not found",
		})
		return
	}

	response := dto.MerchantProfileResponse{
		FullName:    user.FullName,
		Email:       user.Email,
		PhoneNumber: user.PhoneNumber,

		BusinessName: business.BusinessName,
		Description:  business.Description,
		Category:     string(business.Category),

		Address:     location.Address,
		City:        location.City,
		Province:    location.Province,
		PostalCode:  location.PostalCode,
		Latitude:    location.Latitude,
		Longitude:   location.Longitude,
		OpeningTime: location.OpeningTime,
		ClosingTime: location.ClosingTime,
	}

	c.JSON(http.StatusOK, gin.H{
		"data": response,
	})
}

func UpdateMerchantProfile(c *gin.Context) {

	userID := c.MustGet("user_id").(string)

	var req dto.UpdateMerchantProfileRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	var user models.User

	if err := database.DB.
		Where("id = ?", userID).
		First(&user).Error; err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	if req.Email != "" && req.Email != user.Email {

		var existingUser models.User

		if err := database.DB.
			Where("email = ?", req.Email).
			First(&existingUser).Error; err == nil {

			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Email already used",
			})
			return
		}
	}

	var business models.Business

	if err := database.DB.
		Where("owner_id = ?", userID).
		First(&business).Error; err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"error": "Business not found",
		})
		return
	}

	var location models.BusinessLocation

	if err := database.DB.
		Where("business_id = ?", business.ID).
		First(&location).Error; err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"error": "Business location not found",
		})
		return
	}

	userUpdates := map[string]interface{}{}

	if req.FullName != "" {
		userUpdates["full_name"] = req.FullName
	}

	if req.Email != "" {
		userUpdates["email"] = req.Email
	}

	if req.PhoneNumber != "" {
		userUpdates["phone_number"] = req.PhoneNumber
	}

	if req.Password != "" {

		hash, err := bcrypt.GenerateFromPassword(
			[]byte(req.Password),
			bcrypt.DefaultCost,
		)

		if err != nil {

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to hash password",
			})
			return
		}

		userUpdates["password_hash"] = string(hash)
	}

	if len(userUpdates) > 0 {

		if err := database.DB.
			Model(&user).
			Updates(userUpdates).Error; err != nil {

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to update user",
			})
			return
		}
	}

	businessUpdates := map[string]interface{}{}

	if req.BusinessName != "" {
		businessUpdates["business_name"] = req.BusinessName
	}

	if req.Description != "" {
		businessUpdates["description"] = req.Description
	}

	if req.Category != "" {
		businessUpdates["category"] = req.Category
	}

	if len(businessUpdates) > 0 {

		if err := database.DB.
			Model(&business).
			Updates(businessUpdates).Error; err != nil {

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to update business",
			})
			return
		}
	}

	locationUpdates := map[string]interface{}{}

	if req.Address != "" {
		locationUpdates["address"] = req.Address
	}

	if req.City != "" {
		locationUpdates["city"] = req.City
	}

	if req.Province != "" {
		locationUpdates["province"] = req.Province
	}

	if req.PostalCode != "" {
		locationUpdates["postal_code"] = req.PostalCode
	}

	if req.Latitude != 0 {
		locationUpdates["latitude"] = req.Latitude
	}

	if req.Longitude != 0 {
		locationUpdates["longitude"] = req.Longitude
	}

	if req.OpeningTime != "" {
		locationUpdates["opening_time"] = req.OpeningTime
	}

	if req.ClosingTime != "" {
		locationUpdates["closing_time"] = req.ClosingTime
	}

	if len(locationUpdates) > 0 {

		if err := database.DB.
			Model(&location).
			Updates(locationUpdates).Error; err != nil {

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to update location",
			})
			return
		}
	}

	database.DB.First(&user, "id = ?", userID)
	database.DB.First(&business, "id = ?", business.ID)
	database.DB.First(&location, "id = ?", location.ID)

	response := dto.MerchantProfileResponse{
		FullName:    user.FullName,
		Email:       user.Email,
		PhoneNumber: user.PhoneNumber,

		BusinessName: business.BusinessName,
		Description:  business.Description,
		Category:     string(business.Category),

		Address:     location.Address,
		City:        location.City,
		Province:    location.Province,
		PostalCode:  location.PostalCode,
		Latitude:    location.Latitude,
		Longitude:   location.Longitude,
		OpeningTime: location.OpeningTime,
		ClosingTime: location.ClosingTime,
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Merchant profile updated successfully",
		"data":    response,
	})
}

// Test
func GetMerchantDashboard(c *gin.Context) {

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

	var business models.Business

	if err := database.DB.
		Where("owner_id = ?", userID).
		First(&business).Error; err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"error": "Business not found",
		})
		return
	}

	type RevenueResult struct {
		Total int
	}

	var revenue RevenueResult

	database.DB.
		Table("orders").
		Select("COALESCE(SUM(orders.total_price), 0) as total").
		Where("orders.status = ?", models.OrderCompleted).
		Where(`
			orders.business_location_id IN (
				SELECT id
				FROM business_locations
				WHERE business_id = ?
			)
		`, business.ID).
		Scan(&revenue)

	var activeMenu int64

	database.DB.
		Model(&models.SurplusFood{}).
		Where(`
			business_location_id IN (
				SELECT id
				FROM business_locations
				WHERE business_id = ?
			)
		`, business.ID).
		Where("status = ?", models.StatusActive).
		Count(&activeMenu)

	type SoldResult struct {
		Total int
	}

	var sold SoldResult

	database.DB.
		Table("order_items").
		Select("COALESCE(SUM(order_items.quantity), 0) as total").
		Joins(`
			JOIN surplus_foods
			ON surplus_foods.id = order_items.surplus_food_id
		`).
		Joins(`
			JOIN business_locations
			ON business_locations.id = surplus_foods.business_location_id
		`).
		Where("business_locations.business_id = ?", business.ID).
		Scan(&sold)

	type DiscountResult struct {
		Total int
	}

	var discount DiscountResult

	database.DB.
		Table("order_items").
		Select(`
			COALESCE(SUM(
				(
					surplus_foods.original_price -
					surplus_foods.discount_price
				) * order_items.quantity
			), 0) as total
		`).
		Joins(`
			JOIN surplus_foods
			ON surplus_foods.id = order_items.surplus_food_id
		`).
		Joins(`
			JOIN business_locations
			ON business_locations.id = surplus_foods.business_location_id
		`).
		Where("business_locations.business_id = ?", business.ID).
		Scan(&discount)

	var availableMenu int64

	database.DB.
		Model(&models.SurplusFood{}).
		Where(`
			business_location_id IN (
				SELECT id
				FROM business_locations
				WHERE business_id = ?
			)
		`, business.ID).
		Where("expiry_time > ?", time.Now()).
		Where("status != ?", models.StatusExpired).
		Count(&availableMenu)

	var expiredMenu int64

	database.DB.
		Model(&models.SurplusFood{}).
		Where(`
			business_location_id IN (
				SELECT id
				FROM business_locations
				WHERE business_id = ?
			)
		`, business.ID).
		Where(`
			expiry_time <= ?
			OR status = ?
		`,
			time.Now(),
			models.StatusExpired,
		).
		Count(&expiredMenu)

	var foods []models.SurplusFood

	if err := database.DB.
		Where(`
			business_location_id IN (
				SELECT id
				FROM business_locations
				WHERE business_id = ?
			)
		`, business.ID).
		Order("created_at DESC").
		Find(&foods).Error; err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch foods",
		})
		return
	}

	foodResponses := make([]dto.MerchantFoodItem, 0, len(foods))

	for _, food := range foods {

		shortDescription := truncateWords(food.Description, 10)

		foodResponses = append(foodResponses, dto.MerchantFoodItem{
			Name:              food.Title,
			Description:       shortDescription,
			OriginalPrice:     food.OriginalPrice,
			DiscountPrice:     food.DiscountPrice,
			QuantityRemaining: food.QuantityRemaining,
			Status:            string(food.Status),
			PickupStartTime:   food.PickupStartTime,
			PickupEndTime:     food.PickupEndTime,
			ExpiryTime:        food.ExpiryTime,
		})
	}

	response := dto.MerchantDashboardResponse{
		TotalRevenue:  revenue.Total,
		ActiveMenu:    int(activeMenu),
		SoldMenu:      sold.Total,
		TotalDiscount: discount.Total,
		AvailableMenu: int(availableMenu),
		ExpiredMenu:   int(expiredMenu),
		SurplusFoods:  foodResponses,
	}

	c.JSON(http.StatusOK, gin.H{
		"data": response,
	})
}

func truncateWords(text string, limit int) string {

	words := strings.Fields(text)

	if len(words) <= limit {
		return text
	}

	return strings.Join(words[:limit], " ") + "..."
}
