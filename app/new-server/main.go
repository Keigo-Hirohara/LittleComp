package main

import (
	"new-server/infrastructure"
	"new-server/infrastructure/database"
	"new-server/utils"
)

func main() {

	// Todo: サーバー起動する時にLoadEnv()を呼び出すようにする
	err := utils.LoadEnv()
	if err != nil {
		panic(err)
	}

	db, err := database.SetupDB()

	if err != nil {
		panic(err)
	}

	infrastructure.SetupServer(db)
}
