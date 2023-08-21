"use client";
import { useEffect, useState } from "react";

export default function Home() {
  // * Variables
  let totalGridSize = 20;

  let initialSnakePosition = [
    { x: totalGridSize / 2, y: totalGridSize / 2 },
    { x: totalGridSize / 2 + 1, y: totalGridSize / 2 },
  ];

  // * States

  type SnakeDirectionType = "Left" | "Right" | "Up" | "Down";

  const [foodPosition, setFoodPosition] = useState({
    x: totalGridSize / 2 - 5,
    y: totalGridSize / 2,
  });
  const [snakePosition, setSnakePosition] = useState(initialSnakePosition);
  const [snakeDirections, setSnakeDirections] =
    useState<SnakeDirectionType>("Left");

  // * Functions
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
        if (isFoodHere) {
          className = `${className} bg-green-500`;
        }

        if (isSnakeHeadHere) {
          className = `${className} bg-red-500`;
        }
        if (isSnakeBodyHere) {
          className = `${className} bg-gray-700`;
        }

        let cell = <div className={className} key={`${row}+${col}`} />;
        cellArray.push(cell);
      }
    }

    return cellArray;
  }

  function updateGame() {
    let newSnakePosition = [...snakePosition];

    switch (snakeDirections) {
      case "Left":
        newSnakePosition.unshift({
          x: newSnakePosition[0].x,
          y: newSnakePosition[0].y - 1,
        });
        break;
      case "Right":
        newSnakePosition.unshift({
          x: newSnakePosition[0].x,
          y: newSnakePosition[0].y + 1,
        });
        break;
      case "Up":
        newSnakePosition.unshift({
          x: newSnakePosition[0].x + 1,
          y: newSnakePosition[0].y,
        });
        break;
      case "Down":
        newSnakePosition.unshift({
          x: newSnakePosition[0].x - 1,
          y: newSnakePosition[0].y,
        });
        break;
    }
    newSnakePosition.pop();
    setSnakePosition(newSnakePosition);
  }

  useEffect(() => {

    let interval = setInterval(updateGame, 500)

    return () => clearInterval(interval)

  }, [snakePosition])

  return (
    <main className="flex bg-gray-800 min-h-screen flex-col justify-start items-center p-24">
      <p>
        Score: <span>0</span>
      </p>

      {/* Snake Board */}
      <div className="h-32 w-32 grid Grid_Custom_Classes gap-[1px]">
        {renderGrid()}
      </div>
    </main>
  );
}
