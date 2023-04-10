import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import ProfileComponent from './ProfileComponent'


function Navbar() {
    const { auth } = useContext(AuthContext)

    return (
    <div className="navbar">
        <div className="nav--left row">
            <a href='/'>SnapInspire</a>
        </div>
        <div className="nav--right row">

            {
                auth?.name ? <ProfileComponent/> : 
                    <>
                        <a className="about">About</a>
                        <a href='/signin' className="signin">Signin</a>
                        <a href='/signup' className="signup">signup</a> 
                    </>
                
            }
            {/* <a className="about">About</a>
            <a href='/signin' className="signin">Signin</a>
            <a href='/signup' className="signup">signup</a> */}
        </div>
    </div>
    )
}

export default Navbar