import scene from './scene.js'

export default class salmon extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'salmonFish');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
  this.body.setCollideWorldBounds(); //Colision con los limies del mundo 
    this.y -= this.height;
  }

  preUpdate() {
    super.preUpdate();
    
  }
}
  // function collideSalmon()
  // {
  //   if(this.scene.physics.collide(this.scene.player, this.scene.salmon))
  //      {
  //        console.log("Ha chocado");
  //        this.scene.salmon.destroy();
  //        this.scene.player.speed=600;
  //      } 
  // }
