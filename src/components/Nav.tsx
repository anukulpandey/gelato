import React from 'react'

export default function Navbar() {
  return (
    <div className='flex m-2 font-xbody text-3xl my-5 justify-between text-white'>
      <ul className='flex space-x-3.5 '>
        <li className='flex px-3  '><img  className='w-5 h-5 self-center m-2' src="/social/email.png" alt="" /> <a href="#home"> email</a></li>
        <li className='flex px-3  '><img className='w-5 h-5 self-center m-2'  src="/social/facebook.png" alt="" /> <a href="#about"> facebook</a></li>
        <li className='flex px-3  '><img  className='w-5 h-5 self-center m-2' src="/social/twitter.png" alt="" /> <a href="#contact"> twitter</a></li>
      </ul>
      <ul className='flex space-x-3.5 '>
        <li className='flex px-3 '><img  className='w-8 h-7 mx-1 self-center' src="/nav/home.png" alt="" /> <a href="#home"> home</a></li>
        <li className='flex px-3 '><img className='w-8 h-7  mx-1  self-center'  src="/nav/about.png" alt="" /> <a href="#about"> about</a></li>
        <li className='flex px-3 '><img  className='w-8 h-7  mx-1 self-center' src="/nav/contact.png" alt="" /> <a href="#contact"> contact</a></li>
      </ul>
      
    </div>
  )
}
