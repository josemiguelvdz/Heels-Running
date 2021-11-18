

export default class Gangster extends Phaser.GameObjects.Sprite {

    constructor(scene,x,y){
        super(scene, x, y, 'gangster');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.cooldownShoot();

    }

    cooldownShoot(){
        
        this.scene.time.addEvent( {
            delay: 1000, 
            callback: this.shoot,
            callbackScope: false,
            loop: true
        });
            
    }

    shoot(){

        console.log("Disparo BB");

    }

}
