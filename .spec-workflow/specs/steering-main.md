# Steering Document - Vantan TechFord React + TypeScript 教育プロジェクト

## Executive Summary

このステアリングドキュメントは，KADOKAWA ドワンゴ情報工科学院専門部向けの TypeScript + React ハンズオン講座教材プロジェクトの戦略的方向性，主要な意思決定，技術選定の根拠，および今後の発展方針を記録するものです．

**プロジェクト概要**:
- **目的**: プログラミング初学者〜中級者向けの React + TypeScript 学習教材の提供
- **形式**: Slidev ベースのスライド + 実践的デモアプリケーション
- **配信**: Vercel による Web ベースの静的サイト配信
- **対象**: 専門学校受講生（年間数十〜数百人規模）

---

## Strategic Vision & Goals

### Long-term Vision (1-3 Years)

1. **再利用可能な教育プラットフォーム**
   - 次年度以降も 70% 以上のコンテンツを再利用可能にする
   - カリキュラムの段階的拡張（Next.js, GraphQL, Testing など）
   - 講師以外の教育者でもメンテナンス可能な構造

2. **インタラクティブ学習体験の強化**
   - スライド内でのライブコーディング機能の追加
   - 受講生ごとの進捗トラッキングシステム
   - ハンズオン課題の自動評価システム

3. **国際化対応**
   - 英語版スライドの提供
   - 多言語対応の技術基盤構築

### Short-term Goals (Current Year)

