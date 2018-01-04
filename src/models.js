export const ModelsObj = {};

const Models = () => (typeof App === 'undefined') ? ModelsObj : App.Models;

export default Models;