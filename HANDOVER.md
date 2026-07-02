# BBINFO India サイト引き継ぎ書

> **サイトURL:** https://bbinfoindia.com  
> **作成日:** 2026-07-02  
> **対象プロジェクト:** bbinfo-astro  

---

## 1. プロジェクト概要

インド在住の日本人向けに、日本のテレビ（地上波・BS・CS 66チャンネル）視聴サービスを提供する **BBINFO India** のコーポレートサイト。VPN機能付きセットトップボックスにより、Netflix・Amazon Prime・AbemaTV・TVerなどの日本の動画配信サービスも視聴可能。

**運営会社:** JCNET Communications Pvt. Ltd.  
**所在地:** 3rd Floor, Building No.17 (Beyond Designs Building), KH. No.382, M.G.Road, Sultanpur, New Delhi 110030  
**連絡先:** india@myslingtv.com / +91 9560054243  

---

## 2. 技術スタック

### 2.1 フレームワーク・コアランタイム

| 技術 | バージョン | 用途 |
|------|-----------|------|
| **Astro** | ^5.1.1 | SSG（Static Site Generator）。ビルド時にHTMLを生成 |
| **React** | ^19.2.4 | インタラクティブコンポーネント（Islands Architecture） |
| **TypeScript** | strict mode | 型安全性の確保 |
| **Node.js** | v20 | ビルド環境（Netlify指定） |

### 2.2 Astroインテグレーション

| パッケージ | バージョン | 用途 |
|-----------|-----------|------|
| `@astrojs/react` | ^4.4.2 | Reactコンポーネントのハイドレーション |
| `@astrojs/tailwind` | ^5.1.4 | Tailwind CSS統合 |
| `@astrojs/sitemap` | ^3.7.0 | sitemap.xml自動生成 |

### 2.3 スタイリング

| 技術 | バージョン | 備考 |
|------|-----------|------|
| **Tailwind CSS** | ^3.4.17 | ユーティリティファーストCSS |
| **Autoprefixer** | ^10.4.20 | ベンダープレフィックス自動付与 |
| カスタムCSS | - | `src/styles/global.css` にグラスモーフィズム・ネオン系エフェクト定義 |

### 2.4 フォント・アイコン

| リソース | 提供元 | 詳細 |
|---------|--------|------|
| **Noto Sans JP** | Google Fonts（リモート） | weight: 400, 500, 700, 900 / `display=optional` |
| **Inter** | Google Fonts（リモート） | weight: 400, 600 / 英字用 |
| **Phosphor Icons** | セルフホスト（`/fonts/phosphor/`） | woff2形式 / `font-display: swap` |
| `@fontsource/inter` | npm | フォールバック用 |
| `@fontsource/noto-sans-jp` | npm | フォールバック用 |

**Google Fonts読み込み最適化:**
- `preconnect` で `fonts.googleapis.com` / `fonts.gstatic.com` に事前接続
- `media="print"` + `onload` ハンドラによる非同期ロード（レンダリングブロック回避）

### 2.5 デザインシステム

詳細は `/DESIGN.md` に記載。主要な仕様:

- **コンセプト:** Dark Cyberpunk + Glassmorphism
- **背景色:** `#030303`（ニアブラック）
- **アクセントカラー:** Neon Cyan `#00f3ff` / Neon Purple `#bc13fe` / Neon Pink `#ff0055`
- **グラスレイヤー:** `rgba(255, 255, 255, 0.05〜0.15)`
- **CSSコンポーネント:** `.glass-panel`, `.glow-card-container`, `.glow-effect`, `.glass-header`, `.gradient-button`, `.glass-input`, `.reveal-up`, `.bento-grid`
- **アニメーション:** `drop-in`, `float-vertical`, `pulse-opacity`, `luxury-border-flow`（すべてCSSベース、外部ライブラリ不使用）

---

## 3. Web解析・計測ツール

### 3.1 Google Tag Manager (GTM)

