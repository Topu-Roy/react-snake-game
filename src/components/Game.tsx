"use client";

import { useEffect, useState } from "react";
import { useScoreStore, useAttemptsStore } from "@/zustand/useZustandStore";

//* type for this component
type SnakeDirectionType = "Left" | "Right" | "Up" | "Down" | undefined;
export type SnakePositionType = { x: number; y: number; }[]
export type FoodPositionType = { x: number; y: number; }

export default function Game() {
    // * Static Variables ----------------------------------------------------
    let speed = 320;
    let isGameOver = false

    // * States -----------------------------------------------------------------------
    const [score, setScore] = useState(0)
    const [snakeDirection, setSnakeDirection] = useState<SnakeDirectionType>(undefined);
    const [isMobile, setIsMobile] = useState(false)

    // * Dynamic Variables ----------------------------------------------------
    let totalGridSize = isMobile ? 16 : 20;
    const { highScore, updateHighScore } = useScoreStore()
    const { attempts, updateAttempts } = useAttemptsStore()

    let initialSnakePosition = [
        { x: totalGridSize / 2, y: totalGridSize / 2 },
        { x: totalGridSize / 2 + 1, y: totalGridSize / 2 },
        { x: totalGridSize / 2 + 2, y: totalGridSize / 2 },
    ];
    let initialFoodPosition = {
        x: totalGridSize / 2 - 5,
        y: totalGridSize / 2,
    };

    // * Dependent States -----------------------------------------------------------------------
    const [foodPosition, setFoodPosition] = useState<FoodPositionType>(initialFoodPosition);
    const [snakePosition, setSnakePosition] = useState<SnakePositionType>(initialSnakePosition);



    // ! Increase the snake speed according to current score ---------------------------
    if (score > 4) speed = speed - 40
    if (score > 9) speed = speed - 40
    if (score > 14) speed = speed - 40
    if (score > 19) speed = speed - 40
    if (score > 24) speed = speed - 40
    if (score > 29) speed = speed - 40

    // * Functions ---------------------------------------------------------------------

    function makeFood() {
        let xPosition = Math.floor(Math.random() * totalGridSize)
        let yPosition = Math.floor(Math.random() * totalGridSize)

        setFoodPosition({ x: xPosition, y: yPosition })
    }

    function RenderGrid() {
        type CellType = JSX.Element[];
        let cellArray: CellType = [];
        let className = "";
        for (let row = 0; row < totalGridSize; row++) {
            for (let col = 0; col < totalGridSize; col++) {


                if (!isGameOver) {
                    // * If the snake hit the wall , then the game should over
                    if (snakePosition[0].x > totalGridSize || snakePosition[0].x < 0 || snakePosition[0].y > totalGridSize || snakePosition[0].y < 0) gameOver(), isGameOver = true;

                    // * If the snake head is same as any of the segments of its body , then the game is over
                    if (snakePosition.slice(1).some(item => item.x === snakePosition[0].x && item.y === snakePosition[0].y)) gameOver(), isGameOver = true
                }

                // * Checking if the current cell should render the food or snake
                let isFoodHere = foodPosition.x === row && foodPosition.y === col;
                let isSnakeHeadHere = snakePosition[0].x === row && snakePosition[0].y === col;
                let isSnakeBodyHere = snakePosition.some((item) => item.x === row && item.y === col);
                //! let isSnakeTailHere = snakePosition[snakePosition.length - 1].x === row && snakePosition[snakePosition.length - 1].y === col;

                // * Rendering the food and snake body
                if (isFoodHere) className = "w-full h-full bg-green-500 rounded-full";
                else if (isSnakeHeadHere) {

                    // * The head points to the same direction as it's way
                    if (snakeDirection === 'Down') {
                        className = "w-full h-full rounded-md rotate-180";
                    } else if (snakeDirection === 'Left') {
                        className = "w-full h-full rounded-md -rotate-90 ";
                    } else if (snakeDirection === 'Right') {
                        className = "w-full h-full rounded-md rotate-90";
                    } else {
                        className = "w-full h-full rounded-md";
                    }
                }
                else if (isSnakeBodyHere) className = "w-full h-full bg-yellow-500 rounded-md "
                // todo: Can't find a way to render snake tail
                // else if (isSnakeTailHere) {
                //     className = "w-full h-full bg-blue-500 rounded-xl relative flex justify-center items-center";
                //     cellArray.push(
                //         <div className={className} key={`${row}+${col}`}>
                //             <div className=" bg-yellow-600 scale-50 ">
                //             </div>
                //         </div>
                //     );
                // }
                else className = "bg-gray-400/70 w-full h-full rounded-full opacity-5"

                let cell = <div className={className} key={`${row}+${col}`} >
                    {isSnakeHeadHere ? (
                        <svg width="30" height="30" viewBox="0 0 238 238" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.500008 79.5V197.5C0.500005 217.5 26 237.5 48.5 237.5H189.5C212.5 237.5 237.5 217.5 237.5 197V79.5C237.5 59.5 181.5 0.500008 158.5 0.500008H79.5C56.5 0.500008 0.500008 59.5 0.500008 79.5Z" fill="#D93232" stroke="#C95151" />
                            <circle cx="158" cy="78" r="18" fill="#D9D9D9" />
                            <circle cx="80" cy="78" r="18" fill="#D9D9D9" />
                        </svg>
                    ) : null}
                </div>
                cellArray.push(cell);
            }
        }
        return cellArray;
    }

    function updateGame() {
        let newSnakePosition = [...snakePosition];

        snakeDirection === 'Up' && newSnakePosition.unshift({
            x: newSnakePosition[0].x - 1,
            y: newSnakePosition[0].y,
        });
        snakeDirection === 'Down' && newSnakePosition.unshift({
            x: newSnakePosition[0].x + 1,
            y: newSnakePosition[0].y,
        });
        snakeDirection === 'Left' && newSnakePosition.unshift({
            x: newSnakePosition[0].x,
            y: newSnakePosition[0].y - 1,
        });
        snakeDirection === 'Right' && newSnakePosition.unshift({
            x: newSnakePosition[0].x,
            y: newSnakePosition[0].y + 1,
        });

        // * Check if snake head is overlapping with the food
        let isFoodEaten = newSnakePosition[0].x === foodPosition.x && newSnakePosition[0].y === foodPosition.y;

        if (isFoodEaten) {
            setScore(prev => prev + 1)
            makeFood()

            // * if snake head is overlapping with the food, add it to the end of snake body
            // * if added on the start, the head and the body are the same for a few milliseconds
            // * for that the gameOver function will be called immediately
            newSnakePosition.push({ x: foodPosition.x, y: foodPosition.y })
        }
        snakeDirection !== undefined && newSnakePosition.pop()


        setSnakePosition(newSnakePosition);
    }


    function gameOver() {
        const saveScores = () => {
            score > highScore && updateHighScore(score)
            updateAttempts(1)
        }
        const resetGame = () => {
            setSnakePosition(initialSnakePosition)
            setFoodPosition(initialFoodPosition)
            setSnakeDirection(undefined)
            setScore(0)
        }

        saveScores()
        resetGame()
    }

    function buttonControl(button: SnakeDirectionType) {
        // * This is the correct way to change the snake direction
        if (button === "Up") setSnakeDirection((prev) => (prev !== "Down" ? "Up" : prev));
        if (button === "Down") setSnakeDirection((prev) => (prev !== "Up" ? "Down" : prev));
        if (button === "Left") setSnakeDirection((prev) => (prev !== "Right" ? "Left" : prev));
        if (button === "Right") setSnakeDirection((prev) => (prev !== "Left" ? "Right" : prev));
    };

    //! UseEffects --------------------------------------------------------------------------

    // * This useEffect is to update the game in every given amount of time
    useEffect(() => {
        const interval = setInterval(updateGame, speed);

        return () => clearInterval(interval);
    }, [snakePosition]);


    // * This useEffect is to change the snake direction.
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            const key = e.key;

            // ! This caused the direction to set to the opposite direction
            // if (key === "ArrowUp") setSnakeDirection((prev: SnakeDirectionType) => { if (prev === "Right" || "Left" || undefined) return "Up" })
            // if (key === "ArrowDown") setSnakeDirection((prev: SnakeDirectionType) => { if (prev === "Right" || "Left" || undefined) return "Down" })
            // if (key === "ArrowLeft") setSnakeDirection((prev: SnakeDirectionType) => { if (prev === "Up" || "Down" || undefined) return "Left" })
            // if (key === "ArrowRight") setSnakeDirection((prev: SnakeDirectionType) => { if (prev === "Up" || "Down" || undefined) return "Right" })

            // * This is the correct way to change the snake direction
            if (key === "ArrowUp") setSnakeDirection((prev) => (prev !== "Down" ? "Up" : prev));
            if (key === "ArrowDown") setSnakeDirection((prev) => (prev !== "Up" ? "Down" : prev));
            if (key === "ArrowLeft") setSnakeDirection((prev) => (prev !== "Right" ? "Left" : prev));
            if (key === "ArrowRight") setSnakeDirection((prev) => (prev !== "Left" ? "Right" : prev));
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => document.removeEventListener("keydown", handleKeyPress);
    }, []);

    //! After any change of the direction state, the game lags and stops for a few milliseconds.
    //! to prevent this, i render the game one more time when the game is stopped, 
    //! so it doesn't feel like it's not moving
    useEffect(() => {
        if (snakeDirection !== undefined) updateGame()
    }, [snakeDirection]);

    // * to check for 
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 text-gray-300 font-medium text-normal w-full h-full md:px-8 pt-16">

            <div className="h-full flex-1 bg-gray-700 rounded-lg p-4 md:flex flex-col justify-center items-start hidden">
                <h3 className="font-bold text-2xl py-2">Statistics:</h3>
                <div>High Score: <span className="text-lg font-extrabold text-white/60"> {highScore}</span></div>
                <div>Attempts: <span className="text-lg font-extrabold text-white/60">{attempts}</span></div>
            </div>

            {/* Snake Board */}
            <div className="flex-1">
                <div className="grid Grid_Custom_Classes gap-[0.5px] md:gap-[1px] border-[6px] border-gray-700/75 p-[0.5px] rounded-xl">
                    {RenderGrid()}
                </div>
            </div>

            <div className="h-full flex-1 bg-gray-700 rounded-lg p-4 flex flex-col justify-center items-start">
                <span className="w-10 h-10 bg-red-500">{isMobile ? 'mobile' : 'not mobile'}</span>
                {/* <div className="h-full flex-1 bg-gray-700 rounded-lg p-4 flex flex-col justify-center items-start"> */}
                <div>Score: <span className="text-lg font-extrabold text-white/60">{score}</span></div>

                <div className="h-44 w-44 relative bg-orange-300">
                    <button className="p-1 h-6 bg-slate-800 text-white flex absolute justify-center items-center top-[50%] bottom-[50%] left-0" onClick={() => buttonControl('Left')}>
                        Left</button>
                    <button className="p-1 h-6 bg-slate-800 text-white flex absolute justify-center items-center top-0 left-[50%] right-[50%]" onClick={() => buttonControl('Up')}>
                        top</button>
                    <button className="p-1 h-6 bg-slate-800 text-white flex absolute justify-center items-center top-[50%] bottom-[50%] right-0" onClick={() => buttonControl('Right')}>
                        right</button>
                    <button className="p-1 h-6 bg-slate-800 text-white flex absolute justify-center items-center bottom-0 left-[50%] right-[50%]" onClick={() => buttonControl('Down')}>
                        bottom</button>
                </div>
            </div>
        </div>
    );
}
