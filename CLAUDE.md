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

- `slides/`: Source markdown files for presentations
- `slides/2024_JS/`: Alternative curriculum slides
- `assets/[number]/`: Images and resources for each lesson
- `assets/[app-name]/`: Complete React demo applications
- `docs/`: Compiled output for web deployment (slides + demo apps)
- `typescript-react-curriculum.md`: Full curriculum overview

## Deployment

The project uses Vercel with redirects configured in `vercel.json` for proper routing to lesson-specific slide URLs.