| 項目 | 値 |
|------|-----|
| **コンテナID** | `GTM-T8FBH9BZ` |
| **実装ファイル** | `src/layouts/Layout.astro` |
| **読み込み方式** | 遅延読み込み（Deferred Loading） |

**遅延読み込みの仕組み:**
- ユーザーの最初のインタラクション（`mousemove`, `keydown`, `scroll`, `touchstart`, `click`）で発火
- または5秒間のアイドルタイムアウト後に自動発火
- `dataLayer` は GTMスクリプト読み込み前に `gtm.start` イベントで初期化
- `<noscript>` フォールバック: JavaScript無効環境向けGTM iframe

**GTM経由で管理されている可能性のあるタグ:**
- Google Analytics 4 (GA4)
- Google Ads コンバージョントラッキング
- その他のマーケティングタグ

> **注意:** GA4の設定はGTMコンテナ内で管理されているため、GA4のMeasurement IDやイベント設定はGTM管理画面（https://tagmanager.google.com）で確認する必要がある。サイトのソースコードにGA4の直接実装はない。

### 3.2 Microsoft Clarity

| 項目 | 値 |
|------|-----|
| **プロジェクトID** | `v5rvk99mct` |
| **実装ファイル** | `src/layouts/Layout.astro` |
| **読み込み方式** | GTMと同じ遅延読み込み |
| **管理画面** | https://clarity.microsoft.com |

**機能:**
- セッションレコーディング（ユーザー操作の録画再生）
- ヒートマップ（クリック・スクロール・移動）
- Dead Clicks / Rage Clicks の検出
- ファネル分析

### 3.3 Google Search Console

サイトのソースコード内にSearch Console関連のメタタグ（`google-site-verification`）は存在しない。以下のいずれかの方法で認証されている可能性がある:

- GTMコンテナ経由での認証
- Netlify DNS経由でのTXTレコード認証
- Google Analytics連携での自動認証

> **確認方法:** https://search.google.com/search-console にアクセスし、`bbinfoindia.com` のプロパティを確認。

### 3.4 その他のツール（未検出）

以下のツールはソースコード内に直接実装されていない（GTMコンテナ内で管理されている可能性あり）:

- Google Analytics 4 (GA4) — GTM経由の可能性大
- Google Ads — GTM経由の可能性あり
- Facebook Pixel — 未検出
- Hotjar — 未検出（Clarityで代替）
- Adobe Analytics — 未検出

---

## 4. ホスティング・デプロイ

### 4.1 Netlify

| 項目 | 値 |
|------|-----|
| **プラットフォーム** | Netlify |
| **ビルドコマンド** | `npm run build` |
| **パブリッシュディレクトリ** | `dist` |
| **Node.jsバージョン** | 20 |
| **設定ファイル** | `netlify.toml` |

### 4.2 セキュリティヘッダー（`public/_headers`）

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### 4.3 キャッシュ戦略

| 対象 | Cache-Control | 備考 |
|------|--------------|------|
| `/_astro/*`（JS/CSS） | `max-age=31536000, immutable` | コンテンツハッシュ付きファイル名 |
| `/images/*`, `/fonts/*` | `max-age=31536000, immutable` | 長期キャッシュ |
| `/favicon.*` | `max-age=86400` | 24時間 |
| HTML | `no-cache` | 常に最新を取得 |

### 4.4 CI/CD

- **自動デプロイパイプライン:** なし（GitHub ActionsやGitLab CI未設定）
- **デプロイ方式:** Netlify Git連携による自動デプロイ（mainブランチへのpushでトリガー）

---

## 5. フォーム・リードジェネレーション

### 5.1 無料体験申し込みフォーム

| 項目 | 値 |
|------|-----|
| **URL** | `/trial/` |
| **フォーム名** | `trial-form` |
| **送信先** | Netlify Forms |
| **送信後リダイレクト** | `/success/` |
| **メール件名** | `【無料体験】BBINFOサイトからのお申し込み` |

**収集フィールド:**

