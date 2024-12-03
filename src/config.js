import { config } from 'dotenv';

    export const PORT = process.env.PORT || 4004;
    export const DB_USER = process.env.DB_USER || 'u202166280_appsj';
    export const DB_PASSWORD = process.env.DB_PASSWORD || 'Software123*';
    export const DB_HOST = process.env.DB_HOST || 'srv1146.hstgr.io'; // o usa '195.35.61.56'
    export const DB_DATABASE = process.env.DB_DATABASE || 'u202166280_appsj';
    export const DB_PORT = process.env.DB_PORT || 3306;

config();