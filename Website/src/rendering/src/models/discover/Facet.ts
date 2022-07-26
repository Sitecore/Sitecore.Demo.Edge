export interface Facet {
  number_of_products?: number;
  display_name?: string;
  values?: FacetValue[];
  facetType?: string;
}

export interface FacetValue {
  count?: number;
  text?: string;
  id?: string;
  in_content?: string;
  facetValueIndex?: number;
  index?: number;
  selected?: boolean;
}

export interface SortChoice {
  order?: string;
  name?: string;
  label?: string;
}