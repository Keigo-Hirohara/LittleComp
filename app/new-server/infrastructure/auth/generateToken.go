package auth

import (
	"fmt"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func GenerateToken(password string) (*string, error) {
	// パスワードをハッシュ化
	claims := jwt.MapClaims{
		"password": password,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	fmt.Printf("token: %s", tokenString)

	if err != nil {
		return nil, err
	}

	return &tokenString, nil
}
