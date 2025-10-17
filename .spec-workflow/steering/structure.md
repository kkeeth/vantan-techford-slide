# Project Structure

> **Note**: For comprehensive strategic decisions and rationale, see [main.md](./main.md) - the master steering document.

## Directory Organization

```
vantan-techford-slide/
├── slides/                         # スライドの素となる Markdown ファイル
│   ├── 1.md                        # レッスン1: 開発環境とTypeScript基礎
│   ├── 2.md                        # レッスン2: TypeScript応用
│   ├── 4.md                        # レッスン4: React状態管理（基礎）
│   ├── 5.md                        # レッスン5: React状態管理（応用）
│   ├── 11.md                       # レッスン11: 認証とアクセス制御
│   ├── 12.md                       # レッスン12: プロジェクト作成とデプロイ
│   ├── 14.md                       # レッスン14: アニメーションとインタラクション
│   ├── 15.md                       # レッスン15: テストとデバッグ
│   ├── 16.md                       # レッスン16: パフォーマンス最適化
│   ├── 17.md                       # レッスン17: Next.js (I)
│   ├── 18.md                       # レッスン18: Next.js (II)
│   ├── 19.md                       # レッスン19: GraphQL
│   ├── 20.md                       # レッスン20: 状態管理応用パターン
│   └── 2024_JS/                    # 旧カリキュラムのスライド (アーカイブ)
│
├── assets/                         # 各レッスンの静的ファイルとデモアプリ
│   ├── 1/                          # レッスン1用の画像・リソース
│   ├── 2/                          # レッスン2用の画像・リソース
│   ├── 4/                          # レッスン4用の画像・リソース
│   ├── 7/                          # レッスン7用の画像・リソース
│   ├── 8/                          # レッスン8用の画像・リソース
│   ├── 9/                          # レッスン9用の画像・リソース
│   ├── 10/                         # レッスン10用の画像・リソース
│   ├── 11/                         # レッスン11用の画像・リソース
│   ├── 12/                         # レッスン12用の画像・リソース
│   ├── 20/                         # レッスン20用の画像・リソース
│   │
│   ├── todo-app/                   # Todoアプリ (React + TypeScript)
│   │   ├── src/                    # ソースコード
│   │   ├── package.json            # 依存関係
│   │   └── vite.config.ts          # Vite設定
│   │
│   ├── poke-search-ts/             # ポケモン検索アプリ (TypeScript版)
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   ├── chat/                       # チャットアプリ (Firebase + MUI)
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── homepage/                   # ホームページデモアプリ
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
│
├── docs/                           # ビルド後のデモアプリ (Webデプロイ用)
│   ├── todo-app/                   # Todoアプリのビルド出力
│   ├── poke-search-ts/             # ポケモン検索アプリのビルド出力
│   ├── chat/                       # チャットアプリのビルド出力
│   └── homepage/                   # ホームページのビルド出力
│
├── dist/                           # スライドのビルド出力
│   ├── 1/                          # レッスン1スライドのビルド
│   ├── 2/                          # レッスン2スライドのビルド
│   ├── 4/                          # レッスン4スライドのビルド
│   ├── ...                         # その他のレッスン
│   ├── index.html                  # TOPページ
│   └── styles/                     # 共通スタイル
│
├── styles/                         # スライド用の共通CSS
│   └── styles.css                  # カスタムスタイル
│
├── .spec-workflow/                 # Spec Workflow MCP Server
│   ├── specs/                      # プロジェクト仕様書
│   ├── templates/                  # テンプレート
│   ├── approvals/                  # 承認フロー
│   └── config.example.toml         # 設定例
│
├── build.sh                        # 全スライドビルドスクリプト
├── package.json                    # ルートパッケージ設定
├── vercel.json                     # Vercel デプロイ設定
├── index.html                      # TOPページのソース
├── typescript-react-curriculum.md  # カリキュラム全体の流れ (参考)
└── CLAUDE.md                       # Claude Code 向けガイドライン
```

