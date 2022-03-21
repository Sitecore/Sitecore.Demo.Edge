import { closeSession, forgetCurrentGuest } from './BoxeverService';

export function KeypressHandler(): void {
  const CONTROL_KEY = 'Control';
  const B_KEY = 'b';
  const I_KEY = 'i';

  const keyMap = new Map<string, boolean>();
  // Define the keys we want to listen for
  keyMap.set(CONTROL_KEY, false);
  keyMap.set(B_KEY, false);
  keyMap.set(I_KEY, false);

  const handleCloseSession = () => {
    closeSession();
  };

  const handleForgetGuest = () => {
    forgetCurrentGuest();
  };

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    event.stopImmediatePropagation();

    if (keyMap.has(event.key)) {
      // Save the state of the key as pressed
      keyMap.set(event.key, true);

      if (keyMap.get(CONTROL_KEY) && keyMap.get(B_KEY)) {
        // When Ctrl+b is pressed
        // Set the state of the keys as not pressed
        keyMap.set(CONTROL_KEY, false);
        keyMap.set(B_KEY, false);

        handleCloseSession();
      }

      if (keyMap.get(CONTROL_KEY) && keyMap.get(I_KEY)) {
        // When Ctrl+i is pressed
        // Set the state of the keys as not pressed
        keyMap.set(CONTROL_KEY, false);
        keyMap.set(I_KEY, false);

        handleCloseSession();
        handleForgetGuest();
      }
    }
  });

  document.addEventListener('keyup', (event) => {
    event.stopImmediatePropagation();

    if (keyMap.has(event.key)) {
      // Set the state of the key as not pressed
      keyMap.set(event.key, false);
    }
  });
}
