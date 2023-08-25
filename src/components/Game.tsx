"use client";
import { initialSnakePosition, snakeSpeed, totalGridSize } from "@/constants/constants";
import { useEffect, useState } from "react";

export default function Game() {

    let speed: number = snakeSpeed();


    // * States -----------------------------------------------------

    type SnakeDirectionType = "Left" | "Right" | "Up" | "Down" | undefined;

    const [score, setScore] = useState(0)
    const [foodPosition, setFoodPosition] = useState({
        x: totalGridSize / 2 - 5,
        y: totalGridSize / 2,
    });
    const [snakePosition, setSnakePosition] = useState(initialSnakePosition);
    const [snakeDirection, setSnakeDirection] =
        useState<SnakeDirectionType>(undefined);



    // ! Increase the snake speed according to current score
    if (score > 4) speed = speed - 40
    if (score > 9) speed = speed - 40
    if (score > 14) speed = speed - 40
    if (score > 19) speed = speed - 40
    if (score > 24) speed = speed - 40
    if (score > 29) speed = speed - 40

    // * Functions -------------------------------------------------
    function renderGrid() {
        type CellType = JSX.Element[];
        let cellArray: CellType = [];

        for (let row = 0; row < totalGridSize; row++) {
            for (let col = 0; col < totalGridSize; col++) {
                let className = "bg-gray-500 w-full h-full";

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

    //! UseEffects -----------------------------------------------

    useEffect(() => {
        // * Update the snake position
        let interval = setInterval(updateGame, speed);


        console.log(speed)

        return () => clearInterval(interval);

    }, [snakePosition]);

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
            <p>
                Score: <span>{score}</span>
            </p>
            {/* Snake Board */}
            <div className="h-32 w-32 grid Grid_Custom_Classes gap-[1px]">
                {renderGrid()}
            </div>
        </div>
    );
}
