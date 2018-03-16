import * as PIXI from 'pixi.js';
import queen from './../../public/images/queen.png';

const mainComponent = () => {
    //Create a Pixi Application
    let app = new PIXI.Application({ 
        width: 500, 
        height: 500,                       
        antialias: true, 
        transparent: false, 
        resolution: 1
    });

    console.log(123)
    //load an image and run the `setup` function when it's done
    PIXI.loader
        .add(queen)
        .load(setup);

    //This `setup` function will run when the image has loaded
    function setup() {
        //Create the cat sprite
        let cat = new PIXI.Sprite(PIXI.loader.resources[queen].texture);
        cat.scale.x = 0.05;
        cat.scale.y = 0.05;

        //Add the cat to the stage
        app.stage.addChild(cat);
    }

    return app.view;
}

export {
    mainComponent
}
