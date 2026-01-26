---
theme: default
background: https://picsum.photos/1920/1080
class: text-center
highlighter: shiki
lineNumbers: true
info: |
  ## TypeScript + React ハンズオン講座
  Appendix：チャットアプリ開発（発展とデプロイ編）
fonts:
  sans: "Josefin Sans"
  serif: "Noto Sans JP"
  mono: "Fira Code"

drawings:
  persist: false
transition: slide-left
title: TypeScript/React 入門講義
---

# TypeScript + React<br>ハンズオン講座

## Appendix：チャットアプリ開発<br>発展とデプロイ編

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
</div>

<style>
h1 {
  background-color: #fff;
  background-image: none;
}
</style>

---
layout: section
---

# 出席確認✋️

---
layout: default
---

# 本日の内容

<Toc minDepth="2" maxDepth="2" />

<style>
h2 {
  margin: 1rem 0;
}
</style>

## 👉️ チャットアプリをより作り込みましょう！

---
layout: section
---

# チャットアプリの完成

---

# 目次

## 1. デザインの完成度向上
## 2. TypeScript の型安全性向上
## 3. パフォーマンス最適化
## 4. ビルドとデプロイ
## 5. 総復習とまとめ

※最終回で完成度の高いアプリケーションにします．

<style>
h2 {
  margin-bottom: .5rem;
}
</style>

---

# 1. デザインの完成度向上

## 1.1 スタイルシステムの統一

現在のバラバラなスタイリングを統一したデザインシステムに変更します：

<div grid="~ cols-2 gap-4">
<div>

```tsx
// src/theme/designTokens.ts
export const designTokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      900: '#1e3a8a'
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      900: '#111827'
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem'
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
  }
} as const;
```

</div>
<div>

```tsx
// src/theme/muiTheme.ts
import { createTheme } from '@mui/material/styles';
import { designTokens } from './designTokens';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: designTokens.colors.primary[500],
      light: designTokens.colors.primary[100],
      dark: designTokens.colors.primary[900]
    },
    background: {
      default: designTokens.colors.gray[50],
      paper: '#ffffff'
    }
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem'
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.lg,
          boxShadow: designTokens.shadows.md
        }
      }
    }
  }
});
```

</div>
</div>

---

## 1.2 レスポンシブデザインの改善

より良いモバイル体験のために細かい調整を行います：

<div grid="~ cols-2 gap-4">
<div>

```tsx
// src/components/ChatContainer.tsx
import { Box, Container } from '@mui/material';
import { designTokens } from '../theme/designTokens';

type ChatContainerProps = {
  children: React.ReactNode;
};

export const ChatContainer = ({ children }: ChatContainerProps) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: designTokens.spacing.sm, md: designTokens.spacing.lg },
        px: { xs: designTokens.spacing.xs, md: designTokens.spacing.sm },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {children}
    </Container>
  );
};
```

</div>
<div>

```tsx
// src/components/MessageList.tsx
export const MessageList = ({ messages, ...props }: MessageListProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        pr: { xs: 0, sm: designTokens.spacing.xs },
        '&::-webkit-scrollbar': {
          width: '6px'
        },
        '&::-webkit-scrollbar-track': {
          background: designTokens.colors.gray[100]
        },
        '&::-webkit-scrollbar-thumb': {
          background: designTokens.colors.gray[500],
          borderRadius: '3px'
        }
      }}
    >
      <Stack spacing={designTokens.spacing.sm}>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} {...props} />
        ))}
      </Stack>
    </Box>
  );
};
```

</div>
</div>

---

## 1.3 アニメーションとマイクロインタラクション

ユーザー体験を向上させるアニメーションを追加します：

<div grid="~ cols-2 gap-4">
<div>

```tsx
// src/components/MessageItem.tsx
import { motion } from 'framer-motion';

// npm install framer-motion

const messageVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const MessageItem = memo(({ message, ...props }: MessageItemProps) => {
  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      <Card
        sx={{
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: designTokens.shadows.lg
          }
        }}
      >
        {/* メッセージ内容 */}
      </Card>
    </motion.div>
  );
});
```

</div>
<div>

