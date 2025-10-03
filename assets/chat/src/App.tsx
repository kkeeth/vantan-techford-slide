import React, { useEffect, useState, useCallback } from 'react';
import Dexie from 'dexie';
import './App.css';
import {
  Container,
  Typography,
  TextField,
  Stack,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  Fab,
  Paper,
  Divider,
  Chip,
} from '@mui/material';
import {
  Send as SendIcon,
  Image as ImageIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Message, Colors, MessageWithoutId } from './types';

// データベースの設定
const db = new Dexie('ChatApp');
db.version(1).stores({
  messages: '++id, text, image, date, createdAt',
});

// カラーパレット
const colors: Colors = {
  primary: '#3B82F6',
  secondary: '#10B981',
  gradient: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
  gradientHover: 'linear-gradient(135deg, #2563EB 0%, #059669 100%)',
  surface: 'rgba(255, 255, 255, 0.95)',
  background: 'linear-gradient(135deg, #F0F9FF 0%, #ECFDF5 100%)',
};

const MAX_MESSAGE_LENGTH = 500;

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // メッセージ読み込み
  useEffect(() => {
    const loadMessages = async (): Promise<void> => {
      try {
        const allMessages = await db.messages.toArray();
        setMessages(allMessages.reverse());
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

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return 'ファイルサイズが大きすぎます（5MB以下にしてください）';
    }

    if (file.name.length > 100) {
      return 'ファイル名が長すぎます';
    }

    return null;
  };

  // ファイル選択
  const handleSelectImage = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        alert(error);
        event.target.value = '';
        return;
      }
      setImage(file);
    }
  }, []);

  // 相対時間表示
  const formatRelativeTime = useCallback((date: string): string => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'たった今';
    if (diffInMinutes < 60) return `${diffInMinutes}分前`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}時間前`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}日前`;

    return messageDate.toLocaleDateString();
  }, []);

  // メッセージ投稿
  const handlePost = useCallback(async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
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

      if (image) {
        const reader = new FileReader();
        reader.onload = async () => {
          const imageData = reader.result as string;

          const messageData: MessageWithoutId = {
            text: text.trim(),
            image: imageData,
            date: dateString,
            createdAt,
          };

          const id = await db.messages.add(messageData);

          const newMessage: Message = {
            id: id as number,
            ...messageData,
          };

          setMessages((prev) => [newMessage, ...prev]);
        };

        reader.readAsDataURL(image);
      } else {
        const messageData: MessageWithoutId = {
          text: text.trim(),
          image: undefined,
          date: dateString,
          createdAt,
        };

        const id = await db.messages.add(messageData);

        const newMessage: Message = {
          id: id as number,
          ...messageData,
        };

        setMessages((prev) => [newMessage, ...prev]);
      }

      setImage(null);
      setText('');
    } catch (error) {
      console.error('メッセージの保存に失敗しました:', error);
      alert('メッセージの送信に失敗しました');
    } finally {
      setIsPosting(false);
    }
  }, [text, image]);

  // メッセージ削除
  const deleteMessage = useCallback(async (id: number): Promise<void> => {
    const message = messages.find((m) => m.id === id);
    if (!message) return;

    const previewText = message.text.length > 20
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
  }, [messages]);

  // テキスト変更
  const handleTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const newText = event.target.value;
    if (newText.length <= MAX_MESSAGE_LENGTH) {
      setText(newText);
    }
  }, []);

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
      <Container sx={{ maxWidth: { xs: '100%', sm: '720px' }, px: { xs: 0, sm: 3 } }}>
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
              py: { xs: 2, sm: 3 },
              px: { xs: 2, sm: 3 },
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                mb: 1,
                fontSize: { xs: '1.8rem', sm: '3rem' }
              }}
            >
              💬 チャットアプリ
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                opacity: 0.9,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              今の気持ちをシェアしよう
            </Typography>
          </Box>
        </Paper>

        {/* 入力フォーム */}
        <Paper
          elevation={2}
          sx={{
            borderRadius: { xs: 2, sm: 3 },
            p: { xs: 2, sm: 3 },
            mb: { xs: 2, sm: 3 },
            background: colors.surface,
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(59, 130, 246, 0.1)',
          }}
        >
          <form onSubmit={handlePost}>
            <Stack spacing={{ xs: 2, sm: 3 }}>
              <TextField
                label="今の気分はいかがでしょうか？"
                multiline
                fullWidth
                rows={4}
                value={text}
                onChange={handleTextChange}
                variant="outlined"
                error={text.length > MAX_MESSAGE_LENGTH * 0.9}
                helperText={`${text.length}/${MAX_MESSAGE_LENGTH}`}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover fieldset': {
                      borderColor: colors.primary,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.primary,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: colors.primary,
                  },
                }}
              />

              {image && (
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(59, 130, 246, 0.1)',
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    📸 画像プレビュー
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <Box
                      component="img"
                      alt="Preview"
                      src={URL.createObjectURL(image)}
                      sx={{
                        maxWidth: '80%',
                        maxHeight: 200,
                        objectFit: 'contain',
                        borderRadius: 2,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 2,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {image.name} ({Math.round(image.size / 1024)}KB)
                    </Typography>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => setImage(null)}
                    >
                      削除
                    </Button>
                  </Box>
                </Paper>
              )}

              <Box sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' }
              }}>
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
                      backgroundColor: 'rgba(59, 130, 246, 0.04)',
                    },
                  }}
                >
                  画像を追加
                  <input
                    type="file"
                    hidden
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    onChange={handleSelectImage}
                  />
                </Button>

                <Fab
                  color="primary"
                  type="submit"
                  disabled={!text.trim() || isPosting}
                  size="large"
                  sx={{
                    background: (text.trim() && !isPosting) ? colors.gradient : undefined,
                    '&:hover': {
                      background: (text.trim() && !isPosting) ? colors.gradientHover : undefined,
                    },
                    transition: 'all 0.3s ease',
                    transform: text.trim() ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <SendIcon />
                </Fab>
              </Box>
            </Stack>
          </form>
        </Paper>

        {/* メッセージリスト */}
        <Stack spacing={{ xs: 2, sm: 3 }}>
          {messages.length === 0 ? (
            <Paper
              elevation={1}
              sx={{
                p: 4,
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                📝 まだメッセージがありません
              </Typography>
              <Typography variant="body2" color="text.secondary">
                上のフォームから最初のメッセージを投稿してみましょう！
              </Typography>
            </Paper>
          ) : (
            <>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 2, textAlign: 'center' }}
              >
                {messages.length} 件のメッセージ
              </Typography>
              {messages.map((message) => (
                <Card
                  key={message.id}
                  elevation={3}
                  sx={{
                    borderRadius: { xs: 2, sm: 3 },
                    overflow: 'hidden',
                    background: colors.surface,
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(59, 130, 246, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 30px rgba(59, 130, 246, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={formatRelativeTime(message.date)}
                        size="small"
                        variant="outlined"
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          borderColor: colors.primary,
                          color: colors.primary,
                          backgroundColor: 'rgba(59, 130, 246, 0.05)',
                        }}
                      />
                    </Box>

                    <Typography
                      variant="body1"
                      component="p"
                      sx={{
                        lineHeight: 1.7,
                        color: '#1f2937',
                        mb: message.image ? 2 : 0,
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        fontWeight: 400,
                      }}
                    >
                      {message.text}
                    </Typography>

                    {message.image && (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '100%',
                          mt: 2,
                        }}
                      >
                        <Box
                          component="img"
                          src={message.image}
                          alt="Post Image"
                          sx={{
                            maxWidth: '100%',
                            maxHeight: 400,
                            objectFit: 'contain',
                            borderRadius: 2,
                            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.02)',
                            },
                          }}
                        />
                      </Box>
                    )}
                  </CardContent>

                  <Divider sx={{ borderColor: 'rgba(59, 130, 246, 0.1)' }} />

                  <CardActions sx={{ justifyContent: 'flex-end', p: { xs: 1.5, sm: 2 } }}>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteMessage(message.id)}
                      sx={{
                        borderRadius: 2,
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        '&:hover': {
                          backgroundColor: 'rgba(244, 67, 54, 0.08)',
                        },
                      }}
                    >
                      削除
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default App;