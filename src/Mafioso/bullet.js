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
        this.countingtimeDestruction = 0;
        this.tiempoDestruccion=2000;
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        this.scene.physics.add.collider(this.jugador, this,(o1,o2)=> {
            this.handleCollision();
            this.destroy();
        });
        
        this.body.setVelocityX(this.speedBullet*Math.cos(this.angle));
        this.body.setVelocityY(this.speedBullet*Math.sin(this.angle));

        this.countingtimeDestruction+=Math.round(delta);

        if((this.countingtimeDestruction) > this.tiempoDestruccion){this.destroy()}
    }

    handleCollision(){
       
        this.jugador.loseLife(this.damage);
    }
}