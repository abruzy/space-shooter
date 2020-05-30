import Phaser from 'phaser';

class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData({
      type,
      isDead: false,
    });
  }

  isDead() {
    return this.getData('isDead');
  }

  explode(canDestroy) {
    if (!this.getData('isDead')) {
      this.setTexture('sprExplosion');
      this.play('sprExplosion');
      this.setData('isDead', true);
      this.body.setEnable(false);
      this.scene.sfx.explosions[Phaser.Math.Between(0, 1)].play();
      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
          this.shootTimer.destroy();
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);

      this.on('animationcomplete', () => {
        if (canDestroy) {
          this.destroy();
        } else {
          this.setVisible(false);
        }
      });
    }
  }
}

export default Entity;
