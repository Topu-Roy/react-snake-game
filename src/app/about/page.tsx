import SkillCategory from '@/components/SkillCategory';
import Image from 'next/image'
import React from 'react'
import { coreTechnologies, interestedToLearn, mainFrameworks, misc, operatingSystem, styling, textEditor, uiux } from './objects';

function AboutPage() {
    return (
        <>
            <section className='max-w-7xl bg-slate-400/20 rounded-xl flex justify-between items-center mx-auto my-8'>
                <div className="w-full flex-1 p-4">
                    <Image src={'/topu.jpg'} alt='topu roy' height={1080} width={1080} className='rounded-lg drop-shadow-xl filter grayscale hover:grayscale-0 transition-all duration-200' />
                </div>
                <div className="bg-yellow-200 flex-1 w-full">
                    <div className='w-[50rem]'></div>
                </div>
            </section>
            <div className="max-w-7xl mx-auto w-full">
                <SkillCategory object={mainFrameworks} title='Frameworks' />
                <SkillCategory object={styling} title='Styling' />
                <SkillCategory object={uiux} title='UI/UX' />
                <SkillCategory object={misc} title='Misc' />
                <SkillCategory object={coreTechnologies} title='Core Technologies' />
                <SkillCategory object={interestedToLearn} title='Interested To Learn' />
                <SkillCategory object={textEditor} title='Text Editor' />
                <SkillCategory object={operatingSystem} title='Operating System' />
            </div>
        </>
    )
}

export default AboutPage