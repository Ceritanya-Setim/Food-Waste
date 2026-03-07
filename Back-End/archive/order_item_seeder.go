package seeders

import (
	"backend/models"
	"fmt"
	"log"

	"gorm.io/gorm"
)

func OrderItemSeeder(db *gorm.DB) {
	var order []models.Order
	if err := db.Limit(5).Find(&order).Error; err != nil {
		log.Fatal("OrderItemSeeder: Failed to get order", err)
	}

	var surplusFood []models.SurplusFood
	if err := db.Limit(5).Find(&surplusFood).Error; err != nil {
		log.Fatal("OrderItemSeeder: Failed to get surplus food", err)
	}

	orderItems := []models.OrderItem{}

	for i := 0; i < len(order) && i < len(surplusFood); i++ {
		qty := 2
		price := 15000

		orderItem := models.OrderItem{
			OrderID:       order[i].ID,
			SurplusFoodID: surplusFood[i].ID,
			Quantity:      qty,
			PricePerItem:  price,
			Subtotal:      qty * price,
		}

		orderItems = append(orderItems, orderItem)
	}

	if err := db.Create(&orderItems).Error; err != nil {
		log.Println("Failed to seed order items:", err)
		return
	}

	fmt.Println("OrderItem seeder done")
}
