import Bullet from "./bullet.js";

export default class Gangster extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x,y){
        super(scene, x, y, 'gangster', player);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.player = player;
        this.cooldown = 0;
        this.visionRange = 600;

        this.scale=1.25;

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
        if((this.cooldown) > 2000 && this.visionRange >= Math.abs(this.x-this.player.x)){
            this.cooldown = 0;
            this.shoot();
        } 
        
        this.gunshotsound.setVolume(this.scene.ChangeVolume());
    }

    /**
    * Used to create a Bullet
    */
    shoot(){
        this.gunshotsound.play();
        new Bullet(this.scene, this.player, this.x+25, this.y-25);
    }

    /**
    * Used to flip gangster
    */
    animateGangster(){
        if (this.player.x < this.x) 
            this.setFlip(true,false);
        else
            this.setFlip(false, false);
    }
}
