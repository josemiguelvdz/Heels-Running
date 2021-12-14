import StaticObject from "./staticobject.js";

export default class Box extends StaticObject {
    constructor(scene, x, y, nameImg) {
      super(scene, x, y, nameImg);

      this.collision = false;

      this.scene.anims.create({
        key: 'boxDestruction_anim',
        frames: this.anims.generateFrameNumbers('boxDestruction', { start: 0, end: 7 }),
        frameRate: 15, // Velocidad de la animación
      });
    }

  animateBox(){
    this.setFlip(false,false);
    this.stop();   
    this.play('boxDestruction_anim');

    this.on( 'animationcomplete-boxDestruction_anim',  () => {
      var value = Phaser.Math.Between(0, 100);
      var pU=Phaser.Math.Between(0, 2);
      if(value<30)this.scene.createBoxPowerUp(pU,this.body.x+32.5,this.body.y+90);
      this.destroy();
    });      
  }

  handleCollision(){
    if(!this.collision){
      this.animateBox();
      this.collision = true;
    }
  }
}