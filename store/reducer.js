import {
  SPEAK_RESULT, CHANGE_GAME_PHASE, RESET
} from './actions';

export const initialState = {
  gamePhase: 'welcome', // welcome | takeBet | shuffle | result | gameOver
  lastSpeakResult: { text: null },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SPEAK_RESULT:
      return {
        ...state,
        lastSpeakResult: action.payload.speakResult
      };
    case CHANGE_GAME_PHASE:
      return {
        ...state,
        gamePhase: action.payload.phase
      };
    case RESET: 
      return initialState;
    default: return state;
  }
};
