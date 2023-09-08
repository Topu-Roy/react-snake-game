import React from 'react'
import TechCard from './TechCard'

type TechObjType = {
    name: string;
    image: string;
}[];

function SkillCategory({ object, title }: { object: TechObjType, title: string }) {
    return (
        <div className='bg-white/10 rounded-xl px-2 pb-4'>
            {/* * HeadLine */}
            <p className='font-semibold text-slate-200/70 text-lg py-3'>{title}</p>
            <div className="flex flex-wrap justify-start items-center gap-1">
                {object.map(item => (
                    <TechCard image={item.image} name={item.name} key={item.name} />
                ))}
            </div>
        </div>
    )
}

export default SkillCategory