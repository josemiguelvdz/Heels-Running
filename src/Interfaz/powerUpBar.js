export default class PowerUpBar extends Phaser.GameObjects.GameObject {

  constructor(scene, x, y, player) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.defaultCircle = this.scene.add.sprite(x, y, "powerUpBar", "defaultCircle.png").setScrollFactor(0);
    this.greenCircle = this.scene.add.sprite(x, y, "powerUpBar", "greenCircle.png").setScrollFactor(0);
    this.redCircle = this.scene.add.sprite(x, y, "powerUpBar", "redCircle.png").setScrollFactor(0);


    this.esmoquinIcon = this.scene.add.sprite(x, y, "esmoquin", "esmoquin.png").setScrollFactor(0);
    this.alcoholIcon = this.scene.add.sprite(x, y, "vino", "vino.png").setScrollFactor(0);
    this.coffeIcon = this.scene.add.sprite(x, y, "coffe", "coffe.png").setScrollFactor(0);

    this.greenCircle.setVisible(false);
    this.redCircle.setVisible(false);


    this.player = player;

  }

  preUpdate() {
    if(this.player.esmoquinShield || this.player.coffeEffect){
      this.greenCircle.setVisible(true);
      if(this.player.esmoquinShield){
        this.esmoquinIcon.setVisible(true);
      }
      else{
        this.coffeIcon.setVisible(true);
      }
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
