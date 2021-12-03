
export default class Car extends Phaser.GameObjects.Sprite {
  
    constructor(scene, x, y) {
      super(scene, x, y, 'car');
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
     
    }
  
  }
  