import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, TextField, Button, Grid, Link } from '@mui/material';
import { Instagram, Facebook, Twitter } from '@mui/icons-material';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
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
    <div style={{
      backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9CtaGaCjWc-DF3FuVLk1I6FqQy5BkxzTLsuhWCoN6fQ&s")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', maxWidth: '400px', width: '100%' }}>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
          Login Page
        </Typography>
        <form onSubmit={loginHandler}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} type="submit">
            Submit
          </Button>
          <Button color="secondary" fullWidth style={{ marginTop: '10px' }} onClick={() => navigate('/auth/signup')}>
            Signup
          </Button>
        </form>
        <Grid container justifyContent="center" spacing={1} style={{ marginTop: '20px' }}>
          <Grid item>
            <Link href="" style={{ color: '#3f729b' }}>
              <Instagram />
            </Link>
          </Grid>
          <Grid item>
            <Link href="" style={{ color: '#3b5998' }}>
              <Facebook />
            </Link>
          </Grid>
          <Grid item>
            <Link href="" style={{ color: '#55acee' }}>
              <Twitter />
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default LoginPage;
