export default class HealthBar extends Phaser.GameObjects.GameObject {

  constructor(scene, x, y, player) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.hud = this.scene.add.sprite(x+25,y-25, "hudTest", "hud.png").setScrollFactor(0);

    this.hp1 = this.scene.add.sprite(this.hud.x-13,this.hud.y-27.5,"healthBar","hp1.png").setScrollFactor(0);
    this.hp2 = this.scene.add.sprite(this.hp1.x+46,this.hp1.y-10,"healthBar","hp2.png").setScrollFactor(0);
    this.hp3 = this.scene.add.sprite(this.hp2.x+57,this.hp2.y,"healthBar","hp3.png").setScrollFactor(0);

   
    this.hpArr = [this.hp1, this.hp2, this.hp3];

    this.player = player;
  }

  preUpdate() {
    this.checkLifes(this.player);
  }

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
}
