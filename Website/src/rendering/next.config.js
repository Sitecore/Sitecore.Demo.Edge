const jssConfig = require('./src/temp/config');
const packageConfig = require('./package.json').config;
const { getPublicUrl } = require('@sitecore-jss/sitecore-jss-nextjs');

const publicUrl = getPublicUrl();

const nextConfig = {
  // Set assetPrefix to our public URL
  assetPrefix: publicUrl,

  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    // DEMO TEAM CUSTOMIZATION - Remove unused languages
    locales: [
      'en',
      'af-ZA',
      'ar-AE',
      'ar-BH',
      'ar-EG',
      'ar-IQ',
      'ar-JO',
      'ar-KW',
      'ar-LB',
      'ar-LY',
      'ar-MA',
      'ar-OM',
      'ar-QA',
      'ar-SA',
      'ar-SY',
      'ar-TN',
      'ar-YE',
      'be-BY',
      'bg-BG',
      'ca-ES',
      'cs-CZ',
      'da',
      'de-AT',
      'de-CH',
      'de-DE',
      'de-LI',
      'de-LU',
      'el-GR',
      'en-AU',
      'en-BZ',
      'en-CA',
      'en-GB',
      'en-IE',
      'en-JM',
      'en-NZ',
      'en-PH',
      'en-TT',
      'en-US',
      'en-ZA',
      'en-ZW',
      'es-AR',
      'es-BO',
      'es-CL',
      'es-CO',
      'es-CR',
      'es-DO',
      'es-EC',
      'es-ES',
      'es-GT',
      'es-HN',
      'es-MX',
      'es-NI',
      'es-PA',
      'es-PE',
      'es-PR',
      'es-PY',
      'es-SV',
      'es-UY',
      'es-VE',
      'et-EE',
      'eu-ES',
      'fa-IR',
      'fi-FI',
      'fo-FO',
      'fr-BE',
      'fr-CA',
      'fr-CH',
      'fr-FR',
      'fr-LU',
      'fr-MC',
      'gl-ES',
      'gu-IN',
      'he-IL',
      'hi-IN',
      'hr-BA',
      'hr-HR',
      'hu-HU',
      'hy-AM',
      'id-ID',
      'is-IS',
      'it-CH',
      'it-IT',
      'ja-JP',
      'ka-GE',
      'kk-KZ',
      'kn-IN',
      'ko-KR',
      'ky-KG',
      'lt-LT',
      'lv-LV',
      'mi-NZ',
      'mk-MK',
      'mn-MN',
      'mr-IN',
      'ms-BN',
      'ms-MY',
      'mt-MT',
      'nb-NO',
      'nl-BE',
      'nl-NL',
      'nn-NO',
      'pa-IN',
      'pl-PL',
      'pt-BR',
      'pt-PT',
      'ro-RO',
      'ru-RU',
      'sa-IN',
      'se-FI',
      'se-NO',
      'se-SE',
      'sk-SK',
      'sl-SI',
      'sq-AL',
      'sv-FI',
      'sv-SE',
      'sw-KE',
      'ta-IN',
      'th-TH',
      'tn-ZA',
      'tr-TR',
      'tt-RU',
      'uk-UA',
      'ur-PK',
      'vi-VN',
      'xh-ZA',
      'zh-CN',
      'zh-SG',
      'zh-TW',
      'zu-ZA',
    ],
    // END CUSTOMIZATION
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: packageConfig.language,
    localeDetection: false,
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      {
        source: '/sitecore/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/:path*`,
      },
      {
        source: '/:locale/sitecore/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      {
        source: '/:locale/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      // visitor identification
      {
        source: '/layouts/:path*',
        destination: `${jssConfig.sitecoreApiHost}/layouts/:path*`,
      },
      {
        source: '/:locale/layouts/:path*',
        destination: `${jssConfig.sitecoreApiHost}/layouts/:path*`,
      },
    ];
  },

  webpack: (config, options) => {
    applyGraphQLCodeGenerationLoaders(config, options);

    return config;
  },
};

const applyGraphQLCodeGenerationLoaders = (config, options) => {
  config.module.rules.push({
    test: /\.graphql$/,
    exclude: /node_modules/,
    use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
  });

  config.module.rules.push({
    test: /\.graphqls$/,
    exclude: /node_modules/,
    use: ['graphql-let/schema/loader'],
  });

  config.module.rules.push({
    test: /\.ya?ml$/,
    type: 'json',
    use: 'yaml-loader',
  });

  return config;
};

// DEMO TEAM CUSTOMIZATION - Add Next bundle analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer(nextConfig);
// END CUSTOMIZATION
