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
  const changeKeyphrase = window.RFK.ui.useCallback(() => {
    dispatch(window.RFK.widgets.PreviewSearchActions.KEYPHRASE_CHANGED, {
      keyphrase: '',
    });
  }, []);

  window.RFK.ui.useEffect(() => {
    let hasData = false;
    if (!hasData) {
      changeKeyphrase({ value: '' });
    }
    return () => {
      hasData = true;
    };
  }, []);

  return (
    loaded &&
    !loading &&
    window.RFK.ui.html`
    <ul>
      ${trendingCategories?.map((cat: Category) => {
        return window.RFK.ui.html`
          <li>
            <a href="${cat.url}">
              <img src="/assets/img/shop/category-placeholder.png" alt=${cat.text} />
              <h4>${cat.text}</h4>
            </a>
          </li>
        `;
      })}
    </ul>
  `
  );
};

export default TrendingCategories;
