import React from 'react'

function ErrorComponent(props) {

  const errsArray = props.errData.map((errs,i) => 
            <p key={i} className="err">{errs}</p>    )

  return (
    <div className="errors">
        {errsArray}
    </div>
  )
}

export default ErrorComponent

// if (error.response) {
  // The request was made and the server responded with a status code
  // that falls out of the range of 2xx
  // console.log(error.response.data);
  // console.log(error.response.status);
  // if(error.response.status === 500 ) navigate('/signin')
  // console.log(error.response.headers);
// } else if (error.request) {
  // The request was made but no response was received
  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  // http.ClientRequest in node.js
  // console.log(error.request);
// } else {
  // Something happened in setting up the request that triggered an Error
  // console.log('Error', error.message);
// }
//   console.log(error.config);