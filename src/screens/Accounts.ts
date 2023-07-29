import blessed from 'blessed';
import { switchScreen } from '../core/utils';
import { getConfig, saveConfig } from '../core/config';
import { Database, DatabaseAccout, getDb, openYear } from '../core/db';

const createHeader = () => {
  const box = blessed.box({
    left: 'center',
    width: 54,
    top: 5,
  });

  const lblId = blessed.text({
    name: 'id',
    content: 'Id',
    padding: {
      left: 1,
      right: 1,
    },
    left: 0,
    width: 20,
    top: 0,
  });

  const lblTitle = blessed.text({
    name: 'title',
    content: 'Title',
    padding: {
      left: 1,
      right: 1,
    },
    left: 22,
    width: 20,
    top: 0,
  });

  box.append(lblId);
  box.append(lblTitle);

  return box;
}

const createRow = (row: number, data: DatabaseAccout) => {
  const box = blessed.box({
    left: 'center',
    width: 54,
    top: (row + 2) * 3 + 2,
  });

  const txtId = blessed.textbox({
    mouse: true,
    keys: true,
    shrink: true,
    vi: true,
    name: 'id',
    content: 'Id',
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
    left: 0,
    width: 20,
    top: 0,
  });
  txtId.setValue(data.id);

  const txtTitle = blessed.textbox({
    mouse: true,
    keys: true,
    shrink: true,
    vi: true,
    name: 'title',
    content: 'Title',
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
    left: 22,
    width: 20,
    top: 0,
  });
  txtTitle.setValue(data.name);

  const btnDelete = blessed.button({
    mouse: true,
    keys: true,
    shrink: true,
    name: 'delete',
    content: 'Delete',
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
    left: 44,
    border: 'line',
    width: 10,
    top: 0,
  });

  box.append(txtId);
  box.append(txtTitle);
  box.append(btnDelete);

  return box;
}

const createInsert = (row: number, onInsert: () => void) => {
  const box = blessed.box({
    left: 'center',
    width: 54,
    top: (row + 2) * 3 + 2,
  });

  const btnInsert = blessed.button({
    mouse: true,
    keys: true,
    shrink: true,
    name: 'insert',
    content: 'Insert',
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
    left: 44,
    border: 'line',
    width: 10,
    top: 0,
  });

  btnInsert.on('press', onInsert);

  box.append(btnInsert);

  return box;
}

const createCommands = (screen: blessed.Widgets.Screen, row: number) => {
  const box = blessed.box({
    left: 'center',
    width: 20,
    top: (row + 2) * 3 + 2,
  });

  const btnOpen = blessed.button({
    mouse: true,
    keys: true,
    shrink: true,
    name: 'save',
    content: 'Save',
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

  box.append(btnOpen);
  box.append(btnCancel);

  return box;
}

const createUi = (screen: blessed.Widgets.Screen, form: blessed.Widgets.FormElement<unknown>, db: Database, render: () => void) => {
  const rows = db.accounts.length;

  form.append(createHeader());

  for (let i = 0; i < rows; i++) {
    const row = createRow(i, db.accounts[i]);
    form.append(row);
  }

  form.append(createInsert(rows, () => {
    db.accounts.push({
      id: '',
      name: '',
    });
    render();
  }));

  form.append(createCommands(screen, rows + 1));
}

const createAccounts = (screen: blessed.Widgets.Screen) => {
  const db = getDb();

  const form = blessed.form({
    keys: true,
    width: '90%',
    vi: true,
    border: 'line',
    left: 'center',
    top: 8,
  });

  const render = () => {
    form.children.forEach(el => {
      form.remove(el);
    });

    createUi(screen, form, db, render);
    form.render();
    form.focusNext();
  }

  createUi(screen, form, db, render);

  return form;
}

export default createAccounts;
