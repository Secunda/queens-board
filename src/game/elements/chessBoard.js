import * as PIXI from 'pixi.js';

const options = {
  color: {
    light: 0xE3BD80,
    dark: 0xA56F18,
  },
  boardSize: 8,
};

export const createBoardN = (application, n = options.boardSize) => {
  const canvasWidth = application.view.width;

  const cellSize = Math.ceil(canvasWidth / n);

  [...new Array(n)].forEach((v1, rowIndex) => {
    let cellColor = !(rowIndex % 2); // If true - light, else dark
    [...new Array(n)].forEach((v2, columnIndex) => {
      const rectangle = new PIXI.Graphics();

      rectangle.beginFill(cellColor ? options.color.light : options.color.dark);
      cellColor = !cellColor;

      rectangle.drawRect(0, 0, cellSize, cellSize);
      rectangle.endFill();

      rectangle.x = columnIndex * cellSize;
      rectangle.y = rowIndex * cellSize;

      application.stage.addChild(rectangle);
    });
  });
};

