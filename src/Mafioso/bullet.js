export default class Bullet extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x, y){
        super(scene, x, y, 'bullet', player);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setAllowGravity(false);

        this.scale = 0.1;
        this.damage = 1;
        
        this.angle = (Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y)); 
        this.jugador = player;

        this.speedBullet = 300;
    }

    preUpdate(){
        super.preUpdate();
        
        if(!this.scene.isPaused()){
            /*this.x += 10*Math.cos(this.angle);
            this.y += 10*Math.sin(this.angle);*/
            this.body.setVelocityX(this.speedBullet*Math.cos(this.angle));
            this.body.setVelocityY(this.speedBullet*Math.sin(this.angle));
        }

        this.scene.physics.add.collider(this.jugador, this,(o1,o2)=> {
            this.handleCollision();
            this.destroy();
        });
    }

    handleCollision(){
        this.jugador.loseLife(this.damage);
    }
}