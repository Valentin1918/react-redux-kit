import React from 'react';
import { render } from 'react-dom';
import createApp from '../src';

const app = document.getElementById('root');
const Application = createApp();

render(<Application />, app);

if (process.env.NODE_ENV === 'development') module.hot.accept();
