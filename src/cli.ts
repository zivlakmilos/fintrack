import blessed from 'blessed';

import createHeader from './components/Header';
import createMeinMenu from './screens/MainMenu';
import createOpenYear from './screens/OpenYear';
import createAccounts from './screens/Accounts';
import { openYear } from './core/db';
import { openConfig, getConfig } from './core/config';

export const cli = () => {
  openConfig();
  openYear(getConfig().year);


  const screen = blessed.screen({
    title: 'FinTrack',
  });

  screen.key('q', () => {
    process.exit(0);
  });

  const header = createHeader();
  const mainMenuScreen = createMeinMenu(screen);
  const openYearScreen = createOpenYear(screen);
  const accountsScreen = createAccounts(screen);

  screen.append(header);
  screen.append(mainMenuScreen);
  screen.append(openYearScreen);
  screen.append(accountsScreen);

  openYearScreen.hide();
  accountsScreen.hide();

  screen.set('main_menu', mainMenuScreen);
  screen.set('open_year', openYearScreen);
  screen.set('accounts', accountsScreen);

  mainMenuScreen.focusNext();

  screen.render();
}
