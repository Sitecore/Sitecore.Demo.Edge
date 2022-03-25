type SearchControlsProps = {
  totalPages: number;
  page: number;
  sortChoices: unknown[];
  sortType: unknown;
  sortDirection: unknown;
  onPageNumberChange: (text: string) => void;
  onSortChange: (change: SortChangeRequest) => void;
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
  } = props;

  const handlePageChange = ({ target }: Event) => {
    onPageNumberChange((target as HTMLInputElement).value);
  };

  const handleSortChange = ({ target }: Event) => {
    const sort = (target as HTMLInputElement).value.split('#');
    onSortChange({ sortType: sort[0], sortDirection: sort[1] });
  };

  // TODO: Implement load more button instead of pagination
  return window.RFK.ui.html`
    ${
      totalPages > 1 &&
      window.RFK.ui.html`
        <div className="control-page">
          <label>Page:</label>
          <select onChange=${handlePageChange}>
            ${Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (dropdownPageNumber) =>
                window.RFK.ui.html`
                  <option
                    selected=${page === dropdownPageNumber}
                    value=${dropdownPageNumber}
                  >
                    ${dropdownPageNumber}
                  </option>`
            )}
          </select>
        </div>
      `
    }

    <div className="control-sort">
      <label>Sort by:</label>
      <select onChange=${handleSortChange}>
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
