import SkillCategory from '@/components/SkillCategory';
import Image from 'next/image'
import React from 'react'

export type TechObjType = {
    name: string;
    image: string;
}[]

const mainFrameworks: TechObjType = [
    {
        name: 'NextJS',
        image: '/tech/next.svg'
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
        image: '/tech/react-hook-forms.png'
    },

    {
        name: 'Zustand',
        image: '/tech/zustand.png'
    },
    {
        name: 'ChatGPT',
        image: '/tech/chatgpt.png'
    },
    {
        name: 'TenStack Query',
        image: '/tech/tenstack-query.webp'
    },
    {
        name: 'Prisma',
        image: '/tech/prisma.webp'
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
        image: '/tech/nodejs.jpg'
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
const interestedToLearn: TechObjType = [
    {
        name: 'GoLang',
        image: '/tech/go.png'
    },
    {
        name: 'React Native',
        image: '/tech/react-native.png'
    },
    {
        name: 'PostgreSQL',
        image: '/tech/postgresql.png'
    },
    {
        name: 'Rust',
        image: '/tech/rust.png'
    },
    {
        name: 'SvelteKit',
        image: '/tech/svelte.jpg'
    },
    {
        name: 'Linux',
        image: '/tech/linux.png'
    },
    {
        name: 'Machine Learning',
        image: '/tech/ml.png'
    },
    {
        name: 'Artificial Intelligence',
        image: '/tech/ai.jpg'
    }
]
const operatingSystem: TechObjType = [
    {
        name: 'Windows 11 Pro',
        image: '/tech/windows11.jpg'
    }
]
const textEditor: TechObjType = [
    {
        name: 'Visual Studio Code',
        image: '/tech/vscode.png'
    }
]


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