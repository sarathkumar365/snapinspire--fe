import React from 'react'
import { useFormik } from 'formik'

import img from '../resourses/images/9.webp'

function SignupComponent() {

  // formik
  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:''
    },

    // submit form
    onSubmit:(values) => {
      console.log(values)
    }
  })

  
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
                <p className="login__phrase">Signup</p>
            </div>
            <form onSubmit={formik.handleSubmit} className='login--form'>
              {/* <div className="login--box"> */}
                <div className="name--input form__group">
                  <input placeholder='name' type="text" value={formik.values.name} onChange={formik.handleChange} 
                  name="name" className='name--css form__field' required />
                  <label htmlFor="name" className='form__label'>Name</label>
                </div>
                <div className="name--input form__group">
                  <input placeholder='email' type="email" value={formik.values.email} onChange={formik.handleChange}
                   name="email" className='email--css form__field' required />
                  <label htmlFor="Email" className='form__label'>Email</label>
                </div>
                <div className="pass--input form__group">
                  <input placeholder='password' type="password" value={formik.values.password} onChange={formik.handleChange}
                   name="password" className='password--css form__field' required />
                  <label htmlFor="password" className='form__label'>Password</label>
                </div>
                <div className="">
                  {/* <button type="button" value="submit" /> */}
                  <button type='submit' className='submit--bttn'>SUBMIT</button>
                </div>
              {/* </div> */}
            </form>
      </div>
    </div>
    )

  
}

export default SignupComponent