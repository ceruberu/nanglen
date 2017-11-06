import React from 'react';
import { graphql } from 'react-apollo';
import oneMovie from 'src/graphql/queries/one_movie.gql';
import css from './movie.css';

@graphql(oneMovie, {
  options: props => ({
    variables: {
      title: props.match.params.moviename,
    },
  }),
})
export default class graphqlMovie extends React.PureComponent {
  render() {
    console.log(this.props);
    const { data } = this.props;
    const { getMovie } = data;
    // Since we're dealing with async GraphQL data, we defend against the
    // data not yet being loaded by checking to see that we have the `message`
    // key on our returned object

    // Apollo will tell us whether we're still loading.  We can also use this
    // check to ensure we have a fully returned response
    return data.loading ? <div /> : <div />;
  }
}
