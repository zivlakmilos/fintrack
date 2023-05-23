import fs from 'fs';

export type JSONKey = string;
export type JSONValue = string | number | boolean | JSONObject | JSONArray;
export type JSONObject = {
  [key: JSONKey]: JSONValue,
};
export type JSONArray = JSONValue[];

export const loadJSON = (filePath: string): JSONObject => {
  return JSON.parse(fs.readFileSync(filePath).toString());
}

export const saveJSON = (json: JSONObject, filePath: string): void => {
  fs.writeFileSync(filePath, JSON.stringify(json));
}
