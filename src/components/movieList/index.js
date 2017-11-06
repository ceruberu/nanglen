import React from 'react';
import { graphql } from 'react-apollo';
import allMovies from 'src/graphql/queries/all_movies.gql';
import css from './movieList.css';
import { Link } from 'react-router-dom';

@graphql(allMovies)
export default class graphqlMovieList extends React.PureComponent {
  render() {
    const { data, history } = this.props;
    const { getMovies } = data;
    console.log(getMovies);
    // Since we're dealing with async GraphQL data, we defend against the
    // data not yet being loaded by checking to see that we have the `message`
    // key on our returned object

    // Apollo will tell us whether we're still loading.  We can also use this
    // check to ensure we have a fully returned response
    return data.loading
      ? <div />
      : getMovies.map(movie => (
          <div key={movie.id} className={css.movie}>
              <Link to={`/movie/${movie.Title.replace(/\s/g, '_')}`}>
                  <img
                    src={`${movie.id}.jpg`}
                    alt={movie.Title}
                    className={css.moviePoster} />
              </Link>
              <div className={css.movieInfo}>
                  <div className={css.movieTitle}>
                      <Link to={`/movie/${movie.Title.replace(/\s/g, '_')}`}>
                          {movie.Title}
                      </Link>
                  </div>
                  <div className={css.movieGenre}>
                      {movie.Genre.join(', ')}
                  </div>
                  <div className={css.movieLength}>
                      {movie.Length} mins
                  </div>
                  <div className={css.movieDirector}>
                      {movie.Director}
                  </div>
                  <div className={css.movieActors}>
                      {movie.Actors.join(',  ')}
                  </div>
                  <div className={css.movieReview}>
                REview
                  </div>
              </div>
          </div>
      ));
  }
}
