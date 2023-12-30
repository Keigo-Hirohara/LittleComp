package common

import (
	"time"
)

type Metadata struct {
	ID        string    `gorm:"size:255;default:gen_random_uuid()"`
	CreatedAt time.Time `gorm:"not null;default:now()"`
	UpdatedAt time.Time `gorm:"not null;default:now()"`
}
