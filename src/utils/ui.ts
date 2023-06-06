import blessed from 'blessed';

export const switchScreen = (screen: blessed.Widgets.Screen, current: string, next: string): void => {
  const currentScreen = screen.get<blessed.Widgets.BlessedElement | undefined>(current, undefined);
  if (currentScreen) {
    currentScreen.hide();
  }

  const nextScreen = screen.get<blessed.Widgets.BlessedElement | undefined>(next, undefined);
  if (nextScreen) {
    nextScreen.show();
  }

  screen.render();
}
