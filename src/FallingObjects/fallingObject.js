

export default class FallingObject extends Phaser.GameObjects.Sprite {

  constructor(scene, player, x, y, nombreImg) {
    super(scene, x, y, nombreImg); //Constructor de la clase base

    this.jugador=player;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(); //Colision con los limies del mundo 
    this.body.moves=false;
    this.isMoving=false;
    this.y -= this.height;
    this.nLifesLose=1;

    const configSound = {
      mute: false,
      volume: 0.3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    this.fallingSound= this.scene.sound.add("fallingobjectSound",configSound);
  }

  preUpdate() {
    super.preUpdate();

    if(this.jugador.x + 345>= this.x) 
    {
      this.body.moves=true;
      this.isMoving=true;
    }
    if(this.isMoving)
    {
     
        if (this.angle===360) this.angle=0;
        this.angle++; 
      
    }  
    
    this.fallingSound.setVolume(this.scene.ChangeVolume());
  }

  handleCollisionFallObj(player,kick){
   if(player)this.handleCollisionPlayer();
   else if(kick)this.handleCollisionFloor();
   else this.handleCollisionFloor();
  }


  /**
  * Handles the collision with player, and makes a breaking sound
  */
  handleCollisionPlayer() {
    this.jugador.loseLife( this.nLifesLose);
    this.fallingSound.play();
    this.createParticlesFallingbj();
    this.destroy();

    //SONIDO DE IMPACTO

  }


  /**
  * Handles the collision with floor and makes a breaking sound
  */
  handleCollisionFloor() {
    this.fallingSound.play();
    this.createParticlesFallingbj();
    this.destroy();
    
    //SONIDO DE RUPTURA

  }

  handleMovement(){
    if(this.gameIsPaused){
      this.gameIsPaused=false;
      this.fallingSound.pause();
    }
    else {
      this.gameIsPaused=true;
      this.fallingSound.resume();
    }
  } 

  /**
   * Create the particles of the F. Obj.
   */
  createParticlesFallingbj()
  {
    let deathParticles = this.scene.add.particles('breakingParticle');
    this.deathEmitter = deathParticles.createEmitter({
      x: -500,
      y: 300,
      speed: { min: -800, max: 800 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.9, end: 0 },
      blendMode: 'SCREEN',
      //active: false,
      lifespan: 600,
      gravityY: 800
    });
    this.deathEmitter.explode(100, this.x,this.y);
  }
}