| フィールド | 必須 | 型 |
|-----------|------|-----|
| お名前（日本語） | ○ | text |
| お名前（アルファベット） | ○ | text |
| 電話番号 | ○ | tel |
| メールアドレス | ○ | email |
| ご住所 | ○ | textarea |
| 設置方法 | ○ | radio（出張設置/来店受取/郵送） |
| 設置希望日 | - | date |
| 設置希望時間 | - | select（10:00〜17:00、30分刻み） |
| LANケーブル長 | - | number + unit select |
| 紹介元 | ○ | checkbox（複数選択） |
| 備考 | - | textarea |

### 5.2 お問い合わせフォーム

| 項目 | 値 |
|------|-----|
| **URL** | `/contact/` |
| **フォーム名** | `contact-form` |
| **送信先** | Netlify Forms |
| **送信後リダイレクト** | `/complete/` |
| **メール件名** | `【お問い合わせ】BBINFOサイトから` |

**収集フィールド:**

| フィールド | 必須 | 型 |
|-----------|------|-----|
| お名前 | ○ | text |
| メールアドレス | ○ | email |
| 電話番号 | - | tel |
| お問い合わせカテゴリ | ○ | select |
| お問い合わせ内容 | ○ | textarea |

**カテゴリ選択肢:**
- サービスについて詳しく知りたい
- 初期設定に関して
- 視聴に関するトラブル
- お支払いに関して
- その他

### 5.3 フォーム送信データの確認方法

Netlify管理画面 → Forms → 該当フォーム名で確認可能。通知設定（メール転送）もNetlify管理画面から設定。

---

## 6. 外部サービス連携

### 6.1 Google Apps Script（ニュースフィード）

| 項目 | 値 |
|------|-----|
| **エンドポイント** | `https://script.google.com/macros/s/AKfycbxAobcVcpWMlQaCSainucdxNRZ-XjfqVDeqGfUMZMm6C0oib8wxmvuXZSoIppMnB7q19g/exec` |
| **実装ファイル** | `src/pages/index.astro` |
| **用途** | トップページのお知らせ（ニュース）データの取得 |
| **方式** | クライアントサイドfetch → DOM挿入 |

> **注意:** ニュースデータはGoogle Spreadsheetで管理され、GASのWeb APIを通じて配信されている。ニュースが表示されなくなった場合は、GASエンドポイントの疎通・Google Spreadsheetの内容を確認すること。

### 6.2 Google Maps Embed

- **表示ページ:** `/contact/`
- **表示内容:** オフィス所在地（Beyond Designs Building, New Delhi）
- **読み込み:** `loading="lazy"` による遅延読み込み
- **スタイル:** CSSダークフィルター適用

### 6.3 アプリストアリンク

- **iOS:** App Storeバッジ（`foot_download_ios.avif`）
- **Android:** Google Playバッジ（`foot_download_andr.avif`）
- リンク先はFooterコンポーネントで定義

---

## 7. SEO設定

### 7.1 メタタグ

| タグ | 値 | ファイル |
|------|-----|---------|
| `<title>` | ページごとにProps経由で設定 | `src/layouts/Layout.astro` |
| `<meta name="description">` | "インドで日本のテレビ（地上波・BS・CS 66チャンネル）が見られるBBINFO..." | 同上 |
| `<meta name="viewport">` | `width=device-width` | 同上 |
| charset | `utf-8` | 同上 |

### 7.2 サイトマップ

- **生成方法:** `@astrojs/sitemap` による自動生成
- **URL:** `https://bbinfoindia.com/sitemap-index.xml`
- **含まれるURL:** `/`, `/complete/`, `/contact/`, `/privacypolicy/`, `/success/`, `/TermsofService/`, `/trial/`

### 7.3 robots.txt

**明示的なrobots.txtは未設置。** Netlifyのデフォルト挙動に依存。必要に応じて `public/robots.txt` を追加すること。

### 7.4 構造化データ（JSON-LD）

**未実装。** 以下のスキーマの追加を推奨:
- `Organization` / `LocalBusiness`
- `FAQPage`（よくある質問がある場合）
- `Service`（サービス詳細）

