import axios from 'axios';
import api from '../config/api';

const saveData = (user = 'Anonymous', score = 0) => {
  const { url, body, headers } = api.config;
  api.config.body.userName = user;
  api.config.body.userScore = score;
  axios.post(url, body, headers)
    .then((response) => response)
    .catch((err) => new Error(err));
};

const getData = () => {
  const { url, headers } = api.config;
  axios.get(url, headers)
    .then((response) => response)
    .catch((err) => new Error(err));
};

export { saveData, getData };
