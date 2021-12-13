
export default class Interface extends Phaser.GameObjects.GameObject {

    constructor(scene, player) {
      super(scene);
      this.scene.add.existing(this);
  
      //Creacion de la barra de vida
      this.x = 100;
      this.y = 100;

      this.hud = this.scene.add.sprite(this.x+25,this.y-25, "hudTest", "hud.png").setScrollFactor(0);
  
      this.hp1 = this.scene.add.sprite(this.hud.x-13,this.hud.y-27.5,"healthBar","hp1.png").setScrollFactor(0);
      this.hp2 = this.scene.add.sprite(this.hp1.x+46,this.hp1.y-10,"healthBar","hp2.png").setScrollFactor(0);
      this.hp3 = this.scene.add.sprite(this.hp2.x+57,this.hp2.y,"healthBar","hp3.png").setScrollFactor(0);
  
     
      this.hpArr = [this.hp1, this.hp2, this.hp3];

      //Creacion del powerUpBar
      this.x = 180;

      this.defaultCircle = this.scene.add.sprite(this.x, this.y, "powerUpBar", "defaultCircle.png").setScrollFactor(0);
      this.greenCircle = this.scene.add.sprite(this.x, this.y, "powerUpBar", "greenCircle.png").setScrollFactor(0);
      this.redCircle = this.scene.add.sprite(this.x, this.y, "powerUpBar", "redCircle.png").setScrollFactor(0);
  
      this.esmoquinIcon = this.scene.add.sprite(this.x, this.y, "esmoquin", "esmoquin.png").setScrollFactor(0);
      this.alcoholIcon = this.scene.add.sprite(this.x, this.y, "vino", "vino.png").setScrollFactor(0);
      this.coffeIcon = this.scene.add.sprite(this.x, this.y, "coffe", "coffe.png").setScrollFactor(0);
  
      this.greenCircle.setVisible(false);
      this.redCircle.setVisible(false);

      //Icono del Gangster
      this.visionRange = 600;
      this.advideRange = 800;
      this.oneAdvice = false;
      this.iconExist = false;
  
      this.player = player;
    }
  
    preUpdate() {
      this.checkLifes(this.player);
      this.checkPowerUpBar();
      this.checkGangster();
    }


    /** 
    * Método que de activar el mensaje de advertencia del gangster
    */
    checkGangster(){
        
        if(Math.abs(this.scene.gangster.x-this.player.x) <= this.advideRange && !this.oneAdvice){
          
            this.icon =  this.scene.add.image(this.scene.scale.width*0.9, this.scene.gangster.y, 'advice').setScrollFactor(0);
            this.oneAdvice = true;
            this.iconExist = true;
        }
  
        else if(this.visionRange >= Math.abs(this.scene.gangster.x-this.player.x) && this.icon){
            this.icon.destroy();
            this.iconExist = false;
        }
    }
  
  /**
  * Método que se encarga de comprobar cuantas vidas tiene el jugador y actualizar la barra de vida
  * @param {*} player - Hacer referencia al player para comprobar cuantas vidas le quedan
  */
    checkLifes(player){
      if(player.numLifes !== 3){
        this.hpArr[player.numLifes].setVisible(false);
      }
      if(player.numLifes !== 0){
        this.hpArr[player.numLifes-1].setVisible(true);
      }
      else{
        this.hpArr[player.numLifes].setVisible(false);
      }
    }


    /** 
    * Método que se encarga de activar el correspondiente powerUp que esté activo en la interfaz
    */
    checkPowerUpBar(){
        if(this.player.esmoquinShield || this.player.coffeEffect){
            this.greenCircle.setVisible(true);
            if(this.player.esmoquinShield) 
              this.esmoquinIcon.setVisible(true);
            else
              this.coffeIcon.setVisible(true);
          }
          else{
            this.greenCircle.setVisible(false);
            this.esmoquinIcon.setVisible(false);
            this.coffeIcon.setVisible(false);
          }
      
          if(this.player.alcoholEffect){
            this.redCircle.setVisible(true);
            this.alcoholIcon.setVisible(true);
          }
          else{
            this.redCircle.setVisible(false);
            this.alcoholIcon.setVisible(false);
          }
        
    }

}
  