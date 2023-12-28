package dbschema

import "gorm.io/gorm"

type User struct {
	gorm.Model
	ID       string
	Username string
	Email    string
	Password string
	Stories  []Story
}
