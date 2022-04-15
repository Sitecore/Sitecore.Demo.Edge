import { useEffect } from 'react';

interface DiscoverReference {
  current: { contains: (eventTarget: EventTarget) => boolean };
}

const ClickOutside = (ref: DiscoverReference, handler: () => void): void => {
  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };

    if (window.PointerEvent) {
      document.addEventListener('pointerdown', listener);
    } else {
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    }

    return () => {
      if (window.PointerEvent) {
        document.removeEventListener('pointerdown', listener);
      } else {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      }
    };
  }, [ref, handler]);
};

export default ClickOutside;
