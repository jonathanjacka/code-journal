import express from 'express';
import chalk from 'chalk';
import { createProxyMiddleware } from 'http-proxy-middleware';

const PROXY_PORT = 5173;

export const serve = (port: number, filename: string, dir: string) => {

    const app = express();

    app.use(createProxyMiddleware({
        target: `http://localhost:${PROXY_PORT}`,
        ws: true,
        logLevel: 'silent'
    }));

    return new Promise<void>((resolve, reject) => {
        app.listen(port, () => {
            console.log(chalk.bgBlue(`Local server is now listening on port ${port}`));
            resolve();
        }).on('error', reject);
    });
}