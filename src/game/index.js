import * as PIXI from 'pixi.js';
import queen from './../../public/images/queen.png';
import mainGameComponent from './elements/mainGameComponent';
import prepareCanvas from './elements/prepareCanvas';
import {BoardInstance} from './elements/chessBoard';

const mainComponent = () => {
  const app = mainGameComponent();
  const board = new BoardInstance(app);

  board.createBoardN();

  PIXI.loader
    .add(queen)
    .load(() => {
      board.fillBoardByQueens(queen);
    });

  return prepareCanvas(app);
};

export {mainComponent};
