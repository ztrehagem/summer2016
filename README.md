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

  - ファイルの変更を監視して自動コンパイル
  ```sh
  $ gulp watch
  ```

---

# APIs

- `GET` `/api/student/list.json`
- `POST` `/api/student/update.json`
- `GET` `/api/location/list.json`

- APIドキュメントあるらしい
