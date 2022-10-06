import { LayoutServicePageState, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
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
  const { sitecoreContext } = useSitecoreContext();

  const isPageEditing = sitecoreContext.pageState === LayoutServicePageState.Edit;
  const hasSessions = !!props.fields?.data?.item;

  !hasSessions && console.warn('Missing Datasource Item');

  const pageEditingMissingDatasource = !hasSessions && isPageEditing && (
    <p>Missing Datasource Item</p>
  );

  const sessions =
    props.fields.data?.item?.children?.results &&
    props.fields.data.item.children.results.map((session, index) => (
      <SessionItem key={index} session={session} />
    ));

  const sessionsGrid = hasSessions && (
    <div className="item-grid sessions-grid">
      <div className="grid-content">{sessions}</div>
    </div>
  );

  return (
    <>
      {sessionsGrid}
      {pageEditingMissingDatasource}
    </>
  );
};

export default SessionsGrid;
