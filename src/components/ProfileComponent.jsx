import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import profileIcon from '../resourses/svg/p3d.jpg'
import './CSS/profileComp.css'

function ProfileComponent() {

    const { auth } = useContext(AuthContext)
    const name = auth.name 


  return (
    <div className="profile--name__container">
        <img src={profileIcon}  alt="profile" className="profile__icon--svg" />
        <p className="user__name">{name}</p>
    </div>
    )
}

export default ProfileComponent