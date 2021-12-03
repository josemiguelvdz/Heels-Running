import PowerUp from './powerUp.js';

export default class Coffe extends PowerUp {


  constructor(scene, player, x, y, nombreImg,moving) {
    super(scene, player, x, y, nombreImg,moving); //Constructor de la clase base   
      }

  preUpdate(time,delta) {
    super.preUpdate(time,delta);
//Miramos a ver si se puede empezar a contar por que ha chocado con el jugador
//Si ha chocado con el jugador miramos si no estamos en pausa 
//Si no estamos en pausa ya vemos si ha pasado el tiempo , para hacer o no el efecto si todavia no ha pasado el tiempo 
  
  }
 
  handleCollision()
   {

  
    this.player.controlSpeed("Increase"); 
    this.powerupsound.play();
    this.destroy();
   }
 
}
