type PanelCommentsProps = {
  orderComments?: string;
  onEditComments?: (comments: string) => void;
};
const PanelComments = (props: PanelCommentsProps): JSX.Element => {
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
          value={props.orderComments}
          onChange={(event) => {
            props.onEditComments(event.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
};
export default PanelComments;
