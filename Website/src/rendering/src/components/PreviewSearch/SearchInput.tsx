import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { KeyboardEvent, useEffect, useRef } from 'react';

// TODO: add story for component

type SearchInputProps = {
  keyphrase: string;
  setSearchString: (value: string) => void;
  onFocus: (value: string) => void;
  placeholder: string;
  redirectUrl: string;
  setOpen: (value: boolean) => void;
};

const SearchInput = ({
  setSearchString,
  onFocus,
  placeholder,
  redirectUrl,
  setOpen,
}: SearchInputProps): JSX.Element => {
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    const searchTermQueryStringValue = router.query['q'];
    if (searchTermQueryStringValue) {
      let searchTerm = '';

      if (typeof searchTermQueryStringValue === 'string') {
        searchTerm = searchTermQueryStringValue as string;
      } else if (typeof searchTermQueryStringValue === 'object') {
        searchTerm = searchTermQueryStringValue[0];
      }

      (ref.current as HTMLInputElement).value = searchTerm;
    }
  }, [router.query]);

  const keyListener = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'Escape':
        setOpen(false);
        break;
      case 'Enter':
        redirectToSearchPage((event.target as HTMLInputElement).value);
    }
  };

  const handleSearchIconClick = () => {
    redirectToSearchPage((ref.current as HTMLInputElement).value);
  };

  const redirectToSearchPage = (searchTerm: string) => {
    // TODO: Use Next.js router push() function instead
    window.location.href = `${redirectUrl}${searchTerm}`;
  };

  return (
    <>
      <FontAwesomeIcon
        id="search-icon"
        className="shop-search-icon"
        icon={faSearch}
        onClick={handleSearchIconClick}
      />
      <input
        id="search-input"
        className="shop-search-input"
        ref={ref}
        onChange={(e) => setSearchString(e.target.value || '')}
        onFocus={(e) => onFocus(e.target.value || '')}
        placeholder={placeholder}
        onKeyUp={keyListener}
        autoComplete="off"
      />
    </>
  );
};

export default SearchInput;
