# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a TypeScript/React educational slide presentation repository for KADOKAWA Dōwango Institute of Technology, built with Slidev. The project has a dual structure:

- **Slide presentations**: Managed in `slides/` directory with individual lesson markdown files
- **Demo applications**: Live React apps in `assets/` that serve as teaching examples and get built to `docs/` for web deployment

### Key Components

- **Slidev presentations**: Each lesson is a separate `.md` file in `slides/` using Slidev syntax
- **Demo apps**: `assets/todo-app/`, `assets/poke-search/`, `assets/poke-search-ts/`, `assets/chat/` - full React applications
- **Assets**: Images and resources organized by lesson number in `assets/[lesson-number]/`
- **Built output**: `docs/` contains compiled slides and demo apps for web deployment

## Development Commands

### Working with slides
```bash
# Start development server for a specific slide
cp slides/[lesson-number].md ./
npm run dev [lesson-number].md

# Build all slides (uses build.sh script)
mv [lesson-number].md slides/
npm run build-all
```

### Working with demo applications

```bash
# Navigate to any demo app directory first
cd assets/todo-app/        # or poke-search, poke-search-ts, chat

# Development
npm run dev

# Build and deploy to docs/
npm run build              # Automatically moves output to ../../docs/[app-name]

# Linting
npm run lint
```

### Build Process

The `build.sh` script handles building multiple slide presentations:
- Temporarily moves `index.html` to avoid conflicts
- Builds each slide with specific base paths (`/1/`, `/2/`, etc.)
- Outputs to `dist/[lesson-number]/` directories
- Copies styles and creates final `dist/index.html`

Demo apps build with Vite and automatically move their `dist/` output to the corresponding `docs/` directory for web deployment.

## File Organization

- `slides/`: スライドの素となるマークダウンファイル
- `slides/2024_JS/`: 古いカリキュラムのスライド
- `assets/[number]/`: 各レッスンの画像やその他の静的ファイル
- `assets/[app-name]/`: レッスンで作る予定の React 製アプリケーション
- `docs/`: ビルド後の出力ファイルとデモアプリ (slides + demo apps)
- `typescript-react-curriculum.md`: 全てのカリキュラムの流れ（すでにこの流れは破綻しました）


## Slide Creation Rules

### 重要な原則
**スライド作成時は必ずこの CLAUDE.md のルールに従うこと。ルールに従わない場合，スライドが正しく表示されない可能性があります。**

## Each Slide Rules

