import {
  SPEAK_RESULT, CHANGE_GAME_PHASE,
} from './actions';

export const initialState = {
  gamePhase: 'welcome',
  lastSpeakResult: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SPEAK_RESULT:
      return {
        ...state,
        lastSpeakResult: action.payload.SpeakResult
      };
    case CHANGE_GAME_PHASE:
      return {
        ...state,
        gamePhase: action.payload.phase
      };
    default: return state;
  }
};
