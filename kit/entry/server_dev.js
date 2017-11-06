/* eslint-disable no-console */

// Production server entry point.  Spawns the server on default HOST:PORT

// ----------------------
// IMPORT
import getCurrentDate from 'src/helper/getCurrentDate';
import download from 'image-downloader';
/* NPM */

// Chalk terminal library
import chalk from 'chalk';

/* Local */

// Import console messages
import { logServerStarted } from 'kit/lib/console';

// Extend the server base
import mongoConnect from 'src/mongoConnector';
import server, { createReactHandler, staticMiddleware } from './server';

// ----------------------

// Get manifest values
const css = 'assets/css/style.css';
const scripts = ['vendor.js', 'browser.js'];

// Spawn the development server.
// Runs inside an immediate `async` block, to await listening on ports
(async () => {
  const { app, router, listen } = server;
  const db = await mongoConnect();
  const movies = db.collection('movies');
  // Create proxy to tunnel requests to the browser `webpack-dev-server`
  router.get('/*', createReactHandler(css, scripts));

  app.context.db = db;
  app.context.movies = movies;

  const currentDate = getCurrentDate();
  const currentMovies = await db.collection('movies').find({ LastOnAir: currentDate }).toArray();
  const moviesPromises = currentMovies.map(movie => download.image({
    url: movie.PosterUrl,
    dest: `../static/${movie._id}.jpg`,
  }));
  await Promise.all(moviesPromises)
    .then(() => {
      console.log('IMAGES SAVED');
    })
    .catch(err => {
      throw err;
    });
  // Connect the development routes to the server
  app.use(staticMiddleware()).use(router.routes()).use(router.allowedMethods());

  // Spawn the server
  listen();

  // Log to the terminal that we're ready for action
  logServerStarted({
    type: 'server-side rendering',
    chalk: chalk.bgYellow.black,
  });
})();
