import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function NavBar() {
    return (
        <header className='w-full  py-4 px-3 sm:px-6 md:px-8 lg:px-6 xl:px-16 shadow-md sticky top-0 left-0 right-0 z-10 bg-gray-900/80 backdrop-blur-sm'>
            <nav className='flex justify-between items-center w-full max-w-7xl mx-auto'>
                <Link href={'/'} className='flex justify-center items-center gap-2'>
                    <Image src={'/snake-logo.png'} alt='snake game by topu' height={35} width={35} />
                    <h2 className='font-bold sm:text-lg text-slate-200'>Snake Game</h2>
                </Link>
                <ul className='flex justify-center items-center gap-4 font-medium text-base text-slate-300'>
                    <li className=""><Link href={'/'}>Home</Link></li>
                    <li className=""><Link href={'/about'}>About</Link></li>
                    <li className=""><Link href={'/contact'}>Contact</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar