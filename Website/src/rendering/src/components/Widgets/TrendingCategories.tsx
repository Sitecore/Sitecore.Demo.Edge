import { PreviewSearchActions } from '@sitecore-discover/widgets';
import { useEffect } from 'react';
import debounce from '../../helpers/Debounce';
import { Action } from '@sitecore-discover/react';
import { PreviewSearchWidgetProps } from '@sitecore-discover/ui';
import Link from 'next/link';
import { getCategoryByUrlPath } from '../../helpers/CategoriesDataHelper';
import { addTransformation } from '../../helpers/ImageHelper';

type Category = {
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

  return loaded && !loading ? (
    <ul>
      {trendingCategories?.map((category: Category) => {
        const categoryInformation = getCategoryByUrlPath(category.url);
        const image = categoryInformation?.image_url
          ? addTransformation(categoryInformation.image_url, 'w480')
          : '/assets/img/shop/category-placeholder.png';

        return (
          <li key={category.id}>
            <Link href={category.url}>
              <a>
                <img src={image} alt={category.text} />
                <h4>{category.text}</h4>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  ) : null;
};

export default TrendingCategories;
