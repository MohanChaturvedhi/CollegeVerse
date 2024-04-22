import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, TextField, Button, Grid } from '@mui/material';

function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username: username,
        email: email,
        password: password,
      });
      localStorage.setItem('token', response.data.Token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        {/* Image Section */}
        <Grid item xs={8}>
          <img src="https://img.freepik.com/free-vector/cloud-background-with-nice-social-networking-icons_23-2147605684.jpg" alt="placeholder" style={{ width: '100%', height: 'auto' }} />
        </Grid>

        {/* Form Section */}
        <Grid item xs={4}>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom>
              SignUp Page
            </Typography>
            <form onSubmit={signupHandler}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} type="submit">
                Submit
              </Button>
              <Button color="secondary" fullWidth style={{ marginTop: '10px' }} onClick={() => navigate('/auth/login')}>
                Login
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignupPage;
