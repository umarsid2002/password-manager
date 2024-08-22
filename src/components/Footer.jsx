import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center space-y-2 py-4'>
            <div className="logo font-bold text-2xl">
                <span className='text-green-700'>&lt;</span>
                Password Manager
                <span className='text-green-700'>/ &gt;</span>
            </div>
            <div className='text-lg font-semibold'>
                Created By Umar Siddiqui
            </div>
        </div>
    )
}

export default Footer
