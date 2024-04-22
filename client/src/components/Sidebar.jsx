import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const Sidebar = () => {
  const { items } = useSidebar();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 300,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 300,
          boxSizing: 'border-box',
        },
      }}
    >
      <List >
        {items.map(item => (
          item.show && (
            <ListItem
              key={item.label}
              component={Link}
              to={item.path}
              button
              className={item.active ? 'active' : ''}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          )
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
