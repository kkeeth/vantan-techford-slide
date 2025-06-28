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

1. 今のヘッダー(h1, h2, h3, h4）は変えない
2. 型の定義はなるべく `type` で定義する
   1. もし `interface` になっているものは書き換える
3. コードブロックは22行くらいがPC画面の表示できる限界行数なので，超える場合は以下のように2カラムにする

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


4. コードは，新しいものはそのまま書いてよいが，コードの対象が同じファイル（スライドを構成する `.md` ではなく，スライド内で作成中のアプリケーションのコードファイル）を変更する場合はなるべく `diff` 形式で書く

## Deployment

The project uses Vercel with redirects configured in `vercel.json` for proper routing to lesson-specific slide URLs.

## Others