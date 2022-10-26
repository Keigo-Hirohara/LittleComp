# タスク管理アプリ: LittleComp
ドラッグ&ドロップでタスクの管理ができるアプリです。

URL: http://18.183.40.187:3000

<img width="1167" alt="スクリーンショット 2022-10-26 14 30 49" src="https://user-images.githubusercontent.com/84382062/197942671-dd795240-7ccf-49c7-9561-ef97f5026ee0.png">

##　使用技術
* TypeScript
* Next.js
* TailwindCSS
* Apollo Client
* Apollo GraphQL
* Prisma
* PostgreSQL
* RDS(本番環境用のデータベース)
* EC2(デプロイ)
* Docker(開発とデプロイ)


## 開発準備

### ローカル環境でのPostgres起動

```npm run devcontainer```

Postgresのコンテナが走るので、開発時に使用してください。

### データベースの初期化、テーブルの作成

```cd app/server && npm run migrate:dev```

ORマッパーにPrismaを使用していますので、migrationを行うことでデータベースと連携が取れます。

### クライアントの起動

```cd app/client && npm run dev```

### サーバーの起動

```cd app/server && npm run start:dev```

## テーマ、きっかけ
