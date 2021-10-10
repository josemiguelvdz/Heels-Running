import Boot from "./boot.js";
import Level from "./scene.js";


let config = {
    type: Phaser.AUTO,
    width:  1000,
    height: 500,
    scale: {
        // mode: Phaser.Scale.FIT,  
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


