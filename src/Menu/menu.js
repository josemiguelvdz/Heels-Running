
export default class Menu extends Phaser.Scene {

    constructor() {
      super({ key: 'menu' });
    }
  
    create() {
      this.spriteTrain=this.add.sprite(600, 230, 'mainMenu').setScale(0.7, 0.7); 

      this.playButton = this.add.image(this.scale.width*0.5, 330, 'playButton2').setInteractive().setScale(1, 1);
      this.helicopter=this.add.sprite(this.scale.width*0.47, 225, 'helicopterAnimation');

      this.anims.create({
          key: 'mMenu',
          frames: this.anims.generateFrameNumbers('mainMenu', { start: 0, end: 18}),
          frameRate: 25, // Velocidad de la animación
          repeat: -1    // Animación en bucle
        });

      this.anims.create({
        key: 'helicopter_animation',
        frames: this.anims.generateFrameNumbers('helicopterAnimation', { start: 0, end: 12 }),
        frameRate: 20, // Velocidad de la animación
        
      });

      this.spriteTrain.play('mMenu');
      
      this.playbackground= this.add.image(this.scale.width*0.5, 70, 'playBackGround_V2').setScale(1.3, 1.3);

      this.playButton.on('pointerdown', () => {this.scene.start('level')});

      this.speed = 1;
      this.createTweenMovement();
    }

    update(t, dt){
      super.update(t, dt);

      if(this.helicopter.x >= (350 + this.scale.width*0.5)){
        this.helicopter.setFlip(true, false);
        this.speed *= -1; 
        this.playButton.x -= 70;
      }

      else if(this.helicopter.x <= (-350 + this.scale.width*0.5)){
        this.helicopter.setFlip(false, false);
        this.speed *= -1;
        this.playButton.x += 70;
      }

      this.playButton.x += this.speed * Math.round(dt) * 0.1;
      this.helicopter.x += this.speed * Math.round(dt) * 0.1;

      this.helicopter.play('helicopter_animation', true);
    }

    
    createTweenMovement()
    {

        this.rndDuration = 310;
        this.rndY=Phaser.Math.Between(this.playButton.y, this.playButton.y+15);
        
        this.tweenMovement = this.tweens.add({
          targets: this.playButton,
          y: this.rndY, //Cantidad de desplazamiento
          duration: this.rndDuration,
          ease: 'Linear',
          yoyo: true,
          repeat: -1,
          delay: 0 //Tiempo que tarda en empezar
          });
    } 
}