```tsx
// src/components/PostButton.tsx
export const PostButton = ({ isPosting, disabled, onClick }: PostButtonProps) => {
  return (
    <Fab
      color="primary"
      onClick={onClick}
      disabled={disabled}
      sx={{
        background: !disabled ?
          `linear-gradient(135deg, ${designTokens.colors.primary[500]} 0%, ${designTokens.colors.primary[600]} 100%)` :
          undefined,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: !disabled ? 'scale(1.05)' : 'scale(1)',
        '&:hover': {
          transform: !disabled ? 'scale(1.1)' : 'scale(1)',
          boxShadow: !disabled ? designTokens.shadows.lg : undefined
        },
        '&:active': {
          transform: 'scale(0.95)'
        }
      }}
    >
      {isPosting ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        <SendIcon />
      )}
    </Fab>
  );
};
```

</div>
</div>

---

# 2. TypeScript の型安全性向上

## 2.1 厳密な型定義の実装

より型安全なアプリケーションにするため型定義を強化します：

<div grid="~ cols-2 gap-4">
<div>

```tsx
// src/types/message.ts
export type MessageId = number;

export type MessageBase = {
  id?: MessageId;
  text: string;
  date: string;
  createdAt: Date;
};

export type MessageWithImage = MessageBase & {
  image: string;
};

export type MessageWithoutImage = MessageBase & {
  image?: never;
};

export type Message = MessageWithImage | MessageWithoutImage;

// Union Discriminated Type による型安全性
export type MessageFormData =
  | { type: 'text'; text: string }
  | { type: 'image'; text: string; image: File };

// エラータイプ
export type MessageError =
  | { type: 'validation'; message: string }
  | { type: 'storage'; message: string; details?: unknown }
  | { type: 'network'; message: string; statusCode?: number };
```

</div>
<div>

```tsx
// src/types/app.ts
export type AppState = {
  messages: Message[];
  isLoading: boolean;
  error: MessageError | null;
};

export type PostingState = {
  isPosting: boolean;
  text: string;
  image: File | null;
};

// コンポーネントPropsの型
export type MessageItemProps = {
  message: Message;
  searchTerm?: string;
  onDelete: (id: MessageId) => Promise<void>;
  onEdit: (id: MessageId, newText: string) => Promise<void>;
};

export type MessageListProps = {
  messages: Message[];
  searchTerm?: string;
  onDelete: (id: MessageId) => Promise<void>;
  onEdit: (id: MessageId, newText: string) => Promise<void>;
  isLoading: boolean;
};
```

</div>
</div>

---

## 2.2 カスタムフックの型安全な実装

ビジネスロジックを型安全なカスタムフックに分離します：

<div grid="~ cols-2 gap-4">
<div>

```tsx
// src/hooks/useMessages.ts
import { useState, useCallback } from 'react';
import type { Message, MessageId, MessageError } from '../types/message';

type UseMessagesReturn = {
  messages: Message[];
  isLoading: boolean;
  error: MessageError | null;
  addMessage: (messageData: Omit<Message, 'id'>) => Promise<void>;
  deleteMessage: (id: MessageId) => Promise<void>;
  editMessage: (id: MessageId, newText: string) => Promise<void>;
  clearError: () => void;
};

export const useMessages = (): UseMessagesReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<MessageError | null>(null);

  const addMessage = useCallback(async (messageData: Omit<Message, 'id'>) => {
    setIsLoading(true);
    setError(null);

    try {
      const id = await db.messages.add(messageData);
      const newMessage: Message = { ...messageData, id };
      setMessages(prev => [newMessage, ...prev]);
    } catch (err) {
      setError({ type: 'storage', message: 'メッセージの保存に失敗しました', details: err });
    } finally {
      setIsLoading(false);
    }
  }, []);
```

</div>
<div>

```tsx
  const deleteMessage = useCallback(async (id: MessageId) => {
    try {
      await db.messages.delete(id);
      setMessages(prev => prev.filter(msg => msg.id !== id));
    } catch (err) {
      setError({ type: 'storage', message: '削除に失敗しました', details: err });
    }
  }, []);

  const editMessage = useCallback(async (id: MessageId, newText: string) => {
    if (!newText.trim()) {
      setError({ type: 'validation', message: 'メッセージを入力してください' });
      return;
    }

    try {
      const updatedAt = new Date();
      await db.messages.update(id, { text: newText, updatedAt });

      setMessages(prev => prev.map(msg =>
        msg.id === id ? { ...msg, text: newText, updatedAt } : msg
      ));
    } catch (err) {
      setError({ type: 'storage', message: '編集に失敗しました', details: err });
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    messages,
    isLoading,
    error,
    addMessage,
    deleteMessage,
    editMessage,
    clearError
  };
};
```

