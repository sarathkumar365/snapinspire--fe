import React from 'react'

function Navbar() {
  return (
    <div className="navbar">
        <div className="nav--left row">
            <a href='/'>SnapInspire</a>
        </div>
        <div className="nav--right row">
            <a className="about">About</a>
            <a href='/signin' className="signin">Signin</a>
            <a href='/signup' className="signup">signup</a>
        </div>
    </div>
    )
}

export default Navbar