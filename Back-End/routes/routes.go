package routes

import (
	"backend/controllers"
	"backend/middlewares"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	auth := r.Group("/auth")
	{
		auth.POST("/register", controllers.Register)
		auth.POST("/login", controllers.Login)
	}

	surplusFood := r.Group("/surplus-food")
	{
		surplusFood.GET("/", controllers.GetSurplusFood)
	}

	protected := r.Group("/")
	protected.Use(middlewares.AuthMiddleware())
	{
		customer := protected.Group("/customer")
		customer.Use(middlewares.CustomerOnly())
		{
			customer.GET("/me", controllers.GetCustomerProfile)
			customer.PUT("/me", controllers.UpdateCustomerProfile)

			orders := customer.Group("/order")
			{
				orders.POST("/", controllers.CreateOrder)
				orders.GET("/history", controllers.GetOrderHistory)
			}
		}

		merchant := protected.Group("/merchant")
		merchant.Use(middlewares.MerchantOnly())
		{
			merchant.GET("/me", controllers.GetMerchantProfile)
			merchant.PUT("/me", controllers.UpdateMerchantProfile)
		}
	}
}
