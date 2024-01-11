import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

import chalk from 'chalk';

export const serveCommand = new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action( async (filename = 'notebook.js', options: { port: string }) => {
        try {
            const dir = path.join(process.cwd(), path.dirname(filename));
            await serve(parseInt(options.port), path.basename(filename), dir);
            console.log(chalk.green(`Successfully opened ${filename}. Navigate to ` + chalk.blue.underline(`http://localhost:${options.port}`) + ` to edit the file!`));

        } catch (error: any) {
            if(error.code === 'EADDRINUSE'){
                console.error(chalk.red(`Looks like Port:${options.port} is in use. Try running on a different port.\nUse the following command to run on a different port:\nnpx jbook serve --port <new-port-number>
                `));
            } else {
                console.error(chalk.red(`Something went wrong - here is the problem: ${error.message}`));
            }
            process.exit(1);
            
        }
    });