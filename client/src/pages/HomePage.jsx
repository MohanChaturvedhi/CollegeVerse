import React from 'react';
import Posts from '../components/Posts';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import RedditIcon from '@mui/icons-material/Reddit';
import Grid from '@mui/material/Grid';

function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: '#637bfe', textAlign: 'center', zIndex: 100, boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ padding: '20px 0', margin: 0, color: '#333333' }}>Home Page</h1>
      </div>
      <Grid container style={{ paddingTop: '100px', backgroundColor: '#f5f5f5', flexGrow: 1, maxWidth: '1200px' }}>
        <Grid item xs={6}>
          <Posts />
        </Grid>
        <div style={{ position: 'fixed', right: 0, width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField id="search" label="Search" variant="outlined" /> {/* Search filter */}
          <div style={{ marginTop: '20px' }}> {/* Social media icons */}
            <IconButton color="secondary" aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="Pinterest">
              <PinterestIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="Twitter">
              <TwitterIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="Facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="Reddit">
              <RedditIcon />
            </IconButton>
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default HomePage;