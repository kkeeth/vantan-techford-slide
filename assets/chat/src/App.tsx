import React, {
  useEffect,
  useState,
  useCallback,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import Dexie from 'dexie';
import {
  Container,
  Typography,
  TextField,
  Stack,
  Button,
  Box,
  Fab,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Send as SendIcon,
  Image as ImageIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { Message, Colors } from './types';
import { MessageList } from './components/MessageList';
import './App.css';

// データベースの設定
const db = new Dexie('ChatApp');
db.version(1).stores({
  messages: 'id, createdAt',
});

const MAX_MESSAGE_LENGTH = 500;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILENAME_LENGTH = 100;

const App: React.FC = () => {
  const theme = useTheme();
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // テーマからカラーを取得
  const colors: Colors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    gradient: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    gradientHover: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
    surface: theme.palette.background.paper,
    background: theme.palette.background.default,
  };

  // メッセージ読み込み
  useEffect(() => {
    const loadMessages = async (): Promise<void> => {
      try {
        const allMessages = await db.messages
          .orderBy('createdAt')
          .reverse()
          .toArray();
        setMessages(allMessages);
      } catch (error) {
        console.error('メッセージの読み込みに失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, []);

  // バリデーション
  const validateMessage = (message: string): string | null => {
    if (!message.trim()) return '内容を入力してください';
    if (message.length > MAX_MESSAGE_LENGTH) {
      return `${MAX_MESSAGE_LENGTH}文字以内で入力してください`;
    }
    return null;
  };

  const validateFile = (file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return 'JPEG、PNG、GIF ファイルのみアップロード可能です';
    }

    if (file.size > MAX_FILE_SIZE) {
      return `ファイルサイズが大きすぎます（${MAX_FILE_SIZE / (1024 * 1024)} MB 以下にしてください）`;
    }

    if (file.name.length > MAX_FILENAME_LENGTH) {
      return `ファイル名が長すぎます（${MAX_FILENAME_LENGTH} 文字以内にしてください）`;
    }

    return null;
  };

  // ファイル選択
  const handleSelectImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const file = event.target.files?.[0];
      if (file) {
        const error = validateFile(file);
        if (error) {
          alert(error);
          return;
        }
        event.target.value = '';
        setImage(file);
      }
    },
    [],
  );

  // 画像を Base64 に変換
  const readImageAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // メッセージ投稿
  const handlePost = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      const error = validateMessage(text);
      if (error) {
        alert(error);
        return;
      }

      setIsPosting(true);

      try {
        const createdAt = new Date();
        const dateString = createdAt.toLocaleString();
        const imageData = image ? await readImageAsDataURL(image) : undefined;

        const newMessage: Message = {
          id: uuidv4(),
          text: text.trim(),
          image: imageData,
          imageName: image?.name,
          date: dateString,
          createdAt,
        };
        await db.messages.add(newMessage);

        setMessages((prev) => [newMessage, ...prev]);
        setImage(null);
        setText('');
      } catch (error) {
        console.error('メッセージの保存に失敗しました:', error);
        alert('メッセージの送信に失敗しました');
      } finally {
        setIsPosting(false);
      }
    },
    [text, image],
  );

  // メッセージ削除
  const handleDeleteMessage = useCallback(
    async (id: string): Promise<void> => {
      const message = messages.find((m) => m.id === id);
      if (!message) return;

      const previewText =
        message.text.length > 20
          ? message.text.substring(0, 20) + '...'
          : message.text;

      if (window.confirm(`「${previewText}」を削除しますか？`)) {
        try {
          await db.messages.delete(id);
          setMessages((prev) => prev.filter((message) => message.id !== id));
        } catch (error) {
          console.error('削除に失敗しました:', error);
          alert('削除に失敗しました');
        }
      }
    },
    [messages],
  );

  // テキスト変更
  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const newText = event.target.value;
      if (newText.length <= MAX_MESSAGE_LENGTH) {
        setText(newText);
      }
    },
    [],
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: colors.background,
        }}
      >
        <Typography variant="h6">読み込み中...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: colors.background,
        py: { xs: 1, sm: 2 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{ maxWidth: { xs: '100%', sm: '720px' }, px: { xs: 0, sm: 3 } }}
      >
        {/* ヘッダー */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: { xs: 0, sm: 4 },
            overflow: 'hidden',
            mb: { xs: 2, sm: 3 },
            background: colors.surface,
            backdropFilter: 'blur(20px)',
          }}
        >
          <Box
            sx={{
              background: colors.gradient,
              color: 'white',
              p: { xs: 2, sm: 3 },
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                mb: 1,
                fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
              }}
            >
              💬 チャットアプリ
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                opacity: 0.9,
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              今の気持ちをシェアしよう
            </Typography>
          </Box>
        </Paper>

        {/* 入力フォーム */}

        {/* メッセージリスト */}
        <MessageList
          messages={messages}
          colors={colors}
          onDelete={handleDeleteMessage}
        />
      </Container>
    </Box>
  );
};

export default App;
