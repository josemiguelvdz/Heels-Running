import scene from './Scene.js'
import powerUp from './PowerUp.js'
export default class Platform extends Phaser.GameObjects.Sprite {
  
  constructor(scene, x, y) {
    super(scene, x, y, 'platform');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
   
  }

}
