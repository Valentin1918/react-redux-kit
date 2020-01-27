import React from 'react';
import { Provider } from 'react-redux';
import configStore from './store';
import App from './container/index';
import reducers from './store/reducers';
import createMids from './store/middlewares';

let Container = null;

const createApp = () => {
  if (Container) return Container;
  const store = configStore(reducers, createMids());
  Container = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
  return Container;
};

export default createApp;
