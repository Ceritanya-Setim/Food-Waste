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
		user := protected.Group("/users")
		{
			user.GET("/me", controllers.GetUserProfile)
			user.PUT("/me", controllers.UpdateUserProfile)
		}

	}
}
