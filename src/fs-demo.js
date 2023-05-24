import {open} from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const file = await open(path.join(dirName, '../assets/demo.txt'), 'a+', 0o777);

file.appendFile('aaaaa');

file.close();
