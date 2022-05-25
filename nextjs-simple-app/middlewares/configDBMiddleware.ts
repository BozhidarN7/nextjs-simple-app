import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

const configDBMiddleware =
    (handler: any) => (req: NextApiRequest, res: NextApiResponse) => {
        // new Promise((resolve, reject) => {
        //     mongoose.connect('mongodb://localhost:27017/nextjs-sample');
        //     const db = mongoose.connection;

        //     db.on('error', (err) => {
        //         console.log('Failed to connect to database...');
        //         reject(err);
        //     });

        //     db.on('open', () => {
        //         console.log('Successfully connected to database...');
        //         resolve('Successfully connected to database');
        //     });
        // });
        mongoose.connect('mongodb://localhost:27017/nextjs-sample');
        const db = mongoose.connection;

        db.on('error', (err) => {
            console.log('Failed to connect to database...');
        });

        db.on('open', () => {
            console.log('Successfully connected to database...');
        });

        return handler(req, res);
    };

export default configDBMiddleware;
