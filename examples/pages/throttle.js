import React, {Component} from 'react';
import LazyLoad from '../../src/';
import Widget from '../components/Widget';
import Operation from '../components/Operation';
import {uniqueId} from '../utils';

export default class Throttle extends Component {
  constructor() {
    super();

    const id = uniqueId();
    this.state = {
      arr: Array(20).fill(0).map((a, index) => {
        return {
          uniqueId: id,
          once: [6, 7].indexOf(index) > -1
        };
      })
    };
  }

  handleClick() {
    const id = uniqueId();

    this.setState({
      arr: this.state.arr.map(el => {
        return {
          ...el,
          uniqueId: id
        };
      })
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Operation type="throttle" onClickUpdate={::this.handleClick} />
        <div className="widget-list">
          {this.state.arr.map((el, index) => {
            return (
              <LazyLoad once={el.once} key={index} throttle={100}>
                <Widget once={el.once} id={el.uniqueId} />
              </LazyLoad>
            );
          })}
        </div>
      </div>
    );
  }
}

