import Link from 'next/link'
import React from 'react'

function NavBar() {
    return (
        <header className='w-full bg-white text-black'>
            <nav className='flex justify-center items-center w-full'>
                <ul className='flex justify-center items-center gap-2'>
                    <li className=""><Link href={'/'}>Home</Link></li>
                    <li className=""><Link href={'/about'}>About</Link></li>
                    <li className=""><Link href={'/contact'}>Contact</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar