package database

import (
	"new-server/domain"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func SetupDB() (*gorm.DB, error) {
	dsn := "host=localhost user=user password=pass dbname=littlecomp port=5112"

	if os.Getenv("DATABASE_HOST") != "" &&
		os.Getenv("DATABASE_USER") != "" &&
		os.Getenv("DATABASE_PASSWORD") != "" &&
		os.Getenv("DATABASE_NAME") != "" &&
		os.Getenv("DATABASE_PORT") != "" {
		dsn = "host=" + os.Getenv("DATABASE_HOST") + " user=" + os.Getenv("DATABASE_USER") + " password=" + os.Getenv("DATABASE_PASSWORD") + " dbname=" + os.Getenv("DATABASE_NAME") + " port=" + os.Getenv("DATABASE_PORT")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("データベースの接続に失敗しました")
	}

	err = db.AutoMigrate(
		&domain.User{},
		&domain.Story{},
		&domain.Task{},
	)

	if err != nil {
		panic("データベースのマイグレーションに失敗しました")
	}

	return db, nil
}
