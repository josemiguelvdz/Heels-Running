import scene from './scene.js'
import powerUp from './powerUp.js'
export default class Platform extends Phaser.GameObjects.Sprite {
  
  constructor(scene, player, powerUp, x, y) {
    super(scene, x, y, 'platform');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.scene.physics.add.collider(this, player);

  }

}
