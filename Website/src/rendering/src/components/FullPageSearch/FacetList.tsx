import { faChevronDown, faSearch, faSlidersH, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  SearchResponseFacetItem,
  SearchResponseFacets,
  SearchResponseSortChoice,
  useSearchResults,
  useSearchResultsIsSelectedFacet,
  // useSearchResultsSelectedFacets,
} from '@sitecore-discover/react';
import { ChangeEvent, useEffect, useState } from 'react';

type FacetValueProps = {
  facetType: unknown;
  facetId: number;
  text: string;
  facetValueIndex: number;
  valueIndex: number;
  facetIndex: number;
  count: number;
  onFacetClick: (...args: unknown[]) => void;
};

type FacetValuesProps = {
  values: unknown[];
  tindex: number;
  acumIndex: number;
  facetType: unknown;
  onFacetClick: (...args: unknown[]) => void;
};

type ActiveFacetValueProps = FacetValuesProps & {
  name: unknown;
};

type FacetProps = {
  name: unknown;
  values: SearchResponseFacetItem[];
  index: number;
  acumIndex: number;
  type: unknown;
  onFacetClick: (...args: unknown[]) => void;
};

type SearchInputProps = {
  onSearchInputChange: (...args: unknown[]) => void;
  keyphrase?: string;
};

type FacetListProps = {
  list: string[];
  facets: SearchResponseFacets;
  sortFacetProps: SortFacetProps;
  onToggleClick: (...args: unknown[]) => void;
  isCategoryProductListingPage?: boolean;
  onSearchInputChange?: (...args: unknown[]) => void;
  keyphrase?: string;
};

type SortFacetProps = {
  sortChoices: SearchResponseSortChoice[];
  sortType: string;
  sortDirection: string;
  onSortChange: (change: SortChangeRequest) => void;
};

type SortChangeRequest = {
  sortType: string;
  sortDirection: string;
};

const FacetValue = ({
  facetType,
  facetId,
  text,
  facetValueIndex,
  valueIndex,
  facetIndex,
  count,
  onFacetClick,
}: FacetValueProps) => {
  const selected = useSearchResultsIsSelectedFacet(facetType, facetId);
  const [toggle, setToggle] = useState(selected || false);
  useEffect(() => {
    setToggle(selected);
  }, [selected]);
  return (
    <li key={text} data-index={valueIndex} data-text={text} data-level="0">
      <div>
        <input
          type="checkbox"
          checked={toggle}
          onChange={({ target }) => {
            setToggle(target.checked);
            onFacetClick({
              facetId: facetType,
              facetValueId: facetId,
              facetValue: text,
              facetValueIndex,
              valueIndex,
              facetIndex,
              checked: target.checked,
            });
          }}
        />
        <label title={`${text} (${count})`}>
          {text}
          <span>({count})</span>
        </label>
      </div>
    </li>
  );
};

const FacetValues = ({
  values,
  tindex,
  acumIndex,
  facetType,
  onFacetClick,
}: FacetValuesProps): JSX.Element => (
  <ul className="facet-values">
    {values.map(({ index: facetValueIndex, id: facetId, text, count }, index) => {
      return (
        <FacetValue
          key={text}
          text={text}
          facetType={facetType}
          facetIndex={tindex}
          facetValueIndex={facetValueIndex}
          facetId={facetId}
          count={count}
          valueIndex={acumIndex + index}
          onFacetClick={onFacetClick}
        />
      );
    })}
  </ul>
);

const Facet = ({ name, values, index, acumIndex, type, onFacetClick }: FacetProps): JSX.Element => {
  const [toggle, setToggle] = useState(false);

  const handleTitleClick = () => setToggle(!toggle);

  const cssClass = toggle ? 'expanded facet' : 'facet';

  return (
    <div className={cssClass} data-type={type}>
      <div className="facet-title" onClick={handleTitleClick}>
        <span>{name}</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      <FacetValues
        values={values}
        tindex={index}
        acumIndex={acumIndex}
        facetType={type}
        key={index}
        onFacetClick={onFacetClick}
      />
    </div>
  );
};

const ActiveFacet = ({
  name,
  values,
  index,
  acumIndex,
  type,
  onFacetClick,
}: FacetProps): JSX.Element => (
  <div className="facet" data-type={type}>
    <ActiveFacetValues
      name={name}
      values={values}
      tindex={index}
      acumIndex={acumIndex}
      facetType={type}
      onFacetClick={onFacetClick}
    />
  </div>
);