## Naming Conventions

### Files
- **スライド**: 数字のみ（例: `1.md`, `15.md`）
  - 注意: 欠番あり（#3, #6-10, #13 など）
- **デモアプリディレクトリ**: kebab-case（例: `todo-app`, `poke-search-ts`）
- **React コンポーネント**: PascalCase（例: `TodoItem.tsx`, `ChatMessage.tsx`）
- **ユーティリティ**: camelCase（例: `formatDate.ts`, `apiClient.ts`）
- **テスト**: `[filename].test.ts` または `[filename].spec.ts`（現在未実装）

### Code (CLAUDE.md に基づく)
- **React コンポーネント**: PascalCase（例: `TodoApp`, `MessageList`）
- **関数**: camelCase（例: `fetchTodos`, `handleSubmit`）
- **定数**: UPPER_SNAKE_CASE（例: `API_ENDPOINT`, `MAX_RETRIES`）
- **変数**: camelCase（例: `userName`, `isLoading`）
- **型定義**:
  - PascalCase + `type` キーワード（例: `type TodoItemProps = {...}`）
  - `interface` ではなく `type` を優先
  - 配列は `Array<{...}>` ではなく `{}[]` で定義
  - Props 型は別途定義（インライン型定義を避ける）
  - `React.FC` は使用しない

## Import Patterns

### Import Order
1. React / 外部ライブラリ
2. UI ライブラリ (MUI など)
3. 内部モジュール (相対パス)
4. CSS / スタイル

### 例:
```typescript
// 1. React / 外部ライブラリ
import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'

// 2. UI ライブラリ
import { Button, TextField } from '@mui/material'

// 3. 内部モジュール
import { TodoItem } from './components/TodoItem'
import { useTodos } from './hooks/useTodos'

// 4. CSS
import './App.css'
```

## Code Structure Patterns

### React コンポーネントの構成
```typescript
// 1. Imports
import { useState } from 'react'
import type { TodoItemProps } from './types'

// 2. 型定義
type ComponentProps = {
  prop1: string
  prop2: number
}

// 3. コンポーネント実装
const Component = ({ prop1, prop2 }: ComponentProps) => {
  // 3-1. Hooks
  const [state, setState] = useState('')

  // 3-2. イベントハンドラ
  const handleClick = () => {
    // ...
  }

  // 3-3. JSX
  return (
    <div>
      {/* ... */}
    </div>
  )
}

// 4. Export
export default Component
```

### Markdown スライドの構成（Slidev）

#### CLAUDE.md のルールに従う
- **ヘッダー構造**: h1, h2, h3, h4 は変更しない
- **セクション区切り**: `layout: section` を使用
- **ハンズオン部分**: 番号付きサブセクション（1.1, 1.2, etc.）
- **複雑なハンズオン**: 「目次」を含める
- **句読点**: 半角の `.（ドット）` と `,（カンマ）` を基本とする
- **コードブロック**: 22行を超える場合は必ず2カラムレイアウトにする
- **`<v-clicks>` の使用**: コードブロック以外では絶対に使用しない

#### 基本構造例
```markdown
---
theme: seriph
background: https://picsum.photos/1920/1080
class: text-center
highlighter: shiki
lineNumbers: false
---

# TypeScript + React <br>ハンズオン講座

## 第1回：開発環境セットアップとTypeScript基礎

---
layout: section
---

# TypeScript基礎

---
layout: default
---

# 基本的な型システム (1)

<div grid="~ cols-2 gap-4">
<div>

\```typescript
// 左カラム: コード例
let age: number = 30;
\```

</div>
<div>

- 説明ポイント1
- 説明ポイント2

</div>
</div>
```

## Code Organization Principles

1. **Single Responsibility**: 各ファイルは1つの明確な目的を持つ
2. **Modularity**: デモアプリは独立して動作可能
3. **Testability**: テスト可能な構造（今後実装予定）
4. **Consistency**: CLAUDE.md に記載のルールに従う

