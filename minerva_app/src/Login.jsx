/* src/SignIn.js */
import React, { useEffect, useState, Component } from 'react'
import { Amplify, API, Auth, graphqlOperation } from 'aws-amplify'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { HashRouter, NavLink } from 'react-router-dom';
import styles from './Login.module.css'
import './assets/minerva.svg'


const Login = () => {    
  return(
  <>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    />
    <div className={styles.student_signin}>
      <img className={styles.logo} width={150} height={150} src='src/assets/minerva.svg'/>
      <div className={styles.inputcontainer}>
      <p className={styles.containerlabel}>Email</p>
        <hr/>
        <input className={styles.email} name="email" placeholder="Username@gmail.com" />
      </div>
      <div className={styles.inputcontainer}>
      <p className={styles.containerlabel}>Password</p>
        <hr/>
            <input
              className={styles.password}
              type="password"
              name="password"
              placeholder="············"
            />
      </div>
      <br height='5px'/>
      <button className={styles.login}>Login As Student</button>
      <p  color='black'>or</p>
      <button className={styles.login}>Login As Educator</button>
      <div className={styles.footer}>
        <NavLink to="/SignUp">Sign Up</NavLink>
        {/* <NavLink>Forgot Password?</NavLink> */}  
      </div>
    </div>
    {/* partial */}
  </>
    )

}

export default Login 