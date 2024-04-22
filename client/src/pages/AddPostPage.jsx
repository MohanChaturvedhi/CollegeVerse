import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

function AddPostPage() {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('description', description);
      const user=JSON.parse(localStorage.getItem('user'));
      console.log(user);
      const userId=user._id;
      formData.append('userId', userId);
      const response = await axios.post('http://localhost:5000/api/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" align="center">
          Add Post
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/webp, image/png"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ display: 'none' }}
          id="upload-button-file"
        />
        <label htmlFor="upload-button-file">
          <Button variant="contained" component="span" sx={{ mb: 2 }}>
            Upload Image
          </Button>
        </label>
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Post
        </Button>
      </Box>
    </Container>
  );
}

export default AddPostPage;