

export default class Police extends Phaser.GameObjects.Sprite {

    constructor(scene,x,y){
        super(scene, x, y, 'policeIdle');

        this.constantSpeed = 200;
        this.catchRoger=false;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.helicopter=false;
        this.duration=10000;
        this.seconds=0;

        this.scene.anims.create({
            key: 'idle_police',
            frames: this.anims.generateFrameNumbers('policeIdle', { start: 0, end: 3 }),
            frameRate: 8, // Velocidad de la animación
            repeat: -1    // Animación en bucle
          });
        this.scene.anims.create({
            key: 'smoke_animation',
            frames: this.anims.generateFrameNumbers('smokeAnimation', { start: 0, end: 2 }),
            frameRate: 8, // Velocidad de la animación
            
          });
          this.scene.anims.create({
            key: 'helicopter_animation',
            frames: this.anims.generateFrameNumbers('helicopterAnimation', { start: 0, end: 1 }),
            frameRate: 8, // Velocidad de la animación
            
          });
    }


    /**
   * Animated the police depending on the moment
   * 
   */
    animatePolice(){
        if(this.catchRoger) 
        {
            this.stop();
            this.play("smoke_animation",1);   
        }
        else if(!this.helicopter){
            this.stop();
            this.play('idle_police');
        }
        else if(this.helicopter){
            this.stop();
            this.play('helicopter_animation')
        }
    }
    preUpdate(t,dt) {
        super.preUpdate(t,dt);
        this.animatePolice();


        if(this.seconds >= 0) 
        {   
            this.seconds+=Math.round(dt);
            if(this.seconds>this.duration)
            {
    
                this.body.setVelocityX(this.constantSpeed); //Movimiento continuo del jugador hacia la derecha
    
            }
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
   * 
   */
    isHelicopter(){
        return this.helicopter;
    }
}
