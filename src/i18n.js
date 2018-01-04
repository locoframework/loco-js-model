import en from './locales/en.coffee';

const I18n = () => (typeof App !== 'undefined') ? {en, ...App.I18n} : {en};

export default I18n;