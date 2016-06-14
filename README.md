# 環境構築

- npmをインストール(無ければ)
```sh
$ brew install npm
```

- gulpをインストール(無ければ)
```sh
$ npm install -g gulp
```

- プロージェクトルートで
```sh
$ npm install
```

---

# 開発時に使うコマンド
- ソースファイルをコンパイル
  - 全部一回コンパイル
```sh
$ gulp
```

  - ファイルの変更を監視して自動コンパイル (^Cで終了)
```sh
$ gulp watch
```
  もしくは
```sh
$ gulp w
```

  - サーバー起動 (^Cで終了)
```sh
$ gulp sever
```
  もしくは
```sh
$ gulp s
```

---

# APIs

- `GET` `/api/student/list.json`
- `POST` `/api/student/update.json`
  - `{"id":id, "location":location}`
- `GET` `/api/location/list.json`

- APIドキュメントあるらしい