- **レッスン 1-20 の完成**: 欠番スライド (#3, #6-10, #13) の整備
- **カリキュラムの整合性**: `typescript-react-curriculum.md` と実際のスライドの一致
- **デモアプリの安定化**: すべてのデモアプリが正常動作する状態の維持
- **テスト環境の整備**: 主要デモアプリへのユニットテスト導入

---

## Key Strategic Decisions

### 1. Slidev 採用の根拠

**決定内容**: スライド生成ツールとして Slidev を採用

**理由**:
- **Markdown ベース**: 講師がコンテンツ作成に集中でき，技術的負担が少ない
- **プログレッシブディスクロージャー**: `<v-clicks>` や `{all|1-2|...}` で段階的説明が可能（教育用途に最適）
- **開発体験**: Vite ベースのホットリロードにより，スライド作成が高速
- **カスタマイズ性**: 複数テーマ (`seriph`, `apple-basic`, `bricks`) により，レッスンごとに最適なデザインを選択可能
- **エコシステム**: Vue.js コンポーネントの埋め込みにより，インタラクティブなデモが可能（将来的に活用）

**トレードオフ**:
- PowerPoint/Google Slides に比べて非技術者には学習コストあり
- アニメーション機能は限定的（CSS による自作が必要）

**今後の方針**:
- Slidev のバージョンアップに追従
- 将来的にはカスタムテーマの作成を検討

---

### 2. TypeScript 型定義の統一ルール

**決定内容**: `type` を優先，`interface` は使用しない

**理由**:
- **一貫性**: 初学者が混乱しないよう，型定義の方法を一つに統一
- **柔軟性**: `type` は Union 型，Intersection 型などより柔軟な型表現が可能
- **React との親和性**: Props 型定義に `type` を使うパターンが主流

**具体的ルール（CLAUDE.md より）**:
- `React.FC` は使用しない
- Props 型は別途定義（インライン型定義を避ける）
- 配列は `{}[]` 形式で定義（`Array<{...}>` は使用しない）

**例**:
```typescript
// ❌ 誤
const Component: FC<{ prop1: string }> = ({ prop1 }) => {}

// ✅ 正
type ComponentProps = {
  prop1: string
}
const Component = ({ prop1 }: ComponentProps) => {}
```

---

### 3. Vercel によるホスティング戦略

**決定内容**: Vercel を主要なデプロイメントプラットフォームとして採用

**理由**:
- **自動デプロイ**: Git push 後の CI/CD が標準装備
- **高速 CDN**: エッジネットワークによる高速配信
- **無料枠**: 教育用途で十分な容量と帯域幅
- **リダイレクト設定**: `vercel.json` でレッスン別 URL の柔軟な管理

**設定例**:
```json
{
  "redirects": [
    { "source": "/1", "destination": "/1/index.html" },
    { "source": "/2", "destination": "/2/index.html" }
  ]
}
```

**今後の方針**:
- Vercel Analytics の導入によるアクセス解析
- プレビュー環境の活用（PR ごとの自動プレビュー）

---

### 4. モノレポ的な構成の採用

**決定内容**: 複数のデモアプリを `assets/` 配下に独立して配置

**理由**:
- **独立性**: 各デモアプリは独自の `package.json` を持ち，依存関係を分離
- **段階的学習**: レッスンごとに異なる技術スタックを学べる（Firebase, MUI など）
- **再利用性**: デモアプリ単体でも動作可能

**構成**:
```
assets/
├── todo-app/          # 基本的な React + TypeScript
├── poke-search-ts/    # API 連携
├── chat/              # Firebase + MUI
└── homepage/          # 静的サイト生成
```

**トレードオフ**:
- 依存関係の重複（各アプリが独自に React をインストール）
- ビルド時間の増加

**今後の検討事項**:
- pnpm workspace の活用による依存関係の最適化
- Turborepo などのモノレポツールの導入検討

---

### 5. diff 形式によるコード説明

**決定内容**: スライド内でのコード変更は diff 形式を優先

**理由**:
- **変更点の明示**: 初学者が「何が変わったか」を直感的に理解できる
- **コンテキスト**: 変更箇所の前後2-3行を含めることで，全体像を把握しやすい
- **段階的学習**: 前回のレッスンからの差分が明確

**ルール（CLAUDE.md より）**:
- **新規ファイル作成**: 完全なコードブロック
- **既存ファイル修正**: diff 形式（同じスライド内で以前に同じファイルを扱った場合）
- **対象ファイルパス**: コメントで明記（例: `// src/components/App.tsx`）
- **`+` と `-` の適切な使用**: 追加行は `+`，削除行は `-`

**例**:
````markdown
```diff
// src/components/App.tsx
import { useState } from 'react'
+ import { TodoItem } from './TodoItem'

const App = () => {
  const [todos, setTodos] = useState([])
+  const [newTodo, setNewTodo] = useState('')

  return (
    <div>
+      <input value={newTodo} onChange={e => setNewTodo(e.target.value)} />
    </div>
  )
}
```
````

---

## Technical Architecture Decisions

### Build System Strategy

**決定内容**: `build.sh` によるスライド一括ビルド + 各デモアプリの個別ビルド

**理由**:
- **スライドの統一管理**: 全レッスンを一括でビルドし，`dist/` に出力
- **デモアプリの独立性**: 各アプリは独自のビルドプロセスを持つ

**ビルドフロー**:
```bash
# スライドビルド
./build.sh  # 全スライドを dist/ に出力

# デモアプリビルド
cd assets/todo-app && npm run build  # docs/todo-app/ に出力
cd assets/chat && npm run build      # docs/chat/ に出力
```

**課題と今後の改善**:
- **手動管理の負担**: `build.sh` でレッスン番号をハードコーディング（新規追加時に手動更新必須）
- **改善案**: レッスン番号を自動検出するスクリプトの作成

---

### Firebase Integration (Chat App)

**決定内容**: チャットアプリに Firebase を採用

**理由**:
- **リアルタイム性**: Firestore によるリアルタイムデータ同期
- **認証の簡易化**: Firebase Authentication で学習コストを削減
- **学習曲線**: 初学者でも扱いやすい API

**使用サービス**:
- **Firebase Authentication**: Google, Email/Password 認証
- **Firestore Database**: チャットメッセージの保存
- **Cloud Storage**: 画像アップロード（将来実装予定）

**セキュリティ**:
- Firestore Security Rules の適用
- 環境変数による Firebase 設定の管理

---

### Material-UI (MUI) Adoption

**決定内容**: チャットアプリに MUI v7 を採用

**理由**:
- **モダンな UI**: React コンポーネントとして成熟
- **TypeScript サポート**: 型安全性が高い
- **学習リソース**: 豊富なドキュメントと事例

**バージョン**: `^7.3.2`

**今後の方針**:
- MUI のテーマカスタマイズ（ダークモード対応など）
- 他のデモアプリへの展開検討

---

## Content & Curriculum Strategy

### Lesson Progression Design

**前期（Lesson 1-14）**:
1. **#1**: 環境構築 + TypeScript 基礎
2. **#2-3**: カウントダウンアプリ（JavaScript → TypeScript 移行）
3. **#4**: React 基本（JSX, コンポーネント，状態管理）
4. **#5-10**: ポケモン検索アプリ（API 連携，非同期処理）
5. **#11-13**: Todo アプリ（CRUD 操作）
6. **#14**: MUI による UI コンポーネント

**後期（Lesson 15-20）**:
7. **#15-17**: SNS アプリ（Firebase + MUI）
8. **#18-20**: 発展的トピック（Next.js, GraphQL, 状態管理応用）

**段階的難易度設計**:
- **基礎** (#1-4): 環境構築，型システム，React 基本
- **応用** (#5-14): 実践的アプリ開発（API, CRUD, UI ライブラリ）
- **発展** (#15-20): 最新技術スタック（Firebase, Next.js, GraphQL）

---

### Code Display Strategy (22-Line Rule)

**決定内容**: コードブロックは 22 行まで，超える場合は 2 カラムレイアウト

**理由**:
- **PC 画面表示限界**: 受講生の PC 画面で一度に表示できる限界行数
- **視認性**: 長いコードブロックはスクロールが必要で，学習効率が低下

**実装方法**:
````markdown
<div grid="~ cols-2 gap-4">
<div>

```typescript
// 左カラム: コード部分1
```

</div>
<div>

```typescript
// 右カラム: コード部分2
```

</div>
</div>
````

**ルール（CLAUDE.md より）**:
- 既に `<div grid="~ cols-2 gap-4">` が使われているブロックには追加で使用しない
- インデントは必ず半角スペース2文字

---

## Quality & Consistency Standards

### Code Style Guidelines

**TypeScript**:
- **型定義**: `type` を優先（`interface` は使用しない）
- **配列**: `{}[]` 形式（`Array<{...}>` は使用しない）
- **React.FC**: 使用しない
- **Props 型**: 別途定義（インライン型定義を避ける）

**React**:
- **コンポーネント**: PascalCase
- **関数**: camelCase
- **定数**: UPPER_SNAKE_CASE

**Markdown**:
- **句読点**: 半角の `.（ドット）` と `,（カンマ）`
- **テキストルール**: アルファベットとマルチバイト文字（日本語）の間には半角スペースを入れる
  - 例: "React の基本", "TypeScript + React"

### Version Control Strategy

**Git ブランチ戦略**:
- **main**: 本番環境（Vercel 自動デプロイ）
- **feature branches**: 機能追加・修正用（PR ベース）

**コミットメッセージ**:
- Conventional Commits 形式を推奨
  - `feat: 新機能追加`
  - `fix: バグ修正`
  - `docs: ドキュメント更新`
  - `chore: ビルド・設定変更`

---

## Risk Management & Known Issues

### Current Limitations

1. **カリキュラムの不整合**
   - **問題**: `typescript-react-curriculum.md` と実際の `index.html` の構成が乖離
   - **影響**: 講師が混乱する可能性
   - **対策**: `index.html` を信頼できる情報源とし，`typescript-react-curriculum.md` は参考情報として扱う

2. **スライドの欠番**
   - **問題**: #3, #6-10, #13 などのスライドファイルが存在しない
   - **影響**: 一部のレッスンがカバーされていない可能性
   - **対策**: 既存スライドでカバーされているか確認し，必要に応じて補完

3. **ビルドスクリプトの手動管理**
   - **問題**: `build.sh` でレッスン番号をハードコーディング
   - **影響**: 新規レッスン追加時に手動更新が必須
   - **対策**: 自動検出スクリプトの作成を検討

4. **テスト未実装**
   - **問題**: デモアプリにユニットテスト・E2E テストが存在しない
   - **影響**: リファクタリング時のリグレッションリスク
   - **対策**: 主要デモアプリに Jest/Vitest を段階的に導入

5. **React バージョンの不統一**
   - **問題**: デモアプリごとに React 18.x と 19.x が混在
   - **影響**: 受講生が混乱する可能性
   - **対策**: React 19 への統一を検討（互換性確認後）

---

## Future Roadmap

### Phase 1: Stabilization (Current - 3 Months)

- [ ] 欠番スライドの補完 (#3, #6-10, #13)
- [ ] `typescript-react-curriculum.md` と `index.html` の整合性確保
- [ ] 主要デモアプリへのユニットテスト導入
- [ ] React バージョンの統一（全デモアプリを React 19 に移行）

### Phase 2: Enhancement (3-6 Months)

- [ ] Vercel Analytics の導入（アクセス解析）
- [ ] インタラクティブコードエディタの検証（Sandpack など）
- [ ] 受講生フィードバックの収集システム
- [ ] ビルドスクリプトの自動化改善

### Phase 3: Expansion (6-12 Months)

- [ ] Next.js カリキュラムの拡充
- [ ] GraphQL レッスンの追加
- [ ] 英語版スライドの作成
- [ ] 進捗トラッキングシステムの実装

---

## Success Metrics

### Quantitative Metrics

- **受講生の理解度**: ハンズオン課題の完成率 80% 以上
- **アクセシビリティ**: オンラインスライドへの平均アクセス時間 < 2秒
- **コンテンツの再利用性**: 次年度以降のカリキュラムで 70% 以上再利用可能
- **バグ発生率**: デモアプリのクリティカルバグ 0 件/月

### Qualitative Metrics

- **受講生満足度**: 講座終了後のアンケート評価 4.0/5.0 以上
- **講師の作業負担**: スライド作成・更新時間の削減（前年比 30% 減）
- **メンテナンス性**: 新規講師でも 1 週間でスライド編集可能

---

## Approval & Review

| Role | Name | Date | Status |
|------|------|------|--------|
| Author | [@kuwahara_jsri](https://x.com/kuwahara_jsri) | 2025-10-17 | Draft |
| Reviewer | - | - | Pending |
| Approver | - | - | Pending |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-17 | Claude Code | 初版作成 |

---

## References

- [Product Overview](.spec-workflow/specs/product.md)
- [Technology Stack](.spec-workflow/specs/tech.md)
- [Project Structure](.spec-workflow/specs/structure.md)
- [CLAUDE.md](./CLAUDE.md) - Claude Code 向けガイドライン
- [typescript-react-curriculum.md](./typescript-react-curriculum.md) - カリキュラム全体の流れ（参考）
