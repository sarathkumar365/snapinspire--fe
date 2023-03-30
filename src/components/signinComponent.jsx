import React from 'react'
import img from '../resourses/images/3.webp'


function SigninComponent() {
  return (
    <div className="signup--container">
        <div className="signup--left">
            <img className='signup--left__img' src={img} alt="signup--left_img" srcset="" />
        </div>
        <div className="signup--right">
            <div className='logo--phrase'>
                <h2>SnapInspire</h2>
            </div>
            <div className="login__phrase--div">
                <p className="login__phrase">Signin</p>
            </div>
            <form className='login--form'>
              {/* <div className="login--box"> */}
                <div className="name--input form__group">
                  <input placeholder='email' type="email" name="email" className='email--css form__field' required />
                  <label htmlFor="Email" className='form__label'>Email</label>
                </div>
                <div className="pass--input form__group">
                  <input placeholder='password' type="password" name="password" className='password--css form__field' required />
                  <label htmlFor="password" className='form__label'>Password</label>
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

export default SigninComponent