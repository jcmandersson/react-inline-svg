'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertReactSVGDOMProperty = convertReactSVGDOMProperty;
exports.startsWith = startsWith;
exports.serializeAttrs = serializeAttrs;
exports.getSVGFromSource = getSVGFromSource;
exports.extractSVGProps = extractSVGProps;
// Transform DOM prop/attr names applicable to `<svg>` element but react-limited

function convertReactSVGDOMProperty(str) {
  return str.replace(/[-|:]([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}

function startsWith(str, substring) {
  return str.indexOf(substring) === 0;
}

var DataPropPrefix = 'data-';
// Serialize `Attr` objects in `NamedNodeMap`
function serializeAttrs(map) {
  var ret = {};
  for (var prop, i = 0; i < map.length; i++) {
    var key = map[i].name;
    if (!startsWith(key, DataPropPrefix)) {
      prop = convertReactSVGDOMProperty(key);
    }
    ret[prop] = map[i].value;
  }
  return ret;
}

function getSVGFromSource(src) {
  var svgContainer = document.createElement('div');
  svgContainer.innerHTML = src;
  var svg = svgContainer.firstElementChild;
  svg.remove(); // deref from parent element
  return svg;
}

// get <svg /> element props
function extractSVGProps(src) {
  var map = getSVGFromSource(src).attributes;
  return map.length > 0 ? serializeAttrs(map) : null;
}