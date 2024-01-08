package usecase

import (
	"new-server/adopter/repository"
	"new-server/graph/model"

	"gorm.io/gorm"
)

func CreateUser(db gorm.DB, input model.CreateUserInput) (*model.User, error) {
	user, err := repository.CreateUser(db, input)

	if err != nil {
		return nil, err
	}

	return user, nil
}
