import { SortOrder } from '@sitecore-discover/react';
import { ChangeEvent } from 'react';
import { SortChoice } from 'src/models/discover/Facet';

type SearchControlsProps = {
  totalPages: number;
  page: number;
  sortChoices: SortChoice[];
  sortType: string;
  sortDirection: string;
  onPageNumberChange: (text: string) => void;
  onSortChange: (change: SortChangeRequest) => void;
};

type SortChangeRequest = {
  sortType: string;
  sortDirection: SortOrder;
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
    onSortChange({ sortType: sort[0], sortDirection: sort[1] as SortOrder });
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
