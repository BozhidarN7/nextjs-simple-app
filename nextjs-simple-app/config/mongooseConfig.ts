import mongoose from 'mongoose';

const dbURL =
    process.env.NODE_ENV === 'development'
        ? 'mongodb://localhost:27017/nextjs-sample'
        : 'mongodb+srv://admin:adminnextjs@cluster0.fohazc2.mongodb.net/?retryWrites=true&w=majority';

export default () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(`${dbURL}`);
        const db = mongoose.connection;

        db.on('error', (err) => {
            console.log('Failed to connect to database...');
            reject(err);
        });

        db.on('open', () => {
            console.log('Successfully connected to database...');
            resolve('Successfully connected to database');
        });
    });
};
