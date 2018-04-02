import * as PIXI from 'pixi.js';

class Board {
  constructor(application) {
    this.options = {
      color: {
        light: 0xE3BD80,
        dark: 0xA56F18,

        active: {
          light: 0x69629E,
          dark: 0x69629E,
          // dark: 0x106B54,
        },
      },
      boardSize: 8,
    };

    this.application = application;

    this.boardSprites = [];
    this.listQueensSprites = [];
    this.cellBoardStatus = [];
  }

  createBoardN(n = this.options.boardSize) {
    // Create empty array with cell statuses
    this.cellBoardStatus = Array.from({length: n}, () => Array.from({length: n}));

    const canvasWidth = this.application.view.width;
    const cellSize = Math.round(canvasWidth / n);

    // resize canvas to correct chess board size
    this.application.renderer.resize(cellSize * n, cellSize * n);

    [...new Array(n)].forEach((v1, rowIndex) => {
      let cellColor = !(rowIndex % 2); // If true - light, else dark

      this.boardSprites[rowIndex] = [];

      [...new Array(n)].forEach((v2, columnIndex) => {
        const rectangle = new PIXI.Graphics();

        rectangle.beginFill(cellColor ? this.options.color.light : this.options.color.dark);
        cellColor = !cellColor;

        rectangle.drawRect(0, 0, cellSize, cellSize);
        rectangle.endFill();

        rectangle.x = columnIndex * cellSize;
        rectangle.y = rowIndex * cellSize;

        this.boardSprites[rowIndex][columnIndex] = rectangle;

        this.application.stage.addChild(rectangle);
      });
    });
  }

  queensPossibleMatrixs(numbers = this.options.boardSize) {
    const result = [];

    const findMatrix = (queens, xyDif, xySum) => {
      const queensLength = queens.length;

      if (queensLength === numbers) {
        // Generate result matrix with queens
        const queensSetup = [];
        queens.forEach((queenIndex) => {
          queensSetup.push([].concat(
            [...new Array(queenIndex)].fill(0),
            [1],
            [...new Array(numbers - queenIndex - 1)].fill(0),
          ));
        });
        // Add matrix to result list
        result.push(queensSetup);
      } else {
        [...new Array(numbers)].forEach((val, index) => {
          if (
            !queens.includes(index)
            && !xyDif.includes(queensLength - index)
            && !xySum.includes(queensLength + index)
          ) {
            findMatrix(queens.concat(index), xyDif.concat(queensLength - index), xySum.concat(queensLength + index));
          }
        });
      }
    };

    // Start recursive function to find all possible matrixes
    findMatrix([], [], []);

    return result;
  }

  generateQueensMatrix() {
    const matrix = this.queensPossibleMatrixs();

    return matrix[Math.floor(Math.random() * matrix.length)];
  }

  fillBoardByQueens(queen, matrix = this.generateQueensMatrix()) {
    const canvasWidth = this.application.view.width;
    const n = matrix[0].length;
    const cellSize = Math.round(canvasWidth / n);
    const radius = cellSize / 10; // 10%

    [...new Array(n)].forEach((v1, rowIndex) => {
      this.listQueensSprites[rowIndex] = [];

      [...new Array(n)].forEach((v2, columnIndex) => {
        if (matrix[rowIndex][columnIndex] === 0) {
          this.emptyCell(rowIndex, columnIndex, radius, cellSize);
        } else {
          this.queenCell(queen, rowIndex, columnIndex, cellSize);
        }
      });
    });
  }

  emptyCell(rowIndex, columnIndex, radius, cellSize) {
    const circle = new PIXI.Graphics();
    circle.beginFill(0xFF0000);
    circle.drawCircle(0, 0, radius);
    circle.endFill();

    circle.x = (columnIndex * cellSize) + (cellSize / 2);
    circle.y = (rowIndex * cellSize) + (cellSize / 2);
    circle.visible = false;

    this.listQueensSprites[rowIndex][columnIndex] = circle;

    this.application.stage.addChild(circle);
  }

  queenCell(queen, rowIndex, columnIndex, cellSize) {
    const queenSprite = new PIXI.Sprite(PIXI.loader.resources[queen].texture);

    queenSprite.x = (columnIndex * cellSize) + (cellSize / 4);
    queenSprite.y = (rowIndex * cellSize) + (cellSize / 4);

    queenSprite.width = cellSize / 2;
    queenSprite.height = cellSize / 2;

    this.listQueensSprites[rowIndex][columnIndex] = queenSprite;

    this.application.stage.addChild(queenSprite);

    queenSprite.interactive = true;
    this.queenActivate(queenSprite, rowIndex, columnIndex);
  }

  queenActivate(queenSprite, rowIndex, columnIndex) {
    queenSprite.on('pointerdown', () => {
      if (this.cellBoardStatus[rowIndex][columnIndex] === 2) {
        this.cellBoardStatus[rowIndex][columnIndex] = undefined;

        this.hideOccupiedCells();
      } else {
        this.hideOccupiedCells();

        this.cellBoardStatus[rowIndex][columnIndex] = 2;

        this.showOccupiedCells(rowIndex, columnIndex);
      }

      this.animateQueen(rowIndex, columnIndex);
    });
  }

  showOccupiedCells(rowIndex, columnIndex) {
    this.listQueensSprites.forEach((rowQueens, rowQueensIndex) => {
      rowQueens.forEach((colQueens, colQueensIndex) => {
        if (
          (
            rowQueensIndex === rowIndex
            || colQueensIndex === columnIndex
            || (rowIndex - columnIndex) === (rowQueensIndex - colQueensIndex)
            || (rowIndex + columnIndex) === (rowQueensIndex + colQueensIndex)
          )
          && !(rowQueensIndex === rowIndex && colQueensIndex === columnIndex)
        ) {
          // Show red dot
          this.listQueensSprites[rowQueensIndex][colQueensIndex].visible = true;

          // Set cell status
          this.cellBoardStatus[rowQueensIndex][colQueensIndex] = 1;
        }
      });
    });
  }

  hideOccupiedCells() {
    this.cellBoardStatus.forEach((row, rowIndex) => {
      row.forEach((visible, colIndex) => {
        if (visible) {
          this.cellBoardStatus[rowIndex][colIndex] = undefined;
        }

        if (visible === 1) {
          this.listQueensSprites[rowIndex][colIndex].visible = false;
        }

        if (visible === 2) {
          this.animateQueen(rowIndex, colIndex);
        }
      });
    });
  }

  animateQueen(rowIndex, columnIndex) {
    const cellColor = !((rowIndex + columnIndex) % 2);

    let currentColor = cellColor ? this.options.color.light : this.options.color.dark;
    if (this.cellBoardStatus[rowIndex][columnIndex] === 2) {
      currentColor = cellColor ? this.options.color.active.light : this.options.color.active.dark;
    }

    const sprite = this.boardSprites[rowIndex][columnIndex];
    const originSprite = sprite.clone();

    sprite.clear();
    sprite.beginFill(currentColor);
    sprite.drawRect(0, 0, originSprite.width, originSprite.height);
    sprite.endFill();
  }
}

export const BoardInstance = Board;
