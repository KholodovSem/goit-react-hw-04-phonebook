import React, {Component} from 'react';
import style from './Filter.module.css';

class Filter extends  Component {



  render() {
    return (
      <div>
        <p className={style.text}>Find contacts by name</p>
        <input
          className={style.input}
          onChange={this.props.onHandleChange}
          type='text'
          value={this.props.filter}
          name="filter"
        />
      </div>
    )
  }
}

export default Filter;
