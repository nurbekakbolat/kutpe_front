import { Toolbar, IconButton, Container, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HistoryIcon from '@mui/icons-material/History';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../models/slices/tabsSlice';
import { Tabs } from '../models/slices/types';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../models/store';

const BottomBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);
  const handleTabChange = (tab: Tabs) => {
    navigate(`/${tab}`);
    dispatch(setActiveTab(tab));
  }

  return (
    <Box sx={{ backgroundColor: "#294ed6", position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000, width: "100%" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-around' }}>
          <IconButton disableRipple sx={{
            color: activeTab === 'home' ? "#012035" : "inherit"
          }} onClick={() => handleTabChange('home')} aria-label="Home">
            <HomeIcon />
          </IconButton>
          <IconButton sx={{
            color: activeTab === 'nearby' ? "#012035" : "inherit"
          }} onClick={() => handleTabChange('nearby')} aria-label="Nearby">
            <LocationOnIcon />
          </IconButton>
          <IconButton sx={{
            color: activeTab === 'about' ? "#012035" : "inherit"
          }} onClick={() => handleTabChange('about')} aria-label="About Us">
            <InfoIcon />
          </IconButton>
          <IconButton sx={{
            color: activeTab === 'history' ? "#012035" : "inherit"
          }} onClick={() => handleTabChange('history')} aria-label="Contact">
            <HistoryIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default BottomBar;