### 7.5 OGP / Twitterカード

ソースコード内にOGPタグ（`og:title`, `og:description`, `og:image`）やTwitterカードタグの明示的な実装は確認されていない。SNS共有時のプレビュー表示を改善するためには追加が推奨される。

---

## 8. PWA（Progressive Web App）

| 項目 | 値 |
|------|-----|
| **Service Worker** | `public/sw.js` |
| **Webマニフェスト** | `public/site.webmanifest` |
| **アイコン** | 192x192, 512x512（`web-app-manifest-*.png`） |

**Service Workerキャッシュ戦略:**

| パターン | 戦略 | 対象 |
|---------|------|------|
| `/_astro/*`, `/images/*`, `/fonts/*`, `/favicon.*` | Cache-first | 静的アセット |
| `/`, `/trial/`, `/contact/`, `/privacypolicy/`, `/TermsofService/` | Network-first | HTMLページ |

---

## 9. サイト構成（ページ一覧）

| URL | ファイル | 行数 | 概要 |
|-----|---------|------|------|
| `/` | `src/pages/index.astro` | 1,343 | トップページ（サービス紹介・チャンネル一覧・料金・ニュース） |
| `/trial/` | `src/pages/trial.astro` | 464 | 無料体験申し込みフォーム |
| `/contact/` | `src/pages/contact.astro` | 305 | お問い合わせフォーム |
| `/success/` | `src/pages/success.astro` | - | 体験申し込み完了ページ |
| `/complete/` | `src/pages/complete.astro` | - | お問い合わせ完了ページ |
| `/privacypolicy/` | `src/pages/privacypolicy.astro` | 159 | プライバシーポリシー |
| `/TermsofService/` | `src/pages/TermsofService.astro` | 212 | 利用規約 |
| 404 | `src/pages/404.astro` | - | 404エラーページ |

---

## 10. ディレクトリ構成

```
bbinfo-astro/
├── astro.config.mjs           # Astro設定（site URL, インテグレーション）
├── tailwind.config.mjs        # Tailwind CSS設定（カスタムカラー・ブレークポイント）
├── tsconfig.json              # TypeScript設定（strict mode）
├── netlify.toml               # Netlifyデプロイ設定
├── package.json               # 依存パッケージ
├── DESIGN.md                  # デザインシステムドキュメント
├── src/
│   ├── layouts/
│   │   └── Layout.astro       # 共通レイアウト（GTM・Clarity・メタタグ・SW登録）
│   ├── components/
│   │   ├── Header.astro       # ナビゲーションヘッダー（レスポンシブ対応）
│   │   ├── Footer.astro       # フッター（会社情報・アプリDLリンク）
│   │   ├── ElegantShape.astro # 背景装飾アニメーション
│   │   └── shape-landing-hero.tsx  # React製ヒーローセクション装飾
│   ├── pages/                 # 全8ページ（上記参照）
│   └── styles/
│       └── global.css         # グローバルCSS（アニメーション・コンポーネント）
├── public/
│   ├── images/                # 画像アセット（AVIF/PNG/SVG/JPG）
│   ├── fonts/phosphor/        # Phosphorアイコンフォント（セルフホスト）
│   ├── _headers               # Netlifyセキュリティヘッダー
│   ├── sw.js                  # Service Worker
│   ├── site.webmanifest       # PWAマニフェスト
│   └── favicon.*              # ファビコン各種
└── dist/                      # ビルド出力（デプロイ対象）
```

---

## 11. パフォーマンス最適化

### 画像
- **AVIF形式** を主要フォーマットとして採用（JPEG比40〜50%軽量）
- `<picture>` + `srcset` によるレスポンシブ画像配信
- `loading="lazy"` / `fetchpriority="high"`（LCP画像）
- `width` / `height` 属性指定によるCLS（Cumulative Layout Shift）防止

