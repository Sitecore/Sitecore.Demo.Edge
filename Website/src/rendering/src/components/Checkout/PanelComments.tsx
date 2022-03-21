import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';
import { patchOrder } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';

const PanelComments = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { order } = useOcCurrentOrder();
  const [comments, setComments] = useState(order?.Comments || '');

  const handleUpdateComments = (updatedComments: string) => {
    setComments(updatedComments);
    dispatch(patchOrder({ Comments: order.Comments }));
  };
  const debouncedUpdateComments = useCallback(debounce(handleUpdateComments, 500), []);

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Additional Comments</h2>
      </div>
      <div className="panel-body">
        <textarea
          name="order-comments"
          id="order-comments"
          rows={3}
          value={comments}
          onChange={(event) => debouncedUpdateComments(event.target.value)}
        ></textarea>
      </div>
    </div>
  );
};
export default PanelComments;
