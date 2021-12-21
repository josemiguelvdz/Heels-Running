

export default class Police extends Phaser.GameObjects.Sprite {

    constructor(scene,x,y){
        super(scene, x, y, 'policeRun');
        this.constantSpeed = 280;
        this.catchRoger=false;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.helicopter=false;
        this.scene.anims.create({
            key: 'run_animation',
            frames: this.anims.generateFrameNumbers('policeRun', { start: 0, end: 7 }),
            frameRate: 10, 
            repeat: -1   
          });
        this.scene.anims.create({
            key: 'smoke_animation',
            frames: this.anims.generateFrameNumbers('smokeAnimation', { start: 0, end: 2 }),
            frameRate: 8, 
            
          });
    }
    /**
    * Animated the police depending on the moment
    */
    animatePolice(){
        if(this.catchRoger)  this.play("smoke_animation", true);   
        else if(!this.helicopter) this.play('run_animation', true);
        else if(this.helicopter) this.play('helicopter_animation', true)
    }


    preUpdate(t,dt) {
        super.preUpdate(t,dt);
        this.animatePolice();

        this.body.setVelocityX(this.constantSpeed);

        if(this.helicopter){
            this.y = this.scene.cameras.main.scrollY + 100;
        }
    }
    /**
    * Stop the police when he arrests the player
    */
    catchP(){
        this.constantSpeed=0;
        this.catchRoger=true;
        this.scene.lose();
    }
    /**
    * Return if police is transformed into a helicopter 
    */
    isHelicopter(){
        return this.helicopter;
    }
    /**
    * Transform the helicopter into police again
    */
    policeAgain(){
        this.y=450;   
        this.helicopter=false;
        this.body.setAllowGravity(true);
    }
    /**
    * Transform the police into a helicopter
    */
    intoHelicopter(h){
        this.y=h;
        this.helicopter=true;
        this.body.setAllowGravity(false);
    }
}
