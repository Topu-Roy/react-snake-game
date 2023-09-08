import { usedInThisProject } from './objects'
import Image from 'next/image'

export default function AboutThisProject() {
    return (
        <section className='max-w-7xl mx-auto w-full text-white/60 px-2'>
            <h3 className="text-3xl text-slate-200 font-bold pt-20 mb-10">About This Project</h3>
            <div className="w-full bg-white/10 rounded-xl p-2 md:p-4">

                <span className="text-xl text-slate-200/70 font-bold pb-4">About:</span>
                <p className='mb-6 mt-3'>
                    I made a game using Next.js that combines old and new technology to learn and improve my skills. I worked on both the front and back ends, using Next.js for speed, TypeScript for typing, and Tailwind CSS for styling. On the back end, I used Prisma for databases, MongoDB for NoSQL, Zustand for state management, and Zod for schema validation. This project helped me improve my skills, solve problems, and learn new things. It shows my dedication to learning and pushing boundaries in the world of development.
                </p>

                {/* * Techs */}
                <span className="text-xl text-slate-200/70 font-bold">Technologies used:</span>
                <div className="flex items-center flex-wrap gap-1">
                    {usedInThisProject.map(item => (
                        <div key={item.name} className='py-4 px-2 text-white/60 w-[5.5rem] h-[8.5rem] sm:w-[7.3rem] sm:h-[11rem] flex flex-col gap-2 items-center'>
                            <div className='flex justify-between bg-slate-500/40 rounded-full items-center'>
                                <Image src={item.image} alt='' height={90} width={90} className='p-2 aspect-square rounded-full' />
                            </div>
                            <h3 className='text-center hidden md:block text-sm'>{item.name}</h3>
                            <h3 className='text-center md:hidden text-sm'>{item.name.length > 10 ? `${item.name.slice(0, 10)}..` : item.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
