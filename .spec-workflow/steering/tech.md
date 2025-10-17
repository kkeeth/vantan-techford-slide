# Technology Stack

## Project Type
教育用 Web アプリケーション（静的サイトジェネレーター + React デモアプリ）
- Slidev ベースのスライドプレゼンテーションシステム
- React + TypeScript ベースの実践的デモアプリケーション群

## Core Technologies

### Primary Language(s)
- **Language**: TypeScript (TSConfig ベース), JavaScript (ES Modules)
- **Runtime**: Node.js 24.0.1 (Volta による管理)
- **Package Manager**: pnpm 9.12.2

### Key Dependencies/Libraries

#### Slidev (スライドシステム)
- **@slidev/cli**: 52.1.0 - Markdown ベースのスライドプレゼンテーション
- **@slidev/theme-default**: latest - デフォルトテーマ
- **@slidev/theme-apple-basic**: ^0.25.1 - Apple スタイルテーマ
- **@slidev/theme-bricks**: ^0.25.0 - Bricks テーマ
- **@slidev/theme-seriph**: ^0.25.0 - Seriph テーマ

#### React Ecosystem (デモアプリ)
- **React**: ^18.3.1 ~ ^19.1.1 - UI ライブラリ
- **React DOM**: ^18.3.1 ~ ^19.1.1
- **TypeScript**: ^5.9.2 ~ ^5.9.3

#### UI Frameworks & Libraries (チャットアプリ)
- **Material-UI (MUI)**: ^7.3.2 - コンポーネントライブラリ
- **@emotion/react**: ^11.14.0 - CSS-in-JS
- **@emotion/styled**: ^11.14.1

#### Backend/Database (チャットアプリ)
- **Firebase**: ^11.10.0 - 認証・データベース
- **Dexie**: ^4.2.0 - IndexedDB ラッパー

#### Build Tools
- **Vite**: ^5.4.20 ~ ^7.1.5 - 高速ビルドツール & 開発サーバー
- **@vitejs/plugin-react**: ^4.7.0 ~ ^5.0.2

#### Code Quality
- **ESLint**: ^9.35.0 - コード品質チェック
- **eslint-plugin-react**: ^7.37.5
- **eslint-plugin-react-hooks**: ^5.2.0
- **eslint-plugin-react-refresh**: ^0.4.20

### Application Architecture
- **スライドシステム**: 静的サイトジェネレーション (Slidev)
- **デモアプリ**: コンポーネントベース (React SPA)
- **モジュール構造**: 独立した複数プロジェクト (モノリポジック構成)

### Data Storage
- **スライド**: Markdown ファイル (`slides/*.md`)
- **デモアプリ (チャット)**:
  - Firebase Firestore (クラウドデータベース)
  - IndexedDB (ローカルキャッシュ/オフライン対応)
- **静的アセット**: 画像・リソースファイル (`assets/[lesson-number]/`)

### External Integrations
- **Firebase Services**:
  - Authentication (認証)
  - Firestore Database (データベース)
  - Cloud Storage (ファイルストレージ)
- **Protocols**: HTTP/HTTPS, WebSocket (Firebase Realtime)

## Development Environment

### Build & Development Tools
- **Build System**:
  - `build.sh` - 全スライドビルド用シェルスクリプト
  - Vite - デモアプリビルド
  - `rimraf` - クロスプラットフォームのディレクトリ削除
- **Package Management**: pnpm (ワークスペース管理)
- **Development Workflow**:
  - Slidev: `slidev --open` (ホットリロード)
  - Demo Apps: `vite` (HMR 対応)

### Code Quality Tools
- **Static Analysis**: ESLint 9.x (Flat Config)
- **Formatting**: (明示的なツールなし - ESLint ルールによる)
- **Type Checking**: TypeScript Compiler (`tsc`)
  - `tsc -b` (プロジェクトリファレンス)
  - `tsc --noEmit` (型チェックのみ)
- **Testing Framework**: (現在未実装)

