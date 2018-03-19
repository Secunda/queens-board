import * as PIXI from 'pixi.js';

export default () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const canvasSize = Math.min(windowWidth, windowHeight) - 10;

  // Create a Pixi Application
  const app = new PIXI.Application({
    width: canvasSize,
    height: canvasSize,
    antialias: true,
    transparent: true,
    resolution: 1,
    backgroundColor: 0xFFFFFF,
  });

  return app;
};
