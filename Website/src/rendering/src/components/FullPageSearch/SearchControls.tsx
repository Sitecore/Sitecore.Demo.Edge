import { ChangeEvent } from 'react';

type SearchControlsProps = {
  sortChoices: unknown[];
  sortType: unknown;
  sortDirection: unknown;
  onSortChange: (change: SortChangeRequest) => void;
};

type SortChangeRequest = {
  sortType: unknown;
  sortDirection: unknown;
};

const SearchControls = ({ sortChoices, onSortChange }: SearchControlsProps): JSX.Element => {
  const handleSortChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const sort = (target as HTMLSelectElement).value.split('#');
    onSortChange({ sortType: sort[0], sortDirection: sort[1] });
  };

  return (
    <>
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
