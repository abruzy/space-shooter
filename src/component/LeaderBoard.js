class LeaderBoard {
  constructor() {
    this.Id = 'e2DIvMqGk9vJA1MU7QhY';
  }

  getLeaderBoard() {
    return fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.Id}/scores/`)
      .then(response => response.json())
      .catch((err) => new Error(err));
  }

  postToLeaderBoard(user, score) {
    return fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.Id}/scores/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ user, score }),
    }).then(response => response.json()).catch((err) => new Error(err));
  }
}

export default LeaderBoard;