## Module Boundaries

### スライド vs デモアプリ
- **スライド (`slides/`)**: 教育コンテンツ（Markdown）
- **デモアプリ (`assets/[app-name]/`)**: 実践的なアプリケーション（React + TypeScript）
- **静的アセット (`assets/[lesson-number]/`)**: レッスン固有の画像・リソース

### 依存関係の方向
- スライド → 静的アセット（画像の埋め込み）
- デモアプリ → 独立（相互依存なし）
- ビルド出力 → スライド/デモアプリから生成

## Code Size Guidelines

### Slidev スライド（CLAUDE.md より）
- **コードブロック**: 22行まで (PC 画面表示限界)
- **22行超過時**: 2カラムレイアウト必須（`<div grid="~ cols-2 gap-4">`）
- **diff 形式の使用**:
  - 新規ファイル作成時: 完全なコードブロック
  - 既存ファイル修正時: diff 形式を使用（同じスライド内で以前に同じファイルを扱った場合）
  - diff ブロックには `+` (追加) と `-` (削除) を適切に使用
  - diff ブロックには対象ファイルパスをコメントで明記（例: `// src/components/App.tsx`）
  - diff ブロックには変更箇所の前後2-3行のコンテキストを含める
- **インデント**: 必ず半角スペース2文字
- **2カラムレイアウトのネスト**: 既に `<div grid="~ cols-2 gap-4">` が使われているブロックには追加で使用しない

### React コンポーネント
- **ファイルサイズ**: 200行以下推奨
- **関数サイズ**: 50行以下推奨
- **ネストの深さ**: 3階層まで

## Dashboard/Monitoring Structure

### ビルド出力の構成
```
dist/
├── 1/                    # レッスン1スライド
│   ├── index.html
│   └── assets/
├── 2/                    # レッスン2スライド
│   └── ...
├── index.html            # TOPページ（全スライドへのリンク）
└── styles/               # 共通スタイル

docs/
├── todo-app/             # Todoアプリ
│   ├── index.html
│   └── assets/
├── chat/                 # チャットアプリ
│   └── ...
```

### Separation of Concerns
- スライドビルド (`dist/`) とデモアプリビルド (`docs/`) は分離
- `build.sh` でスライドを一括ビルド
- 各デモアプリは独自の `npm run build` でビルド

## Documentation Standards

- **スライド**: Markdown 形式（Slidev 拡張，CLAUDE.md の規約に従う）
- **コード**: TypeScript の型定義自体がドキュメント
- **プロジェクトガイド**: `CLAUDE.md` に集約（Claude Code 向け）
- **カリキュラム**: `typescript-react-curriculum.md`（参考情報，実際の `index.html` と乖離あり）
- **インラインコメント**: 複雑なロジックのみ記述
- **テキストルール（CLAUDE.md より）**:
  - アルファベットとマルチバイト文字（日本語）の間には半角スペースを入れる
  - 例: "React の基本", "TypeScript + React", "DOM の構造"

## Build Process & Workflow

### スライドビルド（`build.sh`）
1. `index.html` を一時的に `top.html` に移動（衝突回避）
2. 各スライドを `slides/` からルートにコピー
3. Slidev でビルド（`slidev build -o dist/[N] --base /[N]/`）
4. ビルド後のスライドをルートから削除
5. `top.html` を `dist/index.html` にコピー
6. 共通スタイル（`styles/`）を `dist/` にコピー
7. `top.html` を元の `index.html` に戻す

### デモアプリビルド
- 各デモアプリディレクトリで個別に `npm run build`
- Vite でビルド後，`dist/` を `../../docs/[app-name]/` に移動
- 例: `assets/todo-app/` → `docs/todo-app/`

### デプロイ（Vercel）
- Git push to main branch
- Vercel が自動的にビルド & デプロイ
- `vercel.json` でレッスン別のリダイレクト設定を適用
