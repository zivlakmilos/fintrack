import blessed from 'blessed';

import createMenu from '../components/Menu';
import { switchScreen } from '../core/utils';

const createMeinMenu = (screen: blessed.Widgets.Screen) => {
  const menuItems = [
    {
      id: 'data_entry',
      label: 'New Income',
      callback: () => { },
    },
    {
      id: 'data_entry',
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
      callback: () => {
        switchScreen(screen, 'main_menu', 'open_year');
      },
    },
    {
      id: 'exit',
      label: 'Exit',
      callback: () => { process.exit(0) },
    },
  ];

  const menu = createMenu(menuItems);

  return menu;
}

export default createMeinMenu;
