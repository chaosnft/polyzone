import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [
      'en', // English
      'fr', // French
      'zh', // Chinese
      'vi', // Vietnamese
      'ja', // Japanese
      'ko', // Korean
      'ru', // Russian
    ],
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};