### スクリプト
- GTM・Clarityの**遅延読み込み**（初回インタラクションまたは5秒後）
- インラインスクリプトのみ使用（外部JSバンドルなし）
- `requestAnimationFrame` によるアニメーション最適化

### CSS
- `inlineStylesheets: 'always'`（Astro設定）— CSSをHTMLにインライン化しレンダリングブロック排除
- GPU加速プロパティ（`transform`, `opacity`）によるアニメーション
- `content-visibility: auto` によるレイアウト計算の最適化

---

## 12. アクセシビリティ

- セマンティックHTML（適切な見出し階層）
- `aria-label`, `aria-expanded`, `aria-controls` による支援技術対応
- `aria-hidden="true"` で装飾要素をスクリーンリーダーから除外
- `:focus-visible` によるキーボードナビゲーションの視認性確保
- フォームラベルの適切な関連付け（`<label for="...">`）
- エラーメッセージのリアルタイム表示

---

## 13. 環境変数

**環境変数は未使用。** すべての設定値がソースコード内にハードコードされている:

- GTM ID: `GTM-T8FBH9BZ`（`src/layouts/Layout.astro`）
- Clarity ID: `v5rvk99mct`（同上）
- GAS API URL: ハードコード（`src/pages/index.astro`）
- サイトURL: `https://bbinfoindia.com`（`astro.config.mjs`）

`.env` / `.env.production` は `.gitignore` に含まれているが、テンプレートファイル（`.env.example`）は存在しない。

---

## 14. ビルド・開発コマンド

```bash
npm run dev       # ローカル開発サーバー起動
npm run build     # プロダクションビルド → /dist
npm run preview   # ビルド済みサイトのプレビュー
npm run astro     # Astro CLIの直接実行
```

---

## 15. 引き継ぎ時の注意事項

### 重要な依存関係

1. **Netlify Forms:** フォーム名（`trial-form`, `contact-form`）を変更するとデータ収集が途切れる。変更時はNetlify管理画面での再設定が必要。

2. **Google Apps Script:** ニュースフィードのAPIエンドポイントが外部依存。GASのデプロイ権限・Google Spreadsheetのアクセス権限を確認すること。

3. **GTMコンテナ:** GA4やその他のマーケティングタグはGTM管理画面（`GTM-T8FBH9BZ`）内で設定されている。サイトのソースコード変更だけでは計測設定を把握できない。

### 未実装・改善推奨事項

| 項目 | 優先度 | 詳細 |
|------|--------|------|
| robots.txt | 中 | 明示的なクロール制御ファイルの追加 |
| OGP / Twitterカード | 中 | SNS共有時のプレビュー最適化 |
| JSON-LD構造化データ | 中 | 検索結果のリッチスニペット対応 |
| .env.example | 低 | 環境変数テンプレートの作成（ID類の外部化） |
| CI/CDパイプライン | 低 | GitHub Actionsによるビルド・テスト自動化 |

### アカウント・管理画面一覧

| サービス | 管理URL | 備考 |
|---------|---------|------|
| GitHub | https://github.com/Osamuddin/bbinfo-astro | ソースコードリポジトリ |
| Netlify | https://app.netlify.com | ホスティング・フォーム・デプロイ |
| Google Tag Manager | https://tagmanager.google.com | コンテナID: GTM-T8FBH9BZ |
| Microsoft Clarity | https://clarity.microsoft.com | プロジェクトID: v5rvk99mct |
| Google Search Console | https://search.google.com/search-console | ドメイン: bbinfoindia.com |
| Google Apps Script | https://script.google.com | ニュースフィードAPI |

---

## 16. 権限移行チェックリスト

サイトの運用・管理を引き継ぐ際に必要な権限移行の手順を以下にまとめる。

### 16.1 GitHubリポジトリの権限移行（最重要）

**リポジトリ:** https://github.com/Osamuddin/bbinfo-astro  
**現オーナー:** `Osamuddin`

#### 方法A：リポジトリの所有権を完全移譲する（推奨）

サイトの管理から完全に手を引く場合に適している。

