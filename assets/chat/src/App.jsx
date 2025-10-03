import { useEffect, useState } from 'react';
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

const db = new Dexie('SocialApp'); //データベース名
db.version(1).stores({
  posts: '++id, text, image, createdAt', // テーブル名，カラム
});

// Color palette
const colors = {
  primary: '#3B82F6', // Blue
  secondary: '#10B981', // Emerald
  gradient: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
  gradientHover: 'linear-gradient(135deg, #2563EB 0%, #059669 100%)',
  surface: 'rgba(255, 255, 255, 0.95)',
  background: 'linear-gradient(135deg, #F0F9FF 0%, #ECFDF5 100%)',
};

function App() {
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const allPosts = await db.posts.toArray();
      setPosts(allPosts.reverse());
    })();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();

    const createdAt = new Date().toLocaleString();
    let newPost;

    if (image) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageData = reader.result;

        const id = await db.posts.add({
          text,
          image: imageData,
          date: createdAt,
        });

        newPost = { id, text, image: imageData, date: createdAt };
        setPosts((prev) => [newPost, ...prev]);
      };

      reader.readAsDataURL(image);
    } else {
      const id = await db.posts.add({
        text,
        image: null,
        date: createdAt,
      });

      newPost = { id, text, image: null, date: createdAt };
      setPosts((prev) => [newPost, ...prev]);
    }

    setImage(null);
    setText('');
  };

  const deletePost = async (id) => {
    if (window.confirm('本当に削除しても良ぇのん？')) {
      await db.posts.delete(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    }
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 1, sm: 2 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Container
        sx={{ maxWidth: { xs: '100%', sm: '720px' }, px: { xs: 0, sm: 3 } }}
      >
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
                fontSize: { xs: '1.8rem', sm: '3rem' },
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
          <Stack spacing={{ xs: 2, sm: 3 }}>
            <TextField
              label="今の気分はいかがでしょうか？"
              multiline
              fullWidth
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              variant="outlined"
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
              </Paper>
            )}

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
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
                  accept="image/png, image/jpg, image/gif"
                  onChange={(e) => handleSelectImage(e)}
                />
              </Button>

              <Fab
                color="primary"
                onClick={handlePost}
                disabled={!text}
                size="large"
                sx={{
                  background: text ? colors.gradient : undefined,
                  '&:hover': {
                    background: text ? colors.gradientHover : undefined,
                  },
                  transition: 'all 0.3s ease',
                  transform: text ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <SendIcon />
              </Fab>
            </Box>
          </Stack>
        </Paper>

        <Stack spacing={{ xs: 2, sm: 3 }}>
          {posts.map((post) => (
            <Card
              key={post.id}
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
                  boxShadow: `0 12px 30px rgba(59, 130, 246, 0.15)`,
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={post.date}
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
                    mb: post.image ? 2 : 0,
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    fontWeight: 400,
                  }}
                >
                  {post.text}
                </Typography>

                {post.image && (
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
                      src={post.image}
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

              <CardActions
                sx={{ justifyContent: 'flex-end', p: { xs: 1.5, sm: 2 } }}
              >
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => deletePost(post.id)}
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
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
