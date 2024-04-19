import './App.css'
import NavBar from './components/NavBar'
import { Box, CircularProgress, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/styles.scss';
import theme from './theme';
import BottomBar from './components/Subfooter';
import { Suspense } from 'react';
import PageHandler from './Pages';
import Landing from './components/Landing/Landing';
import { useSelector } from 'react-redux';
import { RootState } from './models/store';

const App = () => {
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);
  console.log(activeTab)

    return (
    <ThemeProvider theme={theme}>
      <Router>
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1}}>
    <NavBar />
    <Suspense fallback={<CircularProgress />}>
            <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/:page" element={<PageHandler />} />
        </Routes>
            </Suspense>
       {activeTab !== 'auth' && <BottomBar/>}  
    </Box>
    </Router>
    </ThemeProvider>
  );
}

export default App
