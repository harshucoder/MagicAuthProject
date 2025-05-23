'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Button from '../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleHashLinkClick = (href: string) => {
    setIsOpen(false);
    
    if (href.startsWith('#')) {
      // If we're already on the home page, just scroll to section
      if (pathname === '/') {
        const section = document.querySelector(href);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If we're on another page, navigate home first then scroll
        router.push(`/${href}`);
      }
    }
  };

  const navItems = [
    { name: 'Features', href: '#Features' },
    { name: 'Pricing', href: '#Pricing' },
    { name: 'About Us', href: '/about' }
  ];

  return (
    <div className='w-full h-[72px] bg-[#0B0121] flex justify-between items-center px-8 fixed top-0 z-40'>
      {/* Logo */}
      <div className='m-5 ml-8'>
        <Link href="/" className='text-white text-xl font-bold hover:no-underline'>
          MagicAuth
        </Link>
      </div>

      {/* Desktop Links */}
      <div className='hidden md:flex items-center ml-[80px] text-white gap-10 text-l'>
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleHashLinkClick(item.href)}
            className='hover:text-purple-300 transition-colors bg-transparent border-none cursor-pointer text-white'
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Buttons */}
      <div className='hidden md:flex my-auto mx-5 gap-4'>
        <Button
          text="SignUp"
          link="/client/register"
          style='bg-white text-black border-black hover:bg-transparent hover:text-white hover:border-white hover:border-2'
        />
        <Button
          text="Login"
          link="/client/login"
          style="bg-transparent text-white border-white border-2 hover:bg-white hover:text-[#0B0121]"
        />
      </div>

      {/* Hamburger Icon */}
      <div className='md:hidden text-white z-50' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <FontAwesomeIcon icon={faTimes} size="lg" />
        ) : (
          <FontAwesomeIcon icon={faBars} size="lg" />
        )}
      </div>

      {/* Mobile Menu */}
      {isMounted && isOpen && (
        <div className='fixed top-[72px] left-0 w-full bg-[#0B0121] flex flex-col items-center gap-5 py-6 md:hidden text-white'>
          {navItems.map((item) => (
            <button
              key={`mobile-${item.href}`}
              onClick={() => handleHashLinkClick(item.href)}
              className='w-full text-center py-2 hover:bg-white/10 bg-transparent border-none cursor-pointer text-white'
            >
              {item.name}
            </button>
          ))}
          <div className='w-full px-8 flex flex-col gap-4 mt-4 items-center justify-center'>
            <Button
              text="SignUp"
              link="/client/register"
              style='bg-white text-black border-black hover:bg-transparent hover:text-white hover:border-white hover:border-2'
              onClick={() => setIsOpen(false)}
            />
            <Button
              text="Login"
              link="/client/login"
              style="bg-transparent text-white border-white border-2 hover:bg-white hover:text-[#0B0121]"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;