import * as AT from './types';

export default Object.assign({}, {
  setCommonObj: obj => (
    { type: AT.UPDATE_COMMON, payload: { ...obj } }
  ),
});
