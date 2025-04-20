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
} from '@mui/material';

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
      };
      reader.readAsDataURL(image);
    } else {
      const id = await db.posts.add({
        text,
        image: null,
        date: createdAt,
      });

      newPost = { id, text, image: null, date: createdAt };
    }

    setPosts((prev) => [newPost, ...prev]);
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
    <Container>
      <Typography variant="h2" gutterBottom align="center">
        My SNS APP
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="今の気分はいかがでしょうか？"
          multiline
          fullWidth
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Box display="flex">
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mr: 2, height: 48 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/png, image/jpg, image/gif"
              onChange={(e) => handleSelectImage(e)}
            />
          </Button>
          <Button
            variant="contained"
            onClick={handlePost}
            disabled={!text}
            sx={{ width: 160, height: 48 }}
          >
            Post
          </Button>
          {image && (
            <Box
              component="img"
              alt="Preview"
              src={URL.createObjectURL(image)}
              sx={{
                maxWidth: '100%',
                maxHeight: '200px',
                marginLeft: 2,
                borderRadius: 4,
                border: '1px solid #ddd',
              }}
            />
          )}
        </Box>

        {posts.map((post) => (
          <Card key={post.id} sx={{ padding: 1 }}>
            <CardContent>
              <Typography variant="h5" component="p">
                {post.text}
              </Typography>
              {post.image && (
                <Box
                  component="img"
                  src={post.image}
                  alt="Post Image"
                  sx={{
                    maxHeight: '200px',
                    objectFit: 'contain',
                    mt: 2,
                  }}
                />
              )}
              <Box component="div">
                <Typography variant="caption" color="primary">
                  {post.date}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                size="small"
                color="error"
                onClick={() => deletePost(post.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default App;
