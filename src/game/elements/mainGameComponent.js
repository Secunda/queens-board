import * as PIXI from 'pixi.js';

const getCanvasSize = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const canvasSize = Math.min(windowWidth, windowHeight) - 10;

  return canvasSize;
};

export default () => {
  let canvasSize = getCanvasSize();

  // Create a Pixi Application
  const app = new PIXI.Application({
    width: canvasSize,
    height: canvasSize,
    antialias: true,
    transparent: true,
    resolution: 1,
    backgroundColor: 0xFFFFFF,
    autoResize: true,
  });

  window.addEventListener('resize', () => {
    canvasSize = getCanvasSize();

    app.renderer.view.style.width = `${canvasSize}px`;
    app.renderer.view.style.height = `${canvasSize}px`;
  });

  return app;
};
