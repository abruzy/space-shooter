import Phaser from 'phaser';
import Enemy from './Enemy';
import EnemyLaser from './EnemyLaser';

class GunShip extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'gunship2', 'GunShip');
    if (this.x < this.displayWidth) {
      this.x = this.displayWidth;
    } else if (this.x > (window.global.width - this.displayWidth)) {
      this.x = window.global.width - this.displayWidth;
    }
    this.play('gunship2');
    this.body.setSize(this.displayWidth * 0.5, this.displayHeight, true);
    this.shootTimer = this.scene.time.addEvent({
      delay: Phaser.Math.RND.between(1000, 2000),
      callback: this.doShoot.bind(this),
      loop: true,
    });
  }

  doShoot() {
    const laser = new EnemyLaser(
      this.scene,
      this.x,
      this.y + 15,
    );
    laser.setDepth(-0.3);
    laser.body.setSize(
      laser.displayWidth / 2,
      laser.displayHeight,
    );
    laser.setScale(this.scaleX);
    this.scene.enemyLasers.add(laser);
  }

  onDestroy() {
    this.shootTimer.remove(false);
    this.destroy();
  }
}

export default GunShip;
