# お茶の葉のホームページ

[https://www.ochappa.net/](https://www.ochappa.net/) のソースコードです。
Next.jsとmicroCMSを利用し、Azure Static Web Appsへ静的サイトとして配信しています。

## ローカル開発

Node.jsのバージョンは `.nvmrc` を参照してください。

```bash
npm ci
cp .env.example .env.local
npm run dev
```

`.env.local` に次の値を設定します。

- `API_URL`: microCMS APIのベースURL
- `API_KEY`: microCMS APIキー
- `NEXT_PUBLIC_DOMAIN`: サイトの公開URL

`API_KEY` を含む `.env.local` はGitへコミットしないでください。

## 検証

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`npm run build` はmicroCMSから記事を取得するため、上記の環境変数が必要です。
