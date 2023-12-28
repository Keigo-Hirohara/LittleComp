package dbschema

import "gorm.io/gorm"

type Story struct {
	gorm.Model
	ID     string
	Name   string
	UserID string
	Tasks  []Task
}
