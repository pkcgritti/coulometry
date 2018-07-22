function nPrecision (n) {
  return function (value) {
    const multiplier = Math.pow(10, n);
    return Math.round(value * multiplier) / multiplier;
  };
}

function doublePrecision (value) {
  return nPrecision(2)(value);
}

function quadruplePrecision (value) {
  return nPrecision(4)(value);
}

export default function install (Vue) {
  Vue.filter('doublePrecision', doublePrecision);
  Vue.filter('quadruplePrecision', quadruplePrecision);
}
