package customcontext

import (
	"github.com/labstack/echo"
	"gorm.io/gorm"
)

type CustomContext struct {
	echo.Context
	DB *gorm.DB
}
