const Models = () => {
  if(typeof App === 'undefined') {
    return {}
  }
  return App.Models
}

export {Models};