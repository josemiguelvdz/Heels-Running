
export default class Box extends Phaser.GameObjects.Sprite {
    constructor(scene, player, x, y) {
      super(scene, x, y, 'boxDestruction');

      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setImmovable(true);
      //this.body.setCollideWorldBounds();

      /*this.collision = true;

      this.scene.physics.add.collider(player, this, (o1, o2) => {
        if(this.collision){
          o2.animateBox();
          this.collision = false;
        }
      });*/

      this.scene.anims.create({
        key: 'boxDestruction_anim',
        frames: this.anims.generateFrameNumbers('boxDestruction', { start: 0, end: 7 }),
        frameRate: 8, // Velocidad de la animación
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
      this.animateBox();
    }
}