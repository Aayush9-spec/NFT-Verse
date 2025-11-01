import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const command = process.env.BASH_COMMAND; // Access command from .env file

        if (!command) {
            return res.status(400).json({ error: 'Command not found in environment variables' });
        }

        exec(command, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: `Exec error: ${error.message}` });
            }
            if (stderr) {
                return res.status(500).json({ error: `stderr: ${stderr}` });
            }
            res.status(200).json({ message: 'Command executed successfully', output: stdout });
        });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
