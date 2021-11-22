import Bullet from "./bullet.js";

export default class Gangster extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x,y){
        super(scene, x, y, 'gangster', player);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.jugador = player;
        this.segundos = 0;
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        this.animateGangster();

        if(!this.scene.isPaused()){
            this.segundos+=Math.round(delta);

            if((this.segundos) > 2000)
            {
                this.segundos = 0;
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
