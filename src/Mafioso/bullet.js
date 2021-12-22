export default class Bullet extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x, y){
        super(scene, x, y, 'bullet', player);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setAllowGravity(false);

        this.scale = 0.3;
        this.damage = 1;
        
        this.angle = (Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y)); 
        this.player = player;

        this.speedBullet = 500;
        this.countingtimeDestruction = 0;
        this.destructionTime=2000;
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        this.scene.physics.add.collider(this.player, this,(o1,o2)=> {
            this.handleCollision();
            this.destroy();
        });
        
        this.body.setVelocityX(this.speedBullet*Math.cos(this.angle));
        this.body.setVelocityY(this.speedBullet*Math.sin(this.angle));

        this.countingtimeDestruction+=Math.round(delta);
        if((this.countingtimeDestruction) > this.destructionTime){
            this.destroy();  
        }
        else this.createShotParticles();

        
    }

    /**
    * Handles the collision with player
    */
    handleCollision(){
        this.player.loseLife(this.damage);
    }

    /**
    * create particles to give feedback
    */
    createShotParticles(){
        let dustParticles = this.scene.add.particles('shotParticle');
        this.shotEmitter = dustParticles.createEmitter({
          x: 300,
          y: 100,
          speed: { min: -800, max: 800 },
          angle: { min: 0, max: 360 },
          scale: { start: 0.6, end: 0 },
          blendMode: 'SCREEN',
          //active: false,
          lifespan: 20,
          gravityY: 800
        });
        this.shotEmitter.explode(50, this.x,this.y);
      }
}