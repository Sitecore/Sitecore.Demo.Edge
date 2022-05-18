import { ChangeEvent } from 'react';

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

const SearchControls = ({
  totalPages,
  sortChoices,
  onPageNumberChange,
  onSortChange,
}: SearchControlsProps): JSX.Element => {
  const handlePageChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    onPageNumberChange((target as HTMLSelectElement).value);
  };

  const handleSortChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const sort = (target as HTMLSelectElement).value.split('#');
    onSortChange({ sortType: sort[0], sortDirection: sort[1] });
  };

  const pagination = totalPages > 1 && (
    <div className="control-page">
      <label>Page:</label>
      <select onChange={(event) => handlePageChange(event)}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((dropdownPageNumber) => (
          <option value={dropdownPageNumber} key={dropdownPageNumber}>
            {dropdownPageNumber}
          </option>
        ))}
      </select>
    </div>
  );

  // TODO: Implement load more button instead of pagination
  return (
    <>
      {pagination}
      <div className="control-sort">
        <label>Sort by:</label>
        <select onChange={(event) => handleSortChange(event)}>
          {sortChoices?.map(({ label, name, order }) => (
            <option value={name + '#' + order} key={name + '#' + order}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SearchControls;
