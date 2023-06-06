import fs from 'fs';
import path from 'path';
import os from 'os';
import blessed from 'blessed';

export const getBaseDir = (): string => {
  const baseDir = path.join(os.homedir(), '.fintrack');

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }

  return baseDir;
}

export const switchScreen = (screen: blessed.Widgets.Screen, current: string, next: string): void => {
  const currentScreen = screen.get<blessed.Widgets.BlessedElement | undefined>(current, undefined);
  if (currentScreen) {
    currentScreen.hide();
  }

  const nextScreen = screen.get<blessed.Widgets.BlessedElement | undefined>(next, undefined);
  if (nextScreen) {
    nextScreen.show();
    nextScreen.focus();
  }

  screen.render();
}
