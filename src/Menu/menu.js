
export default class Menu extends Phaser.Scene {
    /**
     * Constructor del menu
     */
    constructor() {
      super({ key: 'menu' });
    }
  
    create() {

      //this.playButton = new button(this, 500, 100).setInteractive();
      this.playButton = this.add.image(500, 100, 'playButton').setInteractive();
      this.playButton.on('pointerdown', () => {this.scene.start('level')});

      
    
    }
}