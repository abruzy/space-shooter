/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import STYLE from '../styles/style';
import Player from '../component/Player';
import ChaserShip from '../component/ChaserShip';
import GunShip from '../component/GunShip';
import CarrierShip from '../component/CarrierShip';
import ScrollingBackground from '../component/ScrollingBackground';

class SceneMain extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneMain',
    });
  }

  preload() {
    this.load.spritesheet('rplrocket', 'assets/rplrocket.png', {
      frameWidth: 35,
      frameHeight: 56,
    });
    this.load.spritesheet('gunship', 'assets/gunship.png', {
      frameWidth: 39,
      frameHeight: 33,
    });
    this.load.spritesheet('carriership', 'assets/carriership.png', {
      frameWidth: 40,
      frameHeight: 50,
    });
    this.load.spritesheet('gunship2', 'assets/gunship2.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('sprExplosion', 'assets/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprEnemy0', 'assets/sprEnemy0.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprEnemy1', 'assets/sprEnemy1.png');
    this.load.spritesheet('sprEnemy2', 'assets/sprEnemy2.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprLaserEnemy0', 'assets/sprLaserEnemy0.png');
    this.load.image('sprLaserPlayer', 'assets/sprLaserPlayer.png');
    this.load.image('sprLaserENew', 'assets/sprLaserEnemyn.png');
    this.load.image('sprLaserPNew', 'assets/sprLaserPlayern.png');
    this.load.spritesheet('sprPlayer', 'assets/sprPlayer.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    this.anims.create({
      key: 'rplrocket',
      frames: this.anims.generateFrameNumbers('rplrocket'),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: 'gunship',
      frames: this.anims.generateFrameNumbers('gunship'),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: 'carriership',
      frames: this.anims.generateFrameNumbers('carriership'),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: 'gunship2',
      frames: this.anims.generateFrameNumbers('gunship2'),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: [
        this.sound.add('sndLaser', { volume: 0.5 }),
        this.sound.add('sndLaser0', { volume: 0.5 }),
      ],
    };

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }

    this.player = new Player(
      this,
      window.global.width / 2,
      window.global.height - 64,
      'rplrocket',
    );
    this.player.play('rplrocket', true);
    this.player.body.setSize(
      this.player.displayWidth * 0.5,
      this.player.displayHeight * 0.8,
    );

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();


    this.physics.add.collider(this.playerLasers, this.enemies, (pLaser, enemy) => {
      if (enemy) {
        pLaser.destroy();
        if (this.isEnemyType(enemy, 'ChaserShip') || this.isEnemyType(enemy, 'CarrierShip')) {
          enemy.damaged();
        } else {
          this.scoreAdd();
          enemy.explode(true);
        }
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.isDead() && !enemy.isDead()) {
        player.onDestroy();
        player.explode(false);
        player.setData('isDead', true);
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, eLaser) => {
      if (!player.isDead()) {
        player.onDestroy();
        player.explode(false);
        eLaser.destroy();
      }
    });

    this.time.addEvent({
      delay: Phaser.Math.RND.between(800, 1000),
      callback: this.createEnemy.bind(this),
      loop: true,
    });

    this.scoreText = this.add.text(16, 16, '0', {
      fontFamily: 'monospace',
      fontSize: STYLE.fonts.big,
      fontStyle: 'bold',
      color: STYLE.colors.white,
      align: 'left',
      stroke: STYLE.colors.purple,
      strokeThickness: 2,
    });
    this.scoreText.setDepth(10);
    this.scoreReset();
  }

  createEnemy() {
    let enemy = null;
    let randomPosX = Phaser.Math.RND.between(0, window.global.height);
    const threshold = (this.getEnemiesByPosX(380).length >= 3);
    if (threshold) {
      randomPosX = Phaser.Math.RND.between(10, window.global.height * 0.5);
    }
    if (Phaser.Math.RND.between(0, 10) >= 3) {
      enemy = new GunShip(
        this,
        randomPosX,
        0,
      );
    } else if (Phaser.Math.RND.between(0, 10) >= 5) {
      if (this.getEnemiesByType('ChaserShip').length < 5) {
        enemy = new ChaserShip(
          this,
          randomPosX,
          0,
        );
        enemy.setHP(2);
        enemy.body.setImmovable();
      }
    } else {
      enemy = new CarrierShip(
        this,
        randomPosX,
        0,
      );
      enemy.setHP(3);
      enemy.setSpeed(Phaser.Math.RND.between(100, 180));
      enemy.body.setImmovable();
    }
    if (enemy !== null) {
      const isChoosen = this.isEnemyType(enemy, 'ChaserShip');
      const scaleRand = isChoosen ? Phaser.Math.RND.between(10, 20) * 0.1 : 1;
      enemy.setScale(scaleRand);
      this.enemies.add(enemy);
    }
  }

  getEnemiesByPosX(posX) {
    const pickedEnemies = [];
    this.enemies.children.iterate(enemy => {
      if (enemy.x > posX) {
        pickedEnemies.push(enemy);
      }
    });
    return pickedEnemies;
  }

  getEnemiesByType(type) {
    const enemiesWithType = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (this.isEnemyType(enemy, type)) {
        enemiesWithType.push(enemy);
      }
    }
    return enemiesWithType;
  }

  isEnemyType(enemy, type) {
    let isType = false;
    if (enemy.getData('type') === type) {
      isType = true;
    }
    return isType;
  }

  scoreAdd(value = 1){
    window.global.score += value;
    this.scoreText.setText(window.global.score);
    this.tweens.add({
      targets: this.scoreText,
      scaleX: 1.3,
      scaleY: 1.3,
      yoyo: true,
      duration: 60,
      repeat: 0,
      onComplete: () => {
        this.scoreText.scaleX = 1;
        this.scoreText.scaleY = this.scoreText.scaleX;
      }
    });
  }

  scoreReset() {
    window.global.score = 0;
    this.scoreText.setText(window.global.score);
  }

  update() {
    this.player.update();
    if (!this.player.isDead()) {
      if (this.keyA.isDown || this.cursors.left.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown || this.cursors.right.isDown) {
        this.player.moveRight();
      }
      if (this.keyW.isDown || this.cursors.up.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown || this.cursors.down.isDown) {
        this.player.moveDown();
      }
      if (this.keySpace.isDown && !this.player.isDead()) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      enemy.update();
      if (enemy.y < -enemy.displayHeight * 4
        || enemy.y > window.global.height + enemy.displayHeight) {
        this.enemies.remove(enemy);
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        } else {
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      if (laser.y > window.global.height) {
        this.enemyLasers.remove(laser);
        laser.destroy();
      }
    }

    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}

export default SceneMain;
