/* src/SignIn.js */
import React, { useEffect, useState, Component, useRef } from 'react'
import { Amplify, API, Auth, graphqlOperation } from 'aws-amplify'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { HashRouter, NavLink, useNavigate } from 'react-router-dom';
import styles from './Login.module.css'
import logo from './assets/minerva.svg'


const Login = () => {    
  const navigate = useNavigate()
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  // Check localstorage for user email
  useEffect(() => {
    emailRef.current.value = localStorage.getItem('userEmail')
     
},[])


async function handleLogin(asStudent) {
  console.log(passwordRef.current.value)
  console.log(emailRef.current.value)
  const user = await Auth.signIn(
    {password: passwordRef.current.value,
    username:emailRef.current.value
    }
  )

  // Get user role like this
  const attributes = await Auth.userAttributes(user)
  console.log(attributes)
  const role = attributes.find(entry => entry.Name === 'custom:role')
  // Login as student was pressed
  if (asStudent) {
    // User has the correct role
    if (role.Value === 'student') {
      navigate('../StudentDashboard')
    } else {
      console.log('Error: student role not found for this account')
    }
  // Login as educator was pressed
  } else {
    // User has the correct role
    if (role.Value === 'educator') {
      navigate('../EducatorDashboard')
    } else {
      console.log('Error: educator role not found for this account')
    }
  }
}


  return(
  <>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    />
    <div className={styles.student_signin}>
      <img className={styles.logo} width={150} height={150} src={logo}/>
      <div className={styles.inputcontainer}>
      <p className={styles.containerlabel}>Email</p>
        <hr/>
        <input className={styles.email} ref={emailRef} name="email" placeholder="Username@gmail.com" />
      </div>
      <div className={styles.inputcontainer}>
      <p className={styles.containerlabel}>Password</p>
        <hr/>
            <input
              className={styles.password}
              ref={passwordRef}
              type="password"
              name="password"
              placeholder="············"
            />
      </div>
      <br height='5px'/>
      <button className={styles.login} onClick={() => handleLogin(true)}>Login As Student</button>
      <p  color='black'>or</p>
      <button className={styles.login} onClick={() => handleLogin(false)}>Login As Educator</button>
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