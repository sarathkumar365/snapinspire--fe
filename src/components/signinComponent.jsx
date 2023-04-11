import React from 'react'
import  { useEffect,useContext ,useState } from 'react'
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthProvider';
import { useFormik } from 'formik'
import * as yup from 'yup';
// import axios from 'axios';
import api from '../API/api';

import ErrorComponent from './ErrorComponent';
import img from '../resourses/images/3.webp'


function SigninComponent() {

  const {auth} = useContext(AuthContext)
  const {setAuth} = useContext(AuthContext)

  const navigate = useNavigate();

  const [errFound,seterrFound  ] = useState([])

  const handleSignin = async (userDetails) => {

    try {
      // {withCredentials: true, credentials: 'include'}
      const signinResponse = await api.post('/auth/login', userDetails)

      // set auth state 
      if(signinResponse.status === 200){
        setAuth({
          loggedIn:true,
          name:signinResponse.data.userName,
          accessToken:signinResponse.data.token
        })

        // navigate to home
        navigate('/home')
      } else {
        // set unknown error
        seterrFound(prevErrs => {
          return [...prevErrs, `oops!!, please try again!!! 😲`]
        })
      }

    } catch (error) {

      if (error.response) {
        console.log(error.response.data,error.response.status);
        // fill in the error state with Unauthorized error message
        if(error.response.status === 401) seterrFound(prevErrs => {

          // if same error exists, then return
          if(prevErrs.includes(error.response.data.message)) {
            return prevErrs
          }
          
          // else add new error to the error list
          return [...prevErrs, error.response.data.message]
        })

        if(error.response.status === 404) seterrFound(prevErrs => {

          // if same error exists, then return
          if(prevErrs.includes(error.response.data.message)) {
            return prevErrs
          }
          
          // else add new error to the error list
          return [...prevErrs, error.response.data.message]
        })

        } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error);
        console.log(error.config);

        // set unknown error
        seterrFound(prevErrs => {
          return [...prevErrs, `oops that wasn't ment to happen, please try again!!! 😲`]
        })

        }

        setAuth({
          loggedIn:false,
          name:null,
          accessToken:null
        })
    }
  } 

  // console.log(auth);


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

  // console.log(auth);

  const test = async() => {
    console.log('test');
    try {
      const testReq = await api.get('/auth/getRefreshToken')
      console.log(testReq);
    } catch (error) {
              if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          http.ClientRequest in node.js
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        } 
    }
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
                <div className="name--input form__group">
                  <input placeholder='email' autoComplete='off' autoFocus type="email" value={formik.values.email} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                   name="email" className='email--css form__field' required />
                  <label htmlFor="Email" style={errEmail} className='form__label'>
                    {/* Email */}
                    {formik.touched.email && formik.errors.email ? formik.errors.email : 'Email'}
                    </label>
                </div>
                <div className="pass--input form__group">
                  <input placeholder='password' autoComplete="off" type="password" value={formik.values.password} onChange={formik.handleChange}
                   name="password" className='password--css form__field' required />
                  <label htmlFor="password" className='form__label'>Password</label>
                </div>
                <div className="">
                  <button type='submit' className='submit--bttn'>SUBMIT</button>
                  <button type='button' onClick={()=> test()}>test</button>
                </div>
              {/* </div> */}
            </form>
      </div>
    </div>
    )
}

export default SigninComponent