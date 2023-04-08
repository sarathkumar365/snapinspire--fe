import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

function ProfileComponent() {

    const { auth } = useContext(AuthContext)
    const name = auth.name 


  return (
    <div className="profile--name__container">
        <p className="user__name">{name}</p>
    </div>
    )
}

export default ProfileComponent