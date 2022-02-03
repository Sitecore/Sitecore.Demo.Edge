export function KeyDownHandler(): void {
  const map1 = new Map<string, boolean>();
  map1.set('Control', false);
  //map1.set('Shift', false);
  map1.set('b', false);

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (map1.has(event.key)) {
      map1.set(event.key, true);
      if (map1.get('Control') && map1.get('b')) {
        console.log('tada!!');
      }
    }
  });

  document.addEventListener('keyup', (event) => {
    if (map1.has(event.key)) {
      map1.set(event.key, false);
    }
  });
}
