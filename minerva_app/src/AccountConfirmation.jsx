/* src/signup.js */
import React, { useEffect, useState, Component, useRef } from 'react'
import styles from './AccountConfirmation.module.css'
import { HashRouter, NavLink, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useAuth } from './AuthUtils'
import logo from './assets/minerva.svg'
import Swal from "sweetalert2"



const AccountConfirmation = () => {
    const navigate = useNavigate()
    const codeRef = useRef(null)
    const { currUser, login } = useAuth()
    var email = ""
    

    // Check localstorage for user email
    useEffect(() => {
        email = localStorage.getItem('userEmail')
        console.log(currUser)
    },[])

    async function handleClick()  {
        try {
            Auth.confirmSignUp(email,codeRef.current.value).then((data) => {
                if (data == "SUCCESS") {
                    Swal.fire({
                        title: 'Confirming Account...',
                        showConfirmButton: false,
                        showCancelButton: false,
                        timerProgressBar: true,
                        timer:1500
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isDismissed) {
                            Swal.fire({title:'Success!',
                            timer:600,
                            showConfirmButton: false,
                            icon:'success'
                        })
                            navigate("../Login",{replace:"true"})
                        } 
                      })
                    navigate("")
                }
            })
            console.log(currUser)
            // await Auth.verifyUserAttributeSubmit(currUser,'email',codeRef.current.value)
            // .then(() => {
            //     console.log('email verified')
            //     Auth.currentAuthenticatedUser().then((user) => {
            //         console.log(user)
            //         localStorage.setItem('currUser',user)
            //     })
            // })
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
                <img className={styles.logo} width={150} height={150} src={logo}/>
                <div className={styles.inputcontainer}>
                    <p className={styles.containerlabel}>Check Your Email For Your Confirmation Code</p>
                    <hr />
                    <input ref={codeRef} name='code' placeholder='######' type='number' maxLength={6} />
                </div>
                    <button onClick={handleClick}>Verify</button>
            </div>
        </>
    )
}

export default AccountConfirmation