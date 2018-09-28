
// export const counterSteps = () => dispatch => (
//   new Promise((resolve) => {
//     let steps = 0;
//     const ms = process.env.NODE_ENV === 'test' ? 0 : 50;
//     const interval = setInterval(() => {
//       if (steps++ >= 10) {
//         clearInterval(interval);
//         resolve();
//       } else {
//         dispatch(counterIncrease());
//       }
//     }, ms);
//   })
// );

export const CHANGE_GAME_PHASE = 'CHANGE_GAME_PHASE';
export const changeGamePhase = (phase) => ({
  type: CHANGE_GAME_PHASE,
  payload: { phase }
});

export const NEXT_GAME_PHASE = 'NEXT_GAME_PHASE';
export const nextGamePhase = (phase) => ({
  type: NEXT_GAME_PHASE,
});

export const RESET = 'RESET';
export const reset = () => ({
  type: RESET,
});

export const SPEAK_RESULT = 'SPEAK_RESULT';
export const speakResult = (speakResult) => ({
  type: SPEAK_RESULT,
  payload: { speakResult }
});

export const USER_CREATED = 'USER_CREATED';
export const userCreated = (userName) => ({
  type: USER_CREATED,
  payload: { userName }
});