// const movies = db.collection;

// Schema for sample GraphQL server.

// ----------------------
// IMPORTS
// import { ObjectId } from 'mongodb';
import getCurrentDate from 'src/helper/getCurrentDate';
// import connectMongo from 'src/mongoConnector';

// GraphQL schema library, for building our GraphQL schema
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLSchema,
} from 'graphql';

// ----------------------

// GraphQL can handle Promises from its `resolve()` calls, so we'll create a
// simple async function that returns a simple message.  In practice, `resolve()`
// will generally pull from a 'real' data source such as a database

async function getMovies(ctx) {
  const currentDate = getCurrentDate();
  const movies = ctx.movies.find({ LastOnAir: currentDate });
  return movies.toArray();
}

async function getMovie(args, ctx) {
  // if (args.id) {
  //   const movie = ctx.movies.findOne({ _id: new ObjectId(args.id) });
  //   return movie;
  // }
  const movie = ctx.movies.findOne({ Title: args.title.split('_').join(' ') });
  return movie;
}

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  description: 'Array of Reviews',
  fields() {
    return {
      Text: {
        type: GraphQLString,
        description: "Users' Review ",
        resolve: review => review.Text,
      },
    };
  },
});

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'Define a single movie',
  fields() {
    return {
      id: {
        type: GraphQLID,
        description: "Movie's Id",
        resolve: movie => movie._id,
      },
      Title: {
        type: GraphQLString,
        description: "Movie's Title",
        resolve: movie => movie.Title,
      },
      Year: {
        type: GraphQLString,
        description: "Movie's year",
        resolve: movie => movie.Year,
      },
      Synopsis: {
        type: GraphQLString,
        description: "Movie's Synopsis",
        resolve: movie => movie.Synopsis,
      },
      Genre: {
        type: new GraphQLList(GraphQLString),
        description: "Movie's Genre",
        resolve: movie => movie.Genre,
      },
      ReleaseDate: {
        type: GraphQLString,
        description: "Movie's Release Date",
        resolve: movie => movie.ReleaseDate,
      },
      PosterUrl: {
        type: GraphQLString,
        description: "Movie's Poster Url",
        resolve: movie => movie.PosterUrl,
      },
      Length: {
        type: GraphQLString,
        description: "Movie's Length",
        resolve: movie => movie.Length,
      },
      Actors: {
        type: new GraphQLList(GraphQLString),
        description: 'Actors in Movie',
        resolve: movie => movie.Actors,
      },
      Director: {
        type: GraphQLString,
        description: 'Director of Movie',
        resolve: movie => movie.Director,
      },
      Reviews: {
        type: new GraphQLList(ReviewType),
        description: 'User Reviews',
        resolve: movie => movie.Reviews,
      },
    };
  },
});

// Root query.  This is our 'public API'.
const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields() {
    return {
      getMovies: {
        type: new GraphQLList(MovieType),
        args: { genre: { type: GraphQLString } },
        resolve: async (root, args, ctx) => getMovies(ctx),
      },
      getMovie: {
        type: MovieType,
        args: { id: { type: GraphQLID }, title: { type: GraphQLString } },
        resolve: async (root, args, ctx) => getMovie(args, ctx),
      },
    };
  },
});

// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   description: 'Root mutation object',
//   fields() {
//     return {
//       review: {
//         type: Review,
//         resolve() {
//           return addReview();
//         }
//       }
//     }
//   }
// })

// The resulting schema.  We insert our 'root' `Query` object, to tell our
// GraphQL server what to respond to.  We could also add a root `mutation`
// if we want to pass mutation queries that have side-effects (e.g. like HTTP POST)
export default new GraphQLSchema({
  query: Query,
  // mutation: Mutation
});
