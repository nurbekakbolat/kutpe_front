import { AppBar, Toolbar, Typography, Container, Menu, MenuItem, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AccountCircle } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { useDispatch as reduxUseDispatch } from 'react-redux';
import { setActiveTab } from '../models/slices/tabsSlice';
import { fetchUserDetails } from '../models/slices/userSlice';
import { getToken } from '../client';
import { AppDispatch } from '../models/store';

const NavBar = () => {
  const [auth, setAuth] = useState<string | null>(getToken());
  const dispatch = reduxUseDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleAuth = () => {
    navigate('/auth');
    dispatch(setActiveTab('auth'))
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  }

  useEffect(() => {
    if (auth) {
      dispatch(fetchUserDetails())
      .then((res) => {
        setAuth(res.payload.username);
      })
      .catch((err) => {
        localStorage.removeItem('token');

        setAuth(null)
        console.error(err);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <AppBar position="static" elevation={3} sx={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      width: "100%",
      backgroundColor: "#294ed6",
      margin: 0
    }}>
      <Container maxWidth="xl" className="body-text">
      <Toolbar disableGutters>
          <Typography onClick={() => navigate('/')} variant="h6" fontWeight="bold" sx={{
            color: "#D6B129",
            letterSpacing: "0.1em",
            fontFamily: "sans-serif",
          }} component="div">
            Kutpe
          </Typography>
        
          {auth ? (
            <div style={{
              marginLeft: 'auto'
            
            }}>
              <IconButton 
              size="large"
              color="inherit"
              >
                <NotificationsIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          ) : (
            <div style={{
              marginLeft: 'auto'
            }}>
              <IconButton style={{color: "#D6B129"}} onClick={handleAuth}>
                <LoginIcon />
              </IconButton>
            </div>

          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};


NavBar.displayName = 'NavBar';
export default NavBar;
