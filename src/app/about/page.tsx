import Image from 'next/image'
import React from 'react'

function AboutPage() {
    return (
        <>
            <section className='max-w-7xl flex justify-between items-center mx-auto mt-8'>
                <div className="w-full p-4">
                    <Image src={'/topu.jpg'} alt='topu roy' height={1080} width={1080} className='rounded-lg drop-shadow-xl filter grayscale hover:grayscale-0 transition-all duration-200' />
                </div>
                <div className="bg-yellow-200 w-full"></div>
            </section>
        </>
    )
}

export default AboutPage