import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Protected from './components/Protected';
import ResetPassword from './components/ResetPassword';


function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
      <Route path="/" element={<Register/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/protected" element={<Protected/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />
     
      </Routes>
          
      </div>
    </Router>
  );
}

export default App;
