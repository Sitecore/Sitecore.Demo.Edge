import { faChevronDown, faSearch, faSlidersH, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import { Facet, FacetValue, SortChoice } from 'src/models/discover/Facet';
import { SearchResultsFacetClickedChangedActionPayload } from '@sitecore-discover/widgets';
import { SortOrder } from '@sitecore-discover/react';

type FacetValueProps = {
  values: FacetValue[];
  tindex: number;
  acumIndex: number;
  facetType: string;
  onFacetClick: (payload: SearchResultsFacetClickedChangedActionPayload) => void;
};

type ActiveFacetValueProps = FacetValueProps & {
  name: string;
};

type FacetProps = {
  name: string;
  values: FacetValue[];
  index: number;
  acumIndex: number;
  type: string;
  onFacetClick: (payload: SearchResultsFacetClickedChangedActionPayload) => void;
};

type SearchInputProps = {
  onSearchInputChange: (searchTerm: string) => void;
};

type FacetListProps = {
  facets: Facet[];
  onFacetClick: (payload: SearchResultsFacetClickedChangedActionPayload) => void;
  onClear: () => void;
  sortFacetProps: SortFacetProps;
  onToggleClick: () => void;
  isCategoryProductListingPage?: boolean;
  onSearchInputChange?: (searchTerm: string) => void;
};

type SortFacetProps = {
  sortChoices: SortChoice[];
  sortType: string;
  sortDirection: SortOrder;
  onSortChange: (change: SortChangeRequest) => void;
};

type SortChangeRequest = {
  sortType: string;
  sortDirection: SortOrder;
};

const FacetValues = ({
  values,
  tindex,
  acumIndex,
  facetType,
  onFacetClick,
}: FacetValueProps): JSX.Element => (
  <ul className="facet-values">
    {values.map(({ index: facetValueIndex, text, selected, id }, index) => {
      const handleValueClick = ({ target }: ChangeEvent<HTMLInputElement>) => {
        onFacetClick({
          rfkId: '',
          facetType,
          facetValue: text,
          facetValueIndex,
          valueIndex: acumIndex + index,
          facetIndex: tindex,
          checked: (target as HTMLInputElement).checked,
        });
      };

      return (
        <li
          data-index={acumIndex + index}
          data-type={facetType}
          data-text={text}
          data-level={0}
          key={index}
        >
          <input
            type="checkbox"
            checked={selected}
            id={id}
            onChange={(event) => handleValueClick(event)}
          />
          <label htmlFor={id} title={text}>
            {text}
          </label>
        </li>
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
          rfkId: '',
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
    onSortChange({ sortType: sort[0], sortDirection: sort[1] as SortOrder });
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

const SearchInput = ({ onSearchInputChange }: SearchInputProps): JSX.Element => (
  <div className="category-search-container">
    <FontAwesomeIcon className="category-search-icon" icon={faSearch} />
    <input
      id="category-search-input"
      className="category-search-input"
      onChange={(event) => onSearchInputChange(event.target.value)}
      placeholder="Search within the list"
      autoComplete="off"
    />
  </div>
);

const FacetList = ({
  facets,
  onFacetClick,
  onClear,
  sortFacetProps,
  onToggleClick,
  isCategoryProductListingPage,
  onSearchInputChange,
}: FacetListProps): JSX.Element => {
  let acumIndex = 0;

  const activeFilters = facets?.some(({ values = [] }) =>
    values?.some(({ selected }) => selected)
  ) && (
    <div className="facet-list-active">
      <div className="facet-list-title">
        <FontAwesomeIcon icon={faSlidersH} />
        <span>Active filters</span>
      </div>
      {facets?.map(({ facetType, values, display_name }, tindex) => {
        const componentHtml = (
          <ActiveFacet
            name={display_name}
            index={tindex}
            acumIndex={acumIndex}
            type={facetType}
            values={values}
            key={tindex}
            onFacetClick={onFacetClick}
          />
        );
        acumIndex = acumIndex + values.length;
        return componentHtml;
      })}
      <button className="btn-secondary" onClick={onClear}>
        Clear All
      </button>
    </div>
  );

  const searchInput = isCategoryProductListingPage && (
    <SearchInput onSearchInputChange={onSearchInputChange} />
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
        {facets?.map(({ facetType, values, display_name }, tindex) => {
          const componentHtml = (
            <Facet
              name={display_name}
              index={tindex}
              acumIndex={acumIndex}
              type={facetType}
              values={values}
              key={tindex}
              onFacetClick={onFacetClick}
            />
          );
          acumIndex = acumIndex + values.length;
          return componentHtml;
        })}
      </div>
    </div>
  );
};

export default FacetList;
