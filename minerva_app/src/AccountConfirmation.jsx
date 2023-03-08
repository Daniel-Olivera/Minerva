/* src/signup.js */
import React, { useEffect, useState, Component, useRef } from 'react'
import styles from './AccountConfirmation.module.css'
import { HashRouter, NavLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useAuth } from './AuthUtils'
import { Navigate } from 'react-router-dom';




const AccountConfirmation = () => {
    const codeRef = useRef(null)
    const { currUser, login } = useAuth()
    
    useEffect(() => {
        const data = localStorage.getItem('currUser')
        login(JSON.parse(data))
        console.log("currUser: " + currUser)
    },[])

    async function handleClick()  {
        try {
            console.log(currUser)
            await awaitAuth.verifyUserAttributeSubmit(currUser,'email',codeRef.current.value)
            .then(() => {
                console.log('email verified')
                Auth.currentAuthenticatedUser().then((user) => {
                    console.log(user)
                    localStorage.setItem('currUser',user)
                })
            })
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"/>
            <div className={styles.account_confirmation}>
                <img className={styles.logo} width={150} height={150} src='src/assets/minerva.svg'/>
                <div className={styles.inputcontainer}>
                    <p className={styles.containerlabel}>Enter Your Confirmation Code</p>
                    <hr />
                    <input ref={codeRef} name='code' placeholder='######' type='number' maxLength={6} />
                </div>
                    <button onClick={() =>this.handleClick}>Verify</button>
            </div>
        </>
    )
}

export default AccountConfirmation