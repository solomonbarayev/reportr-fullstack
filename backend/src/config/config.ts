require('dotenv').config({ path: '../../.env' });

export const config: {
    db: string;
    port: number;
    jwtSecret: string | number;
} = {
    db: process.env.MONGO_DB || 'mongodb://localhost:27017/reportrDB',
    port: Number(process.env.PORT) || 3000,
    jwtSecret: process.env.JWT_SECRET || 'secret'
};
