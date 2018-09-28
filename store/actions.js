
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
export const chamgeGamePhase = (phase) => ({
  type: CHANGE_GAME_PHASE,
  payload: { phase }
});

export const SPEAK_RESULT = 'SPEAK_RESULT';
export const speakResult = (speakResult) => ({
  type: SPEAK_RESULT,
  payload: { speakResult }
});