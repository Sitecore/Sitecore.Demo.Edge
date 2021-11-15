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
  //TODO: remove block after port number issue is fixed
  props.fields.data.item.children.results.map((s) => {
    if (s.image?.jsonValue.value) {
      s.image.jsonValue.value.src = s.image.jsonValue.value.src?.replace(
        'https://playsummit.sitecoresandbox.cloud',
        'https://playsummit.sitecoresandbox.cloud:8443'
      );
    }
  });

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
