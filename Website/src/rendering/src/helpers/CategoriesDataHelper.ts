import { CategoriesDataCategory } from '../models/Category';
import { categoriesData } from '../temp/categoriesData';

const getCategoryByCcid = (ccid: string): CategoriesDataCategory =>
  categoriesData.find((category) => category.ccid === ccid);

export const getCategoryByUrlPath = (urlPath: string): CategoriesDataCategory =>
  categoriesData.find((category) => category.url_path === urlPath);

export const getCategoryIdByUrlPath = (urlPath: string): string => {
  if (!urlPath) {
    return '';
  }
  if (!urlPath.includes('/categories/')) {
    return '';
  }
  const urlParts = urlPath.split('/');
  const categoryId = urlParts[urlParts.length - 1];
  return categoryId;
};

// Returns the original category along with all its parents up to the root
export const getCategoryChain = (ccid: string): CategoriesDataCategory[] => {
  let category = getCategoryByCcid(ccid);
  const results = [category];

  while (category.parent_ccid !== '') {
    const parentCategory = getCategoryByCcid(category.parent_ccid);
    results.push(parentCategory);

    category = parentCategory;
  }

  return results;
};

export const getCategoryChildrenByCcid = (ccid: string): CategoriesDataCategory[] => {
  return categoriesData.filter((category) => category?.parent_ccid === ccid);
};
