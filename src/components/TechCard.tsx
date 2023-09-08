import Image from 'next/image'

type TechCardType = {
    image: string,
    name: string,
    key: string
}

function TechCard({ image, name, key }: TechCardType) {
    return (
        <div key={key} className='py-4 px-2 text-white/60 rounded-xl w-[8.5rem] h-[11rem] flex flex-col justify-between items-center'>
            <div className='flex justify-between bg-slate-500 rounded-full items-center'>
                <Image src={image} alt='' height={90} width={90} className='p-2 aspect-square rounded-full' />
            </div>
            <h3 className='text-center'>{name}</h3>
        </div>
    )
}

export default TechCard