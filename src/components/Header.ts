import blessed from 'blessed';
import { Widgets } from 'blessed';

const createLabel = (text: string, top: number = 0, bold: boolean = false): Widgets.Node => {
  return blessed.box({
    content: text,
    top: top,
    bold: bold ? 'true' : undefined,
    align: 'center',
    keyable: false,
    input: false,
  });
}

const createHeader = (): Widgets.BoxElement => {
  const header = blessed.box({
    left: 'center',
    width: '90%',
    border: 'line',
    height: 8,
    align: 'center',
    keyable: false,
    input: false,
  });

  const title = createLabel('FinTrack', 0, true);
  const subtitle = createLabel('Personal Finance Softwrae for Engineers', 2);
  const copyright = createLabel(`Copyright (c) 2023 - ${new Date().getFullYear()} Milos Zivlak`, 5);

  header.append(title);
  header.append(subtitle);
  header.append(copyright);

  return header;
}

export default createHeader;
