
export default class Menu extends Phaser.Scene {
    /**
     * Constructor del menu
     */
    constructor() {
      super({ key: 'menu' });
    }
  
    create() {

      
      this.playbackground= this.add.image(this.scale.width*0.5, 300, 'playBackGround')
      this.playButton = this.add.image(this.scale.width*0.5, 100, 'playButton').setInteractive();
      this.playButton.on('pointerdown', () => {this.scene.start('level')});
      

      
    
    }
}