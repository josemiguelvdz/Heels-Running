import Bullet from "./bullet.js";

export default class Gangster extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x,y){
        super(scene, x, y, 'gangster', player);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.cooldownShoot(player);

    }

    /*preUpdate(){
        super.preUpdate();
        console.log(this.body.y);
    }*/

    cooldownShoot(player){
        
        this.scene.time.addEvent( {
            delay: 2000, 
            callback: this.shoot,
            args: [this.scene, this.body.x, player],
            callbackScope: false,
            loop: true
        });
            
    }

    shoot(scene, x, player){

        console.log("Disparo BB");
        new Bullet(scene, player, x, 368);

    }

}
