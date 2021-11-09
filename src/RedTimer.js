import powerUp from './PowerUp.js';
import scene from './Scene.js';

export default class redTimer extends powerUp {


  constructor(scene, player, x, y, nombreImg, temp,moving) {
    super(scene, player, x, y, nombreImg, temp,moving); //Constructor de la clase base
  }

  preUpdate() {
    super.preUpdate();


  }

  
  /**
   * Handles the collision with player

   */
  handleCollision() {

   this.collideRedTimer();

  }

  /**
   * Makes the power up dissapear and adds more time of the run 
   * 
   */
  collideRedTimer()
  {
        this.destroy();
        //Aqui se llamaria al metodo que actualiza el tiempo de la run que se muestra en la interfaz
       
  }
  

}