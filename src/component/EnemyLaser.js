import Entity from './Entity';

class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaserENew');
    this.body.setVelocityY(220);
  }
}

export default EnemyLaser;
