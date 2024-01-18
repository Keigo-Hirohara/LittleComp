package middleware

import (
	"fmt"
	"new-server/infrastructure/auth"
	customcontext "new-server/infrastructure/customContext"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

func VerifyJwt(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cc := c.(*customcontext.CustomContext)
		authHeader := cc.Request().Header.Get("authorization")
		if authHeader == "" {
			return next(c)
		}

		authHeaderParts := strings.Split(authHeader, " ")
		if len(authHeaderParts) != 2 || authHeaderParts[0] != "Bearer" {
			return next(c)
		}

		tokenString := authHeaderParts[1]

		token, err := auth.VerifyJwt(tokenString)

		if err != nil {
			return err
		}

		if token == nil {
			return next(c)
		}

		err = setTokenToContext(cc, token)

		if err != nil {
			return err
		}

		return next(c)
	}
}

func setTokenToContext(c echo.Context, token *jwt.Token) error {
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil
	}

	userId := claims["userId"].(string)

	c.Set("userId", userId)

	fmt.Printf("userId: %s", c.Get("userId"))

	return nil
}
