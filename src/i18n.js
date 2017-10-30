import {en} from './locales/en.coffee';

const I18n = () => {
  if(typeof window !== 'undefined' && window.App !== undefined) {
    return {en, ...window.App.I18n}
  }
  return {en}
}

export {I18n};