**手順:**
1. GitHub上でリポジトリページを開く
2. **Settings** > **General** > 画面最下部の **Danger Zone**
3. **「Transfer ownership」** をクリック
4. 移譲先のGitHubユーザーID（または組織名）を入力
5. 確認のためリポジトリ名を入力して移譲を実行

> **注意:** 移譲後、元のURLはリダイレクトされるが、Netlifyの連携設定（リポジトリURL）は手動で更新が必要な場合がある。

#### 方法B：共同管理者（Collaborator）として追加する

今後も自分自身がリポジトリに関わる可能性がある場合に適している。

**手順:**
1. リポジトリの **Settings** > **Collaborators**
2. **「Add people」** から相手のGitHubユーザーIDを検索して追加
3. 権限レベルを **「Admin（管理者）」** に設定（フル権限が必要な場合）

| 権限レベル | できること |
|-----------|-----------|
| Read | コードの閲覧のみ |
| Write | コードのpush、Issue/PR作成 |
| Maintain | ブランチ保護ルールの管理、リリース作成 |
| **Admin** | リポジトリ設定の変更、Collaborator管理、削除 |

### 16.2 Netlify（ホスティング）の権限移行

Netlifyはリポジトリと連携して自動デプロイを行っているため、リポジトリの移譲とあわせて対応が必要。

#### 方法A：Netlifyチームメンバーとして招待

**手順:**
1. https://app.netlify.com にログイン
2. **Team settings** > **Members** > **「Invite members」**
3. 相手のメールアドレスを入力し、**「Owner」** 権限で招待
4. 招待完了後、必要に応じて旧オーナーの権限を削除

#### 方法B：新規Netlifyアカウントで再セットアップ

相手が自分のNetlifyアカウントで管理したい場合:

1. 相手がNetlifyアカウントを作成
2. GitHubリポジトリを新規サイトとしてインポート
3. ビルド設定を `netlify.toml` の通りに設定（通常は自動検出）
4. カスタムドメイン（`bbinfoindia.com`）のDNS設定を新サイトに向け替え
5. **旧サイトのフォーム送信データは移行不可** — 必要なら事前にCSVエクスポート

> **重要:** Netlify Formsの送信データ（無料体験申し込み・お問い合わせ）は旧サイトに紐づく。移行前に **Forms > Export** でバックアップを取ること。

### 16.3 ドメイン管理の移行

`bbinfoindia.com` のドメイン管理サービス（お名前.com、GoDaddy、Google Domains等）のアカウント権限を移譲する。

**確認事項:**
- ドメインレジストラの特定（Netlify DNS、外部レジストラのいずれか）
- ネームサーバー設定（Netlifyのネームサーバーを使用しているか）
- SSL証明書（Netlifyの自動Let's Encrypt証明書を使用している場合は移行時に自動再発行）
- ドメインの自動更新設定と有効期限

**手順（一般的なレジストラの場合）:**
1. ドメイン管理画面でドメインロック（Transfer Lock）を解除
2. Auth Code（認証コード）を取得
3. 相手のレジストラアカウントからドメイン移管を申請
4. メール認証で移管を承認

### 16.4 Google関連サービスの権限移行

#### Google Tag Manager（GTM-T8FBH9BZ）

**手順:**
1. https://tagmanager.google.com にログイン
2. 対象コンテナ（`GTM-T8FBH9BZ`）を選択
3. **管理** > **コンテナの設定** > **ユーザー管理**
4. 相手のGoogleアカウントを **「管理者」** 権限で追加

> GTMコンテナ内にGA4・Google Ads等のタグが設定されている場合、それらのサービスの権限も別途移行が必要。

#### Google Analytics 4（GA4）※GTM経由で設定されている場合

**手順:**
1. https://analytics.google.com にログイン
2. **管理** > **アカウントのアクセス管理**
3. 相手のGoogleアカウントを **「管理者」** 権限で追加

#### Google Search Console

