import Phaser from 'phaser';
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin';
import SceneMain from './scenes/SceneMain';
import SceneMainMenu from './scenes/SceneMainMenu';
import SceneGameOver from './scenes/SceneGameOver';

// eslint-disable-next-line no-unused-vars
let game;
const scenes = [];
const seedRand = Date.now();
scenes.push(SceneMainMenu);
scenes.push(SceneMain);
scenes.push(SceneGameOver);

window.onload = () => {
  const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: 480,
    height: 640,
    backgroundColor: 'black',
    pixelArt: true,
    dom: {
      createContainer: true,
    },
    seed: [seedRand],
    plugins: {
      global: [{
        key: 'rexInputTextPlugin',
        plugin: InputTextPlugin,
        start: true,
      }],
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false,
      },
    },
    scene: scenes,
  };
  game = new Phaser.Game(config);
};

window.global = {
  signature: 'Made with Love by Abubakar Diallo',
  score: 0,
  emitter: null,
};
