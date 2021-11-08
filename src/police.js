import scene from './Scene.js'

export default class Police extends Phaser.GameObjects.Sprite {

    constructor(scene,x,y){
        super(scene, x, y, 'policeIdle');

        this.constantSpeed = 100;
        this.catchRoger=false;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.scene.anims.create({
            key: 'idle_police',
            frames: this.anims.generateFrameNumbers('policeIdle', { start: 0, end: 3 }),
            frameRate: 8, // Velocidad de la animación
            repeat: -1    // Animación en bucle
          });
    }


    /**
   * Animated the police depending on the moment
   * 
   */
    animatePolice(){
        if(this.catchRoger) this.play("idle_police",1);
    }

    preUpdate(t,dt) {
        super.preUpdate(t,dt);
        this.animatePolice();
    
       this.body.setVelocityX(this.constantSpeed); //Movimiento continuo del jugador hacia la derecha

    }

    catchP(){
        this.constantSpeed=0;
        this.catchRoger=true;
    }

}
