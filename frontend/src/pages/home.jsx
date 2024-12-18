import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='bg-cover bg-[url("https://imgs.search.brave.com/xbIc8BUH8qHa9Ya0-sRiNlEtiNrLraNTceL3yn5rD-Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/cmFmZmljLWxpZ2h0/cy1jaXR5XzUzODc2/LTE2NTQyMy5qcGc_/c2VtdD1haXNfaHli/cmlk")] pt-5   h-screen w-full flex justify-between flex-col  '>
      <img className='w-20' src="https://www.pngall.com/wp-content/uploads/4/Uber-Logo.png" alt="uberlogo" />
      <div className='bg-white px-5 py-5  h-40 ' > 
        <h2 className='text-3xl font-bold mt-2  '> Get started with UBER</h2>
        <Link to='/login' className='flex items-center justify-center w-full h-[40%] bg-black text-white text-2xl font-bold  mt-5  '>continue</Link>
      </div>
    </div>
  )
}

export default Home