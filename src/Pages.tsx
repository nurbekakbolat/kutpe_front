import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Tabs } from './models/slices/types';

const Landing = lazy(() => import('./components/Landing/Landing'));
const Nearby = lazy(() => import('./components/Nearby/Nearby'));
const History = lazy(() => import('./components/History/History'));
const About = lazy(() => import('./components/About/QRCodeScan'));
const Place = lazy(() => import('./components/Nearby/Place'));
const Auth = lazy(() => import('./components/Auth/Auth'));

const PageComponents: Record<Tabs, React.ElementType> = {
  home: Landing,
  nearby: Nearby,
  history: History,
  about: About,
  place: Place,
  auth: Auth
};

const PageHandler = () => {
  const { page, id } = useParams();

  const PageComponent = PageComponents[page as Tabs] || PageComponents['home'];

  return (
    <Suspense fallback={<CircularProgress />}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: "flex-start",
      height: '100vh',
      alignItems: 'center',
      flexGrow: 1,
      padding: '20px',
      backgroundColor: '#ededed',
      color: '#121212'
    }}><PageComponent id={id} /></div>
    </Suspense>
  );
};

export default PageHandler;
