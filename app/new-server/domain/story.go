package domain

import "new-server/domain/common"

type Story struct {
	common.Metadata
	ID     string
	Name   string
	UserID string
	Tasks  []Task
}
