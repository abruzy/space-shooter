import Phaser from 'phaser';
import Entity from './entity';

class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy2', 'CarrierShip');
    this.play('sprEnemy2');

    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}

export default CarrierShip;