export const CHANGE_GAME_PHASE = 'CHANGE_GAME_PHASE';
export const changeGamePhase = (phase) => ({
  type: CHANGE_GAME_PHASE,
  payload: { phase }
});

export const NEXT_GAME_PHASE = 'NEXT_GAME_PHASE';
export const nextGamePhase = (phase) => ({
  type: NEXT_GAME_PHASE,
});

export const TAKE_BET = 'TAKE_BET';
export const takeBet = (bet, check) => ({
  type: TAKE_BET,
  payload: { bet, check },
});

export const CLEAR_BET = 'CLEAR_BET';
export const clearBet = () => ({
  type: CLEAR_BET,
});

export const BOOK_RESULT = 'BOOK_RESULT';
export const bookResult = () => ({
  type: BOOK_RESULT,
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

export const LET_SPEAK = 'LET_SPEAK';
export const letSpeak = (letSpeak) => ({
  type: LET_SPEAK,
  payload: { letSpeak }
});

export const USER_CREATED = 'USER_CREATED';
export const userCreated = (user) => ({
  type: USER_CREATED,
  payload: { user }
});

export const SET_RESULT = 'SET_RESULT';
export const setResult = (result) => ({
  type: SET_RESULT,
  payload: { result }
});
