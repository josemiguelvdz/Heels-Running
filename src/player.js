

export default class Player extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y,nLifes) {
    super(scene, x, y, 'idle');
    
    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.speed = 300;
    this.speedAux= this.speed;
    this.jumpSpeed = -400;
    this.numLifes=nLifes;

    this.kickCooldown = 100; // 3 segundos de cooldown

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

    if (this.cursors.up.isDown && this.body.onFloor() && !this.arrested) {
      this.body.setVelocityY(this.jumpSpeed);
    }


    // Cooldown de la patada
    if(this.kickCooldown > 0){
      this.kickCooldown -= 1;
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
 * Method that is called when the player presses
 * "K" and wants to perform a kick
 */
  Kick(){
    if(this.kickCooldown <= 0){
      console.log("KICK");
      // Debemos activar la animacion de la patada

      // Crear collider de la patada
            // Crear zona de collider de patada
            let zone = this.scene.add.zone(this.x+this.width, this.y, this.width, this.height);

            // visual zone
            //  Just a visual display of the drop zone
            let graphics = this.scene.add.graphics();
            graphics.lineStyle(2, 0xffff00);
            graphics.strokeRect(zone.x - zone.width / 2, zone.y - zone.height / 2, zone.width, zone.height);
        
      this.kickCooldown = 100; // reestablecemos el cooldown
    }
  }

  /**
 * That method return actual scene
 * 
 */
  getActualScene() {return this.scene;}
   
}
