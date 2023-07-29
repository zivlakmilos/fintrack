import fs from 'fs';
import path from 'path';

import { JSONObject, loadJSON, saveJSON } from './json';
import { getBaseDir } from './utils';

export type DatabaseAccout = {
  id: string,
  name: string,
}

export type Database = {
  accounts: DatabaseAccout[],
  entries: any[],
}

let db: Database = {
  accounts: [],
  entries: [],
}

const isDatabase = (obj: any): obj is Database => {
  if (!obj) {
    return false;
  }

  if (!obj.account || !obj.entries) {
    return false;
  }

  return true;
}

const createYear = (filePath: string): void => {
  const data: Database = {
    accounts: [],
    entries: [],
  }

  saveJSON(data, filePath);
}

const loadYear = (filePath: string): JSONObject => {
  return loadJSON(filePath);
}

export const openYear = (year: number): void => {
  const baseDir = getBaseDir();
  const filePath = path.join(baseDir, `${year}.json`);

  if (!fs.existsSync(filePath)) {
    createYear(filePath);
  }

  const data = loadYear(filePath);
  if (isDatabase(data)) {
    db = data;
  }
}

export const getDb = (): Database => {
  return db;
}
