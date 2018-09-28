import {
  COUNTER_INCREASE,
  COUNTER_DECREASE,
} from './actions';

export const initialState = {
  counter: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTER_INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case COUNTER_DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default: return state;
  }
};
