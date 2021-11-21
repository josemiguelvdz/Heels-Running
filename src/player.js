import Chrono from "./chrono.js";

export default class Player extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, nLifes) {
    super(scene, x, y, 'idle');
    
    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.speed = 300;
    this.speedAux= this.speed;
    this.jumpSpeed = -400;
    this.jumpImpulse = 1.5;
    this.numLifes=nLifes;
    this.esmoquinShield=false;

   //Atributos relacionados con el esmoquin
    this.offsetTime=0;
    this.checkTiempo=false;  //Bool para verificar si se puede o no contar 
    this.contador= new Chrono(this.scene); //Contador para poder activar y desactivar powrr ups con el tiempo 
    this.durationEsmoquin=0; //Para la duracion del esmoquin 




    this.arrested=false;

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.scene.anims.create({
      key: 'idle_anim',
      frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 3 }),
      frameRate: 8, // Velocidad de la animación
      repeat: -1    // Animación en bucle
    });
    this.scene.anims.create({
      key: 'run_anim',
      frames: this.anims.generateFrameNumbers('run', { start: 0, end: 7 }),
      frameRate: 8, // Velocidad de la animación
      repeat: -1    // Animación en bucle
    });



  }
   animatePlayer()
  {
     if (Phaser.Input.Keyboard.JustDown(this.cursors.right) && !this.arrested) {
      this.setFlip(false,false);
      this.stop();
      this.play('run_anim');
    }
    else if (Phaser.Input.Keyboard.JustDown(this.cursors.left) && !this.arrested) {
      this.setFlip(true,false);
      this.stop();   
      this.play('run_anim');
    }
    else if (Phaser.Input.Keyboard.JustUp(this.cursors.left)||Phaser.Input.Keyboard.JustUp(this.cursors.right) && !this.arrested)
    {
      this.stop();
      this.play('idle_anim');
    }
    
  }
  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    this.animatePlayer();
    //console.log(this.numLifes);
    //this.body.setVelocityX(this.speed); //Movimiento continuo del jugador hacia la derecha

    if (this.cursors.left.isDown && !this.arrested) {
      this.body.setVelocityX(-this.speed);
      
    }
    else if (this.cursors.right.isDown && !this.arrested)  {
      this.body.setVelocityX(this.speed);
    }
    else {
      this.body.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.body.onFloor() && !this.arrested) { // este es el salto
      this.body.setVelocityY(this.jumpSpeed*this.jumpImpulse);
    }

    //Parte del power up esmoquin
   
    if(this.checkTiempo) //Si se se puede verificar el tiempo 
    {
     
    
     if(this.durationEsmoquin== this.contador.segundosReales-this.offsetTime) //Verificamos que haya pasado el tiempo 
     {
       this.config2EsmoquinShield();
       //Faltaria invocar esteticamente a lo que refleja que el jugador tiene el esmoquin(interfaz, sprite..etc);
     }
    }

  }


/**
 * Method that is called when police collide player
 * Set player speed to 0 and plays idle animation
 * Also pauses time of the smoking power up if active
 */
  Arrestado(){
    this.arrested=true;
    this.speed=0;
    this.jumpSpeed=0;
    this.segundosIniciales=0;  
    this.checkTiempo =false; 
    this.stop();
    this.play('idle_anim');
  }
  
  /**
 * This method returns the actual scene
 * 
 */
  getActualScene() {return this.scene;}

  /**
   * 
   * Activates and Deactivates shield for not recieving damage of enemies
   *  @param {*} durationesm -duration in seconds of the efect of the power up 
   */
  configEsmoquinShield(durationesm)
  {
 
    this.esmoquinShield=true; //Ahora no recibe daño
    this.offsetTime=this.contador.segundosReales;  //Vemos desde donde empieza a contar los 5 segundos 
    this.checkTiempo =true; //Se puede verificar si han pasado los 5 segundos 
    this.durationEsmoquin=durationesm; //Ajustamos cuanto tiene que durar a lo que nos diga el power up
  }
  config2EsmoquinShield()
  {
    
    this.esmoquinShield=false; //Ahora puede recibir daño 
    this.segundosIniciales=0;  //Como no cuenta lo ponemos a 0
    this.checkTiempo =false; //No verifica el tiempo
  }
  /**
   * Used for deactivate a power up if you are in pause menu 
   */
  deactivePowerUpTimes()
   {
     
    
    this.checkTiempo =false;
  }
   /**
   * Used for activate power up if you are not  in pause menu 
   */
 activatePowerUpTimes()
  {
   
   this.checkTiempo =true;
 }
 /**
  * Adds lifes to player and updates the UI
  * @param {*} nLAdd number of lifes to add
  */
   addLife(nLAdd)
   {
     if(this.numLifes<3)this.numLifes+=nLAdd;
     //Actualizar interfaz
   }
   /**
    * Reduces lifes of player if not protected by esmoquin , updates the UI, and restarts de game if lifes are 0
    * 
    * @param {*} nLlose number of lifes to lose
    */
   loseLife(nLlose)
   {
     if(!this.esmoquinShield)this.numLifes-=nLlose;
    //Actualizar interfaz
    //Si la vida es menor a 1 tiene que salir un texto de has perdido o algo asi 
    //Y que te lleve al menu de inicio
   }
}
