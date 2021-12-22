
export default class PauseMenu extends Phaser.Scene {

    constructor() {
      super({key: 'pauseMenu'});
    }
    
    create() {

      this.pauseBackGround = this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'pauseBackGround').setScale(1.2, 1).setScrollFactor(0);
      this.pauseBackGround.alpha = 0.5;
      this.menuLayout =  this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'menuLayout').setScale(0.7, 0.5).setScrollFactor(0);
          
      // Resume to level
      this.resumeButton = this.add.image(this.scale.width*0.5, this.scale.height*0.3, 'resumeButton').setInteractive().setScrollFactor(0);
      this.resumeButton.on('pointerdown', () => {this.unPause()});
      
      // Settings options
      this.settingsButton = this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'settingsButton').setInteractive().setScrollFactor(0);
      this.settingsButton.on('pointerdown', () => {this.settings(), this.resumeButton.destroy(), this.settingsButton.destroy(), 
        this.exitButton.destroy(),  this.menuLayout.destroy(), this.inSettings = true});
      
      // Exit menu
      this.exitButton = this.add.image(this.scale.width*0.5, this.scale.height*0.7, 'exitButton').setInteractive().setScrollFactor(0);
      this.exitButton.on('pointerdown', () => {this.level.mainSong.stop() ,this.scene.start('menu')});

      




      this.pointer = this.input.activePointer;

      this.pointerDown = false;
      this.volumeValue=0.3;

      this.minBarVolume = 350;
      this.maxBarVolume = 850;

      if(this.level.SlidePos() == 0) this.level.SaveSlidePos(this.scale.width*0.5);
    }
    /** 
    * Create the setting menu
    */
    settings(){
    
      this.settingsLayout =  this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'menuLayout').setScale(2, 0.75).setScrollFactor(0);   
      this.backButton = this.add.image(this.scale.width*0.8, this.scale.height*0.1, 'backButton').setScale(0.8, 0.8).setInteractive();
      this.volumeTitle = this.add.image(this.scale.width*0.5, this.scale.height*0.15, 'volumeIcon').setScale(0.25, 0.25);
     

      //this.volumeUnmute = this.add.image(this.scale.width*0.5-100, this.scale.height*0.15, 'volumeUnmute');
      this.volumeBar = this.add.image(this.scale.width*0.5, this.scale.height*0.35, 'volumeBar').setScale(2.5, 1);
      if(this.level.SoundMuted()===undefined) //Es la primera vez que entramos al menu
      {
        this.soundButtonName='volumeUnmute';      
      }
      else this.soundButtonName= this.level.SoundMuted();
      this.volumeMute = this.add.image(this.scale.width*0.5+200, this.scale.height*0.15,this.soundButtonName).setInteractive();
      this.volumeMute.setScale(1.45,1.45);
      this.previousVolume;
      this.volumeMute.on('pointerdown', () => {
       if(this.soundButtonName==='volumeUnmute')
       {
         this.soundButtonName='volumeMute';
         this.previousVolume=this.volumeValue;
         this.level.volume=0;
       }
       else 
       {
         this.soundButtonName='volumeUnmute';
         this.volumeValue= this.previousVolume;
       }
       this.volumeMute.setTexture(this.soundButtonName);
       });
      // TO CHANGE VOLUME
      this.slide = this.add.image(this.level.SlidePos(), this.scale.height*0.3, 'idle').setInteractive();
      this.slide.on('pointerdown', () => {
        this.pointerDown = true});
      this.slide.on('pointerup', () =>{
        this.pointerDown = false});
      this.slide.on('pointerout', () =>{
        this.pointerDown = false});
      this.slide.on('pointermove', ()=>{
        if(this.pointerDown && this.slide.x >= this.volumeBar.x - (this.volumeBar.width) && this.slide.x <= this.volumeBar.x + (this.volumeBar.width)){
          this.slide.x = this.pointer.x;
          this.level.SaveSlidePos(this.slide.x);
        }
        else if(this.slide.x <= this.volumeBar.x - (this.volumeBar.width)) this.slide.x = this.volumeBar.x - (this.volumeBar.width);
        else if(this.slide.x >= this.volumeBar.x + (this.volumeBar.width)) this.slide.x = this.volumeBar.x + (this.volumeBar.width);
      });


      this.controlsTitle = this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'controlsTitle').setScale(0.25, 0.25);
      this.controls = this.add.image(this.scale.width*0.5, this.scale.height*0.8, 'controls').setScale(1, 1).setScrollFactor(0);
    
      //BACK TO PAUSE MENU
      this.backButton.on('pointerdown', () => {
        this.controlsTitle.destroy(), this.controls.destroy(), this.backButton.destroy(), this.pauseBackGround.destroy(), this.volumeTitle.destroy(), 
        this.volumeBar.destroy(), this.settingsLayout.destroy(),this.slide.destroy(), this.create(),this.volumeMute.destroy(),this.inSettings = false
        ,this.level.SaveSoundMuted(this.soundButtonName);
      });
    }
  /** 
  * Destroy all buttons and layouts and resume the game
  */
  unPause(){

    this.pauseBackGround.destroy();
    this.exitButton.destroy();
    this.resumeButton.destroy();
    this.settingsButton.destroy();
    this.menuLayout.destroy();
    this.scene.resume("level");
  }

  /** 
  * Change the level volume
  * @param {*} scene - Scene
  */
  init(scene){
    this.level = scene;
    this.level.mainSong.setVolume(this.level.ChangeVolume());
  }
  
  update()
  {
    if(this.soundButtonName==="volumeUnmute"){
      this.volumeValue = (this.level.SlidePos() - this.minBarVolume) / (this.maxBarVolume-this.minBarVolume);
      this.level.volume = this.volumeValue;
    }
    
  }
}
