import Phaser from 'phaser';
import Entity from './Entity';
import PlayerLaser from './PlayerLaser';

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData({
      speed: 200,
      isShooting: false,
      timerShootDelay: 15,
    });
    this.setData('timerShootTick', (this.getData('timerShootDelay') - 1));
  }

  moveRight() {
    this.body.setVelocityX(this.getData('speed'));
  }

  moveLeft() {
    this.body.setVelocityX(-this.getData('speed'));
  }

  moveUp() {
    this.body.setVelocityY(-this.getData('speed'));
  }

  moveDown() {
    this.body.setVelocityY(this.getData('speed'));
  }

  onDestroy() {
    this.scene.cameras.main.shake(450);
    this.scene.time.addEvent({
      delay: 1100,
      callback: () => {
        this.scene.scene.start('SceneGameOver');
      },
      loop: false,
    });
  }

  update() {
    this.body.setVelocity(0, 0);
    this.x = Phaser.Math.Clamp(
      this.x,
      5 + (this.displayWidth / 2),
      window.global.width - (this.displayWidth / 2 + 5),
    );

    if (this.getData('isShooting') && !this.isDead()) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1);
      } else {
        const laser = new PlayerLaser(this.scene, this.x, (this.y - 25));
        const sfxType = 0;
        laser.setDepth(-0.1);
        laser.body.setSize(
          laser.displayWidth * 0.85,
          laser.displayHeight,
        );
        this.scene.playerLasers.add(laser);
        this.scene.sfx.laser[sfxType].play();
        this.setData('timerShootTick', 0);
      }
    }

    for (let i = 0; i < this.scene.playerLasers.getChildren().length; i += 1) {
      const laser = this.scene.playerLasers.getChildren()[i];
      if (laser.y < 0) {
        this.scene.playerLasers.remove(laser);
        laser.destroy();
      }
    }
  }
}

export default Player;
