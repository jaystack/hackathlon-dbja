import {
  SPEAK_RESULT, CHANGE_GAME_PHASE, RESET, NEXT_GAME_PHASE, TAKE_BET, CLEAR_BET, BOOK_RESULT, USER_CREATED, LET_SPEAK, SET_RESULT
} from './actions';

export const initialState = {
  gamePhase: 'shuffle', // welcome | shuffle | takeBet | betTaken | result | gameOver
  lastSpeakResult: { text: null },
  userName: '',
  balance: 0,
  bet: null,
  check: null,
  letSpeak: false,
  result: null,
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
      return {
        ...state,
        userName: action.payload.user.name,
        balance: action.payload.user.coin
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
    case TAKE_BET: {
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
        balance: state.check === state.result ? state.balance + state.bet : state.balance - state.bet,
      }
    }
    case CLEAR_BET: {
      return {
        ...state,
        bet: null,
        check: null,
        result: null,
      }
    }
    case LET_SPEAK: {
      return {
        ...state,
        letSpeak: action.payload.letSpeak,
      }
    }
    case SET_RESULT: {
      return {
        ...state,
        result: action.payload.result,
      }
    }
    default: return state;
  }
};
