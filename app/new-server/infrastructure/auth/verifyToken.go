package auth

import (
	"os"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

func VerifyJwt(tokenString string) (*jwt.Token, error) {
	jwtSecret := []byte("secret")
	if os.Getenv("JWT_SECRET") != "" {
		jwtSecret = []byte(os.Getenv("JWT_SECRET"))
	}
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, echo.NewHTTPError(401, "認証トークンの署名アルゴリズムが不正です")
		}
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return nil, err
	}

	return token, nil
}
