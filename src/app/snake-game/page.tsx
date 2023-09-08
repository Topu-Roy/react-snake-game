import Footer from '@/components/Footer'
import Game from '@/components/Game'

function SnakeGame() {
    return (
        <div className="flex relative max-w-7xl min-h-screen md:min-h-max mx-auto flex-col justify-start items-center">
            <Game />
            <Footer position='fixed' />
        </div>
    )
}

export default SnakeGame