import { createSelector } from 'reselect';
import { createReducer, singleHandler } from '../../utils/redux-utils';
import * as AT from '../../actions/types';

const initialState = () => ({
  message: 'trololo',
});

export default createReducer(initialState(), {
  [AT.UPDATE_COMMON]: singleHandler
});

export const domain = _ => _.common;
export const getMessage = createSelector(domain, _ => _.message);
