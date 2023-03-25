import { Routes,Route } from 'react-router-dom'

import SigninComponent from './components/signinComponent'
import SignupComponent from './components/SignupComponent'
import LandingPage from './components/LandingPage'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element= {<LandingPage /> }></Route>
        <Route path='/signin' element= {<SigninComponent /> }></Route>
        <Route path='/signup' element= {<SignupComponent /> }></Route>
      </Routes>
    </div>
  )

  // return (
  //   <div className="App">
  //     <LandingPage /> 
  //   </div>
  // )
}

export default App
