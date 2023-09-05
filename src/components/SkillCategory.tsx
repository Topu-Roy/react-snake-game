import React from 'react'
import { TechObjType } from '@/app/about/page'
import TechCard from './TechCard'

function SkillCategory({ object, title }: { object: TechObjType, title: string }) {
    return (
        <>
            {/* * HeadLine */}
            <p className='font-bold text-slate-200 text-xl pt-10 pb-3'>{title}</p>
            <div className="flex flex-wrap justify-start items-center gap-4">
                {object.map(item => (
                    <TechCard image={item.image} name={item.name} key={item.name} />
                ))}
            </div>
        </>
    )
}

export default SkillCategory