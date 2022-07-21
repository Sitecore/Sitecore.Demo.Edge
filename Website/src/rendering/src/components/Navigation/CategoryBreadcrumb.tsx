import React from 'react';
import ShopBreadcrumb, { ShopBreadcrumbItem } from './ShopBreadcrumb';
import { getCategoryChain } from '../../helpers/CategoriesDataHelper';
import { Category } from '../../models/Category';

type CategoryBreadcrumbProps = {
  category: Category;
};

const CategoryBreadcrumb = ({ category }: CategoryBreadcrumbProps): JSX.Element => {
  if (!category) {
    return null;
  }

  const categories: Category[] = getCategoryChain(category.ccid);

  // If it's a top-level category we hide the breadcrumb
  const shopBreadcrumbItems: ShopBreadcrumbItem[] =
    categories.length > 1
      ? categories.map((category) => ({
          displayName: category?.title.length > 0 ? category.title : category.name,
          urlPath: category.url_path,
        }))
      : [];

  return (
    <ShopBreadcrumb
      rendering={{ componentName: '' }}
      params={{}}
      fields={{ items: shopBreadcrumbItems }}
      additionalCssClass="category-breadcrumb"
    />
  );
};

export default CategoryBreadcrumb;
