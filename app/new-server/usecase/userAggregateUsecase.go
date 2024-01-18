package usecase

import (
	"new-server/adopter/repository"
	"new-server/graph/model"
	"new-server/infrastructure/auth"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func SignUp(db gorm.DB, input model.SignUpInput) (*model.SignUpResponse, error) {
	newUser, err := repository.SignUp(db, model.SignUpInput{
		Username: input.Username,
		Email:    input.Email,
		Password: input.Password,
	})
	if err != nil {
		return nil, err
	}

	// リクエストヘッダに設定するためのトークンを生成
	token, err := auth.GenerateToken(newUser.Password)
	if err != nil {
		return nil, err
	}

	return &model.SignUpResponse{
		User: &model.User{
			ID:       newUser.ID,
			Username: newUser.Username,
			Email:    newUser.Email,
			Password: newUser.Password,
		},
		Token: *token,
	}, nil
}

func Login(db gorm.DB, input model.LoginInput) (*model.LoginResponse, error) {
	user, err := repository.GetUserByEmail(db, repository.GetUserByEmailInput{
		Email: input.Email,
	})
	if err != nil {
		return nil, err
	}

	// DB上のUserのパスワードとリクエストのパスワードを比較
	error := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))
	if error != nil {
		return nil, error
	}

	// リクエストヘッダに設定するためのトークンを生成
	token, err := auth.GenerateToken(user.Password)
	if err != nil {
		return nil, err
	}

	return &model.LoginResponse{
		User: &model.User{
			ID:       user.ID,
			Username: user.Username,
			Email:    user.Email,
			Password: user.Password,
		},
		Token: *token,
	}, nil
}