### 基本構造
1. 今のヘッダー(h1, h2, h3, h4）は変えない
2. セクション区切りには `layout: section` を使用する
3. ハンズオン部分は番号付きサブセクション（1.1, 1.2, etc.）で構成する
4. 複雑なハンズオン部分には「目次」を含める
5. 句読点は基本的に半角の「.（ドット）」と「,（カンマ）」を使用する

### コードブロックの規則
1. コードブロックは22行までが PC 画面の表示できる限界行数なので，超える場合は**必ず**以下のように2カラムにする

<div grid="~ cols-2 gap-4">
<div>

```
コードブロック1
```

</div>
<div>

```
コードブロック2
```

</div>
</div>

2. **新規ファイル作成の場合**: 完全なコードブロックを使用する
   - 言語指定: ````tsx` または ````ts` または ````bash` など
   - ファイルパスをコメントで明記: `// src/components/NewComponent.tsx`
   - 例: 新しく `MessageItem.tsx` を作成する場合

3. **既存ファイル修正の場合**: `diff` 形式を使用する
   - 言語指定: ````diff`
   - 対象ファイルのパスをコメントで明記: `// src/components/App.tsx`
   - 変更箇所の前後2-3行のコンテキストを含める
   - `+` (追加行) と `-` (削除行) を適切に使用する
   - **判断基準**: 前のセクション・章で同じファイル名のコードが登場している場合
   - **重要**: 「既存ファイル」とは，スライドを構成する `.md` ファイルのことではなく，スライド内で作成中のアプリケーションのコードファイルのこと

4. インデントは必ず半角スペース2文字ずつを使用する

5. コードブロックの言語指定は必須
   - TypeScript/TSX: ````tsx` または ````ts`
   - JavaScript/JSX: ````jsx` または ````js`
   - Diff: ````diff`
   - Bash: ````bash`
   - JSON: ````json`

### レイアウトと表示
1. **2カラムレイアウト**: コードが長い場合や，コードと説明を並べたい場合に使用
   ```html
   <div grid="~ cols-2 gap-4">
   <div>

   左カラムの内容（コード・図表など）

   </div>
   <div>

   右カラムの内容（説明・補足など）

   </div>
   </div>
   ```
   - **重要**: ネストされた `<div grid="~ cols-2 gap-4">` は使用しない（既に2カラム内にいる場合は追加しない）
   - 基本構成: 左カラムにコード・図表，右カラムに説明

2. **1カラムレイアウト**: 短いコードや単独の説明の場合

### インタラクティブ要素
1. **v-clicks**: リスト項目や概念の段階的表示に使用
   ```html
   <v-clicks>

   - 第一のポイント
   - 第二のポイント
   - 第三のポイント

   </v-clicks>
   ```
   - **使用場面**: 箇条書きリスト，概念の段階的説明，チェックリスト
   - **使用禁止場面**: コードブロック内，表組み内，2カラムレイアウト内

2. **コードの段階的表示**: Slidev の行ハイライト構文を使用
   ```
   ```tsx {all|1-5|7-12|14-20}
   // コード全体が最初に表示され，その後指定した行が順次ハイライトされる
   ```
   ```
   - `{all}`: 全体表示
   - `{1-5}`: 1〜5行目をハイライト
   - `{7-12}`: 7〜12行目をハイライト
   - 複数指定: `{all|1-5|7-12|14-20}` のようにパイプで区切る

## Deployment

The project uses Vercel with redirects configured in `vercel.json` for proper routing to lesson-specific slide URLs.

## TypeScript / React コーディング規約

### 1. 型定義のルール

#### 1.1 React コンポーネントの型定義
**❌ NG: React.FC を使用**
```tsx
const Hoge: FC<FUGA> = ({ piyo }) => { ... }
```

**✅ OK: Props 型を直接指定**
```tsx
type HogeProps = {
  piyo: string;
};

const Hoge = ({ piyo }: HogeProps) => { ... }
```

#### 1.2 型定義の方法
- **優先**: `type` を使用する
  ```tsx
  type User = {
    id: string;
    name: string;
  };
  ```
- **非推奨**: `interface` は使わない
  ```tsx
  // ❌ NG
  interface User {
    id: string;
    name: string;
  }
  ```

#### 1.3 配列の型定義
**❌ NG: Array<T> 形式**
```tsx
const items: Array<{ id: string; name: string }> = [];
```

**✅ OK: T[] 形式**
```tsx
const items: { id: string; name: string }[] = [];
```

#### 1.4 コンポーネント Props の定義
**❌ NG: インライン型定義**
```tsx
const Component = ({ prop1, prop2 }: { prop1: string; prop2: number }) => { ... }
```

**✅ OK: 別途型を定義**
```tsx
type ComponentProps = {
  prop1: string;
  prop2: number;
};

const Component = ({ prop1, prop2 }: ComponentProps) => { ... }
```

### 2. テキスト記述のルール

#### 2.1 アルファベットと日本語の間にスペースを入れる
- アルファベットには固有名詞も含む
- 数字と日本語の間も同様

**✅ 正しい例:**
- "React の基本"
- "TypeScript + React"
- "DOM の構造"
- "useState フックを使用"
- "第1回の講義"

**❌ 間違った例:**
- "Reactの基本"
- "TypeScript+React"
- "DOM構造"
- "useStateフックを使用"
- "第1回講義"

#### 2.2 句読点のルール
- 基本的に半角の「.」（ドット）と「,」（カンマ）を使用
- ただし，日本語の文章中では全角の「。」「、」も許容

### 3. ファイル・フォルダ命名規約

#### 3.1 コンポーネントファイル
- PascalCase を使用: `MessageItem.tsx`, `UserProfile.tsx`
- 拡張子は `.tsx`（TSX を含む場合）または `.ts`（純粋な TypeScript）

#### 3.2 Hooks ファイル
- camelCase + `use` プレフィックス: `useImageUpload.ts`, `useColors.ts`
- 拡張子は `.ts`

#### 3.3 ユーティリティ・定数ファイル
- camelCase を使用: `fileValidator.ts`, `dateFormatter.ts`
- 定数ファイルも camelCase: `errorMessages.ts`, `validationRules.ts`

#### 3.4 フォルダ
- 小文字 + ハイフン: `components/`, `hooks/`, `utils/`, `constants/`

## スライド作成のベストプラクティス

### 1. コード例の作成
- **実行可能なコード**: スライド内のコード例は，可能な限り実際に動作するものを提示する
- **段階的な説明**: 複雑なコードは，小さな部分に分けて段階的に説明する
- **エラー例も含める**: よくある間違いとその修正方法も示す

### 2. 説明の明確さ
- **専門用語には説明を添える**: 初めて登場する専門用語には簡単な説明を付ける
- **具体例を示す**: 抽象的な概念には具体例を必ず含める
- **"なぜ" を説明する**: 技術的な選択の理由を明確にする

### 3. スライドの構成
- **1スライド1トピック**: 1つのスライドで説明する内容は1つのトピックに絞る
- **適切な情報量**: 1スライドに詰め込みすぎない（目安：コード + 説明で画面に収まる量）
- **進行の流れ**: 前のスライドと次のスライドの繋がりを意識する

### 4. 視覚的な工夫
- **適切な色使い**: 重要な部分は強調表示する
- **空白の活用**: 詰め込みすぎず，適度な余白を持たせる
- **一貫性**: 同じ種類の情報は同じスタイルで表示する

## チェックリスト

スライドを作成・編集したら，以下をチェック:

- [ ] コードブロックは22行以内（超える場合は2カラム）
- [ ] 新規ファイルと既存ファイル修正で適切なコード形式を使用（完全 or diff）
- [ ] diff 形式では `+` と `-` を正しく使用
- [ ] インデントは半角スペース2文字
- [ ] アルファベットと日本語の間にスペース
- [ ] Props 型は別途定義
- [ ] `type` を使用（`interface` は不可）
- [ ] 配列の型は `T[]` 形式
- [ ] ファイル名は規約に従っている（コンポーネント: PascalCase, hooks: camelCase + use）
