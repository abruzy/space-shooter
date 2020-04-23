/* eslint-disable no-console */
class LocalDatabase {
  constructor() {
    this.getData('localScore', true);
  }

  setHighscore() {
    let newHighscore = false;
    if (this.getData('localScore')) {
      const currScore = window.global.score;
      if (currScore > this.getData('localScore')) {
        this.saveData('localScore', currScore);
        console.log('New Highscore!');
        newHighscore = true;
      }
    }
    return newHighscore;
  }

  saveData(key, value) {
    localStorage.setItem(key, value);
    if (this.getData(key)) {
      console.log(`Data ${key} saved`);
    } else {
      console.log(`Data ${key} not saved!`);
    }
  }

  getData(key, init = false) {
    let data = localStorage.getItem(key);
    if (data === null) {
      data = window.global.score;
      console.log(`Not found: ${key}`);
      if (init) {
        this.saveData('localScore', data);
      }
    }
    return data;
  }

  deleteData(key) {
    const data = this.getData(key);
    if (data) {
      localStorage.removeItem(key);
      console.log(`Data ${key} deleted!`);
    } else {
      console.log(`Data ${key} not deleted!`);
    }
  }
}

export default LocalDatabase;
