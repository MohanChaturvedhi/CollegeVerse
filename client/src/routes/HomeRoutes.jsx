import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AddPostPage from '../pages/AddPostPage';
import LikesPage from '../pages/LikesPage';
import ProfilePage from '../pages/ProfilePage';
import Sidebar from '../components/Sidebar';
import { Grid } from '@mui/material';

const HomeRoutes = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={9}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addpost" element={<AddPostPage />} />
          <Route path="/likes" element={<LikesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Grid>
    </Grid>
  );
}

export default HomeRoutes;
