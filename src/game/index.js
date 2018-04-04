import * as PIXI from 'pixi.js';

import queen from './../../public/images/queen.png';
import splashLogo from './../../public/images/splashLogo.png';

import mainGameComponent from './elements/mainGameComponent';
import prepareCanvas from './elements/prepareCanvas';
import {BoardInstance} from './elements/chessBoard';
import {ScenesInstance} from './scenes/index';


// https://github.com/kittykatattack/learningPixi#gamescene
const mainComponent = async () => {
  const app = mainGameComponent();

  await PIXI.loader
    .add([queen, splashLogo])
    .load(() => {
      const scenes = (new ScenesInstance(app)).getScenes();
      const {
        logoScene, gameScene, menuScene, solutionScene,
      } = scenes;

      const alphaFilterLogoScene = new PIXI.filters.AlphaFilter();
      alphaFilterLogoScene.alpha = logoScene.alpha;
      logoScene.filters = [alphaFilterLogoScene];

      const animateLogoScene = () => {
        if (alphaFilterLogoScene.alpha > 0 && logoScene.visible) {
          alphaFilterLogoScene.alpha -= 0.01;
          menuScene.alpha += 0.01;
        } else {
          logoScene.visible = false;
        }
        window.requestAnimationFrame(animateLogoScene);
      };

      setTimeout(() => {
        menuScene.visible = true;
        animateLogoScene();
      }, 2000);

      // const board = new BoardInstance(app, solutionScene);

      // board.createBoardN();
      // board.fillBoardByQueens(queen);
    });

  return prepareCanvas(app);
};

export {mainComponent};
