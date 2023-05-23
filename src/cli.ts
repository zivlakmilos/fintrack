import mainMenu from './screens/MainMenu';
import { openYear } from './core/db';
import { openConfig, getConfig } from './core/config';

export const cli = () => {
  openConfig();
  openYear(getConfig().year);
  mainMenu();
}
