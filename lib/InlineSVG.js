'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enhance = exports.PureInlineSVG = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _util = require('./util');

var _recompose = require('recompose');

var _ramda = require('ramda');

var _lodash = require('lodash.template');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PureInlineSVG = function PureInlineSVG(_ref) {
  var Element = _ref.Element,
      __html = _ref.__html,
      rest = _objectWithoutProperties(_ref, ['Element', '__html']);

  return (0, _react.createElement)(Element, _extends({}, rest, {
    src: null,
    children: null,
    dangerouslySetInnerHTML: { __html: __html }
  }));
};

exports.PureInlineSVG = PureInlineSVG;
var enhance = (0, _recompose.compose)((0, _recompose.setDisplayName)('InlineSVG'), (0, _recompose.defaultProps)({
  element: 'i',
  raw: false,
  src: ''
}), (0, _recompose.setPropTypes)({
  src: _propTypes.string.isRequired,
  element: _propTypes.string,
  raw: _propTypes.bool
}), (0, _recompose.withProps)(function (ownerProps) {
  return {
    src: (0, _lodash2.default)(ownerProps.src, { variable: 'd' })(ownerProps)
  };
}), (0, _recompose.mapProps)((0, _ramda.ifElse)((0, _ramda.propEq)('raw', true), function (_ref2) {
  var src = _ref2.src;
  return _extends({
    Element: 'svg',
    __html: (0, _util.getSVGFromSource)(src).innerHTML
  }, (0, _util.extractSVGProps)(src));
}, function (_ref3) {
  var element = _ref3.element,
      src = _ref3.src,
      rest = _objectWithoutProperties(_ref3, ['element', 'src']);

  return _extends({}, (0, _ramda.omit)(['raw'], rest), {
    Element: element,
    __html: src
  });
})));

exports.enhance = enhance;
exports.default = enhance(PureInlineSVG);