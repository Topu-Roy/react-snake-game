import Footer from '@/components/Footer'
import Game from '@/components/Game'

function SnakeGame() {
    return (
        <>
            <div className="flex lg:h-auto relative max-w-7xl min-h-[90vh] lg:min-h-max mx-auto flex-col justify-start items-center">
                <Game />
            </div>
            <Footer position='fixed' />
        </>
    )
}

export default SnakeGame