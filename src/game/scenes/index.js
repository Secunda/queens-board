import * as PIXI from 'pixi.js';

import splashLogo from './../../../public/images/splashLogo.png';

class Scenes {
  constructor(application) {
    this.application = application;

    this.scenes = {};
    this.initScenes();
  }

  initScenes() {
    const logoScene = new PIXI.Container();
    logoScene.visible = true;
    this.application.stage.addChild(this.initLogoScene(logoScene));

    const menuScene = new PIXI.Container();
    menuScene.alpha = 0.2;
    menuScene.visible = false;
    this.application.stage.addChild(this.initMenuScene(menuScene));

    const gameScene = new PIXI.Container();
    gameScene.visible = false;
    this.application.stage.addChild(gameScene);

    const solutionScene = new PIXI.Container();
    solutionScene.visible = false;
    this.application.stage.addChild(solutionScene);

    this.scenes = {
      logoScene, menuScene, gameScene, solutionScene,
    };
  }

  initLogoScene(logoScene) {
    // Background
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = this.application.view.width;
    bg.height = this.application.view.height;
    bg.tint = 0x1f1b20;

    // Logo
    const splashLogoSprite = new PIXI.Sprite(PIXI.loader.resources[splashLogo].texture);
    const scale = this.application.view.width / splashLogoSprite.width;
    splashLogoSprite.width = this.application.view.width;
    splashLogoSprite.height *= scale;

    splashLogoSprite.x = 0;
    splashLogoSprite.y = (this.application.view.height - splashLogoSprite.height) / 2;
    splashLogoSprite.alpha = 0;

    // Fade in for logo
    const animate = () => {
      if (splashLogoSprite.alpha < 1) {
        splashLogoSprite.alpha += 0.01;
      }

      window.requestAnimationFrame(animate);
    };

    animate();

    logoScene.addChild(bg);
    logoScene.addChild(splashLogoSprite);

    return logoScene;
  }

  initMenuScene(menuScene) {
    // Background
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = this.application.view.width;
    bg.height = this.application.view.height;
    bg.tint = 0x1f1b20;
    menuScene.addChild(bg);

    return menuScene;
  }

  getScenes() {
    return this.scenes;
  }
}

export const ScenesInstance = Scenes;
