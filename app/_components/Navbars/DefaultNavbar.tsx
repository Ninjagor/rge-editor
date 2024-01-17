"use client";
import React from 'react'

import Image from 'next/image';
import Link from 'next/link';

const DefaultNavbar = () => {
  return (
    <>
        <nav className="w-full z-[100] relative top-0 left-0 backdrop-blur-[10px] px-7 py-3  bg-white/80 text-black  flex items-center justify-center border-b-[1px] border-b-neutral-100" style={{ transition: 'background .4s ease, border .4s ease' }}>
            <section className="flex justify-between w-full max-w-[1600px]">
              

                {/* <button onClick={() => setTheme(theme=="dark" ? "light" : "dark" )}>Toggle Theme</button> */}

                <section className="flex items-center justify-center gap-12">
                  <Link href="/" className="w-[120px] h-[45px] relative">
                    <Image 
                      src={`/images/logo-light-theme.svg`}
                      alt="Logo"
                      layout='fill'
                      className="block"
                      />
                  </Link>
                  <ul  className="items-center justify-center gap-7 hidden md:flex">
                    <li className="opacity-50 hover:opacity-100 text-sm h-full py-1 cursor-pointer">
                      <Link href="https://rge-docs.vercel.app/" className='py-1'>Docs</Link>
                    </li>
                    <li className="opacity-50 hover:opacity-100 text-sm h-full py-1 cursor-pointer">
                      <Link href="https://rge-site.vercel.app" className='py-1'>Website</Link>
                    </li>
                    <li className="opacity-50 hover:opacity-100 text-sm h-full py-1 cursor-pointer">
                      <Link href="#" className='py-3'>Blog</Link>
                    </li>
                    <li className="opacity-50 hover:opacity-100 text-sm h-full py-1 cursor-pointer">
                      <Link href="https://github.com/Ninjagor/rge.js" className='py-3'>Github Repo</Link>
                    </li>
                  </ul>
                </section>

                <section className="flex items-center justify-center gap-2">
                  <Link href="/code" className="px-4 py-1.5 bg-neutral-100 text-neutral-700 rounded-md text-sm opacity-100 hover:bg-neutral-200">
                    Edit Code
                  </Link>
                  <Link href="/run" className="px-4 py-1.5 bg-neutral-100 text-neutral-700e rounded-md text-sm opacity-100 hover:bg-neutral-200">
                    View Result
                  </Link>
                </section>
            </section>
        </nav>
    </>
  )
}

export default DefaultNavbar;