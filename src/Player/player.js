

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

    this.scene.anims.create({
      key: 'run_anim',
      frames: this.anims.generateFrameNumbers('run', { start: 0, end: 7 }),
      frameRate: 10, 
      repeat: -1    
    });
    this.scene.anims.create({
      key: 'jump_anim',
      frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 4 }),
      frameRate: 10, 
      repeat: 0
    });
    this.scene.anims.create({
      key: 'jump_kick_anim',
      frames: this.anims.generateFrameNumbers('jump_kick', { start: 0, end: 7 }),
      frameRate: 10, 
      repeat: 0
    });
    this.scene.anims.create({
      key: 'ground_kick_anim',
      frames: this.anims.generateFrameNumbers('ground_kick', { start: 0, end: 7 }),
      frameRate: 14, 
      repeat: 0
    });
    this.scene.anims.create({
      key: 'kick_particles_anim',
      frames: this.anims.generateFrameNumbers('kick_particles', { start: 0, end: 3 }),
      frameRate: 10, 
      repeat: 0
    });

    this.kick=this.scene.input.keyboard.addKey('D');
    this.jump=this.scene.input.keyboard.addKey('W');

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
   
    this.durationAlcohol=3000;
    this.secondsAlcohol=-1;

    this.durationCoffe=4000;
    this.secondsCoffe=-1;

    this.durationEsmoquin=5000;
    this.secondsEsmoquin=-1;

    this.kickCooldown = 1500;
    this.actKickCooldown = this.kickCooldown;


  }



  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    this.setMovement();


    this.handleEsmoquinEffect(dt);

    this.handleAlcoholEffect(dt);

    this.handleCoffeEffect(dt);

    // Cooldown kick
    if(this.actKickCooldown > 0) this.actKickCooldown -= Math.round(dt);

    this.damagePlayersound.setVolume(this.scene.ChangeVolume());
    this.deathSound.setVolume(this.scene.ChangeVolume());
  }

  /**
  * controls the duration of the powerup and perform the effect
  * @param {*} delta - refers to delta Time
  */
  handleAlcoholEffect(delta){
    if(this.secondsAlcohol >= 0) {   
     
        this.secondsAlcohol+=Math.round(delta);
        if(this.secondsAlcohol>this.durationAlcohol){  
        this.secondsAlcohol=-1;  //reset the timer for the effect
        this.restoreSpeed("Reduce");
        }
      
    }
  }


  /**
  * controls the duration of the powerup and perform the effect
  * @param {*} delta - refers to delta Time
  */
  handleCoffeEffect(delta){
    if(this.secondsCoffe >= 0) {   
     
        this.secondsCoffe+=Math.round(delta);
        if(this.secondsCoffe>this.durationCoffe){ 
          this.secondsCoffe=-1;  //reset the timer for the effect
          this.restoreSpeed("Increase"); 
        }
      
    }
  }


  /**
  * controls the duration of the powerup and perform the effect
  * @param {*} delta - refers to delta Time
  */
  handleEsmoquinEffect(delta){
    if(this.secondsEsmoquin >= 0) {   
      this.secondsEsmoquin+=Math.round(delta);
      if(this.secondsEsmoquin>this.durationEsmoquin){
        this.secondsEsmoquin=-1; //reset the timer for the effect
        this.config2EsmoquinShield();
      }
    }
  }


  /**
  * Its in charge of the movement of player with their respective animations
  */
  setMovement(){
    this.body.setVelocityX(this.speed); //Continuous movement of the player to the right

    if(this.kickActive){
      if(this.body.onFloor()) this.play('ground_kick_anim', true);
      else this.play('jump_kick_anim', true);
    }
    if(this.body.onFloor() && !this.kickActive){
      this.play('run_anim', true);
    }
    else if(this.body.onFloor() && this.kickActive){
      this.play('ground_kick_anim', true);
    }
  
    if (this.jump.isDown && this.body.onFloor() && !this.arrested) { 
     this.createJumpParticles();
      this.body.setVelocityY(this.jumpSpeed*this.jumpImpulse);
      this.play('jump_anim', true);
    }



    // Check if the player has pressed the key to kick
    if(Phaser.Input.Keyboard.JustDown(this.kick) && this.actKickCooldown <= 0){
      // create a zone
      this.kickZone = this.scene.add.zone(this.x+90, this.y, this.width/1.2, this.height+20);
      this.scene.physics.world.enable(this.kickZone);
      this.kickZone.body.setAllowGravity(false);
      this.kickZone.body.setImmovable(true);

      // Animation
      this.kickParticles = this.scene.add.sprite(this.x+this.width, this.y, this.width, this.height);
      this.kickParticles.play('kick_particles_anim');

      // Reset cooldown
      this.actKickCooldown = this.kickCooldown;

      // Active boolean
      this.kickActive = true;

      // Zone collisions
      this.scene.physics.add.overlap(this.kickZone, this.scene.fallObjs, (o1,o2)=> {
      o2.handleCollisionFallObj(false,true);
      }); 


      //Box collisions
      this.scene.physics.add.overlap(this.kickZone, this.scene.boxes, (o1,o2)=> {
        o2.handleCollision();
        }); 
      //FireHydrants collision
      this.scene.physics.add.collider(this.kickZone, this.scene.fireHydrants,(o1,o2)=> {
          o2.setCollision();
        });
      // DestroyZone
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

  /**
   * Deactivates shield for recieving damage of enemies
   */
  config2EsmoquinShield(){
    this.esmoquinShield=false; 
  }
  

  /**
  * Adds lifes to player and updates the UI
  * @param {*} nLAdd number of lifes to add
  */
  addLife(nLAdd){
    if(this.numLifes<3)this.numLifes+=nLAdd;
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

    if(this.numLifes < 1){
      this.deathSound.play();
      this.losingGame(); 
    }
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

  /**
  * Losed the game
  */
  losingGame(){
    this.scene.lose();
  }

  /**
  * create particles for give feedback
  */
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

  /**
  * create particles for give feedback
  */
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

  /**
  * Used to move kick zone
  */
  zoneMovement(zone, kickParticles, player){

    if(!player.body.blocked.right) zone.body.setVelocityX(player.body.velocity.x);
    zone.body.setVelocityY(player.body.velocity.y);

    kickParticles.setPosition(player.x + 100, player.y);
  }
  
  /**
  * Destroy kick zone
  */
  destroyZone(zone, kickParticles, player){
    zone.destroy();
    kickParticles.destroy();
    player.kickActive = false;
  }
}
