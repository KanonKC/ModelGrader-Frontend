import React from 'react'
import LinkButton from '../components/LinkButton'

const Homepage = () => {
  return (
    <div className='homepage text-center'>
      <h1 className='text-7xl'>
        Welcome to Model Grader
      </h1>
      <p className='text-3xl my-10'>This is very prototype grader software.</p>
        <LinkButton className="homepage-btn text-4xl" color="primary" size="lg" to={'/problems'} label={"Solving Problem"}/>
    </div>
  )
}

export default Homepage