import { forgetCurrentGuest } from './BoxeverService';

export function KeyDownHandler(): void {
  const keyMap = new Map<string, boolean>();
  keyMap.set('Control', false);
  //map1.set('Shift', false);
  keyMap.set('b', false);

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    event.stopImmediatePropagation();
    if (keyMap.has(event.key)) {
      keyMap.set(event.key, true);
      if (keyMap.get('Control') && keyMap.get('b')) {
        window.setTimeout(forgetCurrentGuest, 1000);
        console.log('Killing boxever session!!');
        keyMap.set('Control', false);
        keyMap.set('b', false);
      }
    }
  });

  document.addEventListener('keyup', (event) => {
    event.stopImmediatePropagation();
    if (keyMap.has(event.key)) {
      keyMap.set(event.key, false);
    }
  });
}
