import React from 'react';
import { string } from 'prop-types';

const FunctionalComponent = ({ message }) => {
  return (
    <div className="message-container">
      {message}
    </div>
  );
};

FunctionalComponent.propTypes = {
  message: string,
};

export default FunctionalComponent;
