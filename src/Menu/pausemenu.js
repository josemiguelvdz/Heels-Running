
export default class PauseMenu extends Phaser.Scene {
    /**
     * Constructor del menu de pausa
     */
    
    constructor(scene) {
        super(scene, {key: 'pauseMenu'});

    }
  
    pause() {

        this.pauseBackGround = this.scene.add.image(this.scene.scale.width*0.5, this.scene.scale.height*0.5, 'pauseBackGround').setScale(1.2, 1).setScrollFactor(0);
        this.pauseBackGround.alpha = 0.5;
    
        this.menuLayout =  this.scene.add.image(this.scene.scale.width*0.5, this.scene.scale.height*0.5, 'menuLayout').setScale(0.7, 0.5).setScrollFactor(0);
        
        this.scene.activetePause = true;
        //CREARIAMOS UN METODO CONTROL IF PAUSE 
        if(this.scene.fallObjEx!=null)this.scene.fallObjEx.handleMovement();
        if(this.scene.fallObjEx2!=null)this.scene.fallObjEx2.handleMovement();
        if(this.scene.fallObjEx3!=null)this.scene.fallObjEx3.handleMovement();
    
        //Activar el contador y efecto de los power ups
        if(!this.scene.inSettings )this.scene.player.handleMovement();
        this.resumeButton = this.scene.add.image(this.scene.scale.width*0.5, this.scene.scale.height*0.3, 'resumeButton').setInteractive().setScrollFactor(0);
    
        this.resumeButton.on('pointerdown', () => {this.unPause()});
    
        this.settingsButton = this.scene.add.image(this.scene.scale.width*0.5, this.scene.scale.height*0.5, 'settingsButton').setInteractive().setScrollFactor(0);
    
        this.settingsButton.on('pointerdown', () => {this.settings(), this.resumeButton.destroy(), this.settingsButton.destroy(), 
                              this.exitButton.destroy(),  this.menuLayout.destroy(), this.inSettings = true});
    
        this.exitButton = this.scene.add.image(this.scene.scale.width*0.5, this.scene.scale.height*0.7, 'exitButton').setInteractive().setScrollFactor(0);
    
        this.exitButton.on('pointerdown', () => {this.scene.start('menu'), this.scene.activetePause = false});
      
    
    }

    settings(){
    
        this.settingsLayout =  this.scene.add.image(this.scene.scale.width*0.5, this.scene.scale.height*0.5, 'menuLayout').setScale(2, 0.75).setScrollFactor(0);
    
        this.backButton = this.scene.add.image(this.scene.scale.width*0.8, this.scene.scale.height*0.1, 'backButton').setScale(0.8, 0.8).setInteractive();
        
        this.volumeTitle = this.scene.add.image(this.scene.scale.width*0.5, this.scene.scale.height*0.15, 'volumeIcon').setScale(0.25, 0.25);
        this.volumeBar = this.scene.add.image(this.scene.scale.width*0.5, this.scene.scale.height*0.35, 'volumeBar').setScale(2.5, 1);
    
        this.slide = this.scene.add.image(this.scene.scale.width*0.5, this.scene.scale.height*0.3, 'idle').setInteractive();
    
        this.slide.on('pointerdown', () => {this.pointerDown = true});
    
        this.slide.on('pointerup', () =>{
          
          this.pointerDown = false;
        });
        this.slide.on('pointerout', () =>{this.pointerDown = false});
    
        this.slide.on('pointermove', ()=>{
    
          if(this.pointerDown && this.slide.x >= this.volumeBar.x - (this.volumeBar.width) && this.slide.x <= this.volumeBar.x + (this.volumeBar.width)){
            //if(this.pointer.x > this.posPointer && this.volumeValue < this.maxVolumeValue) this.volumeValue += 0.001;
            //if(this.pointer.x < this.posPointer && this.volumeValue > this.minVolumeValue) this.volumeValue -= 0.001;
            this.slide.x = this.pointer.x;
          }
    
          else if(this.slide.x <= this.volumeBar.x - (this.volumeBar.width)) this.slide.x = this.volumeBar.x - (this.volumeBar.width) , this.volumeValue = 0.2;
          else if(this.slide.x >= this.volumeBar.x + (this.volumeBar.width)) this.slide.x = this.volumeBar.x + (this.volumeBar.width), this.volumeValue = 0.9;
    
        });
    
        this.controlsTitle = this.scene.add.image(this.scene.scale.width*0.5, this.scene.scale.height*0.5, 'controlsTitle').setScale(0.25, 0.25);
        this.controls = this.scene.add.image(this.scene.scale.width*0.5, this.scene.scale.height*0.8, 'controls').setScale(1, 1).setScrollFactor(0);
    
        this.backButton.on('pointerdown', () => {
          this.controlsTitle.destroy(), this.controls.destroy(), this.backButton.destroy(), this.pauseBackGround.destroy(), this.volumeTitle.destroy(), 
          this.volumeBar.destroy(), this.settingsLayout.destroy(),this.slide.destroy(), this.scene.activetePause = false, this.pause(), this.scene.inSettings = false});
      }

    unPause(){
        this.scene.activetePause = false;
        this.scene.resume(this.scene);
        this.pauseBackGround.destroy();
        this.exitButton.destroy();
        this.resumeButton.destroy();
        this.settingsButton.destroy();
        this.menuLayout.destroy();
        this.physics.resume();
        
        this.mainSong.resume();
    
        if(this.scene.fallObjEx!=null)this.scene.fallObjEx.handleMovement();
        if(this.scene.fallObjEx2!=null)this.scene.fallObjEx2.handleMovement();
        if(this.scene.fallObjEx3!=null)this.scene.fallObjEx3.handleMovement();
    
        for(let i=0;i<this.scene.powerUpsArray.length;i++)
        {
            if(this.scene.powerUpsArray[i].movesbyTween)this.scene.powerUpsArray[i].tweenMovement.resume();
           
        }
        if(!this.scene.inSettings ) this.scene.player.handleMovement();
        
    
    }
}