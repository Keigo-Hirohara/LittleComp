package domain

import (
	"new-server/domain/common"
)

type User struct {
	common.Metadata
	Username string `gorm:"not null"`
	Email    string `gorm:"not null;unique"`
	Password string `gorm:"not null"`
	Stories  []Story
}
