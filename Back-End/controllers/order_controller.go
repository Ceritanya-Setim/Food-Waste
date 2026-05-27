package controllers

import (
	"backend/database"
	"backend/dto"
	"backend/models"
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func CreateOrder(c *gin.Context) {

	var req dto.OrderRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	userID := c.MustGet("user_id").(string)

	tx := database.DB.Begin()

	totalPrice := 0
	totalItems := 0

	var pickupTime time.Time

	orderItems := []models.OrderItem{}

	for _, item := range req.Items {

		var food models.SurplusFood

		if err := tx.
			Where("id = ?", item.SurplusFoodID).
			First(&food).Error; err != nil {

			tx.Rollback()

			c.JSON(http.StatusNotFound, gin.H{
				"error": "Surplus food not found",
			})
			return
		}

		if pickupTime.IsZero() {
			pickupTime = food.PickupEndTime
		}

		if food.BusinessLocationID != req.BusinessLocationID {

			tx.Rollback()

			c.JSON(http.StatusBadRequest, gin.H{
				"error": "All foods must come from same business location",
			})
			return
		}

		if food.Status != models.StatusActive {

			tx.Rollback()

			c.JSON(http.StatusBadRequest, gin.H{
				"error": fmt.Sprintf("%s is not available", food.Title),
			})
			return
		}

		if food.ExpiryTime.Before(time.Now()) {

			tx.Rollback()

			c.JSON(http.StatusBadRequest, gin.H{
				"error": fmt.Sprintf("%s already expired", food.Title),
			})
			return
		}

		if food.QuantityRemaining < item.Quantity {

			tx.Rollback()

			c.JSON(http.StatusBadRequest, gin.H{
				"error": fmt.Sprintf("Not enough stock for %s", food.Title),
			})
			return
		}

		subtotal := food.DiscountPrice * item.Quantity

		totalPrice += subtotal
		totalItems += item.Quantity

		orderItems = append(orderItems, models.OrderItem{
			SurplusFoodID: food.ID,
			Quantity:      item.Quantity,
			PricePerItem:  food.DiscountPrice,
			Subtotal:      subtotal,
		})

		food.QuantityRemaining -= item.Quantity

		if food.QuantityRemaining == 0 {
			food.Status = models.StatusSoldOut
		}

		if err := tx.Save(&food).Error; err != nil {

			tx.Rollback()

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to update stock",
			})
			return
		}
	}

	pickupCode := fmt.Sprintf(
		"PICKUP-%06d",
		rand.Intn(1000000),
	)

	order := models.Order{
		UserID:             userID,
		BusinessLocationID: req.BusinessLocationID,
		TotalPrice:         totalPrice,
		Status:             models.OrderPending,
		PickupCode:         pickupCode,
		OrderTime:          time.Now(),
		PickupTime:         pickupTime,
	}

	if err := tx.Create(&order).Error; err != nil {

		tx.Rollback()

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create order",
		})
		return
	}

	for i := range orderItems {

		orderItems[i].OrderID = order.ID

		if err := tx.Create(&orderItems[i]).Error; err != nil {

			tx.Rollback()

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to create order items",
			})
			return
		}
	}

	tx.Commit()

	response := dto.OrderResponse{
		OrderID:    order.ID,
		PickupCode: order.PickupCode,
		TotalPrice: order.TotalPrice,
		Status:     string(order.Status),
		TotalItems: totalItems,
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Order created successfully",
		"data":    response,
	})
}

func GetOrderHistory(c *gin.Context) {

	userID := c.MustGet("user_id").(string)

	var req dto.OrderHistoryRequest

	if err := c.ShouldBindQuery(&req); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	validStatus := map[string]bool{
		"all":       true,
		"completed": true,
		"cancelled": true,
	}

	if req.Status != "" && !validStatus[req.Status] {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid status filter",
		})
		return
	}

	var totalOrders int64

	if err := database.DB.
		Model(&models.Order{}).
		Where("user_id = ?", userID).
		Count(&totalOrders).Error; err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to count total orders",
		})
		return
	}

	var completedOrders int64

	if err := database.DB.
		Model(&models.Order{}).
		Where("user_id = ?", userID).
		Where("status = ?", models.OrderCompleted).
		Count(&completedOrders).Error; err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to count completed orders",
		})
		return
	}

	type SpendingResult struct {
		Total int
	}

	var spending SpendingResult

	if err := database.DB.
		Model(&models.Order{}).
		Select("COALESCE(SUM(total_price), 0) as total").
		Where("user_id = ?", userID).
		Where("status = ?", models.OrderPaid).
		Scan(&spending).Error; err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to calculate spending",
		})
		return
	}

	type OrderResult struct {
		OrderID      string
		BusinessName string
		Status       string
		OrderDate    time.Time
		TotalPrice   int
	}

	var results []OrderResult

	query := database.DB.
		Table("orders").
		Select(`
			orders.id as order_id,
			businesses.business_name,
			orders.status,
			orders.order_time as order_date,
			orders.total_price
		`).
		Joins(`
			JOIN business_locations
			ON business_locations.id = orders.business_location_id
		`).
		Joins(`
			JOIN businesses
			ON businesses.id = business_locations.business_id
		`).
		Where("orders.user_id = ?", userID)

	if req.Status != "" && req.Status != "all" {

		query = query.Where(
			"orders.status = ?",
			req.Status,
		)
	}

	if err := query.
		Order("orders.order_time DESC").
		Scan(&results).Error; err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch order history",
		})
		return
	}

	orders := make([]dto.OrderHistoryItem, 0, len(results))

	for _, order := range results {

		orders = append(orders, dto.OrderHistoryItem{
			OrderID:      order.OrderID,
			BusinessName: order.BusinessName,
			Status:       order.Status,
			OrderDate:    order.OrderDate,
			TotalPrice:   order.TotalPrice,
		})
	}

	response := dto.OrderHistoryResponse{
		Summary: dto.OrderHistorySummary{
			TotalOrders:     int(totalOrders),
			CompletedOrders: int(completedOrders),
			TotalSpending:   spending.Total,
		},
		Orders: orders,
	}

	c.JSON(http.StatusOK, gin.H{
		"data": response,
	})
}
