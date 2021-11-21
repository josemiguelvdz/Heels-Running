export default class PowerUpBar extends Phaser.GameObjects.GameObject {

  constructor(scene, x, y, esmoquins, coffes, alcohols) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.defaultCircle = this.scene.add.sprite(x, y, "powerUpBar", "defaultCircle.png").setScrollFactor(0);
    this.greenCircle = this.scene.add.sprite(x, y, "powerUpBar", "greenCircle.png").setScrollFactor(0);
    this.redCircle = this.scene.add.sprite(x, y, "powerUpBar", "redCircle.png").setScrollFactor(0);

    this.greenCircle.setVisible(false);
    this.redCircle.setVisible(false);

    this.esmoquins = esmoquins;
    this.coffes = coffes;
    this.alcohols = alcohols;

  }

  // preUpdate() {
    
    
  // }

  checkPowerUp(currentPowerUp){
    if(this.esmoquins.contains(currentPowerUp)){
      this.greenCircle.setVisible(true);
    }
    else if (this.coffes.contains(currentPowerUp)){
      this.greenCircle.setVisible(true);
    }
    else if(this.alcohols.contains(currentPowerUp)){
      this.redCircle.setVisible(true);
    }

    console.log("test");
  }



   
}
