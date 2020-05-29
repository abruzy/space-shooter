import LeaderBoard from '../src/component/LeaderBoard';

describe('test', () => {
  it('It Should return "Hello World!"', () => {
    const test = 'Hello World!';
    expect(test).toBe('Hello World!');
  });
});

test('expects API Key to be present', () => {
  const leaderboard = new LeaderBoard();
  const { Id } = leaderboard;
  expect(Id).toBe('e2DIvMqGk9vJA1MU7QhY');
});

const expectedResponse = {
  result: [
    {
      user: 'user1',
      score: 100,
    },
  ],
};

describe('test api', () => {
  test('get results from API', () => {
    expect.assertions(1);
    const leaderboard = new LeaderBoard();
    return leaderboard.getLeaderBoard()
      .then(data => expect(data).toEqual(expectedResponse));
  });
});
