import fs from 'fs';
import path from 'path';

import { JSONObject, loadJSON, saveJSON } from './json';
import { getBaseDir } from './utils';

export type Config = {
  year: number,
}

let config: Config = {
  year: new Date().getFullYear(),
}

const isConfig = (obj: any): obj is Config => {
  if (!obj) {
    return false;
  }

  if (!obj.year) {
    return false;
  }

  return true;
}

const createConfig = (filePath: string): void => {
  saveJSON(config, filePath);
}

const loadConfig = (filePath: string): JSONObject => {
  return loadJSON(filePath);
}

export const openConfig = (): void => {
  const baseDir = getBaseDir();
  const filePath = path.join(baseDir, `config.json`);

  if (!fs.existsSync(filePath)) {
    createConfig(filePath);
  }

  const data = loadConfig(filePath);
  if (isConfig(data)) {
    config = data;
  }
}

export const getConfig = (): Config => {
  return config;
}
