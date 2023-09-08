import SkillCategory from '@/app/about/SkillCategory';
import Image from 'next/image'
import React from 'react'
import { coreTechnologies, interestedToLearn, mainFrameworks, misc, others, stylingAndUIUX } from './objects';
import AboutText from './aboutText';
import AboutThisProject from './aboutThisProject';
import AboutTextForMobile from './aboutTextForMobile';
import Footer from '@/components/Footer';

function AboutPage() {
    return (
        <>
            <h3 className="max-w-7xl text-slate-200/75 font-bold text-3xl text-center mt-8 mx-auto">
                Hey there👋!<span className='ml-4 w-full'><br /> I'm Topu Roy</span>
            </h3>

            <section className='max-w-7xl bg-slate-400/20 rounded-xl flex flex-col lg:flex-row justify-between items-start mx-auto my-8'>
                <div className="w-full flex-1 p-2 md:p-4">
                    <Image src={'/topu.jpg'} alt='topu roy' height={1080} width={1080} className='rounded-lg drop-shadow-xl filter grayscale hover:grayscale-0 transition-all duration-200' />
                </div>
                <div className="flex-1 w-full my-4 px-2 md:mr-4 space-y-2">
                    <div className='hidden md:block'><AboutText /></div>
                    <div className='md:hidden'><AboutTextForMobile /></div>
                </div>
            </section>

            <AboutThisProject />

            <div className="max-w-7xl mx-auto w-full py-20 px-2 space-y-4">

                <h3 className="text-2xl md:text-3xl text-slate-200/80 font-bold">Technologies I Know & Love</h3>
                <SkillCategory object={coreTechnologies} title='Core Technologies' />
                <SkillCategory object={mainFrameworks} title='Frameworks' />
                <SkillCategory object={stylingAndUIUX} title='Styling And UI/UX' />
                <SkillCategory object={misc} title='Misc' />
                <SkillCategory object={others} title='Others' />

                <h3 className="text-2xl md:text-3xl text-slate-200/80 font-bold pt-20">Technologies I Want To Learn</h3>
                <SkillCategory object={interestedToLearn} title='Interested To Learn' />
            </div>
            <Footer position='nofixed' />
        </>
    )
}

export default AboutPage