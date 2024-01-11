import express from 'express';
import chalk from 'chalk';

export const serve = (port: number, filename: string, dir: string) => {

    const app = express();

    app.listen(port, () => {
        console.log(chalk.bgBlue(`Listening on port ${port}`));
    });
    
}