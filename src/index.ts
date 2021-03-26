import express from 'express';
import routes from './routes';
import path from 'path';

/**
 * Application entrypoint
 */
const main = async () => {
    const app = express();
    const { PORT } = process.env;
    const httpPort = PORT || 1030;

    app.use('/docs', express.static(path.join(__dirname, '../docs')));
    app.use('/', routes);

    app.listen(httpPort, () => console.log(`Listening to port ${httpPort}`));
};

main()
    .then(r => console.log.bind(this, '[Backend App] Completed tasks...', r))
    .catch(e => console.error.bind(this, '[Backend App] Error', e));
