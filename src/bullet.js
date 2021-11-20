export default class Bullet extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x, y){
        super(scene, x, y, 'bullet', player);

        this.scene.add.existing(this);
        //this.scene.physics.add.existing(this);
        this.scale = 0.2;

        this.rotation = (player.x - this.x, player.y - this.y)*-1;
    }

    preUpdate(){
        super.preUpdate();
        
        console.log(this.rotation);
        //this.body.setVelocity(1,1)*this.rotation;
    }
}