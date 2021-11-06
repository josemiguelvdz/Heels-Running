import Boot from "./Boot.js";
import Level from "./Scene.js";

let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById('myCanvas'),
    width: 1000,
    height: 600,
    scale: {
        //mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, Level],
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 400 }, 
            debug: false 
        } 
    }
};

new Phaser.Game(config);


