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


## Each Slide Rules

### 基本構造
1. 今のヘッダー(h1, h2, h3, h4）は変えない
2. セクション区切りには `layout: section` を使用する
3. ハンズオン部分は番号付きサブセクション（1.1, 1.2, etc.）で構成する
4. 複雑なハンズオン部分には「目次」を含める

### コードブロックの規則
5. コードブロックは24行くらいがPC画面の表示できる限界行数なので，超える場合は以下のように2カラムにする

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

6. コードは，新しいものはそのまま書いてよいが，コードの対象が同じファイル（スライドを構成する `.md` ではなく，スライド内で作成中のアプリケーションのコードファイル）を変更する場合はなるべく `diff` 形式で書く
7. diff ブロックでは必ず `+` (追加) と `-` (削除) を適切に使用する
8. diff ブロックには変更箇所の前後2-3行のコンテキストを含める

### レイアウトと表示
9. 2カラムレイアウトには `<div grid="~ cols-2 gap-4">` を使用する
   1.  ただし，`<div grid="~ cols-2 gap-4">` が既に使われているブロックは追加で使用しなくて良い
10. 左カラム：コード・図表，右カラム：説明という構成を基本とする
11. 段階的な表示には `<v-clicks>` を使用する
12. 各論理セクションを `<v-clicks>` で適切に囲む

### プログレッシブ・ディスクロージャー
13. コードブロックの段階的表示には `{all|1-2|4-5,11,17|7-16}` 構文を使用する
14. `<v-clicks>` を使って概念の段階的説明を行う

## Deployment

The project uses Vercel with redirects configured in `vercel.json` for proper routing to lesson-specific slide URLs.

## Others

### TypeScript の型定義のルール
* `React.FC` は使用しない
  * 誤： `const Hoge: FC<FUGA> = ({ piyo })`
  * 正： `const Hoge = ({ piyo }: FUGA)`
* 型の定義はなるべく `type` で定義する
  * もし `interface` になっているものは書き換える
* 配列は `Array<{...}>` ではなく， `{}[]` で定義
* コンポーネントの props 型は別途定義する
  * 誤： `const Component = ({ prop1, prop2 }: { prop1: string; prop2: number }) => {}`
  * 正： `type ComponentProps = { prop1: string; prop2: number }; const Component = ({ prop1, prop2 }: ComponentProps) => {}`
* アルファベット（e.g. `abc`）とマルチバイト文字（要は日本語のひらがな・カタカナ・漢字）の間には半角スペースを入れる
  * アルファベットには，固有名詞も含まれる
  * 例： "React の基本", "TypeScript + React", "DOM の構造"