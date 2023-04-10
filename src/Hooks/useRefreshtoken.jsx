import React from 'react'
import axios from 'axios';
const BASE_URL = 'http://localhost:3000'
// import AuthContext from '../context/AuthProvider';

async function useRefreshtoken (auth,setAuth) {

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth.accessToken}`,
    withCredentials: true
}
console.log(headers);

const refreshToken = await axios.get(`${BASE_URL}/auth/getRefreshToken`, { headers })
console.log(refreshToken);


  return (
    <div>useRefreshtoken</div>
  )
}

export default useRefreshtoken