const ActiveFacetValues = ({
  name,
  values,
  tindex,
  acumIndex,
  facetType,
  onFacetClick,
}: ActiveFacetValueProps): JSX.Element => (
  <ul className="facet-values">
    {values.map(({ index: facetValueIndex, text, selected, id }, index) => {
      const handleValueClick = ({ target }: ChangeEvent<HTMLInputElement>) => {
        onFacetClick({
          facetType,
          facetValue: text,
          facetValueIndex,
          valueIndex: acumIndex + index,
          facetIndex: tindex,
          checked: (target as HTMLInputElement).checked,
        });
      };

      return selected ? (
        <li
          data-index={acumIndex + index}
          data-type={facetType}
          data-text={text}
          data-level="0"
          key={index}
        >
          <input
            type="checkbox"
            checked={selected}
            id={id}
            onChange={(event) => handleValueClick(event)}
          />
          <label htmlFor={id} title={name + '-' + text}>
            <span>
              {name} - {text}
            </span>
            <FontAwesomeIcon icon={faTimes} />
          </label>
        </li>
      ) : null;
    })}
  </ul>
);

const SortFacet = ({
  sortChoices,
  sortType,
  sortDirection,
  onSortChange,
}: SortFacetProps): JSX.Element => {
  const [toggle, setToggle] = useState(false);

  const handleTitleClick = () => setToggle(!toggle);

  const handleSortChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const sort = (target as HTMLInputElement).value.split('#');
    onSortChange({ sortType: sort[0], sortDirection: sort[1] });
  };

  const cssClass = toggle ? 'expanded facet' : 'facet';

  return (
    <div className={cssClass} data-type="sort">
      <div className="facet-title" onClick={handleTitleClick}>
        <span>Sort by</span>
      </div>
      <ul className="facet-values">
        {sortChoices?.map(({ label, name, order }) => {
          const inputId = `${name}#${order}`;
          const isChecked = name === sortType && order === sortDirection;

          return (
            <li key={inputId}>
              <input
                type="radio"
                checked={isChecked}
                value={inputId}
                id={inputId}
                onChange={handleSortChange}
              />
              <label htmlFor={inputId}>{label}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const SearchInput = ({ onSearchInputChange, keyphrase }: SearchInputProps): JSX.Element => (
  <div className="category-search-container">
    <FontAwesomeIcon className="category-search-icon" icon={faSearch} />
    <input
      id="category-search-input"
      className="category-search-input"
      onChange={onSearchInputChange}
      placeholder="Search within the list"
      autoComplete="off"
      value={keyphrase}
    />
  </div>
);

const FacetList = ({
  list,
  facets,
  sortFacetProps,
  onToggleClick,
  isCategoryProductListingPage,
  onSearchInputChange,
  keyphrase,
}: FacetListProps): JSX.Element => {
  const {
    context: { selectedFacets = {} },
    actions: { onFacetClick, onClearFilters, onFilterClick },
  } = useSearchResults();
  // const selectedFacetsFromApi = useSearchResultsSelectedFacets();
  let acumIndex = 0;

  const activeFilters = list?.some((type) => selectedFacets[type]?.length > 0) && (
    <div className="facet-list-active">
      <div className="facet-list-title">
        <FontAwesomeIcon icon={faSlidersH} />
        <span>Active filters</span>
      </div>
      {list?.map((type, tindex) => {
        const { value: values = [], display_name } = facets[type] || {};
        acumIndex = acumIndex + values.length;
        const componentHtml = (
          <ActiveFacet
            name={display_name}
            index={tindex}
            acumIndex={acumIndex}
            type={type}
            values={values}
            key={tindex}
            onFacetClick={onFilterClick}
          />
        );
        return componentHtml;
      })}
      <button className="btn-secondary" onClick={onClearFilters}>
        Clear All
      </button>
    </div>
  );

  const searchInput = isCategoryProductListingPage && (
    <SearchInput keyphrase={keyphrase} onSearchInputChange={onSearchInputChange} />
  );

  // TODO: Implement and style range filters (e.g. min - max price)
  return (
    <div className="facet-container">
      <button className="btn-secondary facet-container-toggle" onClick={onToggleClick}>
        <FontAwesomeIcon icon={faSlidersH} />
        Filter
      </button>
      {searchInput}
      {activeFilters}
      <div className="facet-list">
        <SortFacet {...sortFacetProps} />
        {list?.map((type, tindex) => {
          const { value: values = [], display_name } = facets[type] || {};
          acumIndex = acumIndex + values.length;
          const componentHtml = (
            <Facet
              name={display_name}
              index={tindex}
              acumIndex={acumIndex}
              type={type}
              values={values}
              key={tindex}
              onFacetClick={onFacetClick}
            />
          );
          return componentHtml;
        })}
      </div>
    </div>
  );
};

export default FacetList;
