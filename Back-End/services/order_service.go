package services

import (
	"backend/dto"
	"backend/models"
	"backend/repositories"
	"errors"
	"fmt"
	"math/rand"
	"time"
)

func GetOrderHistory(
	userID string,
	req dto.OrderHistoryRequest,
) (
	dto.OrderHistoryResponse,
	error,
) {

	validStatus := map[string]bool{
		"all":       true,
		"completed": true,
		"cancelled": true,
	}

	if req.Status != "" &&
		!validStatus[req.Status] {

		return dto.OrderHistoryResponse{},
			errors.New(
				"invalid status filter",
			)
	}

	stats, err :=
		repositories.GetOrderHistoryStats(
			userID,
		)

	if err != nil {
		return dto.OrderHistoryResponse{},
			err
	}

	rows, err :=
		repositories.GetOrderHistoryRows(
			userID,
			req.Status,
		)

	if err != nil {
		return dto.OrderHistoryResponse{},
			err
	}

	orders := make(
		[]dto.OrderHistoryItem,
		0,
		len(rows),
	)

	for _, row := range rows {

		orders = append(
			orders,
			dto.OrderHistoryItem{
				OrderID:      row.OrderID,
				BusinessName: row.BusinessName,
				PickupCode:   row.PickupCode,
				Status:       row.Status,
				OrderDate:    row.OrderDate,
				TotalPrice:   row.TotalPrice,
			},
		)
	}

	return dto.OrderHistoryResponse{
		Summary: dto.OrderHistorySummary{
			TotalOrders:     stats.TotalOrders,
			CompletedOrders: stats.CompletedOrders,
			TotalSpending:   stats.TotalSpending,
		},
		Orders: orders,
	}, nil
}

func CreateOrder(
	userID string,
	req dto.OrderRequest,
) (dto.OrderResponse, error) {

	tx := repositories.BeginTransaction()

	totalPrice := 0
	totalItems := 0

	var pickupTime time.Time

	orderItems := []models.OrderItem{}

	for _, item := range req.Items {

		food, err := repositories.
			FindSurplusFoodByID(
				tx,
				item.SurplusFoodID,
			)

		if err != nil {

			tx.Rollback()

			return dto.OrderResponse{},
				errors.New(
					"surplus food not found",
				)
		}

		if pickupTime.IsZero() {
			pickupTime = food.PickupEndTime
		}

		if food.BusinessLocationID !=
			req.BusinessLocationID {

			tx.Rollback()

			return dto.OrderResponse{},
				errors.New(
					"all foods must come from same business location",
				)
		}

		if food.Status != models.StatusActive {

			tx.Rollback()

			return dto.OrderResponse{},
				fmt.Errorf("%s is not available", food.Title)
		}

		if food.ExpiryTime.Before(
			time.Now(),
		) {

			tx.Rollback()

			return dto.OrderResponse{},
				fmt.Errorf("%s already expired", food.Title)
		}

		if food.QuantityRemaining <
			item.Quantity {

			tx.Rollback()

			return dto.OrderResponse{},
				fmt.Errorf("not enough stock for %s", food.Title)
		}

		subtotal :=
			food.DiscountPrice *
				item.Quantity

		totalPrice += subtotal
		totalItems += item.Quantity

		orderItems = append(
			orderItems,
			models.OrderItem{
				SurplusFoodID: food.ID,
				Quantity:      item.Quantity,
				PricePerItem:  food.DiscountPrice,
				Subtotal:      subtotal,
			},
		)

		food.QuantityRemaining -=
			item.Quantity

		if food.QuantityRemaining == 0 {

			food.Status =
				models.StatusSoldOut
		}

		if err := repositories.
			UpdateSurplusFood(
				&food,
			); err != nil {

			tx.Rollback()

			return dto.OrderResponse{},
				errors.New(
					"failed to update stock",
				)
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
		Status:             models.OrderCompleted,
		PickupCode:         pickupCode,
		OrderTime:          time.Now(),
		PickupTime:         pickupTime,
	}

	if err := repositories.
		CreateOrder(
			tx,
			&order,
		); err != nil {

		tx.Rollback()

		return dto.OrderResponse{},
			errors.New(
				"failed to create order",
			)
	}

	for i := range orderItems {
		orderItems[i].OrderID = order.ID
	}

	if err := repositories.
		CreateOrderItems(
			tx,
			&orderItems,
		); err != nil {

		tx.Rollback()

		return dto.OrderResponse{},
			errors.New(
				"failed to create order items",
			)
	}

	if err := tx.Commit().Error; err != nil {

		tx.Rollback()

		return dto.OrderResponse{},
			errors.New(
				"failed to commit transaction",
			)
	}

	return dto.OrderResponse{
		OrderID:    order.ID,
		PickupCode: order.PickupCode,
		TotalPrice: order.TotalPrice,
		Status:     string(order.Status),
		TotalItems: totalItems,
	}, nil
}

func GetMerchantNotifications(merchantID string) (
	[]dto.MerchantNotificationResponse,
	error,
) {
	rows, err := repositories.GetNotificationsByMerchantOwner(merchantID)

	if err != nil {
		return nil, err
	}

	notifications := make(
		[]dto.MerchantNotificationResponse,
		0,
		len(rows),
	)

	for _, row := range rows {
		notifications = append(
			notifications,
			dto.MerchantNotificationResponse{
				OrderID:      row.OrderID,
				CustomerName: row.CustomerName,
				TotalPrice:   row.TotalPrice,
				PickupCode:   row.PickupCode,
				OrderTime:    row.OrderTime,
				Status:       row.Status,
			},
		)
	}

	return notifications, nil
}
