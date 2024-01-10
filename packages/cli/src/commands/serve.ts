import { Command } from 'commander';
import { serve } from 'local-api';

export const serveCommand = new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action((filename = 'notebook.js', options: { port: string }) => {
        serve(parseInt(options.port), filename, '/');
    });