 export default class Star extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'power');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.y -= this.height;
  }

  preUpdate() {
    super.preUpdate();
    if (this.scene.physics.overlap(this.scene.player, this)) {
        this.scene.spawnStar();
        this.destroy();
    }
  }
}
