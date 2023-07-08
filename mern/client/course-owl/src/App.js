import logo from './logo.svg';
import './App.css';
import ButtonAppBar from './components/landing_page';
import MainLogin from './components/login_page';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Register from './components/register_page';


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

export default App;
