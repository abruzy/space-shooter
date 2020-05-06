import axios from 'axios';
import api from '../config/api';

class LeaderBoardApi {
  constructor() {
    this.getData('localScore', true);
  }

  saveData(user, score) {
    this.user = 'anonymous';
    this.score = 0;
    const { url, body, headers } = api.config;
    api.config.body.userScore = score;
    api.config.body.userName = user;
    axios.post(url, body, headers)
      .then((response) => response)
      .catch((err) => new Error(err));
  }

  // getData() {
  //   const { url, body, headers } = api.config;
  //   api.config.body.userScore = score;
  //   api.config.body.userName = user;
  //   axios.get(url, body, headers)
  //     .then((response) => response)
  //     .catch((err) => new Error(err));
  // }
}

export default LeaderBoardApi;
