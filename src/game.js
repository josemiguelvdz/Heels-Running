import Boot from "./boot.js";
import Level from "./level.js";
import Menu from "./Menu/menu.js";
import GameOver from "./Menu/gameover.js";
import Win from "./Menu/win.js";
import PauseMenu from "./Menu/pausemenu.js";
import Intro from "./intro.js";

let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById('myCanvas'),
    width: 1200,
    height: 600,
    scale: {
        //mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, Level, Menu, GameOver, Win, PauseMenu, Intro],
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 850 }, 
            debug: false
        } 
    }
};

new Phaser.Game(config);