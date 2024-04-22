import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function LikesPage() {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user._id;
      try {
        const response = await axios.get(`http://localhost:5000/api/likes/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLikes(response.data.posts.reverse()); // Reverse the order of liked posts
      } catch (error) {
        console.error(error);
      }
    };

    fetchLikes();
  }, []);

  return (
    <div className="likes-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Likes</h2>
      {likes.length > 0 ? (
        <div className="post-cards" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {likes.map((post) => (
            <Card key={post._id} sx={{ width: 345, margin: '10px' }}>
              <CardMedia
                component="img"
                height="140"
                image={post.image}
                alt={post.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No liked posts</p>
      )}
    </div>
  );
}

export default LikesPage;
