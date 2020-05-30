import Enemy from './Enemy';

class CarrierShip extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'carriership', 'CarrierShip');
    if (this.x < this.displayWidth) {
      this.x = this.displayWidth;
    } else if (this.x > (window.global.width - this.displayWidth)) {
      this.x = window.global.width - this.displayWidth;
    }
    this.play('carriership');
    this.body.setSize(this.displayWidth * 0.7, this.displayHeight * 0.8, true);
  }
}

export default CarrierShip;
