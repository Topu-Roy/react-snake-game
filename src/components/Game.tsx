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
    const [snakeDirection, setSnakeDirection] =
        useState<SnakeDirectionType>(undefined);

    // ! Increase the snake speed according to current score ---------------------------
    if (score > 4) speed = speed - 40
    if (score > 9) speed = speed - 40
    if (score > 14) speed = speed - 40
    if (score > 19) speed = speed - 40
    if (score > 24) speed = speed - 40
    if (score > 29) speed = speed - 40

    // * Functions ---------------------------------------------------------------------

    function reRenderFood() {
        let xPosition = Math.floor(Math.random() * totalGridSize)
        let yPosition = Math.floor(Math.random() * totalGridSize)

        setFoodPosition({ x: xPosition, y: yPosition })
    }

    function RenderGrid() {
        type CellType = JSX.Element[];
        let cellArray: CellType = [];

        for (let row = 0; row < totalGridSize; row++) {
            for (let col = 0; col < totalGridSize; col++) {
                let className = "bg-gray-500 w-full h-full";


                if (snakePosition[0].x > 20 || snakePosition[0].x < 0 || snakePosition[0].y > 20 || snakePosition[0].y < 0) { gameOver(); }

                // * Checking if the current cell should render the food or snake
                let isFoodHere = foodPosition.x === row && foodPosition.y === col;
                let isSnakeHeadHere =
                    snakePosition[0].x === row && snakePosition[0].y === col;

                let isSnakeBodyHere = snakePosition.some(
                    (item) => item.x === row && item.y === col
                );

                // * Rendering the food and snake body
                if (isFoodHere) className = `${className} bg-green-500`;
                if (isSnakeHeadHere) className = `${className} bg-red-500`;
                if (isSnakeBodyHere) className = `${className} bg-gray-700`;

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

        let isFoodEaten = newSnakePosition[0].x === foodPosition.x && newSnakePosition[0].y === foodPosition.y;

        if (isFoodEaten) {
            setScore(prev => prev + 1)
            reRenderFood()
        }
        else {
            if (snakeDirection !== undefined) newSnakePosition.pop();
        }

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

    useEffect(() => {
        // * Update the snake position
        let interval = snakeDirection !== undefined ? setInterval(updateGame, speed) : undefined;

        return () => clearInterval(interval);
    }, [snakePosition, snakeDirection]);

    useEffect(() => {
        // * Detect the key press to change the direction of the snake
        document.addEventListener("keydown", (e) => {
            let key = e.key;

            // ! This caused the direction to set to the opposite direction
            // if (key === "ArrowUp") setSnakeDirection((prev: SnakeDirectionType) => { if (prev === "Right" || "Left" || undefined) return "Up" })
            // if (key === "ArrowDown") setSnakeDirection((prev: SnakeDirectionType) => { if (prev === "Right" || "Left" || undefined) return "Down" })
            // if (key === "ArrowLeft") setSnakeDirection((prev: SnakeDirectionType) => { if (prev === "Up" || "Down" || undefined) return "Left" })
            // if (key === "ArrowRight") setSnakeDirection((prev: SnakeDirectionType) => { if (prev === "Up" || "Down" || undefined) return "Right" })

            // ! This is the right way to set snake direction
            if (key === "ArrowUp") setSnakeDirection((prev: SnakeDirectionType) => (prev !== "Down" ? "Up" : prev));
            if (key === "ArrowDown") setSnakeDirection((prev: SnakeDirectionType) => (prev !== "Up" ? "Down" : prev));
            if (key === "ArrowLeft") setSnakeDirection((prev: SnakeDirectionType) => (prev !== "Right" ? "Left" : prev));
            if (key === "ArrowRight") setSnakeDirection((prev: SnakeDirectionType) => (prev !== "Left" ? "Right" : prev));

        });
    }, []);

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
