import { ComponentProps } from 'lib/component-props';
import { GraphQLSession } from 'src/types/session';
import SessionItem from './SessionItem';

type SessionsGridProps = ComponentProps & {
  fields: {
    data: {
      item: {
        children: {
          results: GraphQLSession[];
        };
      };
    };
  };
};

const SessionsGrid = (props: SessionsGridProps): JSX.Element => {
  const sessions =
    props.fields.data?.item?.children?.results &&
    props.fields.data.item.children.results.map((session, index) => (
      <SessionItem key={index} session={session} />
    ));

  return (
    <div className="item-grid sessions-grid">
      <div className="grid-content">{sessions}</div>
    </div>
  );
};

export default SessionsGrid;
