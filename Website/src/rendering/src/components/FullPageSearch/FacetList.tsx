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
  name: string;
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
  sortFacetProps: SortFacetProps;
  onToggleClick: (...args: unknown[]) => void;
};

type SortFacetProps = {
  sortChoices: unknown[];
  sortType: unknown;
  sortDirection: unknown;
  onSortChange: (change: SortChangeRequest) => void;
};

type SortChangeRequest = {
  sortType: unknown;
  sortDirection: unknown;
};

const FacetValues = (props: FacetValueProps): JSX.Element => {
  const { values, tindex, acumIndex, facetType, onFacetClick } = props;

  return window.RFK.ui.html`
    <ul className="facet-values">
      ${values.map(({ index: facetValueIndex, text, selected, id }, index) => {
        const handleValueClick = ({ target }: Event) => {
          onFacetClick({
            facetType,
            facetValue: text,
            facetValueIndex,
            valueIndex: acumIndex + index,
            facetIndex: tindex,
            checked: (target as HTMLInputElement).checked,
          });
        };

        return window.RFK.ui.html` <li
          index="${index}"
          data-index="${acumIndex + index}"
          data-type="${facetType}"
          data-text="${text}"
          data-level="0"
        >
          <input
            type="checkbox"
            checked=${selected ? 'checked' : ''}
            id=${id}
            onClick=${handleValueClick}
          />
          <label for=${id} title="${text}">${text}</label>
        </li>`;
      })}
    </ul>
  `;
};

const Facet = (props: FacetProps): JSX.Element => {
  const { name, values, index, acumIndex, type, onFacetClick } = props;
  const [toggle, setToggle] = window.RFK.ui.useState(false);

  const handleTitleClick = () => setToggle(!toggle);

  return window.RFK.ui.html`
    <div className=${toggle ? 'expanded facet' : 'facet'}  data-type="${type}">
      <div className="facet-title" onClick=${handleTitleClick}>
        <span>${name}</span>
      </div>
      <${FacetValues}
        values=${values}
        tindex=${index}
        acumIndex=${acumIndex}
        facetType=${type}
        onFacetClick=${onFacetClick}
      />
    </div>
  `;
};

const ActiveFacet = (props: FacetProps): JSX.Element => {
  const { name, values, index, acumIndex, type, onFacetClick } = props;

  return window.RFK.ui.html`
    <div className="facet" data-type=${type}>
      <${ActiveFacetValues}
        name=${name}
        values=${values}
        tindex=${index}
        acumIndex=${acumIndex}
        facetType=${type}
        onFacetClick=${onFacetClick}
      />
    </div>
  `;
};

const ActiveFacetValues = (props: ActiveFacetValueProps): JSX.Element => {
  const { name, values, tindex, acumIndex, facetType, onFacetClick } = props;

  return window.RFK.ui.html`
    <ul className="facet-values">
      ${values.map(({ index: facetValueIndex, text, selected, id }, index) => {
        const handleValueClick = ({ target }: Event) => {
          onFacetClick({
            facetType,
            facetValue: text,
            facetValueIndex,
            valueIndex: acumIndex + index,
            facetIndex: tindex,
            checked: (target as HTMLInputElement).checked,
          });
        };

        return selected
          ? window.RFK.ui.html`
            <li
              index="${index}"
              data-index="${acumIndex + index}"
              data-type="${facetType}"
              data-text="${text}"
              data-level="0"
            >
              <input
                type="checkbox"
                checked="checked"
                id=${id}
                onClick=${handleValueClick}
              />
              <label for=${id} title="${name} - ${text}"><span>${name} - ${text}</span></label>
            </li>
          `
          : null;
      })}
    </ul>
  `;
};

const SortFacet = (props: SortFacetProps): JSX.Element => {
  const { sortChoices, sortType, sortDirection, onSortChange } = props;
  const [toggle, setToggle] = window.RFK.ui.useState(false);

  const handleTitleClick = () => setToggle(!toggle);

  const handleSortChange = ({ target }: Event) => {
    const sort = (target as HTMLInputElement).value.split('#');
    onSortChange({ sortType: sort[0], sortDirection: sort[1] });
  };

  return window.RFK.ui.html`
    <div className=${toggle ? 'expanded facet' : 'facet'}  data-type="sort">
      <div className="facet-title" onClick=${handleTitleClick}>
        <span>Sort by</span>
      </div>
      <div className="facet-values">
        ${sortChoices?.map(({ label, name, order }) => {
          return window.RFK.ui.html`
            <input type="radio"
              checked=${name === sortType && order === sortDirection}
              value="${name}#${order}"
              id="${name}#${order}"
              onChange=${handleSortChange}
            />
            <label for="${name}#${order}">${label}</label>
            `;
        })}
      </div>
    </div>
  `;
};

const FacetList = (props: FacetListProps): JSX.Element => {
  const { facets, onFacetClick, onClear, sortFacetProps, onToggleClick } = props;
  let acumIndex = 0;

  // TODO: Implement and style range filters (e.g. min - max price)
  return window.RFK.ui.html`
    <div className="facet-container">
      <button className="btn--secondary facet-container-toggle" onClick=${onToggleClick}>Filter</button>
      ${
        facets?.some(({ values = [] }) => values?.some(({ selected }) => selected))
          ? window.RFK.ui.html`
            <div className="facet-list-active">
              <div className="facet-list-title">
                <span>Active filters</span>
              </div>
              ${facets?.map(({ facetType, values, display_name }, tindex) => {
                const componentHtml = window.RFK.ui.html`
                  <${ActiveFacet}
                    name=${display_name}
                    index=${tindex}
                    acumIndex=${acumIndex}
                    type=${facetType}
                    values=${values}
                    onFacetClick=${onFacetClick}
                  />
                `;
                acumIndex = acumIndex + values.length;
                return componentHtml;
              })}
              <button className="btn--secondary" onClick=${onClear}>Clear All</button>
            </div>
          `
          : null
      }
      <div className="facet-list">
        <${SortFacet}
          sortChoices=${sortFacetProps.sortChoices}
          sortType=${sortFacetProps.sortType}
          sortDirection=${sortFacetProps.sortDirection}
          onSortChange=${sortFacetProps.onSortChange}
        />
        ${facets?.map(({ facetType, values, display_name }, tindex) => {
          const componentHtml = window.RFK.ui.html`
            <${Facet}
              name=${display_name}
              index=${tindex}
              acumIndex=${acumIndex}
              type=${facetType}
              values=${values}
              onFacetClick=${onFacetClick}
            />
          `;
          acumIndex = acumIndex + values.length;
          return componentHtml;
        })}
      </div>
    </div>
  `;
};

export default FacetList;
