# BBINFO デザインルール

## 概要

- **フレームワーク**: Astro + React
- **スタイリング**: Tailwind CSS + カスタム CSS
- **アイコン**: Phosphor Icons
- **フォント**: Inter（英語）+ Noto Sans JP（日本語）
- **コンセプト**: ダークサイバーパンク × グラスモーフィズム

---

## カラーパレット

### ベースカラー

| 用途 | 値 |
|------|-----|
| 背景 | `#030303` |
| テキスト | `#ffffff` |

### ネオンアクセント

| 色 | 値 | 用途 |
|----|-----|------|
| Cyan | `#00f3ff` | メインアクセント |
| Purple | `#bc13fe` | サブアクセント |
| Pink | `#ff0055` | 強調・警告 |

### チャンネルカラー（セクション別）

| 色 | 値 | 用途 |
|----|-----|------|
| Blue | `#60a5fa` | BSチャンネル |
| Cyan | `#06b6d4` | 第1アクセント |
| Green | `#4ade80` | 第2アクセント |
| Purple | `#a855f7` | 第3アクセント |
| Pink | `#ec4899` | 第4アクセント |

### グラス（透過レイヤー）

| レベル | 値 |
|--------|-----|
| glass-100 | `rgba(255, 255, 255, 0.05)` |
| glass-200 | `rgba(255, 255, 255, 0.10)` （ボーダー用） |
| glass-300 | `rgba(255, 255, 255, 0.15)` |

### グレースケール

`#f3f4f6` / `#d1d5db` / `#6b7280` / `#4b5563`

---

## タイポグラフィ

### フォントスタック

```css
font-family: "Inter", "Noto Sans JP", sans-serif;
```

### ウェイト

| ウェイト | 値 |
|---------|-----|
| Regular | 400 |
| Medium | 500 |
| Semibold | 600 |
| Bold | 700 |
| Black | 900 |

### サイズ

Tailwind のデフォルトスケールを使用（`xs` 〜 `9xl`）。  
ヒーロー特大テキストは `11vw`。

---

## スペーシング

ベースユニット: **4px**（Tailwind デフォルト）

| 用途 | クラス |
|------|--------|
| セクションパディング | `py-24 px-6` |
| コンテナ最大幅 | `max-w-7xl mx-auto` |
| グリッドギャップ | `gap-4` / `gap-6` / `gap-8` |
| カード内パディング | `2rem` |

---

## レスポンシブブレークポイント

| 名前 | 幅 |
|------|----|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

---

## コンポーネントパターン

### グラスパネル (`.glass-panel`)

```css
background: rgba(10, 10, 10, 0.9);
border: 1px solid rgba(255, 255, 255, 0.08);
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
border-radius: 1.5rem;
```

ホバー時: 不透明度アップ・シャドウ強調・ボーダーグロー

### グローカード (`.glow-card-container`)

- 背景: `rgba(255, 255, 255, 0.1)`（ボーダーエフェクト用1px余白）
- ホバー: `translateY(-8px) scale(1.01)`
- ネオンボーダーアニメーション（`.glow-effect`）

### スタティックカード (`.static-card-container`)

- グローカードのアニメーションなし版
- 背景: `rgba(5, 5, 5, 0.95)`

### グラスヘッダー (`.glass-header`)

- 固定配置（`position: fixed`, `z-index: 50〜100`）
- グラスモーフィズムエフェクト
- `px-6 py-3 md:py-6`

### グラジエントボタン (`.gradient-button`)

- `@property` を使った CSS アニメーション
- ホバー時に5色グラジエントがアニメーション

### グラスインプット (`.glass-input`)

- 通常: `text-gray-300`
- フォーカス時: `text-white`

---

## ベントグリッド (`.bento-grid`)

| ブレークポイント | カラム数 |
|----------------|---------|
| モバイル | 1列 |
| タブレット以上 | 3列 |

スパンユーティリティ: `.col-span-2` / `.col-span-3` / `.row-span-2`

---

## アニメーション

### キーフレーム

| 名前 | 内容 | 時間 |
|------|------|------|
| `drop-in` | 上から降下して定位置へ | 2.4s |
| `float-vertical` | 上下フロート（無限） | 12s |
| `pulse-opacity` | 不透明度とブライトネスのパルス | 連続 |
| `luxury-border-flow` | グラジエントボーダーフロー | 4s 無限 |

### リビールアニメーション

```css
.reveal-up {
  opacity: 0;
  transform: translateY(30px);
}
.reveal-up.active {
  opacity: 1;
  transform: translateY(0);
  transition: 0.8s cubic-bezier(0.5, 0, 0, 1);
}
```

### よく使うトランジション時間

`200ms` / `300ms` / `400ms` / `700ms`

---

## z-index 体系

| 要素 | z-index |
|------|---------|
| ヒーロー背景 | -1 |
| メインコンテンツ | 10 |
| ナビゲーション | 50〜100 |
| モーダルオーバーレイ | 1000 |

---

## CSS カスタムプロパティ

### グラジエントボタン用

```
--rot-start, --rot-end       回転角
--pos-x, --pos-y             グラジエント位置
--spread-x, --spread-y       グラジエント広がり
--color-1 〜 --color-5       グラジエントカラー
```

### ボーダーグロー用

```
--border-angle
--border-color-1, --border-color-2
```

---

## ヒーロー背景シェイプ

5つのアニメーション付き幾何学シェイプ。

| 属性 | 値の範囲 |
|------|---------|
| サイズ | 200×60 〜 600×140 px |
| 回転 | -15° 〜 +20° |
| drop-in 遅延 | 0.2s 〜 1.0s |

---

## アクセシビリティ

- `aria-label` / `aria-expanded` / `aria-controls` / `aria-hidden` を適切に使用
- フォーカス: `focus-visible:outline-none` + ring ユーティリティ
- テキスト選択: `selection:bg-cyan-500 selection:text-white`
- 装飾要素には `pointer-events: none`

---

## パフォーマンス方針

- グリッドラッパーに `content-visibility: auto` + `contain-intrinsic-size`
- 画像は遅延読み込み + srcset
- Service Worker によるキャッシュ（PWA対応）
- ビューポート外セクションのデータフェッチは Intersection Observer で遅延

---

## 設計原則

1. 純黒背景のサイバーパンク美学
2. ネオンアクセント（cyan / purple / pink）で高コントラストを演出
3. グラスモーフィズムで奥行きと透明感を表現
4. ジオメトリックアニメーションでダイナミズムを付加
5. モバイルファーストのレスポンシブ設計
6. パフォーマンスを意識したレイアウト封じ込め
7. 日英バイリンガル対応タイポグラフィ
8. ラグジュアリー感のあるグラジエントボーダー・グローエフェクト
