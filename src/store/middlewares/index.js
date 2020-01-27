import thunk from 'redux-thunk';

const createMiddlewares = () => {
  const mids = [thunk];
  if (process.env.NODE_ENV === 'development') {
    mids.push(
      require('redux-logger').default
    );
  }
  return mids;
};

export default createMiddlewares;
