
// const movies = db.collection;

// Schema for sample GraphQL server.

// ----------------------
// IMPORTS

// import connectMongo from 'src/mongoConnector';

// GraphQL schema library, for building our GraphQL schema
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';

// ----------------------

// GraphQL can handle Promises from its `resolve()` calls, so we'll create a
// simple async function that returns a simple message.  In practice, `resolve()`
// will generally pull from a 'real' data source such as a database

async function getMovies(ctx) {
  console.log(ctx," CTX ");
  const movies = ctx.db.collection('movies').find({ LastOnAir: '20171104' });
  return movies.toArray();
}

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'Define a single movie',
  fields() {
    return {
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

    };
  },
});

// Root query.  This is our 'public API'.
const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields() {
    return {
      message: {
        type: Message,
        resolve() {
          return getMessage();
        },
      },
      getMovies: {
        type: new GraphQLList(MovieType),
        resolve: async (root, args, ctx) => getMovies(ctx),
      },
      // movie: {
      //   type: MovieType,
      //   resolve: async 
      // }
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
