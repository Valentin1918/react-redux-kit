import { isFunc } from './index';

const callOrState = (handler, state, action) => (
  isFunc(handler) ? handler(state, action) : state
);

export const createReducer = (initialState, handlers) => (
  (state = initialState, action) => callOrState(handlers[action.type], state, action)
);

export const singleHandler = (state, action) => ({ ...state, ...action.payload });
