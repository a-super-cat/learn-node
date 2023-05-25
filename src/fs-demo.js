import { createReadStream, createWriteStream } from 'node:fs';
import {open} from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const readAndWriteFileDmo = async () => {
  const file1 = await open(path.join(dirName, '../assets/demo.txt'), 'r+');
  const file2 = await open(path.join(dirName, '../assets/demo2.txt'), 'a+');
  for await (const line of file1.readLines()) {
    file2.appendFile(line);
    console.log("🚀 ~ file: fs-demo.js:13 ~ forawait ~ line:", line)
  }

  file1.close();
  file2.close();
}

const streamReadAndWriteFileDmo = async () => {
  const file1 = createReadStream(path.join(dirName, '../assets/demo.txt'), 
   {
    start: 0,
    end: 15,
    encoding: 'utf-8',
    highWaterMark: 2,
   }
  );
  const file2 = createWriteStream(path.join(dirName, '../assets/demo3.text'), 
    {
      highWaterMark: 1,
    }
  );

  file1.on('data', (data) => {
    if (file2.write(data) === false) {
      file1.pause();
    }
  });

  file2.on('drain', () => {
    file1.resume();
    console.log('---------wait write finish---------');
  });

}

// readAndWriteFileDmo();

streamReadAndWriteFileDmo();

