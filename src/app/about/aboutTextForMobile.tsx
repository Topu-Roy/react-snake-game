'use client'
import { useState } from 'react'

type TextSectionTypes = {
    headline: string;
    text: string;
}

function TextSection({ headline, text }: TextSectionTypes) {
    return (
        <div>
            <h3 className="font-semibold text-xl text-slate-200/70 pb-2">
                🔹 {headline}
            </h3>
            <p className='font-normal text-slate-200/70'>
                {text}
            </p>
        </div>
    )
}

export default function AboutTextForMobile() {

    const [showMore, setShowMore] = useState(false)
    return (
        <>
            <span className='text-slate-200/75 font-bold text-2xl'>
                Some Information About Me ➡️
            </span>
            <div className='pt-2'>
                <p className='font-normal text-slate-200/70'>
                    I'm a <span className='font-semibold text-xl'>Full Stack Web Developer</span> with a lot of experience. I've got a strong background in Computer Science and Engineering (CSE) and have spent the last two years working hard to become an expert in web development. My education in CSE has given me a great foundation to build upon and has helped me become the successful Full Stack Web Developer I am today.
                </p>
            </div>
            <TextSection
                headline={
                    'What I Do:'
                }
                text={
                    "I make great web apps using new technology. I make sure my clients get their money's worth and work hard to make sure my work is the best it can be. This makes my clients happy and earns their trust."
                }
            />
            <TextSection
                headline={
                    'Benefits:'
                }
                text={
                    "I am skilled and friendly to clients. I always make sure that my clients are satisfied and happy with my work. I work hard to exceed their expectations and produce high-quality results."
                }
            />
            <div className={`${showMore ? 'block' : 'hidden'}`}>
                <TextSection
                    headline={
                        'Some Qualities of Mine:'
                    }
                    text={
                        "I learn quickly and can easily adapt to new technologies, keeping up with the latest web development trends. My main strength is my unwavering focus on user experience. I prioritize creating applications that not only perform well but also provide an exceptional journey for the end-users."
                    }
                />
                <TextSection
                    headline={
                        "How I'm Different:"
                    }
                    text={
                        "I am different because I am very careful when making decisions. I study the competition and use what I learn to make good choices that make projects special. I am also good at both frontend and backend work, and I am very skilled at designing user interfaces and experiences. This means that I can create complete solutions that work well and are easy for people to use."
                    }
                />
                <TextSection
                    headline={
                        "My Interests:"
                    }
                    text={
                        "I love technology and enjoy learning about it. I like to try new things and see what's new. I always want to get better at what I do and learn more."
                    }
                />
            </div>
            <span className={`text-white/80 ${showMore ? 'hidden' : 'block'}`}>....</span>
            <div className='w-full flex items-center justify-center '>

                <button className='text-white/80 p-2 bg-white/10 rounded-xl mt-2' onClick={() => setShowMore(prev => !prev)}>{showMore ? 'Show less' : 'Show more'}</button>
            </div>
        </>
    )
}