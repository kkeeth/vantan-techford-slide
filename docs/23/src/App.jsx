import { useState, useEffect } from "react";
import { db, storage } from "./firebaseConfig";
import { collection, addDoc, doc, deleteDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Container, Stack, TextField, Button, Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsArray);
    });
    return () => unsubscribe();
  }, []);

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImage(file);
    }
  };

  const handlePost = async () => {
    if (!content && !image) return;

    try {
      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "posts"), {
        content,
        imageUrl,
        createdAt: new Date().toLocaleString(),
      });

      setContent("");
      setImage(null);
      console.log("Post saved to Firestore!");
    } catch (error) {
      console.error("Error writing to Firestore:", error);
    }
  };

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        setPosts(posts.filter((post) => post.id !== id)); // ローカル状態を更新
        console.log("Post deleted!");
      } catch (error) {
        console.error("Error deleting post: ", error);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        My Social App
      </Typography>
      <Stack spacing={4}>
        <Box component="form" noValidate autoComplete="off" sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="What's on your mind?"
            variant="outlined"
            multiline
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="center">
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
                onChange={(e) => handleSelectImage(e)}
              />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePost}
              sx={{ width: 160, height: 48 }}
            >
              Post
            </Button>
            {image && (
              <Box
                component="img"
                src={URL.createObjectURL(image)}
                alt="Preview"
                sx={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "200px",
                  marginLeft: 2,
                  objectFit: "cover",
                  borderRadius: 4,
                  border: "1px solid #ddd",
                }}
              />
            )}
          </Box>

        </Box>

        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent>
              <Typography variant="body1">{post.content}</Typography>
              {post.imageUrl && (
                <Box
                  component="img"
                  src={post.imageUrl}
                  alt="Post Image"
                  sx={{
                    maxHeight: "300px",
                    objectFit: "contain",
                    mt: 2
                    }}
                />
              )}
              <Box component="div">
                <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
                  Posted at: {post.createdAt?}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "right"}}>
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
};

export default App;
