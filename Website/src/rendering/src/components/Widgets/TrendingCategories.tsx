import { PreviewSearchActions } from '@sitecore-discover/widgets';
import { useEffect } from 'react';
import debounce from '../../helpers/Debounce';
import { Action } from '@sitecore-discover/react';
import { PreviewSearchWidgetProps } from '@sitecore-discover/ui';

export type Category = {
  id: string;
  in_content: string;
  text: string;
  url: string;
};

export interface TrendingCategoriesProps extends PreviewSearchWidgetProps {
  rfkId: string;
}

const TrendingCategories = ({
  loaded,
  loading,
  trendingCategories,
  dispatch,
}: TrendingCategoriesProps): JSX.Element => {
  const changeKeyphrase: (text: string) => void = debounce(
    (text) => {
      const changeKeyphraseAction: Action = {
        type: PreviewSearchActions.KEYPHRASE_CHANGED,
        payload: { keyphrase: text || '' },
      };
      dispatch(changeKeyphraseAction);
    },
    500,
    null
  );

  useEffect(() => {
    let hasData = false;
    if (!hasData) {
      changeKeyphrase;
    }
    return () => {
      hasData = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    loaded &&
    !loading && (
      <ul>
        $
        {trendingCategories?.map((cat: Category) => {
          return (
            <li key={cat.id}>
              <a href={cat.url}>
                <img src="/assets/img/shop/category-placeholder.png" alt={cat.text} />
                <h4>{cat.text}</h4>
              </a>
            </li>
          );
        })}
      </ul>
    )
  );
};

export default TrendingCategories;
