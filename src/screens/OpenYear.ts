import blessed from 'blessed';
import { switchScreen } from '../core/utils';
import { getConfig, saveConfig } from '../core/config';
import { openYear } from '../core/db';

const createOpenYear = (screen: blessed.Widgets.Screen) => {
  const form = blessed.form({
    keys: true,
    width: '90%',
    vi: true,
    border: 'line',
    left: 'center',
    top: 8,
  });

  const txtYear = blessed.textbox({
    mouse: true,
    keys: true,
    shrink: true,
    vi: true,
    name: 'year',
    content: 'Year',
    padding: {
      left: 1,
      right: 1,
    },
    style: {
      bg: 'blue',
      fg: 'black',
      focus: {
        bg: 'red',
        fg: 'black',
      },
    },
    border: 'line',
    left: 'center',
    width: 20,
    top: 5,
  });

  const box = blessed.box({
    left: 'center',
    width: 20,
    top: 8,
  });

  const btnOpen = blessed.button({
    mouse: true,
    keys: true,
    shrink: true,
    name: 'open',
    content: 'Open',
    padding: {
      left: 1,
      right: 1,
    },
    style: {
      bg: 'blue',
      fg: 'black',
      focus: {
        bg: 'red',
        fg: 'black',
      },
    },
    left: 0,
    border: 'line',
    width: 10,
  });

  const btnCancel = blessed.button({
    mouse: true,
    keys: true,
    shrink: true,
    name: 'cancel',
    content: 'Cancel',
    padding: {
      left: 1,
      right: 1,
    },
    style: {
      bg: 'blue',
      fg: 'black',
      focus: {
        bg: 'red',
        fg: 'black',
      },
    },
    left: 10,
    border: 'line',
    width: 10,
  });

  txtYear.setValue(getConfig().year.toString());

  box.append(btnOpen);
  box.append(btnCancel);

  form.append(txtYear);
  form.append(box);

  btnOpen.on('press', () => {
    getConfig().year = +txtYear.getValue();
    saveConfig();

    openYear(getConfig().year);

    switchScreen(screen, 'open_year', 'main_menu');
  });

  btnCancel.on('press', () => {
    switchScreen(screen, 'open_year', 'main_menu');
  });

  form.key('escape', () => {
    switchScreen(screen, 'open_year', 'main_menu');
  });

  form.focusNext();

  return form;
}

export default createOpenYear;
