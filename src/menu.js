import button from "./Button.js"

export default class Menu extends Phaser.Scene {
    /**
     * Constructor del menu
     */
    constructor() {
      super({ key: 'menu' });
    }
  
    create() {

      this.playButton = new button(this, 500, 100).setInteractive();

      this.startButton = this.playButton;

      this.startButton.on('pointerdown', () => {this.scene.start('level')});
    
    }
}