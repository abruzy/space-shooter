import LeaderBoard from '../src/component/LeaderBoard';

const expectedResponse = {
  result: [
    {
      user: 'user1',
      score: 100,
    },
  ],
};

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(expectedResponse),
}));

describe('test api', () => {
  test('expects API Key to be present', () => {
    const leaderboard = new LeaderBoard();
    const { Id } = leaderboard;
    expect(Id).toBe('e2DIvMqGk9vJA1MU7QhY');
  });

  test('get results from API', () => {
    expect.assertions(1);
    const leaderboard = new LeaderBoard();
    return leaderboard.getLeaderBoard()
      .then(data => expect(data).toEqual(expectedResponse));
  });
});
