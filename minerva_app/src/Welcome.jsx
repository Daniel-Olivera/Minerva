import React, { useEffect, useState, Component } from 'react'
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import styles from './Welcome.module.css'

const Welcome = () => {
    return(
        <div className={styles.welcome}>
          <h1>Welcome To Minerva</h1>
          <div className={styles.box}>
            <NavLink to="/Login">Log in</NavLink>
            <NavLink to="/SignUp">Sign Up</NavLink>
          </div>
        </div>
    )
}


export default Welcome