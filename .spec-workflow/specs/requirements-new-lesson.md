# Requirements Document: 新規レッスンスライド追加

## Introduction

このドキュメントは，新しいレッスン用のスライドを追加する際の要件を定義します．KADOKAWA ドワンゴ情報工科学院 専門部の TypeScript + React ハンズオン講座のカリキュラムに新しいレッスンを追加し，受講生が段階的に学習できる環境を提供することを目的としています．

## Alignment with Product Vision

このドキュメントは `product.md` に記載されたプロダクトビジョンに沿っています：
- **段階的学習**: 複雑な概念を小さなステップに分割し，段階的に理解を深める
- **実践重視**: すべての学習内容に対応する実際のコードとデモアプリを提供
- **一貫性**: コーディング規約，スライド構成，UI/UX パターンの統一（`CLAUDE.md` に準拠）

## Requirements

### Requirement 1: スライドファイルの作成

**User Story:** 講師として，新しいレッスンのスライドを作成したいので，Slidev の Markdown 形式で構造化されたコンテンツを提供する

#### Acceptance Criteria

1. WHEN 新規スライドを作成する THEN スライドファイルは `slides/[レッスン番号].md` に配置される SHALL
2. WHEN スライドを作成する THEN frontmatter に以下の必須項目が含まれる SHALL
   - `theme`: 使用するテーマ（seriph, apple-basic, bricks など）
   - `title`: レッスンタイトル
   - `highlighter`: shiki
   - `lineNumbers`: false または true
3. WHEN スライドを作成する THEN `CLAUDE.md` のルールに従う SHALL
   - コードブロックは22行以内
   - 22行を超える場合は2カラムレイアウト（`<div grid="~ cols-2 gap-4">`）
   - diff 形式の適切な使用
   - `<v-clicks>` はコードブロック以外で使用しない
   - 句読点は半角の `.` と `,`
   - アルファベットと日本語の間に半角スペース

### Requirement 2: 静的アセットの管理

**User Story:** 講師として，スライドで使用する画像やリソースを整理したいので，レッスンごとに専用のディレクトリを用意する

#### Acceptance Criteria

1. WHEN 新規レッスンを作成する THEN `assets/[レッスン番号]/` ディレクトリが作成される SHALL
2. WHEN 画像を追加する THEN ファイルパスは `/assets/[レッスン番号]/[ファイル名]` で参照される SHALL
3. WHEN アセットを追加する THEN 画像は適切なサイズに最適化される SHOULD（ページ読み込み速度向上のため）

### Requirement 3: ビルドプロセスへの統合

**User Story:** 開発者として，新しいスライドを本番環境にデプロイしたいので，ビルドスクリプトに追加する

#### Acceptance Criteria

1. WHEN 新規スライドを追加する THEN `build.sh` に該当レッスン番号のビルドコマンドが追加される SHALL
   - 例: `cp slides/[N].md ./ && slidev build -o dist/[N] --base /[N]/ [N].md && rm [N].md`
2. WHEN ビルドを実行する THEN `dist/[N]/` ディレクトリにビルド成果物が出力される SHALL
3. WHEN Vercel にデプロイする THEN `vercel.json` にリダイレクト設定が追加される SHALL
   - 例: `{ "source": "/[N]/:path", "destination": "/[N]/" }`

### Requirement 4: ポータルサイト（index.html）の更新

**User Story:** 受講生として，新しいレッスンにアクセスしたいので，TOP ページに新しいレッスンへのリンクが表示される

#### Acceptance Criteria

1. WHEN 新規レッスンを追加する THEN `index.html` の授業用資料リストに新しいエントリが追加される SHALL
2. WHEN リストアイテムを追加する THEN 以下の情報が含まれる SHALL
   - レッスン番号（`<span class="font-bold">#[N]</span>`）
   - レッスンタイトル（`<p class="w-3/5">[タイトル]</p>`）
   - リンクボタン（`<a href="/[N]">`）
3. WHEN 前期/後期の区分がある THEN 適切なセクションに配置される SHALL

### Requirement 5: デモアプリケーションの追加（オプション）

**User Story:** 講師として，レッスンで使用する実践的なデモアプリを提供したいので，React + TypeScript で構築されたアプリケーションを追加する

#### Acceptance Criteria

1. WHEN デモアプリを追加する THEN `assets/[app-name]/` ディレクトリが作成される SHALL
2. WHEN デモアプリを作成する THEN 以下のファイルが含まれる SHALL
   - `package.json`: 依存関係とビルドスクリプト
   - `vite.config.ts`: Vite 設定
   - `src/`: ソースコード
   - `tsconfig.json`: TypeScript 設定
3. WHEN ビルドスクリプトを定義する THEN `package.json` の `build` コマンドで `dist/` を `../../docs/[app-name]/` に移動する SHALL
   - 例: `"build": "vite build && rm -rf ../../docs/[app-name] && mv dist ../../docs/[app-name]"`
4. WHEN デモアプリを作成する THEN `CLAUDE.md` の TypeScript ルールに従う SHALL
   - `type` を優先（`interface` を避ける）
   - 配列は `{}[]` 形式
   - `React.FC` を使用しない
   - Props 型は別途定義

## Non-Functional Requirements

### Code Architecture and Modularity
- **Single Responsibility Principle**: 各スライドファイルは1つのレッスンに集中
- **Modular Design**: デモアプリは独立して動作可能
- **Dependency Management**: スライド間の依存関係を最小化
- **Clear Interfaces**: スライド内のコード例は明確なインターフェイス定義を持つ

### Performance
- **スライド読み込み時間**: 各スライドの初回読み込みは 2秒以内 SHOULD
- **ビルド時間**: 全スライドのビルドは 5分以内 SHOULD
- **画像最適化**: 画像は WebP または最適化された JPEG/PNG を使用 SHOULD

### Security
- **環境変数**: Firebase などの API キーは環境変数で管理 SHALL
- **依存関係**: npm パッケージは定期的に脆弱性チェック SHOULD

### Reliability
- **ビルドの冪等性**: 同じソースから何度ビルドしても同じ結果が得られる SHALL
- **エラーハンドリング**: ビルドエラーは明確なメッセージで報告される SHALL

### Usability
- **一貫性**: すべてのスライドは統一されたデザインとレイアウト SHALL
- **アクセシビリティ**: コントラスト比とフォントサイズは読みやすさを考慮 SHOULD
- **ナビゲーション**: スライド内のナビゲーションは直感的 SHALL

### Maintainability
- **ドキュメント**: 各スライドの frontmatter に `info` フィールドでレッスン概要を記載 SHOULD
- **コメント**: 複雑なコード例にはインラインコメントを追加 SHOULD
- **バージョン管理**: Git によるバージョン管理 SHALL
