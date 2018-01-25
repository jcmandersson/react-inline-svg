'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _mostObservableConfig = require('recompose/mostObservableConfig');

var _mostObservableConfig2 = _interopRequireDefault(_mostObservableConfig);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _create = require('@most/create');

var _most = require('most');

var most = _interopRequireWildcard(_most);

var _ramda = require('ramda');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fetchSVGContent = function fetchSVGContent(src) {
  return _axios2.default.get(src);
};

var fromColdPromise = function fromColdPromise(f) {
  return (0, _create.create)(function (add, end, error) {
    var promise = f();

    promise.then(function (data) {
      add(data);
      end();
    }, error);
  });
};

exports.default = (0, _recompose.mapPropsStreamWithConfig)(_mostObservableConfig2.default)(function (props$) {
  var sources$ = props$.map(function (props) {
    return props.src;
  });

  var uniqSrc$ = sources$.scan(function (sources, src) {
    // @TODO: Speed up this function
    // as otherwise we constantly having to loop
    // over the whole array.
    // I'd rather just check to see if the new item
    // even has to go in.
    return (0, _ramda.uniq)([].concat(_toConsumableArray(sources), [src]));
  }, []).map(_ramda.last).skipRepeats();

  var src$ = uniqSrc$.map(function (src) {
    return fromColdPromise(function () {
      return fetchSVGContent(src);
    }).map(function (response) {
      return response.data;
    });
  }).switchLatest();

  return most.combine(function (props, src) {
    return _extends({}, props, {
      src: src
    });
  }, props$, src$);
});