import logo from './logo.svg';
import './App.css';
import ButtonAppBar from './components/landing_page';
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar';
import Grades from './components/grades';


// import ReactDOM from "react-dom/client";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ButtonAppBar />}></Route>
        <Route path="/navbar" element={<NavBar />} />
        <Route path='/grades' element={<Grades />} />
      </Routes>
    </BrowserRouter>

    // <ButtonAppBar></ButtonAppBar>
  );
}

export default App;
