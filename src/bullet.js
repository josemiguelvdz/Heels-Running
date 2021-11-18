export default class Bullet extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x, y){
        super(scene, x, y, 'bullet', player);

        this.scene.add.existing(this);
        //this.scene.physics.add.existing(this);

        this.scale = 0.2;

        this.jug = player;

        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.jug.x, this.jug.y);

    }

    preUpdate(){
        super.preUpdate();
        
        //this.body.setVelocityX(100);
    }
}