import Phaser from 'phaser';
import STYLE from '../styles/style';
import LeaderBoard from '../component/LeaderBoard';

class SceneGameOver extends Phaser.Scene {
  constructor() {
    super('SceneGameOver');
  }

  init() {
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

    // this.leaderTitle = this.add.text(window.global.width * 0.5, 130, 'Leader Board', {
    //   fontFamily: 'monospace',
    //   fontSize: STYLE.fonts.big,
    //   fontStyle: 'bold',
    //   color: STYLE.colors.gold,
    //   align: 'center',
    // });
    // this.leaderTitle.setOrigin(0.5);

    // this.leaderTable = this.add.text(120, 170, 'RANK  SCORE   NAME', {
    //   fontSize: STYLE.fonts.normal,
    //   fontStyle: 'bold',
    //   align: 'center',
    // });
    // this.leaderTable.setOrigin(0.5);

    // this.add.text(150, 200, 'RANK  SCORE   NAME');

    // this.scoreLabel = this.add.text(window.global.width * 0.5, 188, 'SCORE: 99', {
    //   fontFamily: 'monospace',
    //   fontSize: STYLE.fonts.big,
    //   fontStyle: 'bold',
    //   color: STYLE.colors.white,
    //   align: 'center',
    // });
    // this.scoreLabel.setOrigin(0.5);
    // this.scoreLabel.setText('SCORE: ' + this.getScore());

    // this.highscoreLabel = this.add.text(window.global.width * 0.5, 128, "YOUR HIGHSCORE: 99", {
    //   fontFamily: 'monospace',
    //   fontSize: STYLE.fonts.normal,
    //   fontStyle: 'bold',
    //   color: STYLE.colors.white,
    //   align: 'center'
    // });
    // this.highscoreLabel.setOrigin(0.5);
    // let highscoreText = "YOUR HIGHSCORE: " + this.dbLocal.getData('localScore');
    // if (this.isHighscore){
    //   highscoreText = highscoreText + " (NEW)";
    // }
    // this.highscoreLabel.setText(highscoreText);

    this.dbLocal.getLeaderBoard().then(({ result }) => {
      result.sort((a, b) => b.score - a.score)
        .filter((game, i) => i < 5)
        .map((game, i) => {
          const text = `Player: ${game.user} | Score: ${game.score}`;
          this.add.text(270, (90 * (i + 1)), text).setOrigin(0.5);
          return text;
        });

      // result.forEach(({ user, score }) => {
      //   const text = `Player: ${user} | Score: ${score}`;
      //   this.add.text(200, 160, text).setOrigin(0.5, 0.5);
      // });
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

  // eslint-disable-next-line class-methods-use-this
  getScore() {
    return window.global.score;
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
