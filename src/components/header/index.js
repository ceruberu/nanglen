import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './header.css';

@connect(state => ({ user: state.user }))
export default class Header extends Component {
  constructor(props) {
    super(props);
    console.log('PROPS', props);
  }
  render() {
    return (
        <div className={css.header}>
            <p> Nanglen </p>
            <div className={css.searchBar} />
            <div className={css.userInfo} >
                Duck Yeon Kim
            </div>
        </div>
    );
  }
}
