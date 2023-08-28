"use client";

import { useEffect, useState } from "react";
import ShowScore from "./ShowScore";

//* type for this component
type SnakeDirectionType = "Left" | "Right" | "Up" | "Down" | undefined;
export type SnakePositionType = { x: number; y: number; }[]
export type FoodPositionType = { x: number; y: number; }

export default function Game() {
    // * Variables ----------------------------------------------------
    let totalGridSize = 20;
    let speed = 320;

    let initialSnakePosition = [
        { x: totalGridSize / 2, y: totalGridSize / 2 },
        { x: totalGridSize / 2 + 1, y: totalGridSize / 2 },
    ];

    let initialFoodPosition = {
        x: totalGridSize / 2 - 5,
        y: totalGridSize / 2,
    };


    // * States -----------------------------------------------------------------------
    const [score, setScore] = useState(0)
    const [foodPosition, setFoodPosition] = useState<FoodPositionType>(initialFoodPosition);
    const [snakePosition, setSnakePosition] = useState<SnakePositionType>(initialSnakePosition);
    const [snakeDirection, setSnakeDirection] = useState<SnakeDirectionType>(undefined);

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

        for (let row = 0; row < totalGridSize; row++) {
            for (let col = 0; col < totalGridSize; col++) {
                let className = "bg-gray-100 w-full h-full";


                if (snakePosition[0].x > 20 || snakePosition[0].x < 0 || snakePosition[0].y > 20 || snakePosition[0].y < 0) { gameOver(); }

                // * Checking if the current cell should render the food or snake
                let isFoodHere = foodPosition.x === row && foodPosition.y === col;
                let isSnakeHeadHere = snakePosition[0].x === row && snakePosition[0].y === col;
                let isSnakeBodyHere = snakePosition.some((item) => item.x === row && item.y === col);

                // * Rendering the food and snake body
                if (isFoodHere) className = "w-full h-full bg-green-500";
                if (isSnakeHeadHere) className = 'snake_head';
                if (isSnakeBodyHere) className = "w-full h-full bg-gray-700";

                let cell = <div className={className} key={`${row}+${col}`} />;
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

            // * if snake head is overlapping with the food, add it to the snake body

            newSnakePosition.unshift({ x: foodPosition.x, y: foodPosition.y })
        }
        snakeDirection !== undefined && newSnakePosition.pop()


        setSnakePosition(newSnakePosition);
    }

    function gameOver() {
        console.log('gameOver');
        setSnakePosition(initialSnakePosition)
        setFoodPosition(initialFoodPosition)
        setSnakeDirection(undefined)

        setScore(0)
    }

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

    return (
        <div>
            <ShowScore score={score} />
            {/* Snake Board */}
            <div className="h-32 w-32 grid Grid_Custom_Classes gap-[1px]">
                {RenderGrid()}
            </div>
        </div>
    );
}
