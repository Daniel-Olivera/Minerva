/* src/signup.js */
import React, { useEffect, useState, Component, useRef } from 'react'
import styles from './SignUp.module.css'
import { HashRouter, Navigate, useNavigate, NavLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useAuth } from './AuthUtils';
import logo from './assets/minerva.svg'


const SignUp = () =>  {   
  const navigate = useNavigate()
  const { currUser, login } = useAuth()
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passRef = useRef(null)

  const amplifySignInRef = useRef();
  const setAmplifySignInRef = (node) => {
    if (node) {
      const array = [...node.children];
      if (array.some((val) => val.nodeName === "AMPLIFY-SIGN-IN")) 
      {
        amplifySignInRef.current = array.find(
          (val) => val.nodeName === "AMPLIFY-SIGN-IN"
        );
      }
    }
  };


  const handleStuSignUp = async (ev) => {
    const authData = {
      username: emailRef.current.value,
      password: passRef.current.value,
      attributes: {
        name: nameRef.current.value,
        'custom:role': "student",
      }  
    }
    
    try {
      const {user} = await Auth.signUp(authData)
      localStorage.setItem('userEmail',(user.getUsername()))
      navigate("/AccountConfirmation")
    } catch (e) {
      console.log(e)

    }
    console.log("signed in user is " + JSON.stringify(currUser))
  }

  return(
  <>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    />
    <div className={styles.student_signup}>
      <img className={styles.logo} width={150} height={150} src={logo}/>
      <div className={styles.inputcontainer}>
        <p className={styles.containerlabel}>Username</p>
        <hr/>
        <input className={styles.username}  ref={nameRef} name='name' type='username' placeholder='Ex. JohnDaBomb777' />
      </div>
      <div className={styles.inputcontainer}>
        <p className={styles.containerlabel}>Email Adress</p>
        <hr/>
        <input className={styles.email} ref={emailRef}name="email" placeholder='Username@gmail.com' />
      </div>
      <div className={styles.inputcontainer}>
        <p className={styles.containerlabel}>Password</p>
        <hr/>
        <input className={styles.password} ref={passRef} type="password" name="password" placeholder="············"/>
      </div>
      <br height='5px'/>
      <button className={styles.signup} onClick={handleStuSignUp}>Sign Up As Student</button>
      <p  color='black'>or</p>
      <button className={styles.signup}>Sign Up As Educator</button>
      <div className={styles.footer}>
        <NavLink to='/Login'>Log In</NavLink>  
      </div>
    </div>
    {/* partial */}
  </>
    )

}

export default SignUp