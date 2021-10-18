import Boot from "./boot.js";
import Level from "./scene.js";

let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById('myCanvas'),
    width: 840,
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


