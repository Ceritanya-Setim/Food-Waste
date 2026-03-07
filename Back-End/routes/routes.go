package routes

import (
	"backend/controllers"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	user := r.Group("users")
	{
		user.GET("/view-profile/:id", controllers.GetUserProfile)
		user.PUT("/edit-profile/:id", controllers.UpdateUserProfile)
	}

	auth := r.Group("auth")
	{
		auth.POST("register", controllers.Register)
		auth.POST("login", controllers.Login)
	}

	menu := r.Group("surplus-food")
	{
		menu.GET("/", controllers.GetSurplusFood)
	}
}
