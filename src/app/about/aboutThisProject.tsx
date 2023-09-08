import React from 'react'
import { usedInThisProject } from './objects'
import TechCard from '@/components/TechCard'
import Image from 'next/image'

export default function AboutThisProject() {
    return (
        <section className='max-w-7xl mx-auto w-full text-white/60'>
            <div className=''>
                <h3 className="text-3xl text-slate-200 font-bold pt-20 mb-10">About This Project</h3>
                <div className="w-full bg-white/10 rounded-xl p-4">

                    <span className="text-xl text-slate-200/70 font-bold pb-4">About:</span>
                    <p className='mb-6'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione a facilis dicta eum sit quis suscipit temporibus, sequi optio sapiente voluptate voluptas nisi maxime excepturi voluptates rem cumque facere libero, minima inventore ut. Tempora odio ipsam animi ducimus, consequatur nobis nihil numquam, assumenda officiis itaque voluptatem eos obcaecati quaerat eligendi veritatis. Modi dolor, expedita quas aperiam commodi quibusdam sit odit impedit! Consequuntur aliquid est in magnam neque minima hic qui expedita corporis unde debitis reiciendis labore assumenda, porro molestias alias.
                    </p>
                    <span className="text-xl text-slate-200/70 font-bold">Technologies used:</span>
                    <div className="flex items-center flex-wrap">
                        {usedInThisProject.map(item => (
                            <div key={item.name} className='py-4 px-2 rounded-xl w-[8.5rem] h-[11rem] flex flex-col justify-between items-center'>
                                <div className='flex justify-between bg-slate-500 rounded-full items-center'>
                                    <Image src={item.image} alt='' height={90} width={90} className='p-2 aspect-square rounded-full' />
                                </div>
                                <h3 className='text-center'>{item.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
