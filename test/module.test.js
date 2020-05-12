import { saveData, getData } from '../src/component/Leaderboard';

describe('test', () => {
  it('It Should return "Hello World!"', () => {
    const test = 'Hello World!';
    expect(test).toBe('Hello World!');
  });
});

// describe('test api', () => {
//   test('return success response for the post api', () => {
//     const user = 'test';
//     const score = 13;
//     const result = saveData(user, score);
//     expect(result).toEqual('undefined');
//   });

//   test('return success for get api', () => {
//     const result = getData();
//     expect(result).toBe('undefined');
//   });
// });
