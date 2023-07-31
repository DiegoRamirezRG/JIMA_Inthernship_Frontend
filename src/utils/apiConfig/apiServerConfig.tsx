import axios from 'axios';
import { API_ADDR, APT_PORT } from '../env/config';

export const serverRestApi = axios.create({
    baseURL: `http://${API_ADDR}:${APT_PORT}`,
});