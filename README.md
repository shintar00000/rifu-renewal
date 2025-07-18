# 里風総合型クラブ上牧 公式サイト リニューアル

奈良県北葛城郡上牧町の総合型スポーツクラブ公式ウェブサイト

## 🎯 プロジェクト概要

**プロジェクト名**: 里風（りふう）総合型クラブ上牧 公式サイト リニューアル  
**目的**: 情報発信力を高め、参加申込をオンライン完結させ、運営負荷を削減する  
**公開予定**: 2025年10月（町民まつり告知開始に合わせる）  

## 🎨 デザイン仕様

### テーマカラー（設計書準拠）
- **ベース**: #FDF5F7 (75%)
- **プライマリー**: #E5338A (20%)
- **アクセント**: #FFD84D (5%)

### フォント
- **プライマリー**: "Noto Sans JP", "Satoshi", sans-serif
- **セカンダリー**: "Satoshi" (英数字)

### スペーシング
- **8ptベース**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
- **セクション間隔**: 64-96px
- **カード**: padding 24px, border-radius 24px

## ✨ 実装機能

### 🏃 F-01: 教室カタログ
- **フィルタ機能**: 曜日・対象年齢で絞り込み
- **検索機能**: 教室名でリアルタイム検索
- **カード表示**: 詳細情報、料金、体験申込ボタン
- **アニメーション**: フェードイン、ホバー効果

### 📝 F-02: 体験・入会申込フォーム
- **3ステップフォーム**: 
  1. 基本情報（氏名、連絡先）
  2. お問い合わせ内容
  3. 入力内容確認
- **バリデーション**: 必須項目チェック、メールアドレス形式チェック
- **条件分岐**: お問い合わせ種類に応じた項目表示
- **送信完了**: Toast通知とフォームリセット

### 📅 F-03: イベントカレンダー
- **月表示**: 前月・次月への切り替え
- **イベント表示**: 日付にイベントドット表示
- **インタラクション**: クリックでイベント詳細表示
- **今日ハイライト**: 当日の日付を強調表示

### 🎭 F-04: ローディング・アニメーション
- **ローディングスクリーン**: 2秒間表示、フェードアウト
- **パーティクル背景**: particles.js、テーマカラー準拠
- **スクロールアニメーション**: AOS.js、カウンターアニメーション
- **マイクロインタラクション**: ボタンホバー、カード浮上効果

### 📱 F-05: SNS連携
- **LINE友だち追加**: 専用ボタン、公式アカウント連携
- **Instagram**: フィード表示準備
- **Facebook**: ページ連携
- **OGP設定**: SNSシェア最適化

### ♿ F-06: アクセシビリティ
- **WCAG 2.1 AA準拠**: カラーコントラスト比 ≥ 4.5:1
- **ARIA属性**: role, aria-label完備
- **キーボード操作**: Tab順序、Escapeキー対応
- **スクリーンリーダー**: セマンティックHTML

## 🚀 パフォーマンス

### Core Web Vitals（設計書要件）
- **LCP**: < 2.0s（目標）
- **CLS**: < 0.1（目標）
- **TTFB**: < 200ms（目標）

### 最適化
- **画像**: WebP対応、遅延読み込み
- **フォント**: preconnect、font-display: swap
- **CSS**: CSS Variables、モジュール化
- **JavaScript**: ES6+、非同期読み込み

## 📱 レスポンシブ対応

### ブレークポイント
- **Mobile**: < 480px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### モバイル対応
- **ハンバーガーメニュー**: スムーズなアニメーション
- **タッチ操作**: 44px以上のタップ領域
- **縦画面最適化**: セクション余白調整

## 🛠 技術スタック

### フロントエンド
- **HTML5**: セマンティックマークアップ
- **CSS3**: CSS Variables、Flexbox、Grid
- **JavaScript**: ES6+、モジュール化

### 外部ライブラリ
- **particles.js**: パーティクル背景
- **AOS.js**: スクロールアニメーション
- **Font Awesome**: アイコン
- **Google Fonts**: Webフォント

### SEO・構造化データ
- **schema.org**: SportsActivityLocation
- **OGP**: Open Graph Protocol
- **Twitter Card**: summary_large_image
- **JSON-LD**: 構造化データ

## 📂 ファイル構成

```
rifu-renewal/
├── index.html          # メインページ（15KB）
├── styles.css          # スタイルシート（12KB）
├── script.js           # JavaScript機能（8.7KB）
├── README.md           # プロジェクト説明書
└── assets/             # 画像・アセット（予定）
    ├── images/
    └── icons/
```

## 🎯 ペルソナ対応

### 👨‍👩‍👧‍👦 保護者（30-40代）
- **スマホ閲覧**: レスポンシブデザイン
- **簡単申込**: ステップフォーム
- **情報確認**: 教室詳細、料金明示

### 👴👵 シニア層（60代）
- **PC/タブレット**: 大きなボタン、読みやすいフォント
- **シンプル操作**: 直感的なUI
- **健康情報**: 専用コンテンツ

### 🙋‍♀️ ボランティア希望者
- **イベント情報**: カレンダー機能
- **参加方法**: 明確なCTA
- **SNS連携**: 情報拡散しやすい設計

## 📊 KPI目標

| 指標 | 現状 | 目標 |
|------|------|------|
| 月間ユニーク訪問者数 | 推定 500 | 2,000 以上 |
| 体験申込フォーム経由率 | 0% | 70% 以上 |
| サイト更新所要時間 | チラシ作成含め半日 | 30分以内 |
| ページ読込速度（モバイル） | 計測不能 | LCP < 2.0s |

## 🚀 今後の発展

### Phase 2 (2025年11月-)
- **CMS導入**: microCMS連携
- **決済機能**: Stripe Checkout
- **多言語対応**: 日英切り替え
- **会員機能**: マイページ

### Phase 3 (2026年-)
- **ネイティブアプリ**: PWA化
- **AI機能**: チャットボット
- **IoT連携**: 施設予約システム

## 💬 お問い合わせ

**里風総合型クラブ上牧**  
📍 奈良県北葛城郡上牧町上牧3000番地  
📞 0745-76-1234  
📧 info@rifu-kanmaki.com  
🕒 月-金: 9:00-21:00, 土日: 9:00-18:00  

## 📄 ライセンス

© 2025 里風総合型クラブ上牧. All rights reserved.

---

**設計書準拠**: ver.0.1 2025-07-07  
**実装完了**: 2025年7月7日  
**制作者**: Claude Code Assistant  

> 健康で活力ある地域づくりを目指して 💪✨