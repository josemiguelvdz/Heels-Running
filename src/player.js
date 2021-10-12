
import scene from './scene.js'
export default class Player extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y) {
    super(scene, x, y, 'idle');
    
    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();

    this.speed = 300;
    this.jumpSpeed = -400;
    
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }
   animatePlayer()
  {
     if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.setFlip(false,false);
      this.stop();
      this.play('run_anim');
    }
    else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      this.setFlip(true,false);
      this.stop();   
      this.play('run_anim');
    }
    else if (Phaser.Input.Keyboard.JustUp(this.cursors.left)||Phaser.Input.Keyboard.JustUp(this.cursors.right))
    {
      this.stop();
      this.play('idle_anim');
    }
    else if(this.body.speed===0)
    {
      this.stop();
      this.play('idle_anim');
    }
    
  }
  preUpdate(t,dt) {
   
    
    super.preUpdate(t,dt);
    this.animatePlayer();
    if (this.cursors.up.isDown && this.body.onFloor()) {
      this.body.setVelocityY(this.jumpSpeed);
    }
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-this.speed);
      
    }
    else if (this.cursors.right.isDown) {
      this.body.setVelocityX(this.speed);
    }
    else {
      this.body.setVelocityX(0);
      
    }
    }
  }
  

