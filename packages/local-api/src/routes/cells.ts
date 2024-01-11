import express, { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
    id: string;
    content: string;
    type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string): Router => {
    const router = express.Router();
    router.use(express.json());

    const filePath = path.join(dir, filename);

    router.get('/cells', async (req, res) => {

        try{
            // Read the file
            const result = await fs.readFile(filePath, { encoding: 'utf-8' });
            res.send(JSON.parse(result));
        } catch (error: any) {
            if(error.code === 'ENOENT') {
                // Add code to create a file and add default cells
                await fs.writeFile(filePath, '[]', 'utf-8');
                res.json([]);
            } else {
                throw error;
            }
        }
    });
    router.post('/cells', async (req, res) => {
        const { cells }: { cells: Cell[] } = req.body;
        await fs.writeFile(filePath, JSON.stringify(cells), 'utf-8');
        res.json({ status: 'success', message: 'Cells saved successfully' });
    });
    return router;
};