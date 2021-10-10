

export default class Background extends Phaser.GameObjects.Sprite {

  constructor(scene, background) {
    super(scene, 840, 600, background);
    this.scene.add.existing(this);
  }

}
