

export default class Police extends Phaser.GameObjects.Sprite {

    constructor(scene,x,y){
        super(scene, x, y, 'policeRun');

        this.constantSpeed = 200;
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
            frames: this.anims.generateFrameNumbers('helicopterAnimation', { start: 0, end: 1 }),
            frameRate: 8, // Velocidad de la animación
            
          });

          this.startRunning=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        
          this.play('run_animation');
    }


    /**
   * Animated the police depending on the moment
   * 
   */
    /*animatePolice(){
        if(this.catchRoger) 
        {
            this.stop();
            this.play("smoke_animation",1);   
        }
        else if(!this.helicopter){
            this.stop();
            this.play('run_animation');
        }
        else if(this.helicopter){
            this.stop();
            this.play('helicopter_animation')
        }
    }*/
    preUpdate(t,dt) {
        super.preUpdate(t,dt);
        //this.animatePolice();

        this.body.setVelocityX(this.constantSpeed); //Movimiento continuo del jugador hacia la derecha

        //if(this.startRunning.isDown){
          //  this.body.setVelocityX(this.constantSpeed); //Movimiento continuo del jugador hacia la derecha
        //}
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

    policeAgain(){
        this.y=450;
        this.helicopter=false;
        this.body.setAllowGravity(true);
    }

    intoHelicopter(){
        this.y=60;
        this.helicopter=true;
        this.body.setAllowGravity(false);
    
    }
}
