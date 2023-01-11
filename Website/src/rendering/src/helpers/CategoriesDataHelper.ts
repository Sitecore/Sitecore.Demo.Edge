import { Category } from '../models/Category';
import { categoriesData } from '../temp/categoriesData';

const getCategoryByCcid = (ccid: string): Category =>
  categoriesData.find((category) => category.ccid === ccid);

export const getCategoryByUrlPath = (urlPath: string): Category =>
  categoriesData.find((category) => category.url_path === urlPath);

// Returns the original category along with all its parents up to the root
export const getCategoryChain = (ccid: string): Category[] => {
  let category = getCategoryByCcid(ccid);
  if (!category) {
    return [];
  }

  const results = [category];
  while (category.parent_ccid !== '') {
    const parentCategory = getCategoryByCcid(category.parent_ccid);
    results.push(parentCategory);

    category = parentCategory;
  }

  return results;
};

export const getCategoryChildrenByCcid = (ccid: string): Category[] => {
  return categoriesData.filter((category) => category?.parent_ccid === ccid);
};
