'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import { socialLinks } from '@/app/contact/Constants'

function NavBar() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className='w-full  py-4 px-3 sm:px-6 md:px-8 lg:px-6 xl:px-16 shadow-md sticky top-0 left-0 right-0 z-10 bg-gray-900/80 backdrop-blur-sm'>
            <nav className='flex justify-between items-center w-full max-w-7xl mx-auto'>
                <Link href={'/'} className='flex justify-center items-center gap-2'>
                    <Image src={'/snake-logo.png'} alt='snake game by topu' height={35} width={35} />
                    <h2 className='font-bold sm:text-lg text-slate-200'>Snake Game</h2>
                </Link>
                <ul className='flex justify-center items-center gap-4 font-medium text-base text-slate-300'>
                    <li className="hidden sm:block"><Link href={'/'}>Home</Link></li>
                    <li className="hidden sm:block"><Link href={'/about'}>About</Link></li>
                    <li className="hidden sm:block"><Link href={'/contact'}>Contact</Link></li>
                    <button onClick={() => setIsOpen(prev => !prev)} className='p-2 sm:hidden bg-black rounded-lg'>menu</button>
                </ul>

                {/* mobile menu */}
                <div className={twMerge(clsx(
                    "sm:hidden w-[80vw] flex justify-end rounded-bl-xl items-start transition-transform duration-200 h-[90dvh] fixed top-0 bottom-[0%] right-0 bg-slate-800/95 backdrop-blur-sm translate-x-[100%]",
                    {
                        'translate-x-0': isOpen
                    }
                ))}>
                    <div className='pt-4 pr-4 h-full flex flex-col justify-between'>
                        <div className="flex-1 w-full h-full ">
                            <div className="w-full flex justify-end items-center mb-8">
                                <button className='p-2 rounded-lg bg-black/80 text-white' onClick={() => setIsOpen(prev => !prev)}>close</button>

                            </div>
                            <ul className='flex space-y-2 text-lg flex-col justify-center items-end gap-4 font-medium text-slate-300'>
                                <li>
                                    <button onClick={() => setIsOpen(prev => !prev)}>
                                        <Link className="flex justify-center items- gap-1end" href={'/'}>
                                            <span>Home</span>
                                        </Link>
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setIsOpen(prev => !prev)}>
                                        <Link className="flex justify-center items- gap-1end" href={'/about'}>
                                            <span>About</span>
                                        </Link>
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setIsOpen(prev => !prev)}>
                                        <Link className="flex justify-end items-end gap-1" href={'/contact'}>
                                            <span>Contact</span>
                                        </Link>
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className="flex-1 w-full h-full flex gap-4 justify-end items-end  pb-8">
                            {socialLinks.map((item) => (
                                <a href={item.link} target='_blank'>
                                    <Image alt='web developer topu roy' src={item.image} height={35} width={35} className='rounded-full' />
                                </a>
                            ))}
                        </div>

                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar