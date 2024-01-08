package middleware

import (
	"fmt"
	customcontext "new-server/infrastructure/customContext"
	"os"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

func VerifyJwt(next echo.HandlerFunc) echo.HandlerFunc {
	jwtSecret := []byte("secret")
	if os.Getenv("JWT_SECRET") != "" {
		jwtSecret = []byte(os.Getenv("JWT_SECRET"))
	}
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

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, echo.NewHTTPError(401, "認証トークンの署名アルゴリズムが不正です")
			}
			return jwtSecret, nil
		})
		if err != nil || !token.Valid {
			return next(c)
		}

		err = setContext(cc, token)

		if err != nil {
			return err
		}

		return next(c)
	}
}

func setContext(c echo.Context, token *jwt.Token) error {
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil
	}

	userId := claims["userId"].(string)

	c.Set("userId", userId)

	fmt.Printf("userId: %s", c.Get("userId"))

	return nil
}
