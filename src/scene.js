import Player from './player.js';
import Platform from './platform.js';
import powerUp from './powerUp.js';

const createAligned = (scene, totalWidth, texture, scrollFactor) => {

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

    this.add.image(width * 0.5, height * 0.5, 'sky')
      .setScrollFactor(0);

    createAligned(this, totalWidth, 'backhouse', 0.25);
    createAligned(this, totalWidth, 'houses2', 0.5);
    createAligned(this, totalWidth, 'houses1', 0.5);
    createAligned(this, totalWidth, 'road', 1);
    createAligned(this, totalWidth, 'crosswalk', 1);

    this.cameras.main.setBounds(0, 0, width*5, height);


   
    
  
   

  
    //Fisicas
    //Creacion de un grupo , y le añadimos un collider entre uno y otro
    //Primero los hemos añadido a un grupo para poder detectar cuando colisionan entre ellos
    
    this.player = new Player(this, 200, 300,3);
    this.salmon= new powerUp( this,this.player,300, 300,'salmonFish');
    this.redTimer= new powerUp( this,this.player,450, 300,'redTimer');
    this.coffe1= new powerUp( this,this.player,600, 300,'coffe');
    this.coffe2= new powerUp( this,this.player,800, 300,'coffe');
   
   
    //Esto no hay alguna forma de encapsularlo?
    
  
     this.platform = new Platform(this, this.player,this.salmon, this.player.y, 400);
      
    
    
     //Arrays de los distintos objetos del juego
    this.createGroups();
    
      
      


  }

  update(){
    const cam = this.cameras.main;
    const speed = 3;
    //Metodo que comprueba las colisiones 
    
    
    
    // cam.scrollX += speed;
  }
  createGroups()
  {
       //No se como hacer para crear un collider entre dos grupos 
       //Se me ocurre hacer un array
    
    //COLISION ENTRE PECES Y PLATAFORMAS
    //GRUPO DE LAS PLATAFORMAS
    this.platforms= this.physics.add.staticGroup();
     this.platforms.add(this.platform);
    this.physics.add.collider(this.salmon, this.platforms);

  //GRUPO DE LOS SALMONES - COLISION CON PLATAFORMAS
  this.salmons = this.physics.add.staticGroup();
  this.salmons.add(this.salmon);
  this.physics.add.collider(this.platform, this.salmons);  
  
    
    
    this.physics.add.collider(this.redTimer, this.platforms);
  }
    
}
