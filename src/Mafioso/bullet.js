export default class Bullet extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x, y){
        super(scene, x, y, 'bullet', player);

        this.scene.add.existing(this);
        //this.scene.physics.add.existing(this, true);

        this.scale = 0.1;
        this.damage = 1;
        
        this.angle = (Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y)); 
        this.jugador = player;
                
        /*this.scene.physics.add.collider(player, this,(o1,o2)=> {
            onCollision(o1,o2);
        });*/

    }

    preUpdate(){
        super.preUpdate();
        
        if(!this.scene.isPaused()){
            this.x += 10*Math.cos(this.angle);
            this.y += 10*Math.sin(this.angle);
            /*this.body.setVelocityX((this.scene.physics.moveTo(this, this.jugador.x, this.jugador.y, 10)*180)/3.141516);
            this.body.setVelocityY((this.scene.physics.moveTo(this, this.jugador.x, this.jugador.y, 10)*180)/3.141516);*/
        }

        //this.scene.physics.moveTo(this, this.jugador.x, this.jugador.y, 10);
    }

    handleCollision(){
        this.player.loseLife(this.damage);
    }
}