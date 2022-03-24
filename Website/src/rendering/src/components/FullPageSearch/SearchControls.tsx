type SearchControlsProps = {
  totalPages: number;
  productsPage: unknown;
  page: number;
  sortChoices: unknown[];
  sortType: unknown;
  sortDirection: unknown;
  onPerPageChange: (text: string) => void;
  onPageNumberChange: (text: string) => void;
  onSortChange: (change: SortChangeRequest) => void;
  onSearchChange: (text: string) => void;
};

type SortChangeRequest = {
  sortType: unknown;
  sortDirection: unknown;
};

const SearchControls = (props: SearchControlsProps): JSX.Element => {
  const {
    totalPages,
    page,
    sortChoices,
    sortType,
    sortDirection,
    onPageNumberChange,
    onSortChange,
    onSearchChange,
  } = props;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const searchQuery = urlSearchParams.get('q');

  searchQuery &&
    window.RFK.ui.useEffect(() => {
      onSearchChange(searchQuery);
    }, []);

  return window.RFK.ui.html`
      <div className="control-page">
        <label>Page:</label>
        <select onChange=${({ target }: Event) =>
          onPageNumberChange((target as HTMLInputElement).value)}>
          ${Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (p) => window.RFK.ui.html`<option selected=${page === p} value=${p}>${p}</option>`
          )}
        </select>
      </div>

      <div className="control-sort">
        <label>Sort by:</label>
        <select
          onChange=${({ target }: Event) => {
            const sort = (target as HTMLInputElement).value.split('#');
            onSortChange({ sortType: sort[0], sortDirection: sort[1] });
          }}
        >
          ${sortChoices?.map(
            ({ label, name, order }) => window.RFK.ui.html`
            <option
              selected=${name === sortType && order === sortDirection}
              value="${name}#${order}"
            >
              ${label}
            </option>`
          )}
        </select>
      </div>
  `;
};

export default SearchControls;
