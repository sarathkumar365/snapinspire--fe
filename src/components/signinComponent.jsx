import React from 'react'
import  { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from '../API/api';
import { useFormik } from 'formik'
import * as yup from 'yup';

import ErrorComponent from './ErrorComponent';
import img from '../resourses/images/3.webp'


function SigninComponent() {

  const navigate = useNavigate();

  const [errFound,seterrFound  ] = useState([])

  const handleSignin = async (userDetails) => {
    try {
      const userCreated = await api.post('/auth/login',userDetails)
      console.log(userCreated);
      if(userCreated.status === 200) navigate('/home')
    } catch (error) {
      console.log(error);
      seterrFound(oldErrs => {
        return [...oldErrs, error.response]
      })
    }
  } 

  // formik
  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },

    // Validate form values
    validationSchema: yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required')
    }),

    // submit form
    onSubmit:(values) => {
      handleSignin(values)
    }
  })

  const errName  = {
    color:formik.touched.name && formik.errors.name ? '#e21818' : ''
  }

  const errEmail  = {
    color:formik.touched.email && formik.errors.email ? '#e21818' : ''
  }

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
            {errFound ? <ErrorComponent errData = {errFound}/> : ''}

            <form onSubmit={formik.handleSubmit} className='login--form'>
              {/* <div className="login--box"> */}
                {/* <div className="name--input form__group">
                  <input placeholder='email' type="email" name="email" className='email--css form__field' required />
                  <label htmlFor="Email" className='form__label'>Email</label>
                </div>
                <div className="pass--input form__group">
                  <input placeholder='password' type="password" name="password" className='password--css form__field' required />
                  <label htmlFor="password" className='form__label'>Password</label>
                </div> */}
                <div className="name--input form__group">
                  <input placeholder='email' type="email" value={formik.values.email} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                   name="email" className='email--css form__field' required />
                  <label htmlFor="Email" style={errEmail} className='form__label'>
                    {/* Email */}
                    {formik.touched.email && formik.errors.email ? formik.errors.email : 'Email'}
                    </label>
                </div>
                <div className="pass--input form__group">
                  <input placeholder='password' type="password" value={formik.values.password} onChange={formik.handleChange}
                   name="password" className='password--css form__field' required />
                  <label htmlFor="password" className='form__label'>Password</label>
                </div>
                <div className="">
                  <button type='submit' className='submit--bttn'>SUBMIT</button>
                </div>
              {/* </div> */}
            </form>
      </div>
    </div>
    )
}

export default SigninComponent