**手順:**
1. https://search.google.com/search-console にログイン
2. 対象プロパティ（`bbinfoindia.com`）を選択
3. **設定** > **ユーザーと権限**
4. 相手のGoogleアカウントを **「オーナー」** として追加

#### Google Apps Script（ニュースフィードAPI）

**手順:**
1. https://script.google.com にログイン
2. ニュースフィード用のGASプロジェクトを開く
3. **共有** > 相手のGoogleアカウントを **「編集者」** として追加
4. 紐づくGoogle Spreadsheet（ニュースデータソース）も同様に共有
5. GASのWebアプリデプロイ設定で、実行ユーザーの変更が必要な場合は再デプロイ

### 16.5 Microsoft Clarity（v5rvk99mct）

**手順:**
1. https://clarity.microsoft.com にログイン
2. 対象プロジェクトを選択
3. **Settings** > **Team**
4. 相手のMicrosoftアカウント（またはメールアドレス）を **「Admin」** 権限で追加

### 16.6 環境変数・秘密情報の共有

本プロジェクトでは環境変数は使用されておらず、すべてのID・URLがソースコード内にハードコードされているため、リポジトリの移譲で自動的に引き継がれる。

ただし、以下の情報はコード外で管理されているため、**安全な手段（パスワードマネージャー、暗号化メッセージ等）で直接共有**すること:

| 情報 | 共有方法 |
|------|---------|
| Netlifyアカウントのログイン情報 | パスワードマネージャーまたは招待 |
| Google系サービスのアカウント情報 | Googleアカウント招待 |
| ドメインレジストラのログイン情報 | パスワードマネージャーまたは移管 |
| Clarityアカウントのログイン情報 | Microsoftアカウント招待 |

> **セキュリティ注意:** パスワードをメールやチャットの平文で送信しないこと。1PasswordやBitwardenなどのパスワードマネージャーの共有機能を推奨。

### 16.7 フォーム通知先の変更

Netlify Formsの送信通知メールアドレスを引き継ぎ先に変更する:

1. Netlify管理画面 > **Site configuration** > **Forms** > **Form notifications**
2. 既存の通知先メールアドレスを引き継ぎ先のアドレスに変更
3. 対象フォーム: `trial-form`（無料体験）、`contact-form`（お問い合わせ）

### 16.8 権限移行チェックリスト（まとめ）

移行完了を確認するためのチェックリスト:

- [ ] **GitHub:** リポジトリのAdmin権限を付与（または所有権移譲）
- [ ] **Netlify:** チームメンバーとしてOwner権限で招待
- [ ] **ドメイン:** レジストラアカウントの権限移譲（またはドメイン移管）
- [ ] **GTM:** コンテナの管理者権限を付与（`GTM-T8FBH9BZ`）
- [ ] **GA4:** アカウントの管理者権限を付与
- [ ] **Search Console:** オーナー権限を付与
- [ ] **Clarity:** プロジェクトのAdmin権限を付与
- [ ] **GAS:** スクリプトとSpreadsheetの編集権限を付与
- [ ] **フォーム通知:** 送信通知先メールアドレスの変更
- [ ] **Netlify Forms:** 過去の送信データのCSVエクスポート・バックアップ
- [ ] **ドキュメント:** 本引き継ぎ書（HANDOVER.md）の共有・確認

---

## 17. 技術サマリー

```
フレームワーク:     Astro 5 (SSG) + React 19
スタイリング:       Tailwind CSS 3 + カスタムCSS（グラスモーフィズム）
言語:              TypeScript (strict)
ホスティング:       Netlify
フォーム:           Netlify Forms
解析:              GTM → GA4（推定） / Microsoft Clarity
ニュースCMS:       Google Spreadsheet + Google Apps Script
画像フォーマット:   AVIF (主) + PNG/JPG (フォールバック)
フォント:          Noto Sans JP + Inter (Google Fonts) / Phosphor Icons (セルフホスト)
PWA:               Service Worker + Web App Manifest
SEO:               Sitemap自動生成 / メタタグ / robots.txt未設置
```
