import en from './locales/en.coffee';

export const I18nObj = {
  en
};

const I18n = () => (typeof App === 'undefined') ? I18nObj : {en, ...App.I18n};

export default I18n;