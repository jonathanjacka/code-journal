import express from 'express';
import chalk from 'chalk';

export const serve = (port: number, filename: string, dir: string) => {

    const app = express();

    return new Promise<void>((resolve, reject) => {
        app.listen(port, () => {
            console.log(chalk.bgBlue(`Local server is now listening on port ${port}`));
            resolve();
        }).on('error', reject);
    });
}