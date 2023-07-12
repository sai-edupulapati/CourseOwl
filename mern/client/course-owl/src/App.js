import logo from './logo.svg';
import './App.css';
import atlasConfig from "./atlasConfig.json";
import ButtonAppBar from './components/landing_page';
import MainLogin from './components/login_page';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Register from './components/register_page';
import { ThemeProvider } from '@emotion/react';
import { AppProvider } from './components/RealmApp';
const { appId } = atlasConfig;

export default function ProvidedApp() {
  return (
    <>
      <AppProvider appId={appId}>
        <App />
      </AppProvider>
      </>
    
  );
}

function App() {
  return (
    // <ButtonAppBar></ButtonAppBar>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ButtonAppBar /> } />
        <Route path='/login' element={<MainLogin />} />
        <Route path='/register' element={<Register />} /> 
        </Routes>
    </BrowserRouter>
  );
}


