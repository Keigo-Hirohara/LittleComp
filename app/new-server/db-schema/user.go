package dbschema

import (
	"new-server/db-schema/common"
)

type User struct {
	common.Metadata
	Username string `gorm:"not null"`
	Email    string `gorm:"not null;unique"`
	Password string `gorm:"not null"`
	Stories  []Story
}
