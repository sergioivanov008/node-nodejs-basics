import { access, constants } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const curFolder = 'files';
const curFile = 'fresh.txt';
const curContent = 'I am fresh and young';

const curFilePath = path.join(__dirname, curFolder, curFile);

const create = async () => {
        access(curFilePath, constants.R_OK, (err) => {
            if (err) {
                writeFile(curFilePath, curContent);
            } else {
                throw new Error('FS operation failed');
            }
          });
};

await create();
