package middlewares

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func MerchantOnly() gin.HandlerFunc {
	return func(c *gin.Context) {
		role := c.MustGet("role").(string)
		if role != string(models.RoleMerchant) {
			c.JSON(http.StatusForbidden, gin.H{
				"error": "Only merchant can access this endpoint",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}

func CustomerOnly() gin.HandlerFunc {
	return func(c *gin.Context) {
		role := c.MustGet("role").(string)
		if role != string(models.RoleCustomer) {
			c.JSON(http.StatusForbidden, gin.H{
				"error": "Only customer can access this endpoint",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}
