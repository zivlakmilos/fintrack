import fs from 'fs';
import path from 'path';
import os from 'os';

export const getBaseDir = (): string => {
  const baseDir = path.join(os.homedir(), '.fintrack');

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }

  return baseDir;
}
