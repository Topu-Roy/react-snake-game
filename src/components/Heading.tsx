import React from 'react'

function Heading({ text }: { text: string }) {
    return (
        <h2 className='font-bold text-gray-400 text-xl md:text-2xl py-2'>{text}</h2>
    )
}

export default Heading