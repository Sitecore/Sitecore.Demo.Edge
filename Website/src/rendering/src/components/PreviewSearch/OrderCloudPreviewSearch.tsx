import useOcPreviewSearch from 'src/hooks/useOcPreviewSearch';
import PreviewSearch, { PreviewSearchProps } from './PreviewSearch';
import {
  PreviewSearchKeyphraseChangedActionPayload,
  PreviewSearchCategoryChangedActionPayload,
  PreviewSearchTrendingCategoryChangedActionPayload,
  PreviewSearchSuggestionChangedActionPayload,
} from '@sitecore-discover/widgets';
import { useAppDispatch } from 'src/redux/store';
import { categoryChanged, keyphraseChanged } from 'src/redux/ocPreviewSearch';

const OrderCloudPreviewSearch = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const previewSearchState = useOcPreviewSearch();

  const onKeyphraseChange = ({ keyphrase }: PreviewSearchKeyphraseChangedActionPayload) => {
    dispatch(keyphraseChanged(keyphrase));
  };

  const onCategoryChange = ({ category }: PreviewSearchCategoryChangedActionPayload) => {
    dispatch(categoryChanged(category));
  };

  const onTrendingCategoryChange = ({
    trendingCategory,
  }: PreviewSearchTrendingCategoryChangedActionPayload) => {
    // this action isn't implemented because ordercloud doesn't natively have the AI that Discover
    // does to determine trending categories automatically
    console.log(trendingCategory);
    throw new Error('Not implemented');
  };

  const onSuggestionChange = ({ suggestion }: PreviewSearchSuggestionChangedActionPayload) => {
    // this action isn't implemented because ordercloud doesn't natively have the AI that Discover
    // does to provide suggestions
    console.log(suggestion);
    throw new Error('Not implemented');
  };

  const previewSearchProps = {
    ...previewSearchState,
  } as unknown as PreviewSearchProps;

  return (
    <PreviewSearch
      redirectUrl="/shop/products?q="
      {...previewSearchProps}
      onKeyphraseChange={onKeyphraseChange}
      onCategoryChange={onCategoryChange}
      onTrendingCategoryChange={onTrendingCategoryChange}
      onSuggestionChange={onSuggestionChange}
    />
  );
};

export default OrderCloudPreviewSearch;
