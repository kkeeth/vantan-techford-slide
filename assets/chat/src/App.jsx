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
  Avatar,
  Fab,
  Paper,
  Divider,
  Chip,
} from '@mui/material';
import {
  Send as SendIcon,
  Image as ImageIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const db = new Dexie('SocialApp'); //データベース名
db.version(1).stores({
  posts: '++id, text, image, createdAt', // テーブル名，カラム
});

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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 2,
      }}
    >
      <Container sx={{ maxWidth: '720px', width: '100%' }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            mb: 3,
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              py: 3,
              px: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
              💬 My SNS APP
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              今の気持ちをシェアしよう
            </Typography>
          </Box>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            borderRadius: 3,
            p: 3,
            mb: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                <PersonIcon />
              </Avatar>
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
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                }}
              />
            </Box>

            {image && (
              <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
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

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<ImageIcon />}
                sx={{
                  flex: 1,
                  height: 48,
                  borderRadius: 2,
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(102, 126, 234, 0.04)',
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
                  background: text
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : undefined,
                  '&:hover': {
                    background: text
                      ? 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
                      : undefined,
                  },
                }}
              >
                <SendIcon />
              </Fab>
            </Box>
          </Stack>
        </Paper>

        <Stack spacing={3}>
          {posts.map((post) => (
            <Card
              key={post.id}
              elevation={3}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      background:
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    <PersonIcon fontSize="small" />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: '#667eea',
                        mb: 0.5,
                      }}
                    >
                      あなた
                    </Typography>
                    <Chip
                      label={post.date}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 20,
                        fontSize: '0.75rem',
                        borderColor: '#667eea',
                        color: '#667eea',
                      }}
                    />
                  </Box>
                </Box>

                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    lineHeight: 1.6,
                    color: '#2d3748',
                    mb: post.image ? 2 : 0,
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
                        maxWidth: '80%',
                        maxHeight: 400,
                        objectFit: 'contain',
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                  </Box>
                )}
              </CardContent>

              <Divider />

              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => deletePost(post.id)}
                  sx={{
                    borderRadius: 2,
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
