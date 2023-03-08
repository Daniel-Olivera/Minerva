/* src/App.js */
import React, { useEffect, useState, Component } from 'react'
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter, Routes, Route, NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom';
import styles from './App.module.css'
import Welcome from './Welcome';
import Todo from './Todo'
import { Amplify } from 'aws-amplify';
import awsExports from "./aws-exports";
import awsconfig from "./aws-exports";
import {useAuth } from "./AuthUtils";
import Login from './Login';
import SignUp from './SignUp';
import AccountConfirmation from './AccountConfirmation';

Amplify.configure(awsconfig)
Amplify.configure(awsExports);


function RequireAuth({ children }) {
  const { currUser } = useAuth();
  return authed.isSigneIn === true 
  ? children 
  :  <Navigate to="/Login"/>;
}


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<Welcome/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/AccountConfirmation" element={<AccountConfirmation/>}/>
          <Route path ="/Todo" element={
            <RequireAuth>
              <Todo/> 
            </RequireAuth>
          }/>
        </Routes>
      </BrowserRouter>
    )
  }
}


export default App