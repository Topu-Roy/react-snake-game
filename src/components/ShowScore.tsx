'use client'
export default function ShowScore(score: { score: number }) {
    return (
        <span className='text-white font-semibold text-lg'>Score: {score.score}</span>
    )
}