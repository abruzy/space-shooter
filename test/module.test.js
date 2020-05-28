import LeaderBoard from '../src/component/LeaderBoard';

describe('test', () => {
  it('It Should return "Hello World!"', () => {
    const test = 'Hello World!';
    expect(test).toBe('Hello World!');
  });
});

it('expects API Key to be present', () => {
  const leaderboard = new LeaderBoard();
  const { Id } = leaderboard;
  expect(Id).toBe('e2DIvMqGk9vJA1MU7QhY');
});

describe('test api', () => {
  it('get data from the api', () => {
    const leaderboard = new LeaderBoard();
    const { getLeaderBoard } = leaderboard;
    leaderboard.getLeaderBoard().then(data => {
      expect(data).toBe(10);
    });
  });
});
