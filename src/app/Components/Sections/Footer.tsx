import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='w-full h-[300px] bg-[#0B0121]  px-8'>
      <div className='text-white text-xl font-bold text-center '>
        <h1 className='pt-10'>Made With Love ❤️ For Developers and Students</h1>
      </div>
      <div className='flex justify-between mt-15'>
      <div className='text-white '>
        <h1 className='text-xl'>Contact Us</h1>
        <Link href="https://www.github.com/harshucoder" className='text-[15px]'>Github</Link><br />
        <Link href="https://www.linkedin.com/in/harshucoder" className='text-[15px]'>LinkedIn</Link><br />
        <Link href="mailto:harshkushwaha2005@gmail.com" className='text-[15px]'>Email: harshkushwaha2005@gmail.com</Link>
      </div>
      <div className='text-right text-white font-bold text-lg'>
        MagicAuth
      </div>
      </div>
    </div>
  )
}

export default Footer
