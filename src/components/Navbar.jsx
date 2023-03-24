import React from 'react'

function Navbar() {
  return (
    <div className="navbar">
        <div className="nav--left row">
            <p>SnapInspire</p>
        </div>
        <div className="nav--right row">
            <p className="about">About</p>
            <p className="signin">Signin</p>
            <p className="signup">signup</p>
        </div>
    </div>
    )
}

export default Navbar