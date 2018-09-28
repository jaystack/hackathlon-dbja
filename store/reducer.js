import {
  SPEAK_RESULT, CHANGE_GAME_PHASE, RESET, NEXT_GAME_PHASE, TAKE_BET_SUCCESS, CLEAR_BET, BOOK_RESULT, USER_CREATED
} from './actions';

export const initialState = {
  gamePhase: 'welcome', // welcome | shuffle | takeBet | betTaken | result | gameOver
  lastSpeakResult: { text: null },
  userName: '',
  balance: 100,
  bet: null,
  check: null,
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
    case USER_CREATED: {
      debugger;
      return {
        ...state,
        userName: action.payload.userName
      };
    }
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
    case TAKE_BET_SUCCESS: {
      const { bet, check } = action.payload;
      return {
        ...state,
        bet,
        check,
      }
    }
    case BOOK_RESULT: {
      return {
        ...state,
        balance: state.balance - state.bet,
      }
    }
    case CLEAR_BET: {
      return {
        ...state,
        bet: null,
        check: null,
      }
    }
    default: return state;
  }
};
