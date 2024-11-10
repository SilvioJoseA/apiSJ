import { config } from 'dotenv';

    export const DB_USER1 = process.env.DB_USER1 || 'db_emd_stg';
    export const DB_PASSWORD1 = process.env.DB_PASSWORD1 || 'SZJ*LWfs8B@D3v2z+Gwa';
    export const DB_HOST1 = process.env.DB_HOST1 || '149.50.136.95';
    export const DB_DATABASE1 = process.env.DB_DATABASE1 || 'emd';
    export const DB_PORT1 = process.env.DB_PORT1 || 3306;

config();