</div>
</div>

---

## 2.3 エラーハンドリングの改善

TypeScript の型システムを活用したエラーハンドリング：

<div grid="~ cols-2 gap-4">
<div>

```tsx
// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Button, Box } from '@mui/material';

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: (error: Error) => ReactNode;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error);
      }

      return (
        <Box sx={{ p: 2 }}>
          <Alert
            severity="error"
            action={
              <Button onClick={() => window.location.reload()}>
                再読み込み
              </Button>
            }
          >
            アプリケーションでエラーが発生しました
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}
```

</div>
<div>

```tsx
// src/components/ErrorAlert.tsx
import { Alert, Snackbar } from '@mui/material';
import type { MessageError } from '../types/message';

type ErrorAlertProps = {
  error: MessageError | null;
  onClose: () => void;
};

export const ErrorAlert = ({ error, onClose }: ErrorAlertProps) => {
  if (!error) return null;

  const getSeverity = (error: MessageError) => {
    switch (error.type) {
      case 'validation':
        return 'warning';
      case 'storage':
      case 'network':
        return 'error';
      default:
        return 'error';
    }
  };

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={getSeverity(error)}
        variant="filled"
      >
        {error.message}
      </Alert>
    </Snackbar>
  );
};
```

</div>
</div>

---

# 3. パフォーマンス最適化

## 3.1 React Query による状態管理の最適化

より効率的な状態管理のために React Query を導入します：

<div grid="~ cols-2 gap-4">
<div>

```bash
# React Query のインストール
npm install @tanstack/react-query
```

```tsx
// src/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5分
      retry: 1,
      refetchOnWindowFocus: false
    },
    mutations: {
      retry: 1
    }
  }
});

// src/main.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
```

</div>
<div>

```tsx
// src/hooks/useMessagesQuery.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Message, MessageId } from '../types/message';

export const useMessagesQuery = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn: async (): Promise<Message[]> => {
      return await db.messages.orderBy('createdAt').reverse().toArray();
    }
  });
};

export const useAddMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageData: Omit<Message, 'id'>) => {
      const id = await db.messages.add(messageData);
      return { ...messageData, id };
    },
    onSuccess: (newMessage) => {
      queryClient.setQueryData(['messages'], (oldData: Message[] = []) => [
        newMessage,
        ...oldData
      ]);
    }
  });
};

export const useDeleteMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: MessageId) => {
      await db.messages.delete(id);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['messages'], (oldData: Message[] = []) =>
        oldData.filter(msg => msg.id !== deletedId)
      );
    }
  });
};
```

</div>
</div>

---

## 3.2 コンポーネントの最適化

React.memo と適切な依存関係でパフォーマンスを向上：

<div grid="~ cols-2 gap-4">
<div>

```tsx
// src/components/MessageItem.tsx
import { memo, useCallback } from 'react';

export const MessageItem = memo(({
  message,
  searchTerm,
  onDelete,
  onEdit
}: MessageItemProps) => {
  const handleDelete = useCallback(() => {
    if (message.id) {
      onDelete(message.id);
    }
  }, [message.id, onDelete]);

  const handleEdit = useCallback((newText: string) => {
    if (message.id) {
      onEdit(message.id, newText);
    }
  }, [message.id, onEdit]);

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      <Card>
        {/* メッセージ内容 */}
      </Card>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // カスタム比較関数
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.message.text === nextProps.message.text &&
    prevProps.message.updatedAt === nextProps.message.updatedAt &&
    prevProps.searchTerm === nextProps.searchTerm
  );
});
```

</div>
<div>

```tsx
// src/components/VirtualizedMessageList.tsx
import { FixedSizeList as List } from 'react-window';

type VirtualizedMessageListProps = {
  messages: Message[];
  height: number;
  itemHeight: number;
  searchTerm?: string;
  onDelete: (id: MessageId) => Promise<void>;
  onEdit: (id: MessageId, newText: string) => Promise<void>;
};

export const VirtualizedMessageList = memo(({
  messages,
  height,
  itemHeight,
  searchTerm,
  onDelete,
  onEdit
}: VirtualizedMessageListProps) => {
  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <MessageItem
        message={messages[index]}
        searchTerm={searchTerm}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  ), [messages, searchTerm, onDelete, onEdit]);

  return (
    <List
      height={height}
      itemCount={messages.length}
      itemSize={itemHeight}
      itemData={messages}
    >
      {Row}
    </List>
  );
});
```

</div>
</div>

---

# 4. ビルドとデプロイ

## 4.1 TypeScript 設定の最適化

本番環境向けの TypeScript 設定を調整します：

<div grid="~ cols-2 gap-4">
<div>

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,

    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/types/*": ["src/types/*"],
      "@/utils/*": ["src/utils/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

</div>
<div>

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          query: ['@tanstack/react-query'],
          motion: ['framer-motion']
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
})
```

</div>
</div>

---

## 4.2 本番ビルドの実行

アプリケーションをビルドして最適化します：

<div grid="~ cols-2 gap-4">
<div>

```bash
# 型チェック
npm run type-check

# リンティング
npm run lint

# 本番ビルド
npm run build

# ビルド結果の確認
ls -la dist/

# ビルドサイズの分析
npm install --save-dev rollup-plugin-visualizer
```

```json
// package.json (scripts 追加)
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit",
    "preview": "vite preview",
    "analyze": "npx vite-bundle-analyzer"
  }
}
```

</div>
<div>

```bash
# ローカルでのプレビュー
npm run preview

# 出力例
Local:   http://localhost:4173/
Network: http://192.168.1.10:4173/

# ビルドサイズの確認
Building for production...
✓ 34 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-a3b2c1d4.css   12.34 kB │ gzip:  3.21 kB
dist/assets/index-f5e6d7c8.js   156.78 kB │ gzip: 48.92 kB
✓ built in 2.45s
```

📝 **最適化の確認：**
- JavaScript の圧縮とミニファイ
- CSS の最適化
- Tree shaking による不要コードの除去
- コード分割によるバンドルサイズ最適化

</div>
</div>

---

## 4.3 Vercel でのデプロイ

Vercel を使用してアプリケーションを公開します：

<div grid="~ cols-2 gap-4">
<div>

```bash
# Vercel CLI のインストール
npm install -g vercel

# プロジェクトのデプロイ
vercel

# 設定例
? Set up and deploy "~/my-chat-app"? [Y/n] y
? Which scope do you want to deploy to? [your-username]
? Link to existing project? [y/N] n
? What's your project's name? typescript-chat-app
? In which directory is your code located? ./

Auto-detected Project Settings (Vite):
- Build Command: npm run build
- Development Command: npm run dev
- Install Command: npm install
- Output Directory: dist

? Want to modify these settings? [y/N] n

🔗 Deployed to https://typescript-chat-app.vercel.app
```

</div>
<div>

```json
// vercel.json (カスタム設定)
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

📝 **Vercel の利点：**
- 自動デプロイとプレビュー
- カスタムドメイン対応
- CDN による高速配信
- SSL 証明書の自動発行

</div>
</div>

---

# 5. 総復習とまとめ

## 5.1 完成したアプリケーションの機能一覧

20回の講座で実装した機能の総まとめ：

✅ **TypeScript + React の基本機能：**
- コンポーネントベースの設計
- TypeScript による型安全性
- Material-UI によるモダンなデザイン
- レスポンシブ対応

✅ **チャット機能：**
- メッセージの投稿と表示
- 画像アップロード機能
- リアルタイムプレビュー
- メッセージの削除・編集機能

✅ **高度な機能：**
- 検索機能とハイライト表示
- ダークモード対応
- データベース永続化（Dexie.js）
- パフォーマンス最適化

✅ **その他：**
- エラーハンドリング
- アニメーション
- ビルドとデプロイ

---

## 5.2 TypeScript で学んだ型システム

この講座で習得した TypeScript の知識：

🔍 **基本的な型：**
- プリミティブ型（string, number, boolean）
- 配列と tuple
- object 型とインターフェース
- Union Types と Intersection Types

🔍 **高度な型：**
- Generic Types
- Conditional Types
- Utility Types（Partial, Omit, Pick）
- Discriminated Union Types

🔍 **React との組み合わせ：**
- コンポーネントの型定義
- Props と State の型安全性
- カスタムフックの型定義
- イベントハンドラーの型

🔍 **実践的な型活用：**
- エラーハンドリングの型
- API レスポンスの型
- フォームデータの型安全性

---

## 5.3 今後の学習方針

次のステップ：

🎯 **次のステップ：**
1. **バックエンド開発** - Node.js + Express + TypeScript
2. **より高度な状態管理** - Redux Toolkit, Zustand
3. **テスト駆動開発** - Jest, React Testing Library
4. **API 連携** - REST API, GraphQL
5. **認証システム** - Firebase Auth, Auth0
6. **リアルタイム通信** - WebSocket, Socket.io

📚 **継続学習のための資料：**
- TypeScript 公式ドキュメント
- React.dev（新公式サイト）
- Material-UI 公式ドキュメント

---

## 5.4 ポートフォリオとしての活用

完成したアプリをポートフォリオとして活用する方法：

💼 **GitHub での公開：**
- コードの品質とコメント
- README.md の充実
- コミット履歴の整理
- ライセンスの設定

🌐 **デモサイトの充実：**
- 使いやすい UI/UX
- レスポンシブ対応
- エラーハンドリング
- パフォーマンス最適化

📝 **技術スタックの説明：**
- なぜ TypeScript を選んだか
- Material-UI を採用した理由
- Dexie.js でのデータ永続化
- Vercel でのデプロイ

🚀 **さらなる改善案：**
- ダークモード切り替え
- PWA 対応
- 国際化（i18n）対応
- アクセシビリティ向上

---

# 6. 最終課題

講座の締めくくりとして以下の課題に取り組んでください：

📝 **課題内容：**
1. **オリジナル機能の追加**
   - 絵文字ピッカー機能
   - メッセージの並び替え機能
   - エクスポート機能
   - タグ機能
   - その他独自のアイデア

2. **デザインのカスタマイズ**
   - オリジナルのカラーテーマ
   - カスタムアニメーション
   - 独自のレイアウト

3. **技術的な改善**
   - パフォーマンス最適化
   - アクセシビリティ向上
   - テストコードの追加

---

# 8. コードのリファクタリング

## 8.1 繰り返し使用する色の共通化

現在，`rgba(59, 130, 246, 0.1)` などの色が何度も出現しています．これらを Material-UI のテーマと `Colors` 型に追加して統一管理しましょう．

---

## 8.2 main.tsx のテーマ定義を拡張

<div grid="~ cols-2 gap-4">
<div>

```diff
// src/main.tsx
  const theme = createTheme({
    palette: {
      primary: {
        main: '#3B82F6',
        light: '#60A5FA',
        dark: '#2563EB',
+       contrastText: '#fff',
      },
      secondary: {
        main: '#10B981',
        light: '#34D399',
        dark: '#059669',
      },
      background: {
        default: 'linear-gradient(135deg, #F0F9FF 0%, #ECFDF5 100%)',
        paper: 'rgba(255, 255, 255, 0.95)',
      },
+     divider: 'rgba(59, 130, 246, 0.1)',
+     action: {
+       hover: 'rgba(59, 130, 246, 0.04)',
+       selected: 'rgba(59, 130, 246, 0.05)',
+     },
    },
  });
```

</div>
<div>

📝 **Material-UI の標準プロパティを活用：**
- `divider`: 境界線用の色（`0.1` の透明度）
- `action.hover`: ホバー時の背景色（`0.04` の透明度）
- `action.selected`: 選択時の背景色（`0.05` の透明度）
- Material-UI の規約に従うことで一貫性を保つ
- テーマカラーの一元管理で保守性向上

</div>
</div>

---

## 8.3 Colors 型の拡張

<div grid="~ cols-2 gap-4">
<div>

```diff
// src/types.ts
  export type Colors = {
    primary: string;
    secondary: string;
    gradient: string;
    gradientHover: string;
    surface: string;
    background: string;
+   border: string;
+   hoverBg: string;
  };
```

</div>
<div>

```diff
// src/App.tsx
  const colors: Colors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    gradient: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    gradientHover: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
    surface: theme.palette.background.paper,
    background: theme.palette.background.default,
+   border: theme.palette.divider,
+   hoverBg: theme.palette.action.hover,
  };
```

</div>
</div>

---

## 8.4 既存コードのリファクタリング（入力フォーム）

<div grid="~ cols-2 gap-4">
<div>

```diff
// src/App.tsx（入力フォーム）
  <Paper
    elevation={2}
    sx={{
      borderRadius: { xs: 2, sm: 3 },
      p: { xs: 2, sm: 3 },
      mb: { xs: 2, sm: 3 },
      background: colors.surface,
      backdropFilter: 'blur(20px)',
-     border: '1px solid rgba(59, 130, 246, 0.1)',
+     border: `1px solid ${colors.border}`,
    }}
  >
```

</div>
<div>

```diff
// src/App.tsx（画像プレビュー）
  {image && (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        background: 'rgba(255, 255, 255, 0.8)',
-       border: '1px solid rgba(59, 130, 246, 0.1)',
+       border: `1px solid ${colors.border}`,
      }}
    >
```

</div>
</div>

---

## 8.5 既存コードのリファクタリング（メッセージカード）

<div grid="~ cols-2 gap-4">
<div>

```diff
// src/App.tsx（メッセージカード）
  <Card
    key={message.id}
    elevation={3}
    sx={{
      borderRadius: { xs: 2, sm: 3 },
      overflow: 'hidden',
      background: colors.surface,
      backdropFilter: 'blur(20px)',
-     border: '1px solid rgba(59, 130, 246, 0.1)',
+     border: `1px solid ${colors.border}`,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 30px rgba(59, 130, 246, 0.15)',
      },
    }}
  >
```

</div>
<div>

```diff
// src/App.tsx（日時 Chip）
  <Chip
    label={formatRelativeTime(message.date)}
    size="small"
    variant="outlined"
    sx={{
      height: 24,
      fontSize: '0.75rem',
      borderColor: colors.primary,
      color: colors.primary,
-     backgroundColor: 'rgba(59, 130, 246, 0.05)',
+     backgroundColor: colors.hoverBg,
    }}
  />
```

</div>
</div>

---

## 8.6 その他の箇所のリファクタリング

<div grid="~ cols-2 gap-4">
<div>

```diff
// src/App.tsx（画像追加ボタン）
  <Button
    variant="outlined"
    component="label"
    startIcon={<ImageIcon />}
    sx={{
      flex: 1,
      width: { xs: '100%', sm: 'auto' },
      height: 48,
      borderRadius: 2,
      borderColor: colors.primary,
      color: colors.primary,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      '&:hover': {
        borderColor: colors.secondary,
-       backgroundColor: 'rgba(59, 130, 246, 0.04)',
+       backgroundColor: colors.hoverBg,
      },
    }}
  >
```

</div>
<div>

```diff
// src/App.tsx（Divider）
- <Divider sx={{ borderColor: 'rgba(59, 130, 246, 0.1)' }} />
+ <Divider sx={{ borderColor: colors.border }} />
```

📝 **リファクタリングの利点：**
- コードの可読性向上
- 色の一元管理で保守性アップ
- テーマ変更時の影響範囲を最小化
- TypeScript による型安全な色管理
- マジックナンバーの排除

</div>
</div>

---
layout: section
---

# 🎉 TypeScript + React<br>ハンズオン講座完了！

## 20回以上にわたる講座，お疲れさまでした！

---

# 参考資料とコミュニティ

## 📚 継続学習のための資料

**公式ドキュメント：**
- TypeScript 公式: https://www.typescriptlang.org/
- React 公式: https://react.dev/
- Material-UI: https://mui.com/
- Vite: https://vitejs.dev/

**学習プラットフォーム：**
- React TypeScript Cheatsheet: https://react-typescript-cheatsheet.netlify.app/
- TypeScript Deep Dive: https://basarat.gitbook.io/typescript/
- React Patterns: https://reactpatterns.com/

## 🔗 コミュニティ

- React Japan コミュニティ
- TypeScript Japan
- Qiita, Zenn での技術記事投稿

---
layout: section
---

# ありがとうございました！ 🎉

## 皆さんの今後の活躍を<br>心から期待しています！
