import Entity from './Entity';

class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaserPNew');
    this.body.setVelocityY(-200);
  }
}

export default PlayerLaser;