### Version Control & Collaboration
- **VCS**: Git
- **Branching Strategy**: main ブランチベース
- **Hosting Platform**: Vercel (自動デプロイ)

### Dashboard Development
- **Live Reload**: Slidev ネイティブサポート (Vite ベース)
- **Port Management**: デフォルトポート使用
- **Multi-Instance Support**: 各スライドを個別に開発可能

## Deployment & Distribution

### Target Platform
- **Web Platform**: 静的 HTML/CSS/JS (SPA)
- **Hosting**: Vercel
- **CDN**: Vercel Edge Network

### Distribution Method
- **アクセス方法**: 公開 URL 経由 (https://[project-name].vercel.app)
- **ビルド出力**: `dist/` ディレクトリ (スライド), `docs/` ディレクトリ (デモアプリ)

### Deployment Process
1. Git push to main branch
2. Vercel 自動ビルド & デプロイ
3. Vercel.json によるリダイレクト設定適用

## Technical Requirements & Constraints

### Performance Requirements
- スライド読み込み時間: < 2秒
- デモアプリ初回読み込み: < 3秒
- インタラクティブ性: 即座に反応 (60fps)

### Compatibility Requirements
- **Browser Support**: モダンブラウザ (Chrome, Firefox, Safari, Edge 最新版)
- **Node.js Version**: 24.0.1 (Volta 管理)
- **TypeScript Version**: ^5.9.x
- **React Version**: ^18.3.1 ~ ^19.1.1

### Security & Compliance
- **Firebase Security Rules**: Firestore セキュリティルール適用
- **HTTPS 強制**: Vercel により自動適用
- **環境変数**: Firebase 設定は環境変数で管理

### Scalability & Reliability
- **Expected Load**: 受講生数 (数十〜数百人/年)
- **Availability**: Vercel SLA に依存 (99.9%)
- **Growth Projections**: カリキュラム拡張に伴うスライド追加

## Technical Decisions & Rationale

### Decision Log

1. **Slidev 採用**: Markdown ベースでコンテンツ作成が容易，プログレッシブディスクロージャー機能 (`<v-clicks>`, `{all|1-2|...}`) が教育用途に最適
2. **複数テーマ対応**: `seriph`, `apple-basic`, `bricks` など複数テーマを用意し，レッスンごとに最適なデザインを選択可能
3. **Vite ビルドツール**: 高速な開発体験，HMR サポート，React + TypeScript との統合が簡単
4. **pnpm パッケージマネージャー**: ディスク容量効率，厳密な依存関係管理，モノレポ的な構成に適している
5. **Vercel ホスティング**: Git 連携による自動デプロイ，高速 CDN，無料枠で十分，`vercel.json` によるリダイレクト設定
6. **Firebase (チャットアプリ)**: リアルタイムデータベース，認証が容易，学習コストが低く教育用途に最適
7. **Material-UI v7**: React コンポーネントライブラリとして成熟，TypeScript サポート充実，モダンなデザイン
8. **Dexie (チャットアプリ)**: IndexedDB のラッパーライブラリ，オフライン対応とローカルキャッシュに活用
9. **Node.js 24.0.1 (Volta 管理)**: 最新の LTS 版ではなく特定バージョンを固定し，チーム開発での環境統一を実現

## Known Limitations

- **テスト未実装**: ユニットテスト・E2E テストが未整備（Jest, Vitest, React Testing Library などの導入が必要）
- **カリキュラムの不整合**: `typescript-react-curriculum.md` と実際のスライド（`index.html`）が乖離
- **ビルドスクリプトの手動管理**: `build.sh` でスライド番号をハードコーディング（新規レッスン追加時に手動更新必須）
- **スライドの欠番**: #3, #6-10, #13 などが `slides/` ディレクトリに存在しない（他のレッスンでカバーされている可能性）
- **アクセシビリティ**: WCAG 準拠の明示的な検証なし
- **多言語対応**: 日本語のみ（英語版スライドは未実装）
- **React バージョンの不統一**: デモアプリごとに React 18.x と 19.x が混在
