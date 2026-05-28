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

	r.GET("/surplus-food", controllers.GetSurplusFood)
	r.GET("/explore", controllers.GetExplore)

	protected := r.Group("/")
	protected.Use(middlewares.AuthMiddleware())
	{
		customer := protected.Group("/customer")
		customer.Use(middlewares.CustomerOnly())
		{
			customer.GET("/me", controllers.GetCustomerProfile)
			customer.PUT("/me", controllers.UpdateCustomerProfile)

			customer.GET("/impact", controllers.GetImpactController)
			orders := customer.Group("/order")
			{
				orders.POST("/", controllers.CreateOrder)
				orders.GET("/history", controllers.GetOrderHistory)
			}
		}

		merchant := protected.Group("/merchant")
		merchant.Use(middlewares.MerchantOnly())
		{
			merchant.GET("/", controllers.GetMerchantDashboard)
			merchant.GET("/me", controllers.GetMerchantProfile)
			merchant.PUT("/me", controllers.UpdateMerchantProfile)

			merchant.POST("/surplus-food", controllers.CreateMerchantSurplusFood)
			merchant.GET("/surplus-food/:id", controllers.GetMerchantFoodDetail)
			merchant.PUT("/surplus-food/:id", controllers.UpdateMerchantFood)
			merchant.DELETE("/surplus-food/:id", controllers.DeleteMerchantFood)
		}
	}
}
