import { PreviewSearchActions } from '@sitecore-discover/widgets';
import { useEffect } from 'react';

export type Category = {
  id: string;
  in_content: string;
  text: string;
  url: string;
};

export type TrendingCategoriesProps = {
  loaded: boolean;
  loading: boolean;
  trendingCategories: Category[];
  dispatch: (action: string, payload: unknown) => unknown;
};

const TrendingCategories = ({
  loaded,
  loading,
  trendingCategories,
  dispatch,
}: TrendingCategoriesProps): JSX.Element => {
  const changeKeyphrase = dispatch(PreviewSearchActions.KEYPHRASE_CHANGED, {
    keyphrase: '',
  });

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
