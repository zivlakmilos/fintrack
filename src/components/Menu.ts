import blessed from 'blessed';
import { Widgets } from 'blessed';

export type TMenuItem = {
  id: string,
  label: string,
  callback: () => void,
}

const createButton = (item: TMenuItem, idx: number): Widgets.Node => {
  const btn = blessed.button({
    mouse: true,
    keys: true,
    shrink: true,
    name: item.id,
    content: item.label,
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
    top: idx * 3 + 5,
  });

  btn.on('press', item.callback);

  return btn;
}

const createMenu = (items: TMenuItem[]): Widgets.FormElement<unknown> => {
  const form = blessed.form({
    keys: true,
    width: '90%',
    vi: true,
    border: 'line',
    left: 'center',
    top: 8,
  });

  for (const [idx, item] of items.entries()) {
    const btn = createButton(item, idx);
    form.append(btn);
  }

  return form;
}

export default createMenu;
