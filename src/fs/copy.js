import { access, constants } from 'fs';
import { mkdir, readdir,copyFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const curFolder = 'files';
const destFolder = 'files_copy';
const ERR_MESSAGE = 'FS operation failed';

const curFolderPath = path.join(__dirname, curFolder);
const destFolderPath = path.join(__dirname, destFolder);

const copy = async () => {
    access(curFolderPath, constants.R_OK, (err) => {
        if (!err) {
            access(destFolderPath, constants.R_OK, async (err) => {
                if (err) {
                    mkdir(destFolderPath, { recursive: true });
                    const files = await readdir(curFolderPath);
                    for(const file of files) {
                        const curFile = path.join(curFolderPath, file);
                        const destFile = path.join(destFolderPath, file);
                        copyFile(curFile, destFile);
                    }
                } else {
                    throw new Error(ERR_MESSAGE);
                }
              });
        } else {
            throw new Error(ERR_MESSAGE);
        }
      });
};

await copy();
