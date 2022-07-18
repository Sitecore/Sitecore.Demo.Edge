import { SearchResponseSortChoiceOrder } from '@sitecore-discover/react';
import { Category } from '../models/discover/Category';
import { Product } from '../models/discover/Product';
import { Suggestion } from '../models/discover/Suggestion';

const commonProps = {
  loaded: true,
  loading: false,
  dispatch: (): Promise<void> => {
    return null;
  },
};

const previewSearchCommonProps = {
  lockSuggestions: false,
  lockCategories: false,
  category: '',
  suggestion: '',
  trendingCategory: '',
  available: true,
  onSuggestionChange: (): void => {
    return null;
  },
  onTrendingCategoryChange: (): void => {
    return null;
  },
  onKeyphraseChange: (): void => {
    return null;
  },
  onCategoryChange: (): void => {
    return null;
  },
};

const productsProps = {
  products: [
    {
      brand: 'CenterCycle',
      breadcrumbs: 'Activities>Cycling>Equipment>Maintenance',
      category_names: ['Maintenance'],
      description: `A universal hand pump that works with the three most popular valves: Schrader, Presta and Dunlop. With its simple design it's easy to use anywhere and anytime. Super compact, making it easy to carry in your bag so you can always inflate tires on the go. The ultra-lightweight pump fits easily into any bicycle or sports equipment bag and comes with an attachment clip allowing you to take it with you anywhere you go.`,
      final_price: '6.99',
      id: 406222380,
      image_url: 'https://ch.sitecoredemo.com/api/public/content/bike-hand-pump-product?v=4e0023e4',
      name: 'Hand Pump',
      price: '6.99',
      product_group: 'PSPCCHP',
      product_url: '/shop/products/PSPCCHP/centercycle-hand-pump',
      short_description: 'Portable universal hand pump',
      sku: 'PSPCCHP',
      skuid: 1699340652,
    },
    {
      brand: 'CenterCycle',
      breadcrumbs: 'Activities>Cycling>Equipment>Maintenance',
      category_names: ['Maintenance'],
      description:
        'This pump fills both large volume fat bike tires and higher pressure MTB tires, as well as gravel bike tires with ease. Its technology uses both strokes to compress air to deliver high pressure output and saves time and effort. Integrated dust cap keeps pump head clean and thumb lock lever ensures air-tight seal.\n',
      final_price: '40.00',
      id: 230655082,
      image_url: '//ch.sitecoredemo.com/api/public/content/telescopic-bike-pump-product?v=e3799b74',
      name: 'Travel Pump',
      price: '40.00',
      product_group: 'PSPCCTP',
      product_url: '/shop/products/PSPCCTP/centercycle-travel-pump',
      short_description: 'Small and compact pump for use on go.',
      sku: 'PSPCCTP',
      skuid: 530282067,
    },
    {
      brand: 'CenterCycle',
      breadcrumbs: 'Activities>Cycling>Equipment>Maintenance',
      category_names: ['Maintenance'],
      description:
        "The new generation of BTP-1 Bike Pump is the perfect choice to inflate tires on bicycles, hybrid bikes, city bikes or even baby strollers and wheelchairs. The BTP-1 Bike Pump is equipped with a pressure indicator in bars and PSI (needle pressure gauge). It's designed for mountain bike tires with maximum pressure 8 bars / 116 PSI. Clip connection.",
      final_price: '24.99',
      id: 706727858,
      image_url: '//ch.sitecoredemo.com/api/public/content/bike-foot-pump-product?v=cbcee1dc',
      name: 'Foot Pump',
      price: '24.99',
      product_group: 'PSPCCFP',
      product_url: '/shop/products/PSPCCFP/centercycle-foot-pump',
      short_description:
        'Universal foot pump with pressure indicator bars and a needle pressure gauge',
      sku: 'PSPCCFP',
      skuid: 68055081,
    },
  ] as Product[],
};

export const mockDiscoverData = {
  previewSearchProps: {
    ...commonProps,
    ...previewSearchCommonProps,
    ...productsProps,
    rfkId: 'rfkid_6',
    categories: [
      {
        id: 'suggestion_idZXF1aXBtZW50',
        in_content: 'product',
        text: 'equipment',
        url: '/shop/category/activities/hiking/equipment',
      },
    ],
    keyphrase: 'pump',
    trendingCategories: [
      {
        id: 'suggestion_idZXF1aXBtZW50',
        in_content: 'product',
        text: 'equipment',
        url: '/shop/category/activities/hiking/equipment',
      },
    ],
    suggestions: [{ freq: 3, id: 'suggestion_idcHVtcA==', in_content: 'product', text: 'pump' }],
    selectedKeyword: 'pump',
    redirectUrl: '/shop/products?q=',
    inputQuerySelector: '#search-input',
  },

  fullPageSearchProps: {
    ...commonProps,
    ...productsProps,
    rfkId: 'rfkid_7',
    error: '',
    keyphrase: 'pump',
    totalItems: 3,
    productsPerPage: 10,
    facets: [
      {
        display_name: 'Price',
        facetType: 'price',
        number_of_products: 3,
        values: [
          {
            count: 2,
            id: 'facet_ideyJtYXgiOjE1LCJtaW4iOjV9',
            in_content: 'product',
            max: 15,
            min: 5,
            text: '5 - 15',
          },
        ],
      },
      {
        display_name: 'Final price',
        facetType: 'final_price',
        number_of_products: 3,
        values: [
          {
            count: 2,
            id: 'facet_ideyJtYXgiOjE1LCJtaW4iOjV9',
            in_content: 'product',
            max: 15,
            min: 5,
            text: '5 - 15',
          },
        ],
      },
    ],
    page: 1,
    sortChoices: [
      {
        label: 'Featured ASC',
        name: 'featured',
        order: 'asc',
      },
      {
        label: 'Featured DESC',
        name: 'featured',
        order: 'desc',
      },
    ],
    sortType: '',
    sortDirection: SearchResponseSortChoiceOrder.ASC,
    totalPages: 1,
  },

  trendingCategoriesProps: {
    ...commonProps,
    ...previewSearchCommonProps,
    rfkId: 'ps_trending_categories',
    trendingCategories: [
      {
        url: '/shop/category/activities/hiking/equipment',
        text: 'equipment',
        in_content: 'product',
        id: 'suggestion_idZXF1aXBtZW50',
      },
      {
        url: '/shop/category/activities/cycling/equipment/maintenance',
        text: 'maintenance',
        in_content: 'product',
        id: 'suggestion_idbWFpbnRlbmFuY2U=',
      },
      {
        url: '/shop/category/activities/yoga/accessories',
        text: 'accessories',
        in_content: 'product',
        id: 'suggestion_idYWNjZXNzb3JpZXM=',
      },
    ],
    products: [] as Product[],
    categories: [] as Category[],
    suggestions: [] as Suggestion[],
    keyphrase: '',
    selectedKeyword: '',
  },

  searchInputProps: {
    keyphrase: 'fitness equipment',
    setSearchString: (): void => {
      return null;
    },
    onFocus: (): void => {
      return null;
    },
    placeholder: 'I am shopping for...',
    redirectUrl: '/shop/products?q=',
    setOpen: (): void => {
      return null;
    },
  },
};
