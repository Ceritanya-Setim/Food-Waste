package utils

import (
	"backend/database"
	"backend/dto"
	"backend/models"
	"fmt"

	"gorm.io/gorm"
)

func BuildSurplusFoodQuery(
	req dto.SurplusFoodRequest,
) *gorm.DB {

	query := database.DB.
		Model(&models.SurplusFood{}).
		Joins(`
			JOIN business_locations
			ON business_locations.id =
			surplus_foods.business_location_id
		`).
		Joins(`
			JOIN businesses
			ON businesses.id =
			business_locations.business_id
		`).
		Preload("BusinessLocation").
		Preload("BusinessLocation.Business")

	if req.Keyword != "" {

		query = query.Where(
			`(
				surplus_foods.title ILIKE ?
				OR surplus_foods.description ILIKE ?
			)`,
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

	if req.Price != 0 {

		query = query.Where(
			"surplus_foods.discount_price <= ?",
			req.Price,
		)
	}

	if req.City != "" {

		query = query.Where(
			"business_locations.city ILIKE ?",
			"%"+req.City+"%",
		)
	}

	switch req.Filter {

	case "special-promo":

		query = query.Order(`
			(
				surplus_foods.original_price -
				surplus_foods.discount_price
			) DESC
		`)

	case "newest":

		query = query.Order(
			"surplus_foods.created_at DESC",
		)

	case "popularity":

		query = query.
			Joins(`
				LEFT JOIN reviews
				ON reviews.surplus_food_id =
				surplus_foods.id
			`).
			Select("surplus_foods.*").
			Group("surplus_foods.id").
			Order(`
				COALESCE(
					AVG(reviews.rating),
					0
				) DESC,

				COUNT(reviews.id) DESC
			`)

	case "closest":

		if req.Lat != 0 && req.Lon != 0 {

			query = query.Order(
				fmt.Sprintf(`
					POWER(
						business_locations.latitude - %f,
						2
					) +

					POWER(
						business_locations.longitude - %f,
						2
					)
				`,
					req.Lat,
					req.Lon,
				),
			)
		}
	}

	return query
}
