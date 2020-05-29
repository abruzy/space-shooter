import Phaser from 'phaser';
import STYLE from '../styles/style';
import ScrollingBackground from '../component/ScrollingBackground';

class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneMainMenu',
    });
  }

  init() {
    window.global.width = this.game.config.width;
    window.global.height = this.game.config.height;
    window.emitter = new Phaser.Events.EventEmitter();
  }

  preload() {
    this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);

    const assetText = this.make.text({
      x: window.global.width / 2,
      y: (window.global.height / 2 - 70),
      text: '',
      style: {
        font: '18px monospace',
        fill: STYLE.colors.white,
      },
    })
      .setOrigin(0.5);
    const loadingText = this.make.text({
      x: assetText.x,
      y: assetText.y + 32,
      text: '',
      style: {
        font: '18px monospace',
        fill: STYLE.colors.white,
      },
    })
      .setOrigin(0.5);
    this.load.on('progress', value => {
      // eslint-disable-next-line radix
      loadingText.setText(`${parseInt(value * 100)} %`);
    });
    this.load.on('fileprogress', file => {
      assetText.setText(`Loading asset: ${file.key}`);
    });
    this.load.on('complete', () => {
      assetText.destroy();
      loadingText.destroy();
    });

    this.load.image('sprBtnPlay', 'assets/sprBtnPlay.png');
    this.load.image('sprBtnPlayHover', 'assets/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', 'assets/sprBtnPlayDown.png');
    this.load.image('sprBtnRestart', 'assets/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', 'assets/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', 'assets/sprBtnRestartDown.png');
    this.load.image('sprBg0', 'assets/sprBg0.png');
    this.load.image('sprBg1', 'assets/sprBg1.png');

    this.load.audio('sndBtnOver', 'assets/audio/sndBtnOver.wav');
    this.load.audio('sndBtnDown', 'assets/audio/sndBtnDown.wav');

    this.load.audio('sndExplode0', 'assets/audio/sndExplode0.wav');
    this.load.audio('sndExplode1', 'assets/audio/sndExplode1.wav');
    this.load.audio('sndLaser', 'assets/audio/sndLaser.wav');
    this.load.audio('sndLaser0', ['assets/audio/sndLaser0.mp3', 'assets/audio/sndLaser0.ogg']);

    this.load.audio('bgm', ['assets/audio/bgm_bit.mp3', 'assets/audio/bgm_bit.ogg']);
  }

  create() {
    this.add.text(2, this.game.config.height - 2,
      `Play Control\nMove: [A (Left), D (Right), W (Up), S (Down)]\nShoot: [Space]\n${window.global.signature}`)
      .setOrigin(0, 1);

    if (window.global.bgmInstance === undefined) {
      this.bgm = this.sound.add('bgm', { loop: true, volume: 0.5 });
      this.bgm.play();
      window.global.bgmInstance = this.bgm;
    }

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };
    this.btnPlay = this.add.sprite(
      window.global.width / 2,
      (window.global.height / 2) + 100,
      'sprBtnPlay',
    );
    this.btnPlay.setInteractive();
    this.btnPlay.on('pointerover', this.onHover.bind(this));
    this.btnPlay.on('pointerout', this.onOut.bind(this));
    this.btnPlay.on('pointerdown', this.onClick.bind(this));
    this.btnPlay.on('pointerup', () => {
      this.btnPlay.setTexture('sprBtnPlayHover');
    });
    this.title = this.add.text(window.global.width * 0.5, 128, 'SPACESHOOTER', {
      fontFamily: 'monospace',
      fontSize: STYLE.fonts.title,
      fontStyle: 'bold',
      color: STYLE.colors.white,
      align: 'center',
    });
    this.title.setOrigin(0.5);

    const printText = this.add.text(240, 240, '', {
      fontSize: '12px',
      fixedWidth: 100,
      fixedHeight: 100,
    }).setOrigin(0.5);
    const inputText = this.add.rexInputText(240, 260, 200, 30, {
      type: 'text',
      placeholder: 'Enter player name',
      fontSize: STYLE.fonts.small,
      color: STYLE.colors.white,
      borderBottom: `3px solid ${STYLE.colors.gold}`,
    })
      .setOrigin(0.5)
      .on('textchange', () => {
        printText.text = inputText.text;
      });

    printText.text = inputText.text;

    this.submitButton = this.add.text(240, 300, 'Submit Name').setInteractive().setOrigin(0.5);
    this.submitButton.on('pointerdown', () => {
      if (printText.text.length > 0) {
        window.global.userName = printText.text;
        // this.game.config.curUser.userName = printText.text;
        this.submitButton.destroy();
      }
    });

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  onClick() {
    this.btnPlay.setTexture('sprBtnPlayDown');
    this.sfx.btnDown.play();
    this.time.addEvent({
      delay: 90,
      callback: () => {
        this.scene.start('SceneMain');
      },
      loop: false,
    });
  }

  onOut() {
    this.btnPlay.setTexture('sprBtnPlay');
  }

  onHover() {
    this.btnPlay.setTexture('sprBtnPlayHover');
    this.sfx.btnOver.play();
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}

export default SceneMainMenu;
