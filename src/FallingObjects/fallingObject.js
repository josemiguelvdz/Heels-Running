

export default class FallingObject extends Phaser.GameObjects.Sprite {


  constructor(scene, player, x, y, nombreImg) {
    super(scene, x, y, nombreImg); //Constructor de la clase base

    this.jugador=player;
     this.scene.add.existing(this);
     this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(); //Colision con los limies del mundo 
    this.body.moves=false;
    this.isMoving=false;
    this.gameIsPaused=false;
    this.y -= this.height;
    this.nLifesLose=1;

  }

  preUpdate() {
    super.preUpdate();
     if(this.jugador.x +250>= this.x) 
     {
       this.body.moves=true;
       this.isMoving=true;
     }
    
     if(this.isMoving)
     {
    
       if(!this.gameIsPaused){
        if (this.angle===360)this.angle=0;
        this.angle++; 
       }
     }
    
  }

  handleCollisionFallObj(player)
  {
   if(player)this.handleCollisionPlayer();
   else this.handleCollisionFloor();
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

handleMovement()
{
if(this.gameIsPaused)this.gameIsPaused=false;
else this.gameIsPaused=true;
}

}