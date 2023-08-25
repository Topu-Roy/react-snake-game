import { FoodPositionType, SnakePositionType } from "@/components/Game";

export function RenderGrid(totalGridSize: number, snakePosition: SnakePositionType, foodPosition: FoodPositionType) {
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