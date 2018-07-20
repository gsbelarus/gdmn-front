const objectStyleToCss = function(obj) {
  _decode = [];
  _css = '';
  for (n in obj) {
    _decode.push({ selector: n, styles: obj[n], number_of_objs: 0 });
  }
  while (_decode.length > 0) {
    var selector = _decode[0].selector;
    var styles = _decode[0].styles;
    _css += '\n\r' + selector + ' {';
    for (var n in styles) {
      if (styles.hasOwnProperty(n)) {
        if (typeof styles[n] === 'string') {
          _css += n + ': ' + styles[n] + '; ';
        } else {
          const _index = _decode[0].number_of_objs + 1;
          _decode.splice(_index, 0, { selector: selector + ' ' + n, styles: styles[n], number_of_objs: 0 });
          _decode[0].number_of_objs++;
        }
      }
    }
    _css += '}  ';
    _decode.splice(0, 1);
  }
  return _css;
};

module.exports = {
  objectStyleToCss
};
