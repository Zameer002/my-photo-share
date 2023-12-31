import React from 'react'
import Login from './views/Login'
import Home from './views/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './views/Upload';
import Header from './views/Header';
import PrivateRoute from './views/PrivateRoute';
import { useSelector } from 'react-redux';

const App = () => {
  const back = true
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Header/>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Header back={back} />
              <Upload />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

