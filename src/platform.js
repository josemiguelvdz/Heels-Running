
export default class Platform extends Phaser.GameObjects.Sprite {
  
  constructor(scene, player, x, y) {
    super(scene, x, y, 'platform');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.scene.physics.add.collider(this, player);
  }

}
