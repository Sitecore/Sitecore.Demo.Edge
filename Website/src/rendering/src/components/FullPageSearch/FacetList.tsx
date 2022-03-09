import { useState } from 'react';

type FacetValueProps = {
  values: unknown[];
  tindex: unknown;
  acumIndex: number;
  facetType: unknown;
  onFacetClick: (...args: unknown[]) => void;
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
  <ul class="rfk_list">
  ${values.map(({ index: facetValueIndex, text, count, selected }, index) => {
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
          onClick=${({ target }: Event) =>
            onFacetClick({
              facetType,
              facetValue: text,
              facetValueIndex,
              valueIndex: acumIndex + index,
              facetIndex: tindex,
              checked: (target as HTMLInputElement).checked,
            })}
        />
        <label title="${text}(${count})">${text}<span>(${count})</span></label>
      </div>
    </li>`;
  })}
</ul>
  `;
};

const Facet = (props: FacetProps): JSX.Element => {
  const { name, values, index, acumIndex, type, onFacetClick } = props;
  const [toggle, setToggle] = window.RFK.ui.useState(false);

  return window.RFK.ui.html`
  <li class="rfk_title" data-toggle=${toggle ? '1' : '0'}>
  <div class="rfk_ttitle" data-toggle=${toggle ? '1' : '0'} onClick=${() => setToggle(!toggle)}>
    <span>${name}</span>
  </div>
  <div class="rfkx_lwrap">
    <span class="rfkx_showmore"></span>
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

const FacetList = (props: FacetListProps): JSX.Element => {
  const { facets, onFacetClick, onClear } = props;
  let acumIndex = 0;

  return window.RFK.ui.html`
  <div class="rfk_facets rfk_ulli">
  <div class="rfk_filterby">
    <span>Filter By</span>
    ${
      facets?.some(({ values = [] }) => values?.some(({ selected }) => selected))
        ? window.RFK.ui.html`<div class="rfk_clear_filters" onClick=${onClear}>Clear All</div>`
        : null
    }
  </div>
  ${facets?.map(({ facetType, values, display_name }, tindex) => {
    const componentHtml = window.RFK.ui
      .html`<ul class="facet" data-type="${facetType}" data-sli="0">
      <${Facet}
        name=${display_name}
        index=${tindex}
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
