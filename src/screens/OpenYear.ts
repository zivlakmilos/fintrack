import blessed from 'blessed';
import { switchScreen } from '../utils/ui';

const createOpenYear = (screen: blessed.Widgets.Screen) => {
  const form = blessed.form({
    keys: true,
    width: '90%',
    vi: true,
    border: 'line',
    left: 'center',
    top: 8,
  });

  const btn = blessed.button({
    mouse: true,
    keys: true,
    shrink: true,
    name: 'open',
    content: 'Otvori',
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

  btn.on('press', () => {
  });

  form.append(btn);

  form.key('escape', () => {
    switchScreen(screen, 'open_year', 'main_menu');
  });

  form.focusNext();

  return form;
}

export default createOpenYear;
