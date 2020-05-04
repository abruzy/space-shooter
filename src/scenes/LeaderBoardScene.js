import Phaser from 'phaser';
import axios from 'axios';
import api from '../Config/api';
import postToLeaderboard from '../Utils/api';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
    this.user = 'anon';
    this.score = 0;
    this.text = [];
  }

  init(data) {
    this.user = data.user;
    this.score = data.score;
  }

  postUserStats() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = {
      name: this.name,
      score: this.score,
    };

    axios.post(
      api.config.url,
      body,
      config,
    )
      .then((res) => res)
      .catch((err) => new Error(err));
  }

  displayLeaderboard(info) {
    info.sort((a, b) => b.score - a.score)
      .filter((game, i) => i < 5)
      .map((game, i) => {
        const text = `Player: ${game.user} | Score: ${game.score}`;
        this.text.push(text);
        this.add.text(400, (60 * (i + 1)), text).setOrigin(0.5);
        return text;
      });
  }

  getLeaderboard() {
    axios.get(api.config.url)
      .then((info) => {
        const { result } = info.data;
        this.displayLeaderboard(result);
      })
      .catch((err) => new Error(err));
  }

  create() {
    const data = { user: this.user, score: this.score };
    this.leaderboard = this.add.text(50, 60, 'Leader Board');
    this.userNameText = this.add.text(50, 120, `Name: ${this.user}`);
    this.userScoreText = this.add.text(50, 180, `Current Score: ${this.score}`);
    this.submitScore = this.add.text(50, 300, 'Submit Score').setInteractive();
    this.getLeaderboard();
    this.submitScore.on('pointerdown', () => {
      this.loading = true;
      postToLeaderboard(this.user, this.score);
      this.scene.restart();
    });
  }
}