import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Person } from '@mui/icons-material'; // Import the person icon
import './ProfilePage.css';

function ProfilePage() {
  const [username, setUsername] = useState('');

  const LogoutHandler=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href='/auth/login';
  }
  useEffect(() => {
    // Fetch the username from localStorage on component mount
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUsername(storedUser.username);
    }
  }, []);

  return (
    <Grid container spacing={2} className="profile-page">
      <Grid item xs={12}>
        {/* Use Avatar component with the Person icon */}
        <Avatar alt="Profile" className="profile-image">
          <Person fontSize="large" />
        </Avatar>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" className="username">{username}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" className="logout-button" onClick={LogoutHandler}>Logout</Button>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
