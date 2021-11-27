
export default class Menu extends Phaser.Scene {
    /**
     * Constructor del menu
     */
    constructor() {
      super({ key: 'menu' });
    }
  
    create() {

      
      this.playbackground= this.add.image(500, 300, 'playBackGround')
      this.playButton = this.add.image(500, 100, 'playButton').setInteractive();
      this.playButton.on('pointerdown', () => {this.scene.start('level')});
      

      
    
    }
}