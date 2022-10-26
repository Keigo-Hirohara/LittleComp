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

こちらのアプリは、「自分が実際に使っていく中で欲しいと思ったものを開発していく」というテーマで作成しました。現在は
簡単なタスク管理アプリですが、将来的にPDCA日報のようなアプリに仕上げていくつもりでいます。
![目標立てたい!](https://user-images.githubusercontent.com/84382062/197946344-6a65bb18-65af-4fa7-9654-a4157d61b1ab.png)

具体的に欲しい機能としては
* 月、週、日のスケジューリング
* 一日にこなすタスクの目標設定
* 見通しと実際のタスク達成の振り返り
* 悩みに対する策の掲示板

エンジニアの業務をこなして地肉となった技術をアウトプットする手段として、LittleCompの開発を個人的にしていきたいと思っています。
![これ欲しい！](https://user-images.githubusercontent.com/84382062/197948046-1cfeb066-9e78-4a20-b051-3c40cf8f9333.png)

(今後実装したい機能に関してはこちらの書籍が良いインスピレーションを与えてくれました)

https://www.amazon.co.jp/%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%81%AE%E7%9F%A5%E7%9A%84%E7%94%9F%E7%94%A3%E8%A1%93-%E2%80%95%E5%8A%B9%E7%8E%87%E7%9A%84%E3%81%AB%E5%AD%A6%E3%81%B3%E3%80%81%E6%95%B4%E7%90%86%E3%81%97%E3%80%81%E3%82%A2%E3%82%A6%E3%83%88%E3%83%97%E3%83%83%E3%83%88%E3%81%99%E3%82%8B-WEB-PRESS-plus-ebook/dp/B07JFRF6MW/ref=sr_1_1?adgrpid=53431906556&gclid=Cj0KCQjwkt6aBhDKARIsAAyeLJ112vOvMEmX2MWG6jm_6hdXEP7e8HEszYCsIpHTDCgwGtlRAjROEdYaAvl4EALw_wcB&hvadid=618552905697&hvdev=c&hvlocphy=9053413&hvnetw=g&hvqmt=e&hvrand=4557717029985653798&hvtargid=kwd-484598975701&hydadcr=27264_14598071&jp-ad-ap=0&keywords=%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%81%AE%E7%9F%A5%E7%9A%84%E7%94%9F%E7%94%A3%E8%A1%93&qid=1666764671&qu=eyJxc2MiOiIxLjM0IiwicXNhIjoiMS4xMyIsInFzcCI6IjEuMDgifQ%3D%3D&sr=8-1
 https://www.amazon.co.jp/%E5%B0%8F%E3%81%95%E3%81%AA%E4%BC%9A%E7%A4%BE%E3%81%AE%E5%A3%B2%E4%B8%8A%E3%82%92%E5%80%8D%E5%A2%97%E3%81%95%E3%81%9B%E3%82%8B%E6%9C%80%E9%80%9FPDCA%E6%97%A5%E5%A0%B1-%E4%B8%AD%E5%8F%B8-%E7%A5%89%E5%B2%90/dp/4822289613/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=2EDVIUB6VBOU3&keywords=PDCA%E6%97%A5%E5%A0%B1&qid=1666764764&qu=eyJxc2MiOiIxLjQzIiwicXNhIjoiMS4wMSIsInFzcCI6IjAuOTcifQ%3D%3D&sprefix=pdca%E6%97%A5%E5%A0%B1%2Caps%2C226&sr=8-1
 
https://www.amazon.co.jp/%E7%B2%BE%E7%A5%9E%E7%A7%91%E5%8C%BB%E3%81%8C%E6%95%99%E3%81%88%E3%82%8B-%E6%AF%8E%E6%97%A5%E3%82%92%E6%A5%BD%E3%81%97%E3%82%81%E3%82%8B%E4%BA%BA%E3%81%AE%E8%80%83%E3%81%88%E6%96%B9-%E3%81%8D%E3%81%9A%E3%81%AA%E5%87%BA%E7%89%88-%E6%A8%BA%E6%B2%A2-%E7%B4%AB%E8%8B%91-ebook/dp/B09WMF2TV9/ref=sr_1_1?keywords=%E6%AF%8E%E6%97%A5%E3%82%92%E6%A5%BD%E3%81%97%E3%82%81%E3%82%8B%E4%BA%BA%E3%81%AE%E8%80%83%E3%81%88%E6%96%B9&qid=1666764824&qu=eyJxc2MiOiIxLjcyIiwicXNhIjoiMS4yNiIsInFzcCI6IjEuMDkifQ%3D%3D&sprefix=%E6%AF%8E%E6%97%A5%E3%82%92%2Caps%2C252&sr=8-1
