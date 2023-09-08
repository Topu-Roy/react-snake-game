import React from 'react'

type Position = {
    position: 'fixed' | 'nofixed'
}

export default function Footer({ position }: Position) {
    return (
        <footer className={`bg-gray-700 md:${position} md:bottom-0 md:left-0 md:right-0`}>
            <section className="max-w-7xl mx-auto py-4 md:py-4">
                <p className='text-center w-full text-sm md:text-base text-white/70'>
                    Made With ❤️ By Topu Roy
                </p>
            </section>
        </footer>
    )
}
