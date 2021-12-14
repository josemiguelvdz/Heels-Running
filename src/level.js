  import Player from './Player/player.js';
  import Police from './Police/police.js';
  import Salmon from './Interactuables/Life/Salmon.js';
  import Coffe from './Interactuables/PowerUps/Coffe.js';
  import RedTimer from './Interactuables/Debuffs/RedTimer.js';
  import GreenTimer from './Interactuables/PowerUps/GreenTimer.js';
  import Box from './StaticObjects/Box.js';
  import Chrono from './Timer/Chrono.js';
  import Esmoquin from './Interactuables/PowerUps/esmoquin.js';
  import Gangster from './Mafioso/gangster.js';
  import Alcohol from './Interactuables/Debuffs/alcohol.js';
  import FallingObject from './FallingObjects/fallingObject.js';
  import FireHydrant from './StaticObjects/fireHydrant.js';
  import StaticObject from './StaticObjects/staticobject.js';
  import Interface from './Interfaz/interface.js';

  export default class Level extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
      super({ key: 'level' });
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
      
      const width = this.scale.width;
      const height = this.scale.height;
      const totalWidth = width*10;

      this.add.image(width*0.5, height*0.5, 'sky')
        .setScale(1.2, 1)
        .setScrollFactor(0);

      this.createAligned(this, totalWidth, 'backhouse', 0.25);
      this.createAligned(this, totalWidth, 'houses2', 0.5);
      this.createAligned(this, totalWidth, 'houses1', 0.5);
      this.createAligned(this, totalWidth, 'road', 1);
      this.createAligned(this, totalWidth, 'crosswalk', 1);
      
      //creamos los distintos elementos del juego
      //Los asociamos al grupo para las colisiones 

      this.powerUpsArray=[];
      const configSound = {
        mute: false,
        volume: 0.3,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0,
      };
      this.mainSong= this.sound.add("gameSong",configSound);
      this.mainSong.play();
      this.createObjects(width, height, totalWidth);
      this.createGroups();     
      this.cameras.main.setBounds(0, 0, width*5, height);
      this.cameras.main.startFollow(this.player);

      this.scape = this.input.keyboard.addKey('ESC');
      this.scape.on('down', () => { 
      });
      
      // CAMBIAR BOUDING BOX DE TAMAÑO
      this.time.addEvent({delay: 500, callback: this.delayDone, callbackScope: this, loop: false})
      this.volume = 0.5;
      this.slideX = 0;

    }

    update(){
      const cam = this.cameras.main;
      const speed = 1;
  
      cam.scrollX += speed;

      if(this.police.isHelicopter()){
        if(this.police.body.x>=this.player.body.x){
          this.player.arrestado();
          this.player.getActualScene().chrono.finish();
          this.police.catchP(this.player);
          this.lose();
        }
      }
      if (Phaser.Input.Keyboard.JustDown(this.scape)) { 
        this.scene.pause();
        this.scene.launch("pauseMenu", this);
      } 
      this.mainSong.setVolume(this.ChangeVolume());
    }
  // Cambiar tamaño sprites
  delayDone(){
    this.player.body.setSize(this.player.width/2, this.player.height/1.5, true);
  }
  /**
  * External function that is called to generate the parallax objects
  * @param {*} scene - Scene
  * @param {*} totalWidth - Total Width of the Game
  * @param {*} texture - Image/Sprite to be generated
  * @param {*} scrollFactor - Scroll factor of the image
  */
  createAligned(scene, totalWidth, texture, scrollFactor) {
    const w = scene.textures.get(texture).getSourceImage().width
    const count = Math.ceil(totalWidth / w) * scrollFactor;
    let x = 0;
    for(let i = 0; i < count; ++i){
      const b = scene.add.image(x, scene.scale.height, texture)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor);  
      x += b.width; 
    }
  }
  /**
  * External function that is called to scalate the height of the buildings.
  * This is used to generate buildings of different heights.
  * @param {*} platform - Building
  * @param {*} width - Width of the building
  * @param {*} height - Height of the building
  * @param {*} buildingScaleFactor - Scale factor of the building (only affects height)
  */
  scaleBuilding(platform, width, height,  buildingScaleFactor) {
    platform.setSize(width, height*(buildingScaleFactor*2-1));
    platform.setScale(1, buildingScaleFactor);
    platform.body.setSize(platform.width, platform.height, true);
  }
  /**
   * Creates collision groups and adds colliders between them
   */
    createGroups()
    {
      this.powerUps = this.physics.add.group();
      this.powerUps.add(this.salmon);
      this.powerUps.add(this.esmoquin);
      this.powerUps.add(this.esmoquin2);
      this.powerUps.add(this.redTimer);
      this.powerUps.add(this.greenTimer);
      this.powerUps.add(this.coffe1);
      this.powerUps.add(this.alcoholEx);

      this.physics.add.overlap(this.player,this.powerUps,(o1,o2)=> {
        onCollision(o1,o2);
      })
    }
  /**
   * Create GameObjects and adjust its size
   * @param {*} width -specifies individual ground width for its creation
   * @param {*} height -specifies ground height for its creation
   * @param {*} totalWidth -specifies total  ground width for its creation
   */
    createObjects(width, height, totalWidth)
    {
      this.createObjectGroups();
      // ESTATICOS - EN ORDEN DE APARICION
      //NO SE REFACTORIZAN POR QUE SON UNICOS
      this.police= new Police(this,-500, 300);
      this.player = new Player(this, -400, 300, 3);
      this.interface = new Interface(this, this.player);

    
      this.createAllBoxes();
      this.createAllFireHydrants();
      this.createAllStaticObj();
      this.createAllGangsters();
      this.createAllFallingObj();

      this.chrono= new Chrono(this, true);
      this.salmon= new Salmon(this, this.player, 2800, 50,'salmonFish',true);
      this.esmoquin= new Esmoquin( this,this.player, 1300, 100,'esmoquin',true);
      this.esmoquin2= new Esmoquin( this,this.player, 3500, 70,'esmoquin',true);
      this.alcoholEx= new Alcohol( this,this.player, 800, 70,'vino',true);
      this.coffe1= new Coffe( this,this.player, 1000, 100,'coffe',true);
      this.timeBar = this.add.sprite(this.scale.width-100, 50, 'timeBar', 'timeBar.png').setScrollFactor(0);
      this.redTimer= new RedTimer( this,this.player, 2200, 100,'redTimer',true,this.chrono);
      this.greenTimer= new GreenTimer( this,this.player, 2400, 100,'greenTimer',true,this.chrono);

      this.handleColliders();//Creamos el grupo static objects
      this.createGroundZone(totalWidth);
      this.createZones(totalWidth);
    }


   createBoxPowerUp(number,x,y){
    if(number===0)this.powerE=new Coffe( this,this.player, x, y,'coffe',false);
    else if(number==1)this.powerE=new Salmon(this, this.player, x, y,'salmonFish',false);
    else if(number==2)this.powerE=new Esmoquin(this,this.player, x, y,'esmoquin',false);
    this.powerE.setScale(.5,.5);
    this.physics.add.collider(this.player,this.powerE,onCollision);
  }
  createObjectGroups()
  {
    this.boxes = this.physics.add.staticGroup();
    this.staticObjects=this.physics.add.staticGroup(); //Grupo para los estaticos
    this.fallObjs= this.physics.add.group();
    this.fireHydrants=this.physics.add.staticGroup();
  }
  handleColliders()
  {
    this.physics.add.collider(this.player,this.staticObjects,(o1,o2)=>{
        console.log("colision")
      });
    this.physics.add.collider(this.player, this.boxes,(o1,o2)=> {
        o2.handleCollision();
      });    
    this.physics.add.overlap(this.player,this.fallObjs,(o1,o2)=> {
        o2.handleCollisionFallObj(true,false);
      });
    this.physics.add.collider(this.player, this.fireHydrants,(o1,o2)=> {
        o2.setCollision();
      });
      //GRUPO DEL POLICIA Y EL PLAYER
    this.physics.add.collider(this.player,this.police,(o1,o2)=>{
        o1.arrestado();
        o1.getActualScene().chrono.finish();
        o2.catchP(o1);
          });
        
   }
  createStaticObjects(x,y,spriteName)
  {
      this.staticObjectX=new StaticObject(this,x,y,spriteName);
      this.staticObjects.add(this.staticObjectX);
  }
  createBoxes(x,y)
  {
      this.box=new Box(this,x,y,'boxDestruction');
      this.boxes.add(this.box);
  }
  createFallingObj(x,y)
  {
    this.fallObjEx = new FallingObject(this,this.player, x, y,'maceta');
    this.fallObjs.add(this.fallObjEx);
  }
  createGroundZone(totalWidth)
  {
      this.groundZone = this.add.zone(0, 600, totalWidth, 64);
      this.physics.world.enable(this.groundZone);
      this.groundZone.body.setAllowGravity(false);
      this.groundZone.body.setImmovable(true);
    
      this.physics.add.collider(this.groundZone, this.player);
      this.physics.add.collider(this.groundZone, this.police);
      this.physics.add.collider(this.groundZone, this.gangster);
      this.physics.add.collider(this.groundZone,this.fallObjs,(o1,o2)=> {
        o2.handleCollisionFallObj(false,false);
      });     
  }
  handleCreationPowerUps(name,x,y)
  {


  }
  createFireHydrants(x,y)
  {
    this.fireHydrant= new FireHydrant(this,x, y, 'fireHydrant');
    this.fireHydrants.add(this.fireHydrant);
  }
  createGangster(x,y)
  {
    this.gangster = new Gangster(this, this.player, x,y);
  }
  createAllStaticObj()
  {
      this.createStaticObjects(1000, 520, 'policeCar');
      this.createStaticObjects(2400, 460, 'phoneCenter');
      this.createStaticObjects(4300, 535, 'fireHydrant');
      this.createStaticObjects(4900, 520, 'policeCar');
      this.createStaticObjects(5600, 460, 'candyBuilding');
     
  }
  createAllFallingObj()
  {
   this.createFallingObj(1000, 20);
  }
  createAllBoxes()
  {
    this.createBoxes(1800, 535);
    this.createBoxes(1864, 535);
    this.createBoxes(1928, 535);
    this.createBoxes(2700, 535);
    this.createBoxes(2700, 535);
    this.createBoxes(2764, 535);
    this.createBoxes( 2700, 471);
    this.createBoxes(3800, 535);
    this.createBoxes(3864, 535)
    this.createBoxes(3928, 535);
    this.createBoxes(3864, 471);
    this.createBoxes(3800, 471);
  }
  createAllFireHydrants()
  {
  this.createFireHydrants(1000,530);
  }
  createAllGangsters()
  {
    this.createGangster(3700, 450);
  }
  createZones(totalWidth)
    {
    // VICTORY
    this.winZone=this.add.zone(totalWidth,600,40,totalWidth);
    this.physics.world.enable(this.winZone);
    this.winZone.body.setAllowGravity(false);
    this.winZone.body.setImmovable(true);
        // VICTORY
        this.physics.add.collider(this.winZone,this.player,(o1,o2)=>{
          this.win();
        });

    // POLICE ZONE
    this.helicopterZone=this.add.zone(3300,600,40,totalWidth);
    this.physics.world.enable(this.helicopterZone);
    this.helicopterZone.body.setAllowGravity(false);
    this.helicopterZone.body.setImmovable(true);
    this.physics.add.collider(this.helicopterZone,this.police,(o1,o2)=>{
      o1.destroy();
      o2.policeAgain();
    });

    // HELICOPTER ZONE
    this.policeZone=this.add.zone(1850,600,40,totalWidth);
    this.physics.world.enable(this.policeZone);
    this.policeZone.body.setAllowGravity(false);
    this.policeZone.body.setImmovable(true);
    this.physics.add.collider(this.policeZone,this.police,(o1,o2)=>{
      o1.destroy();
      o2.intoHelicopter();
    });


   

   

    // MAPA DEL JUEGO
    // ESTATICOS - EN ORDEN DE APARICION
    this.policeCar = new StaticObject (this, 1000, 520, 'policeCar');

    this.fireHydrant = new FireHydrant (this, 1500, 535, 'fireHydrant');

    this.box = new Box(this, 1800, 535, 'boxDestruction');
    this.box2 = new Box(this, 1864, 535, 'boxDestruction');
    this.box3 = new Box(this, 1864, 471, 'boxDestruction');
    this.box4 = new Box(this, 1928, 535, 'boxDestruction');

    this.phoneCenter = new StaticObject(this, 2400, 460, 'phoneCenter');

    this.box5 = new Box(this, 2700, 535, 'boxDestruction');
    this.box6 = new Box(this, 2764, 535, 'boxDestruction');
    this.box7 = new Box(this, 2700, 471, 'boxDestruction');

    this.whiteBuilding = new StaticObject(this, 3300, 100, 'whiteBuilding');


    this.box8 = new Box(this, 3800, 535, 'boxDestruction');
    this.box9 = new Box(this, 3864, 535, 'boxDestruction');
    this.box10 = new Box(this, 3928, 535, 'boxDestruction');
    this.box11 = new Box(this, 3864, 471, 'boxDestruction');
    this.box12 = new Box(this, 3800, 471, 'boxDestruction');

    this.fireHydrant2 = new FireHydrant (this, 4300, 535, 'fireHydrant');

    this.policeCar2 = new StaticObject (this, 4900, 520, 'policeCar');

    this.candyBuilding = new StaticObject(this, 5600, 460, 'candyBuilding');



    //-400 x player
    this.player = new Player(this, -400, 300, 3);
    this.gangster = new Gangster(this, this.player, 3700, 450);

    this.fallObjEx = new FallingObject(this,this.player, 3300, 100,'maceta');




    // AÑADIR TODOS LOS GRUPOS

    this.salmon= new Salmon(this, this.player, 2800, 50,'salmonFish',true);
    this.powerUpsArray.push(this.salmon);

    this.esmoquin= new Esmoquin( this,this.player, 1300, 100,'esmoquin',true);
    this.powerUpsArray.push(this.esmoquin);
    this.esmoquin2= new Esmoquin( this,this.player, 3500, 70,'esmoquin',true);
    this.powerUpsArray.push(this.esmoquin2);
  }
    
    lose(){
      this.mainSong.stop();
      this.scene.start('gameover');
    }

    win(){
      this.mainSong.stop();
      this.runTime= this.chrono.getTimeElapsed();
      this.scene.start('win', { runT: this.runTime});
    }

    ChangeVolume(){
      return this.volume;
    }

    SaveSlidePos(posX){
        this.slideX = posX;
    }

    SlidePos(){
      return this.slideX;
    }
  }

  /**
   * External function that is called when object collide
   * @param {*} obj1 - Player or Kick zone
   * @param {*} obj2 - Object that player collides with
   */
  function onCollision(obj1,obj2) {
    obj2.handleCollision(); 
  }


 

