

export default class FallingObject extends Phaser.GameObjects.Sprite {


  constructor(scene, player, x, y, nombreImg) {
    super(scene, x, y, nombreImg); //Constructor de la clase base

    this.jugador=player;
     this.scene.add.existing(this);
     this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(); //Colision con los limies del mundo 
    this.body.moves=false;
    this.y -= this.height;
    this.nLifesLose=1;

  }

  preUpdate() {
    super.preUpdate();
     if(this.jugador.x +250>= this.x) this.body.moves=true;

  }

  handleCollisionFallObj(player)
  {
   if(player)this.handleCollisionPlayer();
   else handleCollisionFloor();
  }

  /**
   * Handles the collision with player, and makes a breaking sound
   */
  handleCollisionPlayer() {

    this.jugador.loseLife( this.nLifesLose);
    this.destroy();
    //SONIDO DE IMPACTO

  }
   /**
   * Handles the collision with player and makes a breaking sound
   */
  handleCollisionFloor() {

    this.destroy();
    //SONIDO DE RUPTURA

  }



}