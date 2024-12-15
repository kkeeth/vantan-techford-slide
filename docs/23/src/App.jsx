import React, { useState, useEffect } from "react";
import { db, storage } from "./firebaseConfig";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Container, TextField, Button, Box, Card, CardContent, Typography, Grid } from "@mui/material";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsArray);
    });
    return () => unsubscribe();
  }, []);

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
        createdAt: new Date(),
      });

      setContent("");
      setImage(null);
      console.log("Post saved to Firestore!");
    } catch (error) {
      console.error("Error writing to Firestore:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        My Social App
      </Typography>

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
            sx={{ mb: 2, mr: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePost}
          >
            Post
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card>
              <CardContent>
                <Typography variant="body1">{post.content}</Typography>
                {post.imageUrl && (
                  <Box
                    component="img"
                    src={post.imageUrl}
                    alt="post"
                    sx={{ width: "100%", mt: 2 }}
                  />
                )}
                <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
                  Posted at: {post.createdAt?.toDate().toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
