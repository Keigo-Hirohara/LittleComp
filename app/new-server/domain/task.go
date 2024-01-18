package domain

import "new-server/domain/common"

type Task struct {
	common.Metadata
	Name    string
	StoryID string
}
