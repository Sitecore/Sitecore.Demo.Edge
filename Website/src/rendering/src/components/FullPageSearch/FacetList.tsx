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
};

const FacetValues = (props: FacetValueProps): JSX.Element => {
  const { values, tindex, acumIndex, facetType, onFacetClick } = props;

  return window.RFK.ui.html`
    <ul>
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
          <div>
            <input
              type="checkbox"
              checked=${selected ? 'checked' : ''}
              id=${id}
              onClick=${handleValueClick}
            />
            <label for=${id} title="${text}">${text}</label>
          </div>
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
    <li className=${toggle ? 'expanded' : ''}>
      <div onClick=${handleTitleClick}>
        <span>${name}</span>
      </div>
      <div>
        <${FacetValues}
          values=${values}
          tindex=${index}
          acumIndex=${acumIndex}
          facetType=${type}
          onFacetClick=${onFacetClick}
        />
      </div>
    </li>
  `;
};

const ActiveFacet = (props: FacetProps): JSX.Element => {
  const { name, values, index, acumIndex, type, onFacetClick } = props;

  return window.RFK.ui.html`
    <li>
      <${ActiveFacetValues}
        name=${name}
        values=${values}
        tindex=${index}
        acumIndex=${acumIndex}
        facetType=${type}
        onFacetClick=${onFacetClick}
      />
    </li>
  `;
};

const ActiveFacetValues = (props: ActiveFacetValueProps): JSX.Element => {
  const { name, values, tindex, acumIndex, facetType, onFacetClick } = props;

  return window.RFK.ui.html`
    <ul>
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
              <div>
                <input
                  type="checkbox"
                  checked="checked"
                  id=${id}
                  onClick=${handleValueClick}
                />
                <label for=${id} title="${name} - ${text}">${name} - ${text}</label>
              </div>
            </li>
          `
          : null;
      })}
    </ul>
  `;
};

const FacetList = (props: FacetListProps): JSX.Element => {
  const { facets, onFacetClick, onClear } = props;
  let acumIndex = 0;

  return window.RFK.ui.html`
    <div>
      ${
        facets?.some(({ values = [] }) => values?.some(({ selected }) => selected))
          ? window.RFK.ui.html`
            <div className="active-filters">
              <div>Active filters</div>
              ${facets?.map(({ facetType, values, display_name }, tindex) => {
                const componentHtml = window.RFK.ui.html`
                  <ul data-type="${facetType}">
                    <${ActiveFacet}
                      name=${display_name}
                      index=${tindex}
                      acumIndex=${acumIndex}
                      type=${facetType}
                      values=${values}
                      onFacetClick=${onFacetClick}
                    />
                  </ul>`;
                acumIndex = acumIndex + values.length;
                return componentHtml;
              })}
              <div onClick=${onClear}>Clear All</div>
            </div>
          `
          : null
      }
      ${facets?.map(({ facetType, values, display_name }, tindex) => {
        const componentHtml = window.RFK.ui.html`
          <ul data-type="${facetType}">
            <${Facet}
              name=${display_name}
              index=${tindex}
              acumIndex=${acumIndex}
              type=${facetType}
              values=${values}
              onFacetClick=${onFacetClick}
            />
          </ul>`;
        acumIndex = acumIndex + values.length;
        return componentHtml;
      })}
    </div>
  `;
};

export default FacetList;
