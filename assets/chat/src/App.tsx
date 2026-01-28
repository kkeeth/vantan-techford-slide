import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import Dexie, { type EntityTable } from 'dexie';
import { Container, Typography, Box, Paper, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { MessageForm } from './components/MessageForm';
import { MessageList } from './components/MessageList';
import { MessageItem } from './components/MessageItem';
import { SearchBar } from './components/SearchBar';
import { validateMessage, validateFile } from './utils/validator';
import type { Colors, Message } from './types';
import './App.css';

const db = new Dexie('ChatApp') as Dexie & {
  messages: EntityTable<Message, 'id'>;
};
db.version(1).stores({
  messages: 'id, createdAt',
});

const App = () => {
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const theme = useTheme();
  const colors: Colors = useMemo(
    () => ({
      primary: theme.palette.primary.main,
      surface: theme.palette.background.paper,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      gradientHover: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
      background: theme.palette.background.default,
    }),
    [theme],
  );

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

  const handleTextChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setText(e.target.value);
    },
    [],
  );

  const readImageAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

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
          date: dateString,
          imageName: image?.name,
          createdAt,
          updatedAt: createdAt,
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

  const handleSelectImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0];
      if (file) {
        const error = validateFile(file);
        if (error) {
          alert(error);
          return;
        }
        setImage(file);
        e.target.value = ''; // input をクリア
      }
    },
    [],
  );

  const handleStartEdit = useCallback((id: string, currentText: string) => {
    setEditingId(id);
    setEditingText(currentText);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditingText('');
  }, []);

  const handleSaveEdit = useCallback(async () => {
    if (!editingId || !editingText.trim()) return;

    try {
      await db.messages.update(editingId, {
        text: editingText,
        updatedAt: new Date(),
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === editingId
            ? { ...msg, text: editingText, updatedAt: new Date() }
            : msg,
        ),
      );
      setEditingId(null);
      setEditingText('');
    } catch (error) {
      alert('編集に失敗しました');
    }
  }, [editingId, editingText]);

  const filteredMessages = useMemo(() => {
    if (!searchTerm.trim()) {
      return messages;
    }
    return messages.filter((message) =>
      message.text.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [messages, searchTerm]);

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

  const messageItems = filteredMessages.map((message) => (
    <MessageItem
      key={message.id}
      message={message}
      colors={colors}
      isEditing={editingId === message.id}
      editText={editingText}
      searchTerm={searchTerm}
      onEditTextChange={setEditingText}
      onStartEdit={handleStartEdit}
      onSaveEdit={handleSaveEdit}
      onCancelEdit={handleCancelEdit}
      onDeleteMessage={handleDeleteMessage}
    />
  ));

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
        sx={{
          maxWidth: { xs: '100%', sm: '720px' },
          px: { xs: 0, sm: 3 },
        }}
      >
        {/* ヘッダー */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: { xs: 0, sm: 4 },
            overflow: 'hidden',
            mb: { xs: 2, sm: 3 },
            background: '#008080',
            backdropFilter: 'blur(20px)',
          }}
        >
          <Box
            sx={{
              color: 'white',
              background: colors.gradient,
              textAlign: 'center',
              py: { xs: 2, sm: 3 },
              px: { xs: 2, sm: 3 },
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
              }}
            >
              💬 My Chat App
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
              }}
            >
              TypeScript + React で作るチャットアプリ
            </Typography>
          </Box>
        </Paper>

        {/* メッセージフォーム */}
        <MessageForm
          text={text}
          isPosting={isPosting}
          image={image}
          colors={colors}
          onTextChange={handleTextChange}
          onSubmit={handlePost}
          onSelectImage={handleSelectImage}
          onDeleteImage={() => setImage(null)}
        />

        {/* 検索バー */}
        <SearchBar
          searchTerm={searchTerm}
          colors={colors}
          onSearchChange={setSearchTerm}
        />

        {/* メッセージリスト */}
        <MessageList showCount>{messageItems}</MessageList>
      </Container>
    </Box>
  );
};

export default App;
