const Models = () => {
  if(typeof window === 'undefined') {
    return {}
  }
  return window.App === undefined ? {} : window.App.Models
}

export {Models};