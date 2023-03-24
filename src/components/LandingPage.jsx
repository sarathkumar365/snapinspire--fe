import React from 'react'
import Navbar from './Navbar'
import img from '../resourses/images/8.jpg'
import img2 from '../resourses/images/6.jpg'
import img3 from '../resourses/images/9.jpg'
import img4 from '../resourses/images/3.jpg'
import img5 from '../resourses/images/5.jpg'

function LandingPage() {
  return (
    <>
      <Navbar />

      <div className="landing--body">
        <section className='container--1'>
          <p className="landing--phrase">"Enter the world of <span className='span--logo'>SnapInspire</span>"</p> 
          <p className='landing--phrase__2'>Where high-quality, inspiring, and mysterious images await. Explore now and ignite your creativity.</p>
        </section>
        <section className='container--2 row'>
          <div className="image--1 m-top--min">
            <img className='landing--image' src={img} alt="image 1" />
          </div>
          <div className="image--2 m-top--5">
            <img className='landing--image' src={img2} alt="image 2" />
          </div>
          <div className="image--3 m-top--10">
            <img className='landing--image' src={img3} alt="image " />
          </div>
          <div className="image--4 m-top--5">
            <img className='landing--image' src={img4} alt="image 4" />
          </div>
          <div className="image--5 m-top--min">
            <img className='landing--image' src={img5} alt="image 5" />
          </div>
        </section>
      </div>
    </>
    )
}

export default LandingPage