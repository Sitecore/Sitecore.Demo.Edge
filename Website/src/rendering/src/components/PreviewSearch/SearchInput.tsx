import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { KeyboardEvent, useRef } from 'react';

// TODO: add story for component

type SearchInputProps = {
  keyphrase: string;
  setSearchString: (value: string) => void;
  onFocus: (value: string) => void;
  placeholder: string;
  redirectUrl: string;
  setOpen: (value: boolean) => void;
};

const SearchInput = (props: SearchInputProps): JSX.Element => {
  const { keyphrase, setSearchString, onFocus, placeholder, redirectUrl, setOpen } = props;

  const ref = useRef(null);

  const keyListener = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'Escape':
        setOpen(false);
        break;
      case 'Enter':
        // TO-DO - Next.js-friendly way to redirect
        window.location.href = `${redirectUrl}${keyphrase}`;
    }
  };

  return (
    <>
      <FontAwesomeIcon id="search-icon" className="shop-search-icon" icon={faSearch} />
      <input
        id="search-input"
        className="shop-search-input"
        ref={ref}
        onChange={(e) => setSearchString(e.target.value || '')}
        onFocus={(e) => onFocus(e.target.value || '')}
        placeholder={placeholder}
        onKeyUp={keyListener}
      />
    </>
  );
};

export default SearchInput;
