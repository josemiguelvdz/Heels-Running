import Bullet from "./bullet.js";

export default class Gangster extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x,y){
        super(scene, x, y, 'gangster', player);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.jugador = player;
        this.cooldown = 0;
        this.visionRange = 600;
        this.advideRange = 800;
        this.oneAdvice = false;
        this.icon = false;

        const configSound = {
            mute: false,
            volume: 0.25,
            rate: 2,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
          };
          this.gunshotsound= this.scene.sound.add("gunSound",configSound);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        this.animateGangster();

        this.cooldown+=Math.round(delta);

        if((this.cooldown) > 2000 && this.visionRange >= Math.abs(this.x-this.jugador.x))
        {
            if(this.icon){
                this.scene.destroyIconAdvice();
                this.icon = false;
            }
            this.cooldown = 0;
            this.shoot();
        }    

        if(Math.abs(this.x-this.jugador.x) <= this.advideRange && !this.oneAdvice){
            this.advice();
        }
    }

    shoot(){

        this.gunshotsound.play();
        new Bullet(this.scene, this.jugador, this.x, this.y);

    }

    animateGangster(){

        if (this.jugador.x < this.x) {
            this.setFlip(false,false);
        }

        else{
            this.setFlip(true, false);
        }
    }

    advice(){
        this.scene.iconAdvice();
        this.oneAdvice = true;
        this.icon = true;
    }

}
