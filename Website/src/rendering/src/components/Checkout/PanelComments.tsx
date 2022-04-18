import { useAppDispatch } from '../../redux/store';
import { patchOrder } from '../../redux/ocCurrentCart';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';

const PanelComments = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { order } = useOcCurrentOrder();

  const updateComments = async (input: string) => {
    await dispatch(patchOrder({ Comments: input }));
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Additional Comments</h2>
      </div>
      <div className="panel-body">
        <form className="form">
          <textarea
            name="order-comments"
            id="order-comments"
            rows={3}
            placeholder="Leave your comment for us here..."
            defaultValue={order?.Comments}
            onBlur={(event) => updateComments(event.target.value)}
          ></textarea>
        </form>
      </div>
    </div>
  );
};

export default PanelComments;
