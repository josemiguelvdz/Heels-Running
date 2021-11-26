
export default class Box extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'boxDestruction');

      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);

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