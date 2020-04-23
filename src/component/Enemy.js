import Phaser from 'phaser';
import STYLE from '../styles/style';
import Entity from './Entity';

class Enemy extends Entity {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key, type);
    this.setSpeed(Phaser.Math.RND.between(50, 100));
    this.setHP(1);
    this.states = {
      MOVE_DOWN: 'MOVE_DOWN',
      CHASE: 'CHASE',
    };
  }

  setSpeed(value) {
    this.body.setVelocityY(value);
  }

  setSpeedXY(x, y) {
    this.body.setVelocity(x, y);
  }

  damageEffect() {
    this.setTint(STYLE.hexColors.red);
    this.scene.time.addEvent({
      delay: 120,
      callback: () => {
        this.setTint(STYLE.hexColors.white);
      },
      loop: false,
    });
  }

  damaged(value) {
    if (!this.isDead()) {
      const currHP = this.remainHP();
      this.damageEffect();
      value = value === undefined ? 1 : value;
      this.setHP(currHP - value);
      if (this.remainHP() <= 0) {
        this.scene.scoreAdd(3);
        this.explode(true);
        this.setHP(0);
        this.setData('isDead', true);
      }
    }
  }

  remainHP() {
    return this.getData('health');
  }

  setHP(value) {
    this.setData('health', value);
  }
}

export default Enemy;
