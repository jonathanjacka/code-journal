import express from 'express';
const path = require('path');
import chalk from 'chalk';
import { createProxyMiddleware } from 'http-proxy-middleware';


const PROXY_PORT = 5173;

export const serve = (
    port: number, 
    filename: string, 
    dir: string, 
    useDevProxy: boolean
    ) => {

    const app = express();

    if(useDevProxy) {
        app.use(createProxyMiddleware({
            target: `http://localhost:${PROXY_PORT}`,
            ws: true,
            logLevel: 'silent'
        }));
    } else {
        const packagePath = require.resolve('local-client/dist/index.html');
        app.use(express.static(path.dirname(packagePath)));
    }

    return new Promise<void>((resolve, reject) => {
        app.listen(port, () => {
            console.log(chalk.bgBlue(`Local server is now listening on port ${port}`));
            resolve();
        }).on('error', reject);
    });
}