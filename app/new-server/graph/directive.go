package graph

import (
	"context"
	"errors"
	"fmt"
	"new-server/graph/generated"

	"github.com/99designs/gqlgen/graphql"
)

func NewDirective() generated.DirectiveRoot {
	return generated.DirectiveRoot{
		IsAuthenticated: func(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {
			// Todo: userIdは文字列ではなく自前でContextKey作る
			userId := ctx.Value("userId")
			fmt.Printf("userId: %s", userId)
			if userId == nil {
				return nil, errors.New("ログインし直してください")
			}

			return next(ctx)
		},
	}
}
