import menu from "./Menu.js";

export default class Button extends Phaser.GameObjects.Sprite{
  
    constructor(scene, x, y) {
      super(scene, x, y, 'playButton');
      this.scene.add.existing(this);     
    }
}