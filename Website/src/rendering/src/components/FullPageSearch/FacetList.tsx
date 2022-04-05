import { ChangeEvent, useState } from 'react';

export type FacetClickEvent = {
  checked: boolean;
  facetIndex: number;
  facetType: string;
  facetValue: string;
  facetValueIndex: number;
  valueIndex: number;
};

type FacetValueProps = {
  values: unknown[];
  tindex: unknown;
  acumIndex: number;
  facetType: unknown;
  onFacetClick: (...args: unknown[]) => void;
};

type ActiveFacetValueProps = FacetValueProps & {
  name: unknown;
};

type FacetProps = {
  name: unknown;
  values: unknown[];
  index: number;
  acumIndex: number;
  type: unknown;
  onFacetClick: (...args: unknown[]) => void;
};

type FacetListProps = {
  facets: unknown[];
  onFacetClick: (...args: unknown[]) => void;
  onClear: (...args: unknown[]) => void;
};

const FacetValues = (props: FacetValueProps): JSX.Element => {
  const { values, tindex, acumIndex, facetType, onFacetClick } = props;

  return (
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
};

const Facet = (props: FacetProps): JSX.Element => {
  const { name, values, index, acumIndex, type, onFacetClick } = props;
  const [toggle, setToggle] = useState(false);

  const handleTitleClick = () => setToggle(!toggle);

  return (
    <div className={toggle ? 'expanded facet' : 'facet'} data-type={type}>
      <div className="facet-title" onClick={handleTitleClick}>
        <span>{name}</span>
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

const ActiveFacet = (props: FacetProps): JSX.Element => {
  const { name, values, index, acumIndex, type, onFacetClick } = props;

  return (
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
};

const ActiveFacetValues = (props: ActiveFacetValueProps): JSX.Element => {
  const { name, values, tindex, acumIndex, facetType, onFacetClick } = props;

  return (
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
            </label>
          </li>
        ) : null;
      })}
    </ul>
  );
};

const FacetList = (props: FacetListProps): JSX.Element => {
  const { facets, onFacetClick, onClear } = props;
  let acumIndex = 0;

  // TODO: Implement and style range filters (e.g. min - max price)
  return (
    <div className="facet-container">
      {facets?.some(({ values = [] }) => values?.some(({ selected }) => selected)) ? (
        <div className="facet-list-active">
          <div className="facet-list-title">
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
          <button className="btn--secondary" onClick={onClear}>
            Clear All
          </button>
        </div>
      ) : null}
      <div className="facet-list">
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
