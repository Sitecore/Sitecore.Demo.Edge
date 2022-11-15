import { ChangeEvent, useEffect, useState } from 'react';

type SearchControlsProps = {
  sortChoices: { order: string; name: string; label: string }[];
  sortType: string;
  sortDirection: string;
  onSortChange: (change: SortChangeRequest) => void;
};

type SortChangeRequest = {
  sortType: string;
  sortDirection: string;
};

const SearchControls = ({
  sortChoices,
  sortType,
  sortDirection,
  onSortChange,
}: SearchControlsProps): JSX.Element => {
  const [sortValue, setSortValue] = useState('featured#desc');

  const handleSortChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const sort = (target as HTMLSelectElement).value.split('#');
    onSortChange({ sortType: sort[0], sortDirection: sort[1] });
  };

  useEffect(() => {
    if (sortType && sortDirection) {
      setSortValue(`${sortType}#${sortDirection}`);
    }
  }, [sortType, sortDirection]);

  return (
    <>
      <div className="control-sort">
        <label>Sort by:</label>
        <select onChange={(event) => handleSortChange(event)} value={sortValue}>
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
