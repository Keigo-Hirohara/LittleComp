package repository

import (
	"new-server/domain"
	"new-server/graph/model"

	"gorm.io/gorm"
)

func CreateUser(db gorm.DB, input model.CreateUserInput) (*model.User, error) {
	user := domain.User{
		Username: input.Username,
		Email:    input.Email,
		Password: input.Password,
	}
	result := db.Model(&user).Create(&user)

	if result.Error != nil {
		return nil, result.Error
	}

	var getUserResult *model.User

	db.Table("users").Where("username = ?", input.Username).First(&getUserResult)

	return getUserResult, nil
}
