export const COUNTER_INCREASE = 'COUNTER_INCREASE';
export const counterIncrease = () => ({
  type: COUNTER_INCREASE,
});

export const COUNTER_DECREASE = 'COUNTER_DECREASE';
export const counterDecrease = () => ({
  type: COUNTER_DECREASE,
});

export const counterSteps = () => dispatch => (
  new Promise((resolve) => {
    let steps = 0;
    const ms = process.env.NODE_ENV === 'test' ? 0 : 50;
    const interval = setInterval(() => {
      if (steps++ >= 10) {
        clearInterval(interval);
        resolve();
      } else {
        dispatch(counterIncrease());
      }
    }, ms);
  })
);
