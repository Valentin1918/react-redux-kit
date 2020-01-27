import { getMessage } from '../store/reducers/common';
import AC from './index';

export const asyncAction = ({ suffix = '' }) => (dispatch, getState) => {
  const state = getState();
  const message = getMessage(state);
  dispatch(AC.setCommonObj({ message: `${message}${suffix ? `+${suffix}` : ''}` }));
};
