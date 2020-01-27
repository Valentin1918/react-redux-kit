import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import FunctionalComponent from '../components/functionalComponent';
import { getMessage } from '../store/reducers/common';

import { asyncAction } from '../actions/async-action';
import AC from '../actions';

@connect(
  state => ({
    message: getMessage(state),
  }),
  {
    setCommonObj: AC.setCommonObj,
    asyncAction,
  }
)
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      someInnerState: '',
    };
  }

  static propTypes = {
    // state :
    message: string,
    // actions :
    setCommonObj: func,
    asyncAction: func,
  };

  componentDidMount() {
    // do something
  }

  componentWillUnmount() {
    // do something
  }

  refContainer = node => { this.container = node; };

  render() {
    const { message } = this.props;
    const { someInnerState } = this.state;
    return (
      <div ref={this.refContainer} className="container">
        <button onClick={() => this.props.asyncAction({ suffix: 'S' })}>
          Click Me Sss
        </button>
        <FunctionalComponent message={message} />
      </div>
    );
  }
}
