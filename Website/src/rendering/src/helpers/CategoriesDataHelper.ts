import { categoriesData } from '../temp/categoriesData';

// TODO: Move type outside of the helper file. Types usually go in the models folder.
export type Category = {
  ccid: string;
  name: string;
  url_path: string;
  parent_ccid?: string;
  title?: string;
  desc?: string;
  image_url?: string;
};

const getCategoryByCcid = (ccid: string): Category =>
  categoriesData.find((category) => category.ccid === ccid);

export const getCategoryByUrlPath = (urlPath: string): Category =>
  categoriesData.find((category) => category.url_path === urlPath);

// Returns the original category along with all its parents up to the root
export const getCategoryChain = (ccid: string): Category[] => {
  let category = getCategoryByCcid(ccid);
  const results = [category];

  while (category.parent_ccid !== '') {
    const parentCategory = getCategoryByCcid(category.parent_ccid);
    results.push(parentCategory);

    category = parentCategory;
  }

  return results;
};
