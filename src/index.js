import Phaser from 'phaser';
import SceneMain from './scenes/SceneMain';
import SceneMainMenu from './scenes/SceneMainMenu';
import SceneGameOver from './scenes/SceneGameOver';

// eslint-disable-next-line no-unused-vars
let game;
const scenes = [];
scenes.push(SceneMainMenu);
scenes.push(SceneMain);
scenes.push(SceneGameOver);

window.onload = () => {
  const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    backgroundColor: 'black',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          x: 0,
          y: 0,
        },
      },
    },
    scene: scenes,
    pixelArt: true,
    roundPixels: true,
  };
  game = new Phaser.Game(config);
};

window.global = {
  signature: 'Made with Love by Abubakar Diallo',
  score: 0,
  emitter: null,
};
