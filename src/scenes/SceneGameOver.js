import Phaser from 'phaser';
import STYLE from '../styles/style';
import LeaderBoard from '../component/LeaderBoard';

class SceneGameOver extends Phaser.Scene {
  constructor() {
    super('SceneGameOver');
  }

  init() {
    window.global.width = this.game.config.width;
    this.dbLocal = new LeaderBoard();
  }

  create() {
    this.title = this.add.text(window.global.width * 0.5, 64, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: STYLE.fonts.title,
      fontStyle: 'bold',
      color: STYLE.colors.white,
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.highscoreLabel = this.add.text(window.global.width * 0.5, 128, `${window.global.userName.toUpperCase()} SCORE: ${window.global.score}`, {
      fontFamily: 'monospace',
      fontSize: STYLE.fonts.normal,
      fontStyle: 'bold',
      color: STYLE.colors.white,
      align: 'center',
    }).setOrigin(0.5);

    this.dbLocal.postToLeaderBoard(window.global.userName, window.global.score);

    this.dbLocal.getLeaderBoard().then(({ result }) => {
      result.sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((game, i) => {
          const text = `Player: ${game.user.toUpperCase()} | Score: ${game.score}`;
          this.add.text(window.global.width * 0.5, (93 * (i + 1.1)), text).setOrigin(0.5);
          return text;
        });
    });

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };
    this.btnRestart = this.add.sprite(
      window.global.width / 2,
      (window.global.height - 128),
      'sprBtnRestart',
    );
    this.btnRestart.setInteractive();
    this.btnRestart.on('pointerover', this.onHover.bind(this));
    this.btnRestart.on('pointerout', this.onOut.bind(this));
    this.btnRestart.on('pointerdown', this.onClick.bind(this));
    this.btnRestart.on('pointerup', () => {
      this.btnRestart.setTexture('sprBtnRestartHover');
    });
  }

  onClick() {
    this.btnRestart.setTexture('sprBtnRestartDown');
    this.sfx.btnDown.play();
    this.scene.start('SceneMain');
  }

  onOut() {
    this.btnRestart.setTexture('sprBtnRestart');
  }

  onHover() {
    this.btnRestart.setTexture('sprBtnRestartHover');
    this.sfx.btnOver.play();
  }
}

export default SceneGameOver;
