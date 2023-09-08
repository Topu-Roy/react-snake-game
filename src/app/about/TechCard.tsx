import Image from 'next/image'

type TechCardType = {
    image: string,
    name: string,
    key: string
}

function TechCard({ image, name, key }: TechCardType) {
    return (
        <div key={key} className='py-4 px-2 text-white/60 w-[5.5rem] h-[8.5rem] sm:w-[7.3rem] sm:h-[11rem] flex flex-col gap-2 items-center'>
            <div className='flex justify-between bg-slate-500/40 rounded-full items-center shadow-md'>
                <Image src={image} alt='' height={90} width={90} className='p-2 aspect-square rounded-full' />
            </div>
            <h3 className='text-center hidden sm:block text-sm'>{name}</h3>
            <h3 className='text-center sm:hidden text-sm'>{name.length > 10 ? `${name.slice(0, 10)}..` : name}</h3>
        </div>
    )
}

export default TechCard