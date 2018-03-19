import * as PIXI from 'pixi.js';
// import queen from './../../public/images/queen.png';
import mainGameComponent from './elements/mainGameComponent';
import prepareCanvas from './elements/prepareCanvas';
import {createBoardN} from './elements/chessBoard';

const mainComponent = () => {
  const app = mainGameComponent();

  // load an image and run the `setup` function when it's done
  // PIXI.loader
  //     .add(queen)
  //     .load(setup);

  // //This `setup` function will run when the image has loaded
  // function setup() {
  //     //Create the cat sprite
  //     let cat = new PIXI.Sprite(PIXI.loader.resources[queen].texture);
  //     cat.scale.x = 0.05;
  //     cat.scale.y = 0.05;

  //     //Add the cat to the stage
  //     app.stage.addChild(cat);
  // }

  createBoardN(app);

  return prepareCanvas(app);
};

export {mainComponent};
