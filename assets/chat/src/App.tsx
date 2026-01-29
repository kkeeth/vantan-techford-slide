import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import Dexie, { type EntityTable } from 'dexie';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  useTheme,
} from '@mui/material';
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
      primary: '#3b82f6',
      surface: '#ffffff',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      gradientHover: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      background: '#f1f5f9',
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
        background: '#f1f5f9',
        py: { xs: 2, sm: 4 },
        px: { xs: 2, sm: 2 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          maxWidth: { xs: '100%', sm: '600px' },
          px: { xs: 0, sm: 0 },
        }}
      >
        {/* ヘッダー */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
              fontWeight: 700,
              color: '#1e293b',
              mb: 0.5,
            }}
          >
            My Chat App
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#64748b',
            }}
          >
            TypeScript + React で作るチャットアプリ
          </Typography>
        </Box>

        {/* メインコンテンツ */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 1,
            overflow: 'hidden',
            background: '#fff',
            border: '1px solid #e2e8f0',
          }}
        >
          {/* 投稿フォーム */}
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
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
          </Box>

          <Divider sx={{ borderColor: '#e2e8f0' }} />

          {/* 検索バー */}
          <Box sx={{ p: { xs: 2, sm: 3 }, backgroundColor: '#f8fafc' }}>
            <SearchBar
              searchTerm={searchTerm}
              colors={colors}
              onSearchChange={setSearchTerm}
            />
          </Box>

          <Divider sx={{ borderColor: '#e2e8f0' }} />

          {/* メッセージリスト */}
          <MessageList showCount isSearching={searchTerm.trim().length > 0}>
            {messageItems}
          </MessageList>
        </Paper>
      </Container>
    </Box>
  );
};

export default App;
