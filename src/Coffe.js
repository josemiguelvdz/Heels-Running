import powerUp from './PowerUp.js';
import scene from './Scene.js';

export default class coffe extends powerUp {


  constructor(scene, player, x, y, nombreImg, temp) {
    super(scene, player, x, y, nombreImg, temp); //Constructor de la clase base

        this.speedAux= 120; //Incremento de velocidad que tiene el jugador 
  }

  preUpdate() {
    super.preUpdate();


  }

  //Redefin con herencia 
  handleCollision() {

    this.collideCoffe(this.scene);

  }

  collideCoffe(escena)
  {
       
       this.destroy();
     
       this.player.speed=this.player.speed+this.speedAux;

       //Timer para reestablecer la velocidad del jugador a los 4 segundos
       let timer = escena.time.addEvent( {
       delay: 4000, 
       callback: this.adjustSpeed, //No es la escena , se especifica segun donde este el metodo 
       callbackScope: escena 
                            }); 
   }   
 adjustSpeed()
 {  
 
  this.player.speed=this.player.speed-120;  //Hay que solucionar que la variable este cableada

 
 }

}