import Link from 'next/link'
import React from 'react'

function NavBar() {
    return (
        <header className='w-full bg-gray-900 py-4'>
            <nav className='flex justify-center items-center w-full max-w-7xl mx-auto'>
                <ul className='flex justify-center items-center gap-4 font-semibold text-base text-white/60'>
                    <li className=""><Link href={'/'}>Home</Link></li>
                    <li className=""><Link href={'/about'}>About</Link></li>
                    <li className=""><Link href={'/contact'}>Contact</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar