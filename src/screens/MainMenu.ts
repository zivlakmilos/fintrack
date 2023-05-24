import blessed from 'blessed';

import createHeader from '../components/Header';
import createMenu from '../components/Menu';

const menuItems = [
  {
    id: 'data-entry',
    label: 'New Income',
    callback: () => { },
  },
  {
    id: 'data-entry',
    label: 'New Expense',
    callback: () => { },
  },
  {
    label: 'Repports',
    id: 'repports',
    callback: () => { },
  },
  {
    id: 'graphs',
    label: 'Graphs',
    callback: () => { },
  },
  {
    id: 'accounts',
    label: 'Accounts',
    callback: () => { },
  },
  {
    id: 'open_year',
    label: 'Open Year',
    callback: () => { },
  },
  {
    id: 'exit',
    label: 'Exit',
    callback: () => { process.exit(0) },
  },
];

const showMainMenu = (): void => {
  const screen = blessed.screen({
    title: 'FinTrack',
  });

  screen.key('q', () => {
    process.exit(0);
  });

  const header = createHeader();
  const menu = createMenu(menuItems);

  screen.append(header);
  screen.append(menu);

  menu.focusNext();

  screen.render();
}

export default showMainMenu;
