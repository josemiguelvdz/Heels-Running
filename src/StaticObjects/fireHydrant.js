
export default class FireHydrant extends Phaser.GameObjects.Sprite {
  
    constructor(scene, x, y) {
      super(scene, x, y, 'fireHydrant');
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
     
    }
  
  }
  