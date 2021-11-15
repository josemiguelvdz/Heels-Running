

export default class Player extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y,nLifes) {
    super(scene, x, y, 'idle');
    
    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.speed = 300;
    this.speedAux= this.speed;
    this.jumpSpeed = -400;
    this.jumpImpulse = 1.5;
    this.numLifes=nLifes;


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


  }


/**
 * Method that is called when police collide player
 * Put player speed to 0 and play idle animation
 */
  Arrestado(){
    this.arrested=true;
    this.speed=0;
    this.jumpSpeed=0;
    this.stop();
    this.play('idle_anim');
  }

  /**
 * That method return actual scene
 * 
 */
  getActualScene() {return this.scene;}
   
}
