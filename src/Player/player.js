

export default class Player extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, nLifes) {
    super(scene, x, y, 'run');
    
    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.speed = 300;
    this.speedAux= this.speed;
    this.jumpSpeed = -430;
    this.jumpImpulse = 1.5;
    this.numLifes=nLifes;
    this.esmoquinShield=false;

    this.speedVariable=120; 
    this.alcoholEffect=false;
    this.coffeEffect=false;

    this.arrested=false;

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.scene.anims.create({
      key: 'run_anim',
      frames: this.anims.generateFrameNumbers('run', { start: 0, end: 7 }),
      frameRate: 10, // Velocidad de la animación
      repeat: -1    // Animación en bucle
    });
    this.scene.anims.create({
      key: 'smokingRun_anim',
      frames: this.anims.generateFrameNumbers('smokingRun', { start: 0, end: 7 }),
      frameRate: 8, // Velocidad de la animación
      repeat: -1    // Animación en bucle
    });
    this.scene.anims.create({
      key: 'jump_anim',
      frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 4 }),
      frameRate: 10, // Velocidad de la animación
      repeat: 0
    });
    this.scene.anims.create({
      key: 'jump_kick_anim',
      frames: this.anims.generateFrameNumbers('jump_kick', { start: 0, end: 7 }),
      frameRate: 10, // Velocidad de la animación
      repeat: 0
    });
    this.scene.anims.create({
      key: 'ground_kick_anim',
      frames: this.anims.generateFrameNumbers('ground_kick', { start: 0, end: 7 }),
      frameRate: 10, // Velocidad de la animación
      repeat: 0
    });
    this.scene.anims.create({
      key: 'kick_particles_anim',
      frames: this.anims.generateFrameNumbers('kick_particles', { start: 0, end: 3 }),
      frameRate: 10, // Velocidad de la animación
      repeat: 0
    });

    this.kick=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    this.kickActive = false;
    this.play('run_anim');

    const configSound = {
      mute: false,
      volume: 0.3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    this.damagePlayersound= this.scene.sound.add("damageSound",configSound);
    this.deathSound= this.scene.sound.add("deathsound",configSound);
   
    //Variables del tiempo de efecto del alcohol
    this.durationAlcohol=4000;
    this.secondsAlcohol=-1;
    //Variables del tiempo de efecto del cafe
    this.durationCoffe=4000;
    this.secondsCoffe=-1;

    //Variables del tiempo de efecto del cafe
    this.durationEsmoquin=5000;
    this.secondsEsmoquin=-1;

    // Tiempo de agotamiento del kick
    this.kickCooldown = 1000;
    this.actKickCooldown = this.kickCooldown;
 
    //Variable general que se activa y desactiva cuando entras/sales al menu de pausa
    //Sirve para controlar la duracion del efecto los power ups
    this.stopMovement=false;


  }



  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    this.setMovement();
   

    //Esmoquin
    this.handleEsmoquinEffect(dt);
    // Alcohol
    this.handleAlcoholEffect(dt);
    // Café
    this.handleCoffeEffect(dt);
    // Cooldown kick
    if(this.actKickCooldown > 0) this.actKickCooldown -= Math.round(dt);

    this.damagePlayersound.setVolume(this.scene.ChangeVolume());
    this.deathSound.setVolume(this.scene.ChangeVolume());
  }

  handleAlcoholEffect(delta){
    if(this.secondsAlcohol >= 0) {   
      if(!this.stopMovement) {
        this.secondsAlcohol+=Math.round(delta);
        if(this.secondsAlcohol>this.durationAlcohol){  
        this.secondsAlcohol=-1;  //Reiniciamos el contador de tiempo para el efecto en el alchol 
        this.restoreSpeed("Reduce");
        }
      }
    }
  }

  handleCoffeEffect(delta){
    if(this.secondsCoffe >= 0) {   
      if(!this.stopMovement) {
        this.secondsCoffe+=Math.round(delta);
        if(this.secondsCoffe>this.durationCoffe){ 
          this.secondsCoffe=-1;  //Reiniciamos el contador de tiempo para el efecto en el alchol 
          this.restoreSpeed("Increase"); 
        }
      }
    }
  }


  handleEsmoquinEffect(delta){
    if(this.secondsEsmoquin >= 0) {   
      if(!this.stopMovement) {
        this.secondsEsmoquin+=Math.round(delta);
        if(this.secondsEsmoquin>this.durationEsmoquin){
          this.secondsEsmoquin=-1; 
          this.config2EsmoquinShield();
        }
      }
    }
  }


  setMovement(){
    if(this.kick.isDown && this.actKickCooldown <= 0){
      if(this.body.onFloor()) this.play('ground_kick_anim', true);
      else this.play('jump_kick_anim', true);
    }
    else if (this.cursors.left.isDown && !this.arrested) {
      this.body.setVelocityX(-this.speed);
      if(this.body.onFloor() && !this.kickActive){
        this.play('run_anim', true);
      }
    }
    else if (this.cursors.right.isDown && !this.arrested)  {
      this.body.setVelocityX(this.speed);
      if(this.body.onFloor()  && !this.kickActive){
        this.play('run_anim', true);
      }
    }
    else {
      this.body.setVelocityX(0);
      if(this.body.onFloor()  && !this.kickActive){
        this.play('run_anim', true);
      }
    }


    if (this.cursors.up.isDown && this.body.onFloor() && !this.arrested) { // este es el salto
     this.createJumpParticles();
      this.body.setVelocityY(this.jumpSpeed*this.jumpImpulse);
      this.play('jump_anim', true);
    }



    // Comprueba si el jugador ha pulsado la tecla para dar una patada
    if(Phaser.Input.Keyboard.JustDown(this.kick) && this.actKickCooldown <= 0){
      // Crea una zona
      this.kickZone = this.scene.add.zone(this.x+this.width, this.y, this.width/1.2, this.height);
      this.scene.physics.world.enable(this.kickZone);
      this.kickZone.body.setAllowGravity(false);
      this.kickZone.body.setImmovable(true);

      // Animación
      this.kickParticles = this.scene.add.sprite(this.x+this.width, this.y, this.width, this.height);
      this.kickParticles.play('kick_particles_anim');

      // Resetear cooldown
      this.actKickCooldown = this.kickCooldown;

      // Activar booleano
      this.kickActive = true;

      // Colisiones con la zona
      this.scene.physics.add.overlap(this.kickZone, this.scene.fallObjs, (o1,o2)=> {
      o2.handleCollisionFallObj(false,true);
      }); 

      // Destruir la zona
      this.delete_zone = this.scene.time.addEvent({ 
        delay: 500, 
        callback: this.destroyZone, 
        args: [this.kickZone, this.kickParticles, this], 
        loop: false 
      });
    }

    if(this.kickActive){
      this.zoneMovement(this.kickZone, this.kickParticles, this);
    }

  }
  


  /**
   * Method that is called when police collide player
   * Set player speed to 0 and plays idle animation
   * Also pauses time of the smoking power up if active
   */
  arrestado(){
    this.arrested=true;
    this.speed=0;
    this.jumpSpeed=0;
    this.segundosIniciales=0;  
    this.checkTiempo =false; 
  }
  
  /**
  * This method returns the actual scene 
  */
  getActualScene() {return this.scene;}

  /**
   * Activates and Deactivates shield for not recieving damage of enemies
   *  @param {*} durationesm -duration in seconds of the efect of the power up 
   */
  configEsmoquinShield(){
    this.esmoquinShield=true; //Ahora no recibe daño
    this.secondsEsmoquin=0;  //Asi si que empieza a contar
  }


  config2EsmoquinShield(){
    this.esmoquinShield=false; //Ahora puede recibir daño 
  }
  

  /**
  * Adds lifes to player and updates the UI
  * @param {*} nLAdd number of lifes to add
  */
  addLife(nLAdd){
    if(this.numLifes<3)this.numLifes+=nLAdd;
    //Actualizar interfaz
  }

  /**
  * Reduces lifes of player if not protected by esmoquin , updates the UI, and restarts de game if lifes are 0 
  * @param {*} nLlose number of lifes to lose
  */
  loseLife(nLlose){
    this.playSound=false;
    if(!this.esmoquinShield){
      this.numLifes-=nLlose;
      this.playSound=true;
      this.createBloodParticles(); 
    }
    if(this.playSound) this.damagePlayersound.play();

    //Si la vida es menor a 1 tiene que salir un texto de has perdido o algo asi 
    if(this.numLifes < 1){
      this.deathSound.play();
      this.losingGame(); 
    }
    //Y que te lleve al menu de inicio
  }

  /**
  * restores Player velocity to a modified value afeter duration of power up effect
  * @param {*} action sets if player needs to gain or reduce its  velocity
  */
  controlSpeed(action){
    if(action==="Reduce") {
      this.speed=this.speed-this.speedVariable;
      this.alcoholEffect=true;
      this.secondsAlcohol=0;
    }
    else  if(action==="Increase"){
      this.speed=this.speed+this.speedVariable;
      this.coffeEffect=true;
      this.secondsCoffe=0;
    }
  }
  
  /**
  * restores Player velocity to its initial value afeter duration of power up effect
  * @param {*} action sets if player needs to gain or reduce its modified velocity
  */
  restoreSpeed(action){      
    if(action==="Reduce") {
      this.speed=this.speed+this.speedVariable;
      this.alcoholEffect=false;
    }
    else  if(action==="Increase"){
      this.speed=this.speed-this.speedVariable;
      this.coffeEffect=false;
    }
  }


  losingGame(){
    this.scene.lose();
  }

  handleMovement(){
    if(this.stopMovement) this.stopMovement=false;
    else  this.stopMovement=true;
  }
  createBloodParticles(){
    let dustParticles = this.scene.add.particles('bloodParticle');
    this.deathEmitter = dustParticles.createEmitter({
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
  createJumpParticles(){
    let deathParticles = this.scene.add.particles('dustParticle');
    this.deathEmitter = deathParticles.createEmitter({
      x: -500,
      y: 300,
      speed: { min: -800, max: 500 },
      angle: { min: 0, max: -180 },
      scale: { start: 0.3, end: 0},
      blendMode: 'SCREEN',
      //active: false,
      lifespan: 400,
      gravityY: 800
    });
    this.deathEmitter.explode(100, this.x,this.y+20);
  
  } 

  zoneMovement(zone, kickParticles, player){
    zone.body.setVelocityX(player.speed);
    zone.body.setVelocityY(player.body.velocity.y);

    kickParticles.setPosition(player.x + 100, player.y);
  }
  
  destroyZone(zone, kickParticles, player){
    zone.destroy();
    kickParticles.destroy();
    player.kickActive = false;
  }
}
