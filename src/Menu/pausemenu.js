
export default class PauseMenu extends Phaser.Scene {

    constructor() {
      super({key: 'pauseMenu'});
    }
    
    create() {

      this.pauseBackGround = this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'pauseBackGround').setScale(1.2, 1).setScrollFactor(0);
      this.pauseBackGround.alpha = 0.5;
      this.menuLayout =  this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'menuLayout').setScale(0.7, 0.5).setScrollFactor(0);
          
      this.activetePause = true;
      //CREARIAMOS UN METODO CONTROL IF PAUSE 
      /*if(this.fallObjEx!=null)this.fallObjEx.handleMovement();
      if(this.fallObjEx2!=null)this.fallObjEx2.handleMovement();
      if(this.fallObjEx3!=null)this.fallObjEx3.handleMovement();
      
      //Activar el contador y efecto de los power ups
      if(!this.inSettings )this.player.handleMovement();*/
      this.resumeButton = this.add.image(this.scale.width*0.5, this.scale.height*0.3, 'resumeButton').setInteractive().setScrollFactor(0);
      
      this.resumeButton.on('pointerdown', () => {this.unPause()});
      
      this.settingsButton = this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'settingsButton').setInteractive().setScrollFactor(0);
  
      this.settingsButton.on('pointerdown', () => {this.settings(), this.resumeButton.destroy(), this.settingsButton.destroy(), 
        this.exitButton.destroy(),  this.menuLayout.destroy(), this.inSettings = true});
      
      this.exitButton = this.add.image(this.scale.width*0.5, this.scale.height*0.7, 'exitButton').setInteractive().setScrollFactor(0);
      
      this.exitButton.on('pointerdown', () => { this.activetePause=false, this.level.mainSong.stop() ,this.scene.start('menu')});

      this.pointer = this.input.activePointer;

      this.pointerDown = false;
      this.volumeValue;

      this.minBarVolume = 350;
      this.maxBarVolume = 850;

      this.x;
    }

    settings(){
    
      this.settingsLayout =  this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'menuLayout').setScale(2, 0.75).setScrollFactor(0);   
      this.backButton = this.add.image(this.scale.width*0.8, this.scale.height*0.1, 'backButton').setScale(0.8, 0.8).setInteractive();
      this.volumeTitle = this.add.image(this.scale.width*0.5, this.scale.height*0.15, 'volumeIcon').setScale(0.25, 0.25);
      //min = 350         max = 850 
      //formula (x – mínimo (x)) / (máximo (x) – mínimo (x)) -> 600-350 / 850-350
      this.volumeBar = this.add.image(this.scale.width*0.5, this.scale.height*0.35, 'volumeBar').setScale(2.5, 1);

      if(this.level.SlidePos() == 0) this.level.SaveSlidePos(this.scale.width*0.5);

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
          this.x = this.slide.x;
          this.level.SaveSlidePos(this.slide.x);
        }
        else if(this.slide.x <= this.volumeBar.x - (this.volumeBar.width)) this.slide.x = this.volumeBar.x - (this.volumeBar.width);
        else if(this.slide.x >= this.volumeBar.x + (this.volumeBar.width)) this.slide.x = this.volumeBar.x + (this.volumeBar.width);
      });

      this.controlsTitle = this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'controlsTitle').setScale(0.25, 0.25);
      this.controls = this.add.image(this.scale.width*0.5, this.scale.height*0.8, 'controls').setScale(1, 1).setScrollFactor(0);
    
      this.backButton.on('pointerdown', () => {
        this.controlsTitle.destroy(), this.controls.destroy(), this.backButton.destroy(), this.pauseBackGround.destroy(), this.volumeTitle.destroy(), 
        this.volumeBar.destroy(), this.settingsLayout.destroy(),this.slide.destroy(), this.activetePause = false, this.create(), this.inSettings = false});
    }

  unPause(){
    this.scene.activetePause = false;
    this.pauseBackGround.destroy();
    this.exitButton.destroy();
    this.resumeButton.destroy();
    this.settingsButton.destroy();
    this.menuLayout.destroy();
    this.scene.resume("level");

    //this.physics.resume();
      
    /*this.mainSong.resume();
    
    if(this.scene.fallObjEx!=null)this.scene.fallObjEx.handleMovement();
    if(this.scene.fallObjEx2!=null)this.scene.fallObjEx2.handleMovement();
    if(this.scene.fallObjEx3!=null)this.scene.fallObjEx3.handleMovement();
    
    for(let i=0;i<this.powerUpsArray.length;i++)
    {
      if(this.powerUpsArray[i].movesbyTween)this.powerUpsArray[i].tweenMovement.resume();
    }
    if(!this.scene.inSettings ) this.scene.player.handleMovement();*/
  }

  init(scene){
    this.level = scene;
    //this.level.mainSong.setVolume(0.1);
  }
  
  update()
  {
    this.volumeValue = (this.x - this.minBarVolume) / (this.maxBarVolume-this.minBarVolume);
    this.level.volume = this.volumeValue;
    console.log("volumen pta: " + this.volumeValue);
  }
}
