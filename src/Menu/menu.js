
export default class Menu extends Phaser.Scene {

    constructor() {
      super({ key: 'menu' });
    }
  
    create() {
      this.playbackground= this.add.image(this.scale.width*0.5, 300, 'playBackGround');
      this.playButton = this.add.image(this.scale.width*0.5, 450, 'playButton').setInteractive();
      this.playButton.on('pointerdown', () => {this.scene.start('level')});
    }
}