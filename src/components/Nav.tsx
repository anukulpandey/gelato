import React from 'react'
import LogoutButton from './Logout'

export default function Navbar() {
  return (
    <div>

    <div className='flex m-2 font-xbody text-3xl my-5 justify-between text-white'>
      <ul className='flex space-x-3.5 '>
        <li className='flex px-3  '><img  className='w-5 h-5 self-center m-2' src="/social/email.png" alt="" /> <a href="mailto:anukul.030601@gmail.com"> email</a></li>
        <li className='flex px-3  '><img className='w-5 h-5 self-center m-2'  src="/social/facebook.png" alt="" /> <a href="https://instagram.com/coding_jungle_"> facebook</a></li>
        <li className='flex px-3  '><img  className='w-5 h-5 self-center m-2' src="/social/twitter.png" alt="" /> <a href="https://twitter.com/0xanukul"> twitter</a></li>
      </ul>
      <ul className='flex space-x-3.5 '>
        <li className='flex px-3 '><img  className='w-8 h-7 mx-1 self-center' src="/nav/home.png" alt="" /> <a href="/"> home</a></li>
        <li className='flex px-3 '><img className='w-8 h-7  mx-1  self-center'  src="/nav/about.png" alt="" /> <a href=""> about</a></li>
        <li className='flex px-3 '><img  className='w-8 h-7  mx-1 self-center' src="/nav/contact.png" alt="" /> <a href="mailto:anukul.030601@gmail.com"> contact</a></li>
      </ul>
    </div>
    </div>
  )
}
