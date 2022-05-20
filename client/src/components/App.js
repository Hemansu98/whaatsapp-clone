import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Register from './Register';
import Login from './Login';
import Home from './Home';
import SetAvatar from "./SetAvatar";
import './../scss/index.scss';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/setAvatar' element={<SetAvatar/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
