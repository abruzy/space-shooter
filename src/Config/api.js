export default {
  config: {
    headers: {
      json: {
        'Content-Type': 'application/json',
      },
    },
    body: {
      user: '',
      score: 0,
      set userName(user) {
        this.user = user;
      },
      set userScore(score) {
        this.score = score;
      },
    },
    id: 'e2DIvMqGk9vJA1MU7QhY',
    url: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/e2DIvMqGk9vJA1MU7QhY/scores',
  },
};