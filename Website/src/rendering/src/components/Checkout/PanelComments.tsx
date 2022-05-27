import { useAppDispatch } from '../../redux/store';
import { patchOrder } from '../../redux/ocCurrentCart';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';

const PanelComments = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { order } = useOcCurrentCart();

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
          <div>
            <label htmlFor="order-comments">Leave your comment for us here...</label>
            <textarea
              name="order-comments"
              id="order-comments"
              rows={3}
              defaultValue={order?.Comments}
              // TODO: Investigate if we need to disable the "Review order" button while the comment is being saved
              onBlur={(event) => updateComments(event.target.value)}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PanelComments;
