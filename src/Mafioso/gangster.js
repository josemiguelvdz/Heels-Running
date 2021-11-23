import Bullet from "./bullet.js";

export default class Gangster extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x,y){
        super(scene, x, y, 'gangster', player);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.jugador = player;
        this.cooldown = 0;
        this.visionRange = 100;
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        this.animateGangster();

        if(!this.scene.isPaused()){
            this.cooldown+=Math.round(delta);
            console.log(this.x-this.jugador.x);
            if((this.cooldown) > 2000 && this.visionRange >= this.x-this.jugador.x)
            {
                this.cooldown = 0;
                this.shoot();
            }
        }
    }

    shoot(){

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

}
