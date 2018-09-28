import {
  SPEAK_RESULT, CHANGE_GAME_PHASE, RESET, NEXT_GAME_PHASE
} from './actions';

export const initialState = {
  gamePhase: 'welcome', // welcome | shuffle | takeBet | betTaken | result | gameOver
  lastSpeakResult: { text: null },
  balance: 100,
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
    case NEXT_GAME_PHASE: {
      let gamePhase;
      switch (state.gamePhase) {
        case 'welcome': gamePhase = 'shuffle'; break;
        case 'shuffle': gamePhase = 'takeBet'; break;
        case 'takeBet': gamePhase = 'betTaken'; break;
        case 'betTaken': gamePhase = 'result'; break;
        case 'result': gamePhase = state.balance <= 0 ? 'gameOver' : 'shuffle'; break;
        case 'gameOver': gamePhase = 'welcome'; break;
      }
      return {
        ...state,
        gamePhase
      }
    }
    default: return state;
  }
};
