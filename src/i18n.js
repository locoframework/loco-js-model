import en from './locales/en.coffee';

const I18n = () => {
  if(typeof App !== 'undefined') {
    return {en, ...App.I18n}
  }
  return {en}
}

export default I18n;