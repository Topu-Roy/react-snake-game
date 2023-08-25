"use client";

import { initialSnakePosition, snakeSpeed, totalGridSize } from "@/constants/constants";
import { RenderGrid } from "@/functions/functions";
import { useEffect, useState } from "react";
import ShowScore from "./ShowScore";

//* type for this component
type SnakeDirectionType = "Left" | "Right" | "Up" | "Down" | undefined;
export type SnakePositionType = { x: number; y: number; }[]
export type FoodPositionType = { x: number; y: number; }

export default function Game() {
    // * Constants --------------------------------------------------------------------
    let speed: number = snakeSpeed();

    // * States -----------------------------------------------------------------------
    const [score, setScore] = useState(0)
    const [foodPosition, setFoodPosition] = useState<FoodPositionType>({
        x: totalGridSize / 2 - 5,
        y: totalGridSize / 2,
    });
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
                {RenderGrid(totalGridSize, snakePosition, foodPosition)}
            </div>
        </div>
    );
}
