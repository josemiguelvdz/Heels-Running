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

    this.offsetX = -1900;
    
    
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width*20;

    this.add.image(width*0.5, height*0.5, 'sky')
      .setScale(2, 1)
      .setScrollFactor(0);

    this.createAligned(this, totalWidth*2, 'backhouse', 0.25);
    this.createAligned(this, totalWidth*2, 'houses2', 0.5);
    this.createAligned(this, totalWidth*2, 'houses1', 0.5);
    this.createAligned(this, totalWidth*2, 'road', 1);
    this.createAligned(this, totalWidth*2, 'crosswalk', 1);
    const configSound = {
      mute: false,
      volume: 0.3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    this.losingsound= this.sound.add("loseSound",configSound);
    
    //creamos los distintos elementos del juego
    //Los asociamos al grupo para las colisiones 

    this.powerUpsArray=[];
    const configSound2 = {
      mute: false,
      volume: 0.3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    this.mainSong= this.sound.add("gameSong",configSound2);
    this.mainSong.play();

    this.createObjects(totalWidth);

    
    //this.cameras.main.setBounds(0, 0, totalWidth, height);
    this.cameras.main.startFollow(this.player, false, 1, 1, -50, 25);
    this.cameras.main.setDeadzone(1, 400);

    this.cameras.main.setFollowOffset(this.offsetX, 0);

    this.scape = this.input.keyboard.addKey('ESC');
    this.scape.on('down', () => { 
    });


    this.volume = 0.3;
    this.slideX = 0;

  }



  update(t, dt){
    super.update(t, dt);

    if(this.offsetX < 0){
      this.offsetX += 0.6 * Math.round(dt);
      this.cameras.main.setFollowOffset(this.offsetX, 25);
     
    }
    if(this.police.body.x>=this.player.body.x){
      this.player.arrestado();
      this.player.getActualScene().chrono.finish();
      this.police.catchP(this.player);
      this.lose();
    }

    if (Phaser.Input.Keyboard.JustDown(this.scape)) { 
      this.scene.pause();
      this.scene.launch("pauseMenu", this);
    } 

    this.mainSong.setVolume(this.ChangeVolume());

  }

  lose(){
    this.mainSong.stop();
    this.losingsound.play();
    this.scene.start('gameover');
  }

  win(){
    this.mainSong.stop();
    this.runTime= this.chrono.getTimeElapsed();

    this.scene.start('win',  {runT: this.runTime , volume: this.ChangeVolume()});
  
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

/**
 * Create GameObjects and adjust its size
 * @param {*} width -specifies individual ground width for its creation
 * @param {*} height -specifies ground height for its creation
 * @param {*} totalWidth -specifies total  ground width for its creation
 */
  createObjects(totalWidth)
  {
    this.createObjectGroups();

    // MAPA DEL JUEGO
    this.createAllStaticObjects();
    this.createAllBuildings();
    this.createAllBoxes();
    this.createAllFireHydrants();
    this.createAllPowerUps();


    // -500, 300
    this.police = new Police(this, -500, 300);
    this.changeBoundingBox(this.police, 1, 1.5);

    this.createZones(totalWidth);
    

    //-400, 300
    this.player = new Player(this, 18000, 300, 3);
    // CAMBIAR BOUDING BOX DE TAMAÑO
    this.changeBoundingBox(this.player, 2, 1.5);

    this.createAllFallObjects();

    this.createAllGangsters();

    this.timeBar = this.add.sprite(this.scale.width-100, 50, 'timeBar', 'timeBar.png').setScrollFactor(0);
    this.chrono= new Chrono(this, true);


    // SUELO
    this.createGroundZone(totalWidth);

    // INTERFAZ - Barra de vida y tiempo
    this.interface = new Interface(this, this.player);


    // Handle colliders
    this.handleColliders();
    
  }

  // Cambiar tamaño sprites
  changeBoundingBox(object, factorX, factorY){
    object.body.setSize(object.width/factorX, object.height/factorY, true);
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


  createBoxPowerUp(number,x,y){
    if(number===0)this.powerE=new Coffe( this,this.player, x, y,'coffe',false);
    else if(number==1)this.powerE=new Salmon(this, this.player, x, y,'salmonFish',false);
    else if(number==2)this.powerE=new Esmoquin(this,this.player, x, y,'esmoquin',false);
    this.powerE.setScale(.5,.5);
    this.powerUps.add(this.powerE);
  }



  createAllBoxes()
  {
    this.createBox(1928, 535);

    this.createBox(6300, 535);
    this.createBox(8060, 535);

    this.createBox(21350, 535);
    this.createBox(25150, 535);
    this.createBox(28170, 535);
  }
  createAllPowerUps(){
    this.createSalmon(13000, -700);
    this.createSalmon(8500, 200);
    this.createSalmon(18700, -100);
    this.createCoffe(5850, 180);


    // this.createSalmon(2800, 50);
    // this.createEsmoquin(1300, 100);
    // this.createEsmoquin(3500, 70);
    // this.createAlcohol(800, 70);
    // this.createCoffe( 1000, 100);
    // this.createRedTimer(2200, 100);
    // this.createGreenTimer(2400, 100);

  }
  createAllFireHydrants()
  {
    this.createFireHydrant(1500, 535);
    this.createFireHydrant(4300, 535);
    this.createFireHydrant(7800, 535);

    this.createFireHydrant(21700, 535);
    this.createFireHydrant(25900, 535);
    this.createFireHydrant(30000, 535);
  }
  createAllStaticObjects()
  {
    this.createStaticObject(2950, 465, 'streetlight');
    this.createStaticObject(1000, 520, 'policeCar');
    this.createStaticObject(3900, 525, 'bin');
    this.createStaticObject(4900, 520, 'policeCar');
    this.createStaticObject(6500, 455, 'streetlight');
    this.createStaticObject(8150, 455, 'streetlight');
    this.createStaticObject(8700, 465, 'streetlight');

    this.createStaticObject(19800, 455, 'streetlight');
    this.createStaticObject(20350, 520, 'policeCar');
    this.createStaticObject(24200, 520, 'policeCar');
    this.createStaticObject(24700, 455, 'streetlight');
    this.createStaticObject(26300, 455, 'streetlight');
    this.createStaticObject(26900, 520, 'policeCar');
    this.createStaticObject(29600, 520, 'policeCar');
    this.createStaticObject(29000, 455, 'streetlight');
    this.createStaticObject(30600, 455, 'streetlight');
    this.createStaticObject(31300, 520, 'policeCar');
  }
  createAllBuildings()
  {
    this.createBuilding(1600, 160, 'oldBuilding', false);
    this.createBuilding(500, 200, 'stairBuilding', false);
    this.createBuilding(2400, 460, 'phoneCenter', true);
    this.createBuilding(3300, 100, 'whiteBuilding', false);
    this.createBuilding(4400, 180, 'spainBuilding', false);
    this.createBuilding(5600, 460, 'candyBuilding', true);
    this.createBuilding(5850, 503, 'candyBuilding2', true);
    this.createBuilding(7000, 100, 'whiteBuilding', false);
    this.createBuilding(7350, 100, 'whiteBuilding', false);
    this.createBuilding(9007, 305, 'stairs', true, true, 1, 3);
    this.createBuilding(8900, 420, 'bakery', true, true, 1.2, 2.3);
    this.createBuilding(9370, 325, 'burguer', true, true, 1.2, 1.15);
    
    this.createBuilding(9820, 210, 'stairBuilding', true, true, 1.2, 1.4);
    this.createBuilding(10140, 0, 'spainBuilding', true, true, 2, 1.6);
    this.createBuilding(10700, 100, 'redLargeBuilding', true, true, 1.1, 1.2);
    this.createBuilding(11300, -50, 'whiteBuilding', true, true, 1.2, 1.7);
    this.createBuilding(11700, -200, 'stairBuilding', true, true, 1.2, 1.4);
    this.createBuilding(12100, 400, 'presidentialBuilding', true, true, 1.5, 1.35);
    this.createBuilding(12450, 600, 'presidentialBuilding', true, true, 1.5, 1.35);
    this.createBuilding(12740, -200, 'modernBuilding', true, true, 1.2, 1.75);
    this.createBuilding(12970, -200, 'spainBuilding', true, true, 2, 1.6);
    this.createBuilding(13500, 0, 'redLargeBuilding', true, true, 1.1, 1.2);
    this.createBuilding(14110, -100, 'oldBuilding', true, true, 1.6, 1.5);
    this.createBuilding(14530, -300, 'stairBuilding', true, true, 1.2, 1.4);
    this.createBuilding(14900, -150, 'whiteBuilding', true, true, 1.2, 1.7);
    this.createBuilding(15200, -50, 'spainBuilding', true, true, 2, 1.6);
    this.createBuilding(15510, -15, 'whiteBuilding', true, true, 1.2, 1.7);
    this.createBuilding(16100, -200, 'redLargeBuilding', true, true, 1.1, 1.2);
    this.createBuilding(16700, 450, 'presidentialBuilding', true, true, 1.5, 1.35);
    this.createBuilding(17100, 0, 'stairBuilding', true, true, 1.2, 1.4);
    this.createBuilding(17450, 70, 'spainBuilding', true, true, 2, 1.6);
    this.createBuilding(17800, 300, 'whiteBuilding', true, true, 1.2, 1.7);
    this.createBuilding(18400, 400, 'redLargeBuilding', true, true, 1.1, 1.2);

    this.createBuilding(21000, 100, 'whiteBuilding', false);
    this.createBuilding(22200, 460, 'candyBuilding', true);
    this.createBuilding(22450, 503, 'candyBuilding2', true);
    this.createBuilding(23300, 267, 'redLargeBuilding', false);
    this.createBuilding(24900, 100, 'whiteBuilding', false);
    this.createBuilding(25400, 460, 'phoneCenter', true);
    this.createBuilding(26500, 180, 'spainBuilding', false);
    this.createBuilding(27550, 420, 'bakery', true, true, 1.2, 2.3);
    this.createBuilding(28700, 190, 'stairBuilding', false);
    this.createBuilding(30000, 160, 'oldBuilding', false);
  }
  createAllFallObjects()
  {
    this.createFallObj(3400, 100, "maceta");
    this.createFallObj(7000, 100, "maceta");
    this.createFallObj(7467, 100, "ladrillo");
    
    this.createFallObj(20900, 100, "ladrillo");
    this.createFallObj(23000, 120, "maceta");
    this.createFallObj(23500, 120, "maceta");
    this.createFallObj(25000, 100, "ladrillo");
    this.createFallObj(28850, 100, "maceta");
    this.createFallObj(30100, 100, "maceta");
  }
  createAllGangsters()
  {
    this.createGangster(3700, 300);
    this.createGangster(5850, 300);

    this.createGangster(10850, -1000);
    this.createGangster(12400, -1000);
    this.createGangster(14370, -1000);
    this.createGangster(16000, -1000);

    this.createGangster(21000, 300);
    this.createGangster(24500, 300);
    this.createGangster(26200, 300);
    this.createGangster(28400, 300);
    this.createGangster(31000, 300);
  }

  createObjectGroups()
  {
    this.boxes = this.physics.add.staticGroup();
    this.staticObjects = this.physics.add.staticGroup();
    this.fallObjs = this.physics.add.group();
    this.fireHydrants = this.physics.add.staticGroup();
    this.buildings = this.physics.add.staticGroup();
    this.powerUps = this.physics.add.group();
    this.timers = this.physics.add.group();
    this.gangsters = this.physics.add.group();
  }

  createBox(x,y)
  {
    this.box = new Box(this,x,y,'boxDestruction');
    this.boxes.add(this.box);
  }
  createSalmon(x,y){
    this.salmon = new Salmon(this, this.player, x, y,'salmonFish',true);
    this.powerUpsArray.push(this.salmon);
    this.powerUps.add(this.salmon);
  }
  createGreenTimer(x,y){
    this.greenTimer=new GreenTimer(this,this.player, x, y,'greenTimer',true,this.chrono);
    this.powerUpsArray.push(this.greenTimer);
    this.timers.add(this.greenTimer);
  }
  createEsmoquin(x,y){
    this.esmoquin= new Esmoquin( this,this.player, x, y,'esmoquin',true);
    this.powerUpsArray.push(this.esmoquin);
    this.powerUps.add(this.esmoquin);
  }
  createCoffe(x,y){
    this.coffe= new Coffe( this,this.player, x, y,'coffe',true);
    this.powerUpsArray.push(this.coffe);
    this.powerUps.add(this.coffe);
  }
  createAlcohol(x,y){
    this.alcohol= new Alcohol( this,this.player, x, y,'vino',true);
    this.powerUpsArray.push(this.alcohol);
    this.powerUps.add(this.alcohol);
  }
  createRedTimer(x,y){
    this.redTimer=new RedTimer(this,this.player, x, y,'redTimer',true,this.chrono);
    this.powerUpsArray.push(this.redTimer);
    this.timers.add(this.redTimer);
  }
  createFireHydrant(x,y)
  {
    this.fireHydrant = new FireHydrant(this, x, y, 'fireHydrant');
    this.fireHydrants.add(this.fireHydrant);
  }
  createStaticObject(x, y, spriteName)
  {
    this.staticObject = new StaticObject (this, x, y, spriteName);
    this.staticObjects.add(this.staticObject);
  }
  createBuilding(x, y, spriteName, flagActiveCollider, flagBoundingBox, boundingX, boundingY)
  {
    this.building = new StaticObject(this, x, y, spriteName);
    if(flagActiveCollider)  this.buildings.add(this.building);
    if(flagBoundingBox) this.changeBoundingBox(this.building, boundingX, boundingY);
  }
  createFallObj(x, y,name)
  {
    this.fallObj = new FallingObject(this, this.player, x, y, name);
    this.fallObjs.add(this.fallObj);
  }
  createGangster(x, y)
  {
    this.gangster = new Gangster(this, this.player, x, y);
    this.gangsters.add(this.gangster);
  }

  handleColliders()
  {
    this.physics.add.overlap(this.player,this.powerUps,(o1,o2)=>{
      o2.handleCollision(o1);
    });
    this.physics.add.overlap(this.player,this.timers,(o1,o2)=>{
      o2.handleCollision(this.chrono);
    });

    this.physics.add.collider(this.player,this.staticObjects);
    this.physics.add.collider(this.player,this.buildings);
    this.physics.add.collider(this.player, this.boxes);
        
    this.physics.add.overlap(this.player,this.fallObjs,(o1,o2)=> {
        o2.handleCollisionFallObj(true,false);
      });
    this.physics.add.collider(this.groundZone,this.fallObjs,(o1,o2)=> {
      o2.handleCollisionFallObj(false,false);
    });
    this.physics.add.collider(this.player, this.fireHydrants,(o1,o2)=> {
        o2.setCollision();
      });
      //GRUPO DEL POLICIA Y EL PLAYER
    this.physics.add.overlap(this.player,this.police,(o1,o2)=>{
        o1.arrestado();
        o1.getActualScene().chrono.finish();
        o2.catchP(o1);
        });
    this.physics.add.collider(this.winZone,this.player,(o1,o2)=>{
      this.win();
      });

      this.physics.add.collider(this.gangsters, this.groundZone);
      this.physics.add.collider(this.gangsters,this.buildings);
      this.physics.add.collider(this.groundZone, this.player);
      this.physics.add.collider(this.groundZone, this.police); 
   }

   createGroundZone(totalWidth)
   {
    this.groundZone = this.add.zone(0, 600, totalWidth*3, 64);
    this.physics.world.enable(this.groundZone);
    this.groundZone.body.setAllowGravity(false);
    this.groundZone.body.setImmovable(true);
   }

   createZones(totalWidth)
   {
    this.createWinZone(32000, 600, 40, totalWidth);

    //CREAR TODAS LAS ZONAS NECESARIAS PARA EL NIVEL


    // 8700 / 19000

    this.createPoliceZone(8700, 600, 40, totalWidth, 60);
    this.createHelicopterZone(19000, 600, 40, totalWidth);


  }


  createWinZone(x,y,height,totalWidth){
    // VICTORY ZONE
    this.winZone=this.add.zone(x,y,height,totalWidth);
    this.physics.world.enable(this.winZone);
    this.winZone.body.setAllowGravity(false);
    this.winZone.body.setImmovable(true);
  }

  createHelicopterZone(x,y,height,totalWidth){
    // POLICE ZONE
    this.helicopterZone=this.add.zone(x,y,height,totalWidth);
    this.physics.world.enable(this.helicopterZone);
    this.helicopterZone.body.setAllowGravity(false);
    this.helicopterZone.body.setImmovable(true);
    this.physics.add.collider(this.helicopterZone,this.police,(o1,o2)=>{
      o1.destroy();
      o2.policeAgain();
    });
  }

  createPoliceZone(x,y,height,totalWidth, h){
    // HELICOPTER ZONE
    this.policeZone=this.add.zone(x,y,height,totalWidth);
    this.physics.world.enable(this.policeZone);
    this.policeZone.body.setAllowGravity(false);
    this.policeZone.body.setImmovable(true);
    this.physics.add.collider(this.policeZone,this.police,(o1,o2)=>{
      o1.destroy();
      o2.intoHelicopter(h);
    });
  }
}

