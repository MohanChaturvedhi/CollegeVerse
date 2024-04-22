import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]); 
  const [anchorEl, setAnchorEl] = useState(null);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/post', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        // Reverse the order of posts before setting state
        setPosts(response.data.posts.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();

    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/likes/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        setLikedPosts(response.data.posts.map(post => post._id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchLikedPosts();
  }, []);

  const handleLike = async (postId) => {
    console.log(`Post ${postId} liked.`);
    try {
      const response = await axios.post(`http://localhost:5000/api/likes/${postId}`, {
        userId: userId,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      console.log(response.data);
      const updatedPosts = posts.map(post => {
        if (post._id === postId) {
          return { ...post, liked: !post.liked };
        }
        return post;
      });
      setPosts(updatedPosts);
      if (!likedPosts.includes(postId)) {
        setLikedPosts(prevLikedPosts => [...prevLikedPosts, postId]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowLikes = async (postId, event) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/post/${postId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      setLikedUsers(response.data.usernames);
      setAnchorEl(event.currentTarget);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {posts.map(post => (
        <Card key={post.id} style={{ width: '100%', marginBottom: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)', transition: '0.3s', '&:hover': { boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)' } }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {post.username}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" onClick={(e) => handleShowLikes(post._id, e)}>
                <MoreVertIcon />
              </IconButton>
            }
            title={post.title}
            subheader={formatDate(post.createdAt)}
          />
          <CardMedia
            style={{ height: 300 }}
            image={post.image}
            title={post.title}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={() => handleLike(post._id)} color={likedPosts.includes(post._id) ? 'error' : 'inherit'}>
              <FavoriteIcon color={likedPosts.includes(post._id) ? 'error' : 'inherit'} />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
      {likedUsers.length > 0 && (
        <div>
          <h3>Liked By:</h3>
          <ul>
            {likedUsers.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Posts;
