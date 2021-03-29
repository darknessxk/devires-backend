import 'reflect-metadata';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import routes from '../routes';

export const Server = (): http.Server => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/docs', express.static(path.join(__dirname, '../../docs')));
    app.use('/', routes);

    return http.createServer({}, app);
};
