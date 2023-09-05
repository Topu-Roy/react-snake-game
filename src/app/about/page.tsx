import Image from 'next/image'
import React from 'react'

type TechObjType = {
    name: string;
    image: string;
}[]

//! 
const mainFrameworks: TechObjType = [
    {
        name: 'NextJS',
        image: ''
    },
    {
        name: 'ExpressJS',
        image: '/tech/express.png'
    }
]
const styling: TechObjType = [
    {
        name: 'TailwindCSS',
        image: '/tech/tailwindcss.png'
    },
    {
        name: 'Shadcn/UI',
        image: '/tech/shadcn-ui.png'
    }
]
const uiux: TechObjType = [
    {
        name: 'Figma',
        image: '/tech/figma.png'
    },
    {
        name: 'Photoshop',
        image: '/tech/photoshop.png'
    }
]
const misc: TechObjType = [
    {
        name: 'TypeScript',
        image: '/tech/typescript.png'
    },
    {
        name: 'Firebase',
        image: '/tech/firebase.png'
    },
    {
        name: 'TRPC',
        image: '/tech/trpc.png'
    },
    {
        name: 'ZOD',
        image: '/tech/zod.png'
    },
    {
        name: 'React Hook Forms',
        image: 'react-hook-forms.png'
    },

    //! -------------------------------------- 
    {
        name: 'Zustand',
        image: ''
    },
    {
        name: 'ChatGPT',
        image: '/tech/chatgpt.png'
    },
    {
        name: 'TenStack Query',
        image: '/tech/tenstack-query.png'
    },
    {
        name: 'Prisma',
        image: '/tech/prisma.png'
    },
    {
        name: 'Drizzle',
        image: '/tech/drizzle.png'
    },
    {
        name: 'NextAuth',
        image: '/tech/nextauth.png'
    },
    {
        name: 'ClarkProvider',
        image: '/tech/clark.png'
    }
]
const coreTechnologies: TechObjType = [
    {
        name: 'HTML',
        image: '/tech/html.png'
    },
    {
        name: 'CSS',
        image: '/tech/css.png'
    },
    {
        name: 'JavaScript',
        image: '/tech/javascript.png'
    },
    {
        name: 'React',
        image: '/tech/react.png'
    },
    {
        name: 'NodeJS',
        image: '/tech/nodejs.png'
    },
    {
        name: 'Git',
        image: '/tech/git.png'
    },
    {
        name: 'GitHub',
        image: '/tech/github.png'
    },
    {
        name: 'Python',
        image: '/tech/python.png'
    },
    {
        name: 'MongoDB',
        image: '/tech/mongodb.png'
    }
]

//! ------------------
const interestedToLearn: TechObjType = [
    {
        name: 'Go',
        image: ''
    },
    {
        name: 'React Native',
        image: ''
    },
    {
        name: 'PostgreSQL',
        image: ''
    },
    {
        name: 'Rust',
        image: ''
    },
    {
        name: 'SveltKit',
        image: ''
    },
    {
        name: 'Linux',
        image: ''
    },
    {
        name: 'Machine Learning',
        image: ''
    },
    {
        name: 'Artificial Intelligence',
        image: ''
    }
]
const OperatingSystem: TechObjType = [
    {
        name: 'Windows 11 Pro',
        image: '/windows11.png'
    }
]
const textEditor: TechObjType = [
    {
        name: 'Visual Studio Code',
        image: 'vscode.png'
    }
]


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