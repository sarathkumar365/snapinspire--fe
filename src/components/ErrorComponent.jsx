import React from 'react'

function ErrorComponent(props) {
    
    const errsArray = props.errData.map((errs,i) => 
            <p key={i} className="err">{errs.data.message}</p>    )

  return (
    <div className="errors">
        {errsArray}
    </div>
  )
}

export default ErrorComponent