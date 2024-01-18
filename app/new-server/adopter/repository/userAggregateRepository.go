package repository

import (
	"fmt"
	"new-server/domain"
	"new-server/graph/model"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func SignUp(db gorm.DB, input model.SignUpInput) (*domain.User, error) {
	// データ漏洩時にパスワードが流出するのを防ぐため、DBに保存するパスワードをハッシュ化
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user := domain.User{
		Username: input.Username,
		Email:    input.Email,
		Password: string(hashedPassword),
	}
	result := db.Model(&user).Create(&user)
	if result.Error != nil {
		return nil, result.Error
	}

	return &user, nil
}

type GetUserByEmailInput struct {
	Email string
}

func GetUserByEmail(db gorm.DB, input GetUserByEmailInput) (*domain.User, error) {
	var user *domain.User
	db.Table("users").Where("email = ?", input.Email).First(&user)
	if user == nil {
		return nil, fmt.Errorf("ユーザーが存在しません")
	}

	return user, nil
}
