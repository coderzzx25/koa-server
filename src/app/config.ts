import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const envFile = process.env.NODE_ENV === 'dev' ? '.env.development' : '.env';

dotenv.config({ path: envFile });

export const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
export const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));

export default {
  ...process.env
};
