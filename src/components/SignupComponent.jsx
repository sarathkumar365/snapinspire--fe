import React from 'react'

import img from '../resourses/images/r/2.jpg'

function SignupComponent() {
  return (
    <div className="signup--container">
      <div className="signup--left">
          <img className='signup--left__img' src={img} alt="signup--left_img" srcset="" />
      </div>
      <div className="signup--right">
            <form >
              {/* <div className="login--box"> */}
                <div className='logo--phrase'>
                  <h2>SnapInspire</h2>
                </div>
                <div className="login__phrase--div">
                  <p className="login__phrase">Login</p>
                </div>
                <div className="email--input">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" className='email--css' />
                </div>
                <div className="pass--input">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" className='password--css' />
                </div>
                <div className="submit--bttn">
                  <input type="button" value="submit" />
                </div>
              {/* </div> */}
            </form>
      </div>
    </div>
    )

  
}

export default SignupComponent