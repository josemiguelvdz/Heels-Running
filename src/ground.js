
import scene from './Scene.js'
export default class Ground extends Phaser.GameObjects.Sprite {
  constructor(scene, player,police, x, y) {
    super(scene, x, y, 'ground');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.scene.physics.add.collider(this, player);
    this.scene.physics.add.collider(this, police);
    this.scene.physics.add.collider(this);
  }
}
