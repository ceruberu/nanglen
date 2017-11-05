import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './home.css';

import MovieList from '../movieList';
// const Home = props => (
// <div className={css.app}>
//     <div className={css.header}>
//         {console.log(props, 'PROPS')}
//     </div>
// </div>
// );

// export default Home;

@connect(state => ({ user: state.user }))
export default class Home extends Component {
  constructor(props) {
    super(props);
    console.log('PROPS', props);
  }
  render() {
    return (
        <div className={css.app}>
            <div className={css.content}>
                <MovieList />
            </div>
            <div className={css.footer}>
              FOOTER
            </div>
        </div>
    );
  }
}
