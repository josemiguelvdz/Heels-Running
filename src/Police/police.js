

export default class Police extends Phaser.GameObjects.Sprite {

    constructor(scene,x,y){
        super(scene, x, y, 'policeRun');
        this.constantSpeed = 280;
        this.catchRoger=false;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.helicopter=false;
        this.scene.anims.create({
            key: 'run_animation',
            frames: this.anims.generateFrameNumbers('policeRun', { start: 0, end: 7 }),
            frameRate: 10, // Velocidad de la animación
            repeat: -1    // Animación en bucle
          });
        this.scene.anims.create({
            key: 'smoke_animation',
            frames: this.anims.generateFrameNumbers('smokeAnimation', { start: 0, end: 2 }),
            frameRate: 8, // Velocidad de la animación
            
          });
          this.scene.anims.create({
            key: 'helicopter_animation',
            frames: this.anims.generateFrameNumbers('helicopterAnimation', { start: 0, end: 12 }),
            frameRate: 30, // Velocidad de la animación
            
          });
    }


    /**
    * Animated the police depending on the moment
    * 
    */
    animatePolice(){
        if(this.catchRoger)  this.play("smoke_animation", true);   
        else if(!this.helicopter) this.play('run_animation', true);
        else if(this.helicopter) this.play('helicopter_animation', true)
    }


    preUpdate(t,dt) {
        super.preUpdate(t,dt);
        this.animatePolice();

        this.body.setVelocityX(this.constantSpeed); //Movimiento continuo del jugador hacia la derecha

        if(this.helicopter){
            this.y = this.scene.cameras.main.scrollY + 100;
        }
    }
    /**
    * Stop the police when he arrests the player
    * 
    */
    catchP(){
        this.constantSpeed=0;
        this.catchRoger=true;
        this.scene.lose();
    }

    /**
    * Return if police is transformed into a helicopter 
   */
    isHelicopter(){
        return this.helicopter;
    }

    policeAgain(){
        this.y=450;   
        this.helicopter=false;
        this.body.setAllowGravity(true);
        //this.createTweenMovement();
    }

    intoHelicopter(h){
        this.y=h;
        this.helicopter=true;
        this.body.setAllowGravity(false);
        //this.createTweenMovement();
    }

      /**
    * handle movement boolean in order to control de effect of power ups 
    */
    createTweenMovement()
    {

        this.rndDuration= Phaser.Math.Between(1000, 2000);
        this.rndY=Phaser.Math.Between(60, 75);
        if(this.helicopter)
        {
            this.tweenMovement= this.scene.tweens.add({
            targets: this,
            y: this.rndY, //Cantidad de desplazamiento
            duration: this.rndDuration,
            ease: 'Linear',
            yoyo: true,
            repeat: -1,
            delay: 200 //Tiempo que tarda en empezar
            });
        }
        else if(this.tweenMovement) this.tweenMovement.stop();
    } 
}
