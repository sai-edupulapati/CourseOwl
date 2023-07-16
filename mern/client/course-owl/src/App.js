import logo from './logo.svg';
import './App.css';
import ButtonAppBar from './components/landing_page';
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar';
import Scheduler from './components/scheduler';
import Grades from './components/grades';


// import ReactDOM from "react-dom/client";

// Testing github commit working or not.

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ButtonAppBar />}></Route>
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path='/grades' element={<Grades />} />
        <Route path='/grades' element={<Grades />} />
      </Routes>
    </BrowserRouter>

    // <ButtonAppBar></ButtonAppBar>
  );
}

export default App;
