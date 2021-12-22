
export default class StaticObject extends Phaser.GameObjects.Sprite {
  
    constructor(scene, x, y, nameImg){
      super(scene, x, y, nameImg);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
    }
    
  }
  