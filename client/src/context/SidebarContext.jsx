// SidebarProvider.jsx
import React, { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);
const SidebarProvider = ({ children }) => {

  const location = useLocation();
  const { pathname } = location;
  const sidebarItems = [
    {
      label: 'Home',
      path: '/home',
      icon: <HomeIcon />,
      active: pathname === '/home',
      show: true,
    },
    {
      label: 'Add Post',
      path: '/home/addpost',
      icon: <AddBoxIcon />,
      active: pathname === '/home/addpost',
      show: true,
    },
    {
      label: 'Likes',
      path: '/home/likes',
      icon: <FavoriteIcon />,
      active: pathname === '/home/likes',
      show: true,
    },
    {
      label: 'Profile',
      path: '/home/profile',
      icon: <AccountCircleIcon />,
      active: pathname === '/home/profile',
      show: true,
    },
  ];
  return (
    <SidebarContext.Provider value={{ items: sidebarItems }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
