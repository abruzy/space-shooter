import Phaser from 'phaser';
import Enemy from './Enemy';

class ChaserShip extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy1', 'ChaserShip');
    if (this.x < this.displayWidth) {
      this.x = this.displayWidth;
    } else if (this.x > (window.global.width - this.displayWidth)) {
      this.x = window.global.width - this.displayWidth;
    }
    this.state = this.states.MOVE_DOWN;
    this.speed = 200;
  }

  update() {
    if (!this.isDead() && !this.scene.player.isDead()) {
      if (Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.scene.player.x,
        this.scene.player.y,
      ) < 100) {
        this.state = this.states.CHASE;
      } else {
        this.state = this.states.MOVE_DOWN;
      }

      switch (this.state) {
        case this.states.CHASE:
          const dy = this.scene.player.y - this.y;
          const dx = this.scene.player.x - this.x;
          const angle = Math.atan2(dy, dx);
          this.setSpeedXY(
            Math.cos(angle) * (this.speed * 0.75),
            Math.sin(angle) * (this.speed * 0.75),
          );
          break;
        default:
          this.setSpeedXY(0, this.speed);
          break;
      }
      if (this.x < this.scene.player.x) {
        this.angle -= 5;
      } else {
        this.angle += 5;
      }
    } else if (this.scene.player.isDead()) {
      this.setSpeedXY(0, this.speed);
      if (!this.isDead()) {
        this.angle += 5;
      }
    }
  }
}

export default ChaserShip;
