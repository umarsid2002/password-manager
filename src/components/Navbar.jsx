import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer flex justify-between items-center p-4 h-14 justify-between">
        <div className="logo font-bold md:text-2xl sm:text-xl">
            <span className='text-green-700'>&lt;</span>
            Password Manager
            <span className='text-green-700'>/ &gt;</span>
            </div>
        <ul className='sm: hidden'>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="#">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul>
        <button className='bg-green-600 hover:bg-green-800 transition-all duration-300 text-white rounded-full flex items-center justify-between ring-white ring-1'>  
          <img className='invert w-10 p-1' src="/github.png" alt="Github" />
          <span className='font-bold px-2'>Github</span>
        </button>
        </div>
    </nav>
  )
}

export default Navbar
