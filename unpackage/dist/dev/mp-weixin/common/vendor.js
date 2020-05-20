(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 109:
/*!*********************************************************************!*\
  !*** D:/桌面文件/添选项目/tianxuan/components/mescroll-uni/mescroll-uni.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = MeScroll; /* mescroll
                                                                                                        * version 1.2.5
                                                                                                        * 2020-03-15 wenju
                                                                                                        * http://www.mescroll.com
                                                                                                        */

function MeScroll(options, isScrollBody) {
  var me = this;
  me.version = '1.2.5'; // mescroll版本号
  me.options = options || {}; // 配置
  me.isScrollBody = isScrollBody || false; // 滚动区域是否为原生页面滚动; 默认为scroll-view

  me.isDownScrolling = false; // 是否在执行下拉刷新的回调
  me.isUpScrolling = false; // 是否在执行上拉加载的回调
  var hasDownCallback = me.options.down && me.options.down.callback; // 是否配置了down的callback

  // 初始化下拉刷新
  me.initDownScroll();
  // 初始化上拉加载,则初始化
  me.initUpScroll();

  // 自动加载
  setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
    // 自动触发下拉刷新 (只有配置了down的callback才自动触发下拉刷新)
    if (me.optDown.use && me.optDown.auto && hasDownCallback) {
      if (me.optDown.autoShowLoading) {
        me.triggerDownScroll(); // 显示下拉进度,执行下拉回调
      } else {
        me.optDown.callback && me.optDown.callback(me); // 不显示下拉进度,直接执行下拉回调
      }
    }
    // 自动触发上拉加载
    setTimeout(function () {// 延时确保先执行down的callback,再执行up的callback,因为部分小程序emit是异步,会导致isUpAutoLoad判断有误
      me.optUp.use && me.optUp.auto && !me.isUpAutoLoad && me.triggerUpScroll();
    }, 100);
  }, 30); // 需让me.optDown.inited和me.optUp.inited先执行
}

/* 配置参数:下拉刷新 */
MeScroll.prototype.extendDownScroll = function (optDown) {
  // 下拉刷新的配置
  MeScroll.extend(optDown, {
    use: true, // 是否启用下拉刷新; 默认true
    auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
    native: false, // 是否使用系统自带的下拉刷新; 默认false; 仅mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
    autoShowLoading: false, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
    isLock: false, // 是否锁定下拉刷新,默认false;
    offset: 80, // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    startTop: 100, // scroll-view滚动到顶部时,此时的scroll-top不一定为0, 此值用于控制最大的误差
    fps: 80, // 下拉节流 (值越大每秒刷新频率越高)
    inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    bottomOffset: 20, // 当手指touchmove位置在距离body底部20px范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
    minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
    textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
    inited: null, // 下拉刷新初始化完毕的回调
    inOffset: null, // 下拉的距离进入offset范围内那一刻的回调
    outOffset: null, // 下拉的距离大于offset那一刻的回调
    onMoving: null, // 下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
    beforeLoading: null, // 准备触发下拉刷新的回调: 如果return true,将不触发showLoading和callback回调; 常用来完全自定义下拉刷新, 参考案例【淘宝 v6.8.0】
    showLoading: null, // 显示下拉刷新进度的回调
    afterLoading: null, // 准备结束下拉的回调. 返回结束下拉的延时执行时间,默认0ms; 常用于结束下拉之前再显示另外一小段动画,才去隐藏下拉刷新的场景, 参考案例【dotJump】
    endDownScroll: null, // 结束下拉刷新的回调
    callback: function callback(mescroll) {
      // 下拉刷新的回调;默认重置上拉加载列表为第一页
      mescroll.resetUpScroll();
    } });

};

/* 配置参数:上拉加载 */
MeScroll.prototype.extendUpScroll = function (optUp) {
  // 上拉加载的配置
  MeScroll.extend(optUp, {
    use: true, // 是否启用上拉加载; 默认true
    auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
    isLock: false, // 是否锁定上拉加载,默认false;
    isBoth: true, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
    isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    callback: null, // 上拉加载的回调;function(page,mescroll){ }
    page: {
      num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
      size: 20, // 每页数据的数量
      time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
    },
    noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
    offset: 80, // 距底部多远时,触发upCallback
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '-- END --', // 没有更多数据的提示文本
    bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorBottom)
    textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
    inited: null, // 初始化完毕的回调
    showLoading: null, // 显示加载中的回调
    showNoMore: null, // 显示无更多数据的回调
    hideUpScroll: null, // 隐藏上拉加载的回调
    errDistance: 60, // endErr的时候需往上滑动一段距离,使其往下滑动时再次触发onReachBottom,仅mescroll-body生效
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: null, // 图片路径,默认null (绝对路径或网络图)
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
      duration: 300, // 回到顶部的动画时长,默认300ms (当值为0或300则使用系统自带回到顶部,更流畅; 其他值则通过step模拟,部分机型可能不够流畅,所以非特殊情况不建议修改此项)
      btnClick: null, // 点击按钮的回调
      onShow: null, // 是否显示的回调
      zIndex: 9990, // fixed定位z-index值
      left: null, // 到左边的距离, 默认null. 此项有值时,right不生效. (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      right: 20, // 到右边的距离, 默认20 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      bottom: 120, // 到底部的距离, 默认120 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      safearea: false, // bottom的偏移量是否加上底部安全区的距离, 默认false, 需要适配iPhoneX时使用 (具体的界面如果不配置此项,则取本vue的safearea值)
      width: 72, // 回到顶部图标的宽度, 默认72 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      radius: "50%" // 圆角, 默认"50%" (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
    },
    empty: {
      use: true, // 是否显示空布局
      icon: null, // 图标路径
      tip: '~ 暂无相关数据 ~', // 提示
      btnText: '', // 按钮
      btnClick: null, // 点击按钮的回调
      onShow: null, // 是否显示的回调
      fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
      top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
      zIndex: 99 // fixed定位z-index值
    },
    onScroll: false // 是否监听滚动事件
  });
};

/* 配置参数 */
MeScroll.extend = function (userOption, defaultOption) {
  if (!userOption) return defaultOption;
  for (var key in defaultOption) {
    if (userOption[key] == null) {
      var def = defaultOption[key];
      if (def != null && typeof def === 'object') {
        userOption[key] = MeScroll.extend({}, def); // 深度匹配
      } else {
        userOption[key] = def;
      }
    } else if (typeof userOption[key] === 'object') {
      MeScroll.extend(userOption[key], defaultOption[key]); // 深度匹配
    }
  }
  return userOption;
};

/* 简单判断是否配置了颜色 (非透明,非白色) */
MeScroll.prototype.hasColor = function (color) {
  if (!color) return false;
  var c = color.toLowerCase();
  return c != "#fff" && c != "#ffffff" && c != "transparent" && c != "white";
};

/* -------初始化下拉刷新------- */
MeScroll.prototype.initDownScroll = function () {
  var me = this;
  // 配置参数
  me.optDown = me.options.down || {};
  if (!me.optDown.textColor && me.hasColor(me.optDown.bgColor)) me.optDown.textColor = "#fff"; // 当bgColor有值且textColor未设置,则textColor默认白色
  me.extendDownScroll(me.optDown);

  // 如果是mescroll-body且配置了native,则禁止自定义的下拉刷新
  if (me.isScrollBody && me.optDown.native) {
    me.optDown.use = false;
  } else {
    me.optDown.native = false; // 仅mescroll-body支持,mescroll-uni不支持
  }

  me.downHight = 0; // 下拉区域的高度

  // 在页面中加入下拉布局
  if (me.optDown.use && me.optDown.inited) {
    // 初始化完毕的回调
    setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optDown.inited(me);
    }, 0);
  }
};

/* 列表touchstart事件 */
MeScroll.prototype.touchstartEvent = function (e) {
  if (!this.optDown.use) return;

  this.startPoint = this.getPoint(e); // 记录起点
  this.startTop = this.getScrollTop(); // 记录此时的滚动条位置
  this.lastPoint = this.startPoint; // 重置上次move的点
  this.maxTouchmoveY = this.getBodyHeight() - this.optDown.bottomOffset; // 手指触摸的最大范围(写在touchstart避免body获取高度为0的情况)
  this.inTouchend = false; // 标记不是touchend
};

/* 列表touchmove事件 */
MeScroll.prototype.touchmoveEvent = function (e) {




  if (!this.optDown.use) return;
  if (!this.startPoint) return;
  var me = this;

  // 节流
  var t = new Date().getTime();
  if (me.moveTime && t - me.moveTime < me.moveTimeDiff) {// 小于节流时间,则不处理
    return;
  } else {
    me.moveTime = t;
    if (!me.moveTimeDiff) me.moveTimeDiff = 1000 / me.optDown.fps;
  }

  var scrollTop = me.getScrollTop(); // 当前滚动条的距离
  var curPoint = me.getPoint(e); // 当前点

  var moveY = curPoint.y - me.startPoint.y; // 和起点比,移动的距离,大于0向下拉,小于0向上拉

  // 向下拉 && 在顶部
  // mescroll-body,直接判定在顶部即可
  // scroll-view在滚动时不会触发touchmove,当触顶/底/左/右时,才会触发touchmove
  // scroll-view滚动到顶部时,scrollTop不一定为0; 在iOS的APP中scrollTop可能为负数,不一定和startTop相等
  if (moveY > 0 && (
  me.isScrollBody && scrollTop <= 0 ||

  !me.isScrollBody && (scrollTop <= 0 || scrollTop <= me.optDown.startTop && scrollTop === me.startTop)))
  {
    // 可下拉的条件
    if (!me.inTouchend && !me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling &&
    me.optUp.isBoth)) {

      // 下拉的角度是否在配置的范围内
      var angle = me.getAngle(me.lastPoint, curPoint); // 两点之间的角度,区间 [0,90]
      if (angle < me.optDown.minAngle) return; // 如果小于配置的角度,则不往下执行下拉刷新

      // 如果手指的位置超过配置的距离,则提前结束下拉,避免Webview嵌套导致touchend无法触发
      if (me.maxTouchmoveY > 0 && curPoint.y >= me.maxTouchmoveY) {
        me.inTouchend = true; // 标记执行touchend
        me.touchendEvent(); // 提前触发touchend
        return;
      }




      me.preventDefault(e); // 阻止默认事件

      var diff = curPoint.y - me.lastPoint.y; // 和上次比,移动的距离 (大于0向下,小于0向上)

      // 下拉距离  < 指定距离
      if (me.downHight < me.optDown.offset) {
        if (me.movetype !== 1) {
          me.movetype = 1; // 加入标记,保证只执行一次
          me.optDown.inOffset && me.optDown.inOffset(me); // 进入指定距离范围内那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        me.downHight += diff * me.optDown.inOffsetRate; // 越往下,高度变化越小

        // 指定距离  <= 下拉距离
      } else {
        if (me.movetype !== 2) {
          me.movetype = 2; // 加入标记,保证只执行一次
          me.optDown.outOffset && me.optDown.outOffset(me); // 下拉超过指定距离那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        if (diff > 0) {// 向下拉
          me.downHight += Math.round(diff * me.optDown.outOffsetRate); // 越往下,高度变化越小
        } else {// 向上收
          me.downHight += diff; // 向上收回高度,则向上滑多少收多少高度
        }
      }

      var rate = me.downHight / me.optDown.offset; // 下拉区域当前高度与指定距离的比值
      me.optDown.onMoving && me.optDown.onMoving(me, rate, me.downHight); // 下拉过程中的回调,一直在执行
    }
  }

  me.lastPoint = curPoint; // 记录本次移动的点
};

/* 列表touchend事件 */
MeScroll.prototype.touchendEvent = function (e) {
  if (!this.optDown.use) return;
  // 如果下拉区域高度已改变,则需重置回来
  if (this.isMoveDown) {
    if (this.downHight >= this.optDown.offset) {
      // 符合触发刷新的条件
      this.triggerDownScroll();
    } else {
      // 不符合的话 则重置
      this.downHight = 0;
      this.optDown.endDownScroll && this.optDown.endDownScroll(this);
    }
    this.movetype = 0;
    this.isMoveDown = false;
  } else if (!this.isScrollBody && this.getScrollTop() === this.startTop) {// scroll-view到顶/左/右/底的滑动事件
    var isScrollUp = this.getPoint(e).y - this.startPoint.y < 0; // 和起点比,移动的距离,大于0向下拉,小于0向上拉
    // 上滑
    if (isScrollUp) {
      // 需检查滑动的角度
      var angle = this.getAngle(this.getPoint(e), this.startPoint); // 两点之间的角度,区间 [0,90]
      if (angle > 80) {
        // 检查并触发上拉
        this.triggerUpScroll(true);
      }
    }
  }
};

/* 根据点击滑动事件获取第一个手指的坐标 */
MeScroll.prototype.getPoint = function (e) {
  if (!e) {
    return {
      x: 0,
      y: 0 };

  }
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY };

  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY };

  } else {
    return {
      x: e.clientX,
      y: e.clientY };

  }
};

/* 计算两点之间的角度: 区间 [0,90]*/
MeScroll.prototype.getAngle = function (p1, p2) {
  var x = Math.abs(p1.x - p2.x);
  var y = Math.abs(p1.y - p2.y);
  var z = Math.sqrt(x * x + y * y);
  var angle = 0;
  if (z !== 0) {
    angle = Math.asin(y / z) / Math.PI * 180;
  }
  return angle;
};

/* 触发下拉刷新 */
MeScroll.prototype.triggerDownScroll = function () {
  if (this.optDown.beforeLoading && this.optDown.beforeLoading(this)) {
    //return true则处于完全自定义状态
  } else {
    this.showDownScroll(); // 下拉刷新中...
    this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示下拉进度布局 */
MeScroll.prototype.showDownScroll = function () {
  this.isDownScrolling = true; // 标记下拉中
  if (this.optDown.native) {
    uni.startPullDownRefresh(); // 系统自带的下拉刷新
    this.optDown.showLoading && this.optDown.showLoading(this, 0); // 仍触发showLoading,因为上拉加载用到
  } else {
    this.downHight = this.optDown.offset; // 更新下拉区域高度
    this.optDown.showLoading && this.optDown.showLoading(this, this.downHight); // 下拉刷新中...
  }
};

/* 显示系统自带的下拉刷新时需要处理的业务 */
MeScroll.prototype.onPullDownRefresh = function () {
  this.isDownScrolling = true; // 标记下拉中
  this.optDown.showLoading && this.optDown.showLoading(this, 0); // 仍触发showLoading,因为上拉加载用到
  this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
};

/* 结束下拉刷新 */
MeScroll.prototype.endDownScroll = function () {
  if (this.optDown.native) {// 结束原生下拉刷新
    this.isDownScrolling = false;
    this.optDown.endDownScroll && this.optDown.endDownScroll(this);
    uni.stopPullDownRefresh();
    return;
  }
  var me = this;
  // 结束下拉刷新的方法
  var endScroll = function endScroll() {
    me.downHight = 0;
    me.isDownScrolling = false;
    me.optDown.endDownScroll && me.optDown.endDownScroll(me);
    !me.isScrollBody && me.setScrollHeight(0); // scroll-view重置滚动区域,使数据不满屏时仍可检查触发翻页
  };
  // 结束下拉刷新时的回调
  var delay = 0;
  if (me.optDown.afterLoading) delay = me.optDown.afterLoading(me); // 结束下拉刷新的延时,单位ms
  if (typeof delay === 'number' && delay > 0) {
    setTimeout(endScroll, delay);
  } else {
    endScroll();
  }
};

/* 锁定下拉刷新:isLock=ture,null锁定;isLock=false解锁 */
MeScroll.prototype.lockDownScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optDown.isLock = isLock;
};

/* 锁定上拉加载:isLock=ture,null锁定;isLock=false解锁 */
MeScroll.prototype.lockUpScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optUp.isLock = isLock;
};

/* -------初始化上拉加载------- */
MeScroll.prototype.initUpScroll = function () {
  var me = this;
  // 配置参数
  me.optUp = me.options.up || { use: false };
  if (!me.optUp.textColor && me.hasColor(me.optUp.bgColor)) me.optUp.textColor = "#fff"; // 当bgColor有值且textColor未设置,则textColor默认白色
  me.extendUpScroll(me.optUp);

  if (!me.optUp.isBounce) me.setBounce(false); // 不允许bounce时,需禁止window的touchmove事件

  if (me.optUp.use === false) return; // 配置不使用上拉加载时,则不初始化上拉布局
  me.optUp.hasNext = true; // 如果使用上拉,则默认有下一页
  me.startNum = me.optUp.page.num + 1; // 记录page开始的页码

  // 初始化完毕的回调
  if (me.optUp.inited) {
    setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optUp.inited(me);
    }, 0);
  }
};

/*滚动到底部的事件 (仅mescroll-body生效)*/
MeScroll.prototype.onReachBottom = function () {
  if (this.isScrollBody && !this.isUpScrolling) {// 只能支持下拉刷新的时候同时可以触发上拉加载,否则滚动到底部就需要上滑一点才能触发onReachBottom
    if (!this.optUp.isLock && this.optUp.hasNext) {
      this.triggerUpScroll();
    }
  }
};

/*列表滚动事件 (仅mescroll-body生效)*/
MeScroll.prototype.onPageScroll = function (e) {
  if (!this.isScrollBody) return;

  // 更新滚动条的位置 (主要用于判断下拉刷新时,滚动条是否在顶部)
  this.setScrollTop(e.scrollTop);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }
};

/*列表滚动事件*/
MeScroll.prototype.scroll = function (e, onScroll) {
  // 更新滚动条的位置
  this.setScrollTop(e.scrollTop);
  // 更新滚动内容高度
  this.setScrollHeight(e.scrollHeight);

  // 向上滑还是向下滑动
  if (this.preScrollY == null) this.preScrollY = 0;
  this.isScrollUp = e.scrollTop - this.preScrollY > 0;
  this.preScrollY = e.scrollTop;

  // 上滑 && 检查并触发上拉
  this.isScrollUp && this.triggerUpScroll(true);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }

  // 滑动监听
  this.optUp.onScroll && onScroll && onScroll();
};

/* 触发上拉加载 */
MeScroll.prototype.triggerUpScroll = function (isCheck) {
  if (!this.isUpScrolling && this.optUp.use && this.optUp.callback) {
    // 是否校验在底部; 默认不校验
    if (isCheck === true) {
      var canUp = false;
      // 还有下一页 && 没有锁定 && 不在下拉中
      if (this.optUp.hasNext && !this.optUp.isLock && !this.isDownScrolling) {
        if (this.getScrollBottom() <= this.optUp.offset) {// 到底部
          canUp = true; // 标记可上拉
        }
      }
      if (canUp === false) return;
    }
    this.showUpScroll(); // 上拉加载中...
    this.optUp.page.num++; // 预先加一页,如果失败则减回
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = this.optUp.page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = this.optUp.page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = this.optUp.page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示上拉加载中 */
MeScroll.prototype.showUpScroll = function () {
  this.isUpScrolling = true; // 标记上拉加载中
  this.optUp.showLoading && this.optUp.showLoading(this); // 回调
};

/* 显示上拉无更多数据 */
MeScroll.prototype.showNoMore = function () {
  this.optUp.hasNext = false; // 标记无更多数据
  this.optUp.showNoMore && this.optUp.showNoMore(this); // 回调
};

/* 隐藏上拉区域**/
MeScroll.prototype.hideUpScroll = function () {
  this.optUp.hideUpScroll && this.optUp.hideUpScroll(this); // 回调
};

/* 结束上拉加载 */
MeScroll.prototype.endUpScroll = function (isShowNoMore) {
  if (isShowNoMore != null) {// isShowNoMore=null,不处理下拉状态,下拉刷新的时候调用
    if (isShowNoMore) {
      this.showNoMore(); // isShowNoMore=true,显示无更多数据
    } else {
      this.hideUpScroll(); // isShowNoMore=false,隐藏上拉加载
    }
  }
  this.isUpScrolling = false; // 标记结束上拉加载
};

/* 重置上拉加载列表为第一页
    *isShowLoading 是否显示进度布局;
    * 1.默认null,不传参,则显示上拉加载的进度布局
    * 2.传参true, 则显示下拉刷新的进度布局
    * 3.传参false,则不显示上拉和下拉的进度 (常用于静默更新列表数据)
    */
MeScroll.prototype.resetUpScroll = function (isShowLoading) {
  if (this.optUp && this.optUp.use) {
    var page = this.optUp.page;
    this.prePageNum = page.num; // 缓存重置前的页码,加载失败可退回
    this.prePageTime = page.time; // 缓存重置前的时间,加载失败可退回
    page.num = this.startNum; // 重置为第一页
    page.time = null; // 重置时间为空
    if (!this.isDownScrolling && isShowLoading !== false) {// 如果不是下拉刷新触发的resetUpScroll并且不配置列表静默更新,则显示进度;
      if (isShowLoading == null) {
        this.removeEmpty(); // 移除空布局
        this.showUpScroll(); // 不传参,默认显示上拉加载的进度布局
      } else {
        this.showDownScroll(); // 传true,显示下拉刷新的进度布局,不清空列表
      }
    }
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback && this.optUp.callback(this); // 执行上拉回调
  }
};

/* 设置page.num的值 */
MeScroll.prototype.setPageNum = function (num) {
  this.optUp.page.num = num - 1;
};

/* 设置page.size的值 */
MeScroll.prototype.setPageSize = function (size) {
  this.optUp.page.size = size;
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalPage: 总页数(必传)
    * systime: 服务器时间 (可空)
    */
MeScroll.prototype.endByPage = function (dataSize, totalPage, systime) {
  var hasNext;
  if (this.optUp.use && totalPage != null) hasNext = this.optUp.page.num < totalPage; // 是否还有下一页
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalSize: 列表所有数据总数量(必传)
    * systime: 服务器时间 (可空)
    */
MeScroll.prototype.endBySize = function (dataSize, totalSize, systime) {
  var hasNext;
  if (this.optUp.use && totalSize != null) {
    var loadSize = (this.optUp.page.num - 1) * this.optUp.page.size + dataSize; // 已加载的数据总数
    hasNext = loadSize < totalSize; // 是否还有下一页
  }
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据个数(不是所有页的数据总和),用于上拉加载判断是否还有下一页.如果不传,则会判断还有下一页
    * hasNext: 是否还有下一页,布尔类型;用来解决这个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据dataSize判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
    * systime: 服务器时间(可空);用来解决这个小问题:当准备翻下一页时,数据库新增了几条记录,此时翻下一页,前面的几条数据会和上一页的重复;这里传入了systime,那么upCallback的page.time就会有值,把page.time传给服务器,让后台过滤新加入的那几条记录
    */
MeScroll.prototype.endSuccess = function (dataSize, hasNext, systime) {
  var me = this;
  // 结束下拉刷新
  if (me.isDownScrolling) me.endDownScroll();

  // 结束上拉加载
  if (me.optUp.use) {
    var isShowNoMore; // 是否已无更多数据
    if (dataSize != null) {
      var pageNum = me.optUp.page.num; // 当前页码
      var pageSize = me.optUp.page.size; // 每页长度
      // 如果是第一页
      if (pageNum === 1) {
        if (systime) me.optUp.page.time = systime; // 设置加载列表数据第一页的时间
      }
      if (dataSize < pageSize || hasNext === false) {
        // 返回的数据不满一页时,则说明已无更多数据
        me.optUp.hasNext = false;
        if (dataSize === 0 && pageNum === 1) {
          // 如果第一页无任何数据且配置了空布局
          isShowNoMore = false;
          me.showEmpty();
        } else {
          // 总列表数少于配置的数量,则不显示无更多数据
          var allDataSize = (pageNum - 1) * pageSize + dataSize;
          if (allDataSize < me.optUp.noMoreSize) {
            isShowNoMore = false;
          } else {
            isShowNoMore = true;
          }
          me.removeEmpty(); // 移除空布局
        }
      } else {
        // 还有下一页
        isShowNoMore = false;
        me.optUp.hasNext = true;
        me.removeEmpty(); // 移除空布局
      }
    }

    // 隐藏上拉
    me.endUpScroll(isShowNoMore);
  }
};

/* 回调失败,结束下拉刷新和上拉加载 */
MeScroll.prototype.endErr = function (errDistance) {
  // 结束下拉,回调失败重置回原来的页码和时间
  if (this.isDownScrolling) {
    var page = this.optUp.page;
    if (page && this.prePageNum) {
      page.num = this.prePageNum;
      page.time = this.prePageTime;
    }
    this.endDownScroll();
  }
  // 结束上拉,回调失败重置回原来的页码
  if (this.isUpScrolling) {
    this.optUp.page.num--;
    this.endUpScroll(false);
    // 如果是mescroll-body,则需往回滚一定距离
    if (this.isScrollBody && errDistance !== 0) {// 不处理0
      if (!errDistance) errDistance = this.optUp.errDistance; // 不传,则取默认
      this.scrollTo(this.getScrollTop() - errDistance, 0); // 往上回滚的距离
    }
  }
};

/* 显示空布局 */
MeScroll.prototype.showEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(true);
};

/* 移除空布局 */
MeScroll.prototype.removeEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(false);
};

/* 显示回到顶部的按钮 */
MeScroll.prototype.showTopBtn = function () {
  if (!this.topBtnShow) {
    this.topBtnShow = true;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(true);
  }
};

/* 隐藏回到顶部的按钮 */
MeScroll.prototype.hideTopBtn = function () {
  if (this.topBtnShow) {
    this.topBtnShow = false;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(false);
  }
};

/* 获取滚动条的位置 */
MeScroll.prototype.getScrollTop = function () {
  return this.scrollTop || 0;
};

/* 记录滚动条的位置 */
MeScroll.prototype.setScrollTop = function (y) {
  this.scrollTop = y;
};

/* 滚动到指定位置 */
MeScroll.prototype.scrollTo = function (y, t) {
  this.myScrollTo && this.myScrollTo(y, t); // scrollview需自定义回到顶部方法
};

/* 自定义scrollTo */
MeScroll.prototype.resetScrollTo = function (myScrollTo) {
  this.myScrollTo = myScrollTo;
};

/* 滚动条到底部的距离 */
MeScroll.prototype.getScrollBottom = function () {
  return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
};

/* 计步器
    star: 开始值
    end: 结束值
    callback(step,timer): 回调step值,计步器timer,可自行通过window.clearInterval(timer)结束计步器;
    t: 计步时长,传0则直接回调end值;不传则默认300ms
    rate: 周期;不传则默认30ms计步一次
    * */
MeScroll.prototype.getStep = function (star, end, callback, t, rate) {
  var diff = end - star; // 差值
  if (t === 0 || diff === 0) {
    callback && callback(end);
    return;
  }
  t = t || 300; // 时长 300ms
  rate = rate || 30; // 周期 30ms
  var count = t / rate; // 次数
  var step = diff / count; // 步长
  var i = 0; // 计数
  var timer = setInterval(function () {
    if (i < count - 1) {
      star += step;
      callback && callback(star, timer);
      i++;
    } else {
      callback && callback(end, timer); // 最后一次直接设置end,避免计算误差
      clearInterval(timer);
    }
  }, rate);
};

/* 滚动容器的高度 */
MeScroll.prototype.getClientHeight = function (isReal) {
  var h = this.clientHeight || 0;
  if (h === 0 && isReal !== true) {// 未获取到容器的高度,可临时取body的高度 (可能会有误差)
    h = this.getBodyHeight();
  }
  return h;
};
MeScroll.prototype.setClientHeight = function (h) {
  this.clientHeight = h;
};

/* 滚动内容的高度 */
MeScroll.prototype.getScrollHeight = function () {
  return this.scrollHeight || 0;
};
MeScroll.prototype.setScrollHeight = function (h) {
  this.scrollHeight = h;
};

/* body的高度 */
MeScroll.prototype.getBodyHeight = function () {
  return this.bodyHeight || 0;
};
MeScroll.prototype.setBodyHeight = function (h) {
  this.bodyHeight = h;
};

/* 阻止浏览器默认滚动事件 */
MeScroll.prototype.preventDefault = function (e) {
  // 小程序不支持e.preventDefault
  // app的bounce只能通过配置pages.json的style.app-plus.bounce为"none"来禁止
  // cancelable:是否可以被禁用; defaultPrevented:是否已经被禁用
  if (e && e.cancelable && !e.defaultPrevented) e.preventDefault();
};

/* 是否允许下拉回弹(橡皮筋效果); true或null为允许; false禁止bounce */
MeScroll.prototype.setBounce = function (isBounce) {




































































};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 110:
/*!****************************************************************************!*\
  !*** D:/桌面文件/添选项目/tianxuan/components/mescroll-uni/mescroll-uni-option.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 全局配置
// mescroll-body 和 mescroll-uni 通用
var GlobalOption = {
  down: {
    // 其他down的配置参数也可以写,这里只展示了常用的配置:
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    offset: 80, // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    native: false // 是否使用系统自带的下拉刷新; 默认false; 仅在mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
  },
  up: {
    // 其他up的配置参数也可以写,这里只展示了常用的配置:
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '-- 没有更多了！！！ --', // 没有更多数据的提示文本
    offset: 80, // 距底部多远时,触发upCallback
    isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: "http://www.mescroll.com/img/mescroll-totop.png?v=1", // 图片路径 (建议放入static目录, 如 /static/img/mescroll-totop.png )
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000px
      right: 20, // 到右边的距离, 默认20 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
      bottom: 120, // 到底部的距离, 默认120 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
      width: 72 // 回到顶部图标的宽度, 默认72 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
    },
    empty: {
      use: true, // 是否显示空布局
      icon: "http://www.mescroll.com/img/mescroll-empty.png?v=1", // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
      tip: '~ 暂无相关数据 ~' // 提示
    } } };var _default =



GlobalOption;exports.default = _default;

/***/ }),

/***/ 125:
/*!***********************************************************!*\
  !*** D:/桌面文件/添选项目/tianxuan/components/uni-icons/icons.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 138:
/*!***********************************************************************!*\
  !*** D:/桌面文件/添选项目/tianxuan/components/uni-swipe-action-item/mpwxs.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  data: function data() {
    return {
      position: [],
      button: [] };

  },
  computed: {
    pos: function pos() {
      return JSON.stringify(this.position);
    },
    btn: function btn() {
      return JSON.stringify(this.button);
    } },

  watch: {
    show: function show(newVal) {
      if (this.autoClose) return;
      var valueObj = this.position[0];
      if (!valueObj) {
        this.init();
        return;
      }
      valueObj.show = newVal;
      this.$set(this.position, 0, valueObj);
    } },

  created: function created() {
    if (this.swipeaction.children !== undefined) {
      this.swipeaction.children.push(this);
    }
  },
  mounted: function mounted() {
    this.init();

  },
  beforeDestroy: function beforeDestroy() {var _this = this;
    this.swipeaction.children.forEach(function (item, index) {
      if (item === _this) {
        _this.swipeaction.children.splice(index, 1);
      }
    });
  },
  methods: {
    init: function init() {var _this2 = this;

      setTimeout(function () {
        _this2.getSize();
        _this2.getButtonSize();
      }, 50);
    },
    closeSwipe: function closeSwipe(e) {
      if (!this.autoClose) return;
      this.swipeaction.closeOther(this);
    },

    change: function change(e) {
      this.$emit('change', e.open);
      var valueObj = this.position[0];
      if (valueObj.show !== e.open) {
        valueObj.show = e.open;
        this.$set(this.position, 0, valueObj);
      }
    },
    onClick: function onClick(index, item) {
      this.$emit('click', {
        content: item,
        index: index });

    },
    getSize: function getSize() {var _this3 = this;
      var views = uni.createSelectorQuery().in(this);
      views.
      selectAll('.selector-query-hock').
      boundingClientRect(function (data) {
        if (_this3.autoClose) {
          data[0].show = false;
        } else {
          data[0].show = _this3.show;
        }
        _this3.position = data;
      }).
      exec();
    },
    getButtonSize: function getButtonSize() {var _this4 = this;
      var views = uni.createSelectorQuery().in(this);
      views.
      selectAll('.button-hock').
      boundingClientRect(function (data) {
        _this4.button = data;
      }).
      exec();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 169:
/*!*******************************************************************!*\
  !*** D:/桌面文件/添选项目/tianxuan/static/yixuan-selectAddress/city.json ***!
  \*******************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, default */
/***/ (function(module) {

module.exports = [{"id":"1","name":"北京市","city":[{"id":"37","name":"东城区","area":[{"id":"567","name":"东华门街道"},{"id":"568","name":"东四街道"},{"id":"569","name":"东直门街道"},{"id":"570","name":"交道口街道"},{"id":"571","name":"北新桥街道"},{"id":"572","name":"和平里街道"},{"id":"573","name":"安定门街道"},{"id":"574","name":"建国门街道"},{"id":"575","name":"景山街道"},{"id":"576","name":"朝阳门街道"}]},{"id":"38","name":"西城区","area":[{"id":"577","name":"什刹海街道"},{"id":"578","name":"展览路街道"},{"id":"579","name":"德胜街道"},{"id":"580","name":"新街口街道"},{"id":"581","name":"月坛街道"},{"id":"582","name":"西长安街街道"},{"id":"583","name":"金融街街道"}]},{"id":"39","name":"崇文区","area":[{"id":"584","name":"东花市街道"},{"id":"585","name":"体育馆路街道"},{"id":"586","name":"前门街道"},{"id":"587","name":"天坛街道"},{"id":"588","name":"崇文门外街道"},{"id":"589","name":"永定门外街道"},{"id":"590","name":"龙潭街道"}]},{"id":"40","name":"宣武区","area":[{"id":"591","name":"大栅栏街道"},{"id":"592","name":"天桥街道"},{"id":"593","name":"广安门内街道"},{"id":"594","name":"广安门外街道"},{"id":"595","name":"椿树街道"},{"id":"596","name":"牛街街道"},{"id":"597","name":"白纸坊街道"},{"id":"598","name":"陶然亭街道"}]},{"id":"41","name":"朝阳区","area":[{"id":"599","name":"三里屯街道"},{"id":"600","name":"三间房地区（三间房乡）"},{"id":"601","name":"东坝地区（东坝乡）"},{"id":"602","name":"东风地区（东风乡）"},{"id":"603","name":"亚运村街道"},{"id":"604","name":"八里庄街道"},{"id":"605","name":"六里屯街道"},{"id":"606","name":"劲松街道"},{"id":"607","name":"十八里店地区（十八里店乡）"},{"id":"608","name":"南磨房地区（南磨房乡）"},{"id":"609","name":"双井街道"},{"id":"610","name":"呼家楼街道"},{"id":"611","name":"和平街街道"},{"id":"612","name":"团结湖街道"},{"id":"613","name":"垡头街道"},{"id":"614","name":"大屯街道"},{"id":"615","name":"太阳宫地区（太阳宫乡）"},{"id":"616","name":"奥运村地区（奥运村乡）"},{"id":"617","name":"孙河地区（孙河乡）"},{"id":"618","name":"安贞街道"},{"id":"619","name":"将台地区（将台乡）"},{"id":"620","name":"小关街道"},{"id":"621","name":"小红门地区（小红门乡）"},{"id":"622","name":"崔各庄地区（崔各庄乡）"},{"id":"623","name":"左家庄街道"},{"id":"624","name":"常营回族地区（常营回族乡）"},{"id":"625","name":"平房地区（平房乡）"},{"id":"626","name":"建国门外街道"},{"id":"627","name":"望京开发街道"},{"id":"628","name":"望京街道"},{"id":"629","name":"朝阳门外街道"},{"id":"630","name":"来广营地区（来广营乡）"},{"id":"631","name":"潘家园街道"},{"id":"632","name":"王四营地区（王四营乡）"},{"id":"633","name":"管庄地区（管庄乡）"},{"id":"634","name":"豆各庄地区（豆各庄乡）"},{"id":"635","name":"酒仙桥街道"},{"id":"636","name":"金盏地区（金盏乡）"},{"id":"637","name":"首都机场街道"},{"id":"638","name":"香河园街道"},{"id":"639","name":"高碑店地区（高碑店乡）"},{"id":"640","name":"麦子店街道"},{"id":"641","name":"黑庄户地区（黑庄户乡）"}]},{"id":"42","name":"丰台区","area":[{"id":"642","name":"东铁匠营街道"},{"id":"643","name":"东高地街道"},{"id":"644","name":"丰台街道"},{"id":"645","name":"云岗街道"},{"id":"646","name":"南苑乡"},{"id":"647","name":"南苑街道"},{"id":"648","name":"卢沟桥乡"},{"id":"649","name":"卢沟桥街道"},{"id":"650","name":"右安门街道"},{"id":"651","name":"和义街道"},{"id":"652","name":"大红门街道"},{"id":"653","name":"太平桥街道"},{"id":"654","name":"宛平城地区"},{"id":"655","name":"新村街道"},{"id":"656","name":"方庄地区"},{"id":"657","name":"王佐镇"},{"id":"658","name":"花乡乡"},{"id":"659","name":"西罗园街道"},{"id":"660","name":"长辛店街道"},{"id":"661","name":"长辛店镇"},{"id":"662","name":"马家堡街道"}]},{"id":"43","name":"石景山区","area":[{"id":"663","name":"五里坨街道"},{"id":"664","name":"八宝山街道"},{"id":"665","name":"八角街道"},{"id":"666","name":"北辛安街道"},{"id":"667","name":"古城街道"},{"id":"668","name":"广宁街道"},{"id":"669","name":"老山街道"},{"id":"670","name":"苹果园街道"},{"id":"671","name":"金顶街街道"},{"id":"672","name":"鲁谷街道"}]},{"id":"44","name":"海淀区","area":[{"id":"673","name":"万寿路街道"},{"id":"674","name":"万柳地区（海淀乡）"},{"id":"675","name":"上地街道"},{"id":"676","name":"上庄镇"},{"id":"677","name":"东升地区（东升乡）"},{"id":"678","name":"中关村街道"},{"id":"679","name":"八里庄街道"},{"id":"680","name":"北下关街道"},{"id":"681","name":"北太平庄街道"},{"id":"682","name":"四季青镇"},{"id":"683","name":"学院路街道"},{"id":"684","name":"曙光街道"},{"id":"685","name":"永定路街道"},{"id":"686","name":"海淀街道"},{"id":"687","name":"清华园街道"},{"id":"688","name":"清河街道"},{"id":"689","name":"温泉镇"},{"id":"690","name":"燕园街道"},{"id":"691","name":"甘家口街道"},{"id":"692","name":"田村路街道"},{"id":"693","name":"紫竹院街道"},{"id":"694","name":"羊坊店街道"},{"id":"695","name":"花园路街道"},{"id":"696","name":"苏家坨镇"},{"id":"697","name":"西三旗街道"},{"id":"698","name":"西北旺镇"},{"id":"699","name":"青龙桥街道"},{"id":"700","name":"香山街道"},{"id":"701","name":"马连洼街道"}]},{"id":"45","name":"门头沟区","area":[{"id":"702","name":"东辛房街道"},{"id":"703","name":"军庄镇"},{"id":"704","name":"城子街道"},{"id":"705","name":"大台街道"},{"id":"706","name":"大峪街道"},{"id":"707","name":"妙峰山镇"},{"id":"708","name":"斋堂镇"},{"id":"709","name":"永定镇"},{"id":"710","name":"清水镇"},{"id":"711","name":"潭柘寺镇"},{"id":"712","name":"王平地区"},{"id":"713","name":"雁翅镇"},{"id":"714","name":"龙泉镇"}]},{"id":"46","name":"房山区","area":[{"id":"715","name":"东风街道"},{"id":"716","name":"佛子庄乡"},{"id":"717","name":"十渡镇"},{"id":"718","name":"南窖乡"},{"id":"719","name":"史家营乡"},{"id":"720","name":"向阳街道"},{"id":"721","name":"周口店地区"},{"id":"722","name":"城关街道"},{"id":"723","name":"大安山乡"},{"id":"724","name":"大石窝镇"},{"id":"725","name":"张坊镇"},{"id":"726","name":"拱辰街道"},{"id":"727","name":"新镇街道"},{"id":"728","name":"星城街道"},{"id":"729","name":"河北镇"},{"id":"730","name":"琉璃河地区"},{"id":"731","name":"石楼镇"},{"id":"732","name":"窦店镇"},{"id":"733","name":"良乡地区"},{"id":"734","name":"蒲洼乡"},{"id":"735","name":"西潞街道"},{"id":"736","name":"迎风街道"},{"id":"737","name":"长沟镇"},{"id":"738","name":"长阳镇"},{"id":"739","name":"阎村镇"},{"id":"740","name":"霞云岭乡"},{"id":"741","name":"青龙湖镇"},{"id":"742","name":"韩村河镇"}]},{"id":"47","name":"通州区","area":[{"id":"743","name":"中仓街道"},{"id":"744","name":"于家务回族乡"},{"id":"745","name":"北苑街道"},{"id":"746","name":"台湖镇"},{"id":"747","name":"宋庄镇"},{"id":"748","name":"张家湾镇"},{"id":"749","name":"新华街道"},{"id":"750","name":"梨园地区"},{"id":"751","name":"永乐店镇"},{"id":"752","name":"永顺地区"},{"id":"753","name":"漷县镇"},{"id":"754","name":"潞城镇"},{"id":"755","name":"玉桥街道"},{"id":"756","name":"西集镇"},{"id":"757","name":"马驹桥镇"}]},{"id":"48","name":"顺义区","area":[{"id":"758","name":"仁和地区"},{"id":"759","name":"光明街道"},{"id":"760","name":"北务镇"},{"id":"761","name":"北小营镇"},{"id":"762","name":"北石槽镇"},{"id":"763","name":"南彩镇"},{"id":"764","name":"南法信地区"},{"id":"765","name":"后沙峪地区"},{"id":"766","name":"大孙各庄镇"},{"id":"767","name":"天竺地区"},{"id":"768","name":"张镇"},{"id":"769","name":"木林镇"},{"id":"770","name":"李桥镇"},{"id":"771","name":"李遂镇"},{"id":"772","name":"杨镇地区"},{"id":"773","name":"牛栏山地区"},{"id":"774","name":"石园街道"},{"id":"775","name":"胜利街道"},{"id":"776","name":"赵全营镇"},{"id":"777","name":"马坡地区"},{"id":"778","name":"高丽营镇"},{"id":"779","name":"龙湾屯镇"}]},{"id":"49","name":"昌平区","area":[{"id":"780","name":"东小口地区"},{"id":"781","name":"兴寿镇"},{"id":"782","name":"北七家镇"},{"id":"783","name":"十三陵镇"},{"id":"784","name":"南口地区"},{"id":"785","name":"南邵镇"},{"id":"786","name":"回龙观地区"},{"id":"787","name":"城北街道"},{"id":"788","name":"城南街道"},{"id":"789","name":"小汤山镇"},{"id":"790","name":"崔村镇"},{"id":"791","name":"沙河地区"},{"id":"792","name":"流村镇"},{"id":"793","name":"百善镇"},{"id":"794","name":"长陵镇"},{"id":"795","name":"阳坊镇"},{"id":"796","name":"马池口地区"}]},{"id":"50","name":"大兴区","area":[{"id":"797","name":"亦庄地区（亦庄镇）"},{"id":"798","name":"兴丰街道"},{"id":"799","name":"北臧村镇"},{"id":"800","name":"安定镇"},{"id":"801","name":"庞各庄镇"},{"id":"802","name":"旧宫地区（旧宫镇）"},{"id":"803","name":"林校路街道"},{"id":"804","name":"榆垡镇"},{"id":"805","name":"清源街道"},{"id":"806","name":"瀛海镇"},{"id":"807","name":"礼贤镇"},{"id":"808","name":"西红门地区（西红门镇）"},{"id":"809","name":"采育镇"},{"id":"810","name":"长子营镇"},{"id":"811","name":"青云店镇"},{"id":"812","name":"魏善庄镇"},{"id":"813","name":"黄村地区（黄村镇）"}]},{"id":"51","name":"怀柔区","area":[{"id":"814","name":"九渡河镇"},{"id":"815","name":"北房镇"},{"id":"816","name":"喇叭沟门满族乡"},{"id":"817","name":"宝山镇"},{"id":"818","name":"庙城地区"},{"id":"819","name":"怀北镇"},{"id":"820","name":"怀柔地区"},{"id":"821","name":"杨宋镇"},{"id":"822","name":"桥梓镇"},{"id":"823","name":"汤河口镇"},{"id":"824","name":"泉河街道"},{"id":"825","name":"渤海镇"},{"id":"826","name":"琉璃庙镇"},{"id":"827","name":"长哨营满族乡"},{"id":"828","name":"雁栖地区"},{"id":"829","name":"龙山街道"}]},{"id":"52","name":"平谷区","area":[{"id":"830","name":"东高村镇"},{"id":"831","name":"兴谷街道"},{"id":"832","name":"刘家店镇"},{"id":"833","name":"南独乐河镇"},{"id":"834","name":"夏各庄镇"},{"id":"835","name":"大兴庄镇"},{"id":"836","name":"大华山镇"},{"id":"837","name":"山东庄镇"},{"id":"838","name":"峪口地区"},{"id":"839","name":"渔阳地区"},{"id":"840","name":"滨河街道"},{"id":"841","name":"熊儿寨乡"},{"id":"842","name":"王辛庄镇"},{"id":"843","name":"金海湖地区"},{"id":"844","name":"镇罗营镇"},{"id":"845","name":"马坊地区"},{"id":"846","name":"马昌营镇"},{"id":"847","name":"黄松峪乡"}]},{"id":"53","name":"密云县","area":[{"id":"848","name":"不老屯镇"},{"id":"849","name":"东邵渠镇"},{"id":"850","name":"冯家峪镇"},{"id":"851","name":"北庄镇"},{"id":"852","name":"十里堡镇"},{"id":"853","name":"古北口镇"},{"id":"854","name":"大城子镇"},{"id":"855","name":"太师屯镇"},{"id":"856","name":"密云镇"},{"id":"857","name":"巨各庄镇"},{"id":"858","name":"新城子镇"},{"id":"859","name":"果园街道"},{"id":"860","name":"檀营地区（檀营满族蒙古族乡）"},{"id":"861","name":"河南寨镇"},{"id":"862","name":"溪翁庄镇"},{"id":"863","name":"石城镇"},{"id":"864","name":"穆家峪镇"},{"id":"865","name":"西田各庄镇"},{"id":"866","name":"高岭镇"},{"id":"867","name":"鼓楼街道"}]},{"id":"54","name":"延庆县","area":[{"id":"868","name":"井庄镇"},{"id":"869","name":"八达岭镇"},{"id":"870","name":"刘斌堡乡"},{"id":"871","name":"千家店镇"},{"id":"872","name":"四海镇"},{"id":"873","name":"大庄科乡"},{"id":"874","name":"大榆树镇"},{"id":"875","name":"康庄镇"},{"id":"876","name":"延庆镇"},{"id":"877","name":"张山营镇"},{"id":"878","name":"旧县镇"},{"id":"879","name":"永宁镇"},{"id":"880","name":"沈家营镇"},{"id":"881","name":"珍珠泉乡"},{"id":"882","name":"香营乡"}]}]},{"id":"2","name":"天津市","city":[{"id":"55","name":"和平区","area":[{"id":"883","name":"体育馆街道"},{"id":"884","name":"劝业场街道"},{"id":"885","name":"南市街道"},{"id":"886","name":"南营门街道"},{"id":"887","name":"小白楼街道"},{"id":"888","name":"新兴街道"}]},{"id":"56","name":"河东区","area":[{"id":"889","name":"上杭路街道"},{"id":"890","name":"东新街道"},{"id":"891","name":"中山门街道"},{"id":"892","name":"二号桥街道"},{"id":"893","name":"向阳楼街道"},{"id":"894","name":"唐家口街道"},{"id":"895","name":"大王庄街道"},{"id":"896","name":"大直沽街道"},{"id":"897","name":"天津铁厂街道"},{"id":"898","name":"富民路街道"},{"id":"899","name":"常州道街道"},{"id":"900","name":"春华街道"},{"id":"901","name":"鲁山道街道"}]},{"id":"57","name":"河西区","area":[{"id":"902","name":"下瓦房街道"},{"id":"903","name":"东海街道"},{"id":"904","name":"友谊路街道"},{"id":"905","name":"大营门街道"},{"id":"906","name":"天塔街道"},{"id":"907","name":"尖山街道"},{"id":"908","name":"挂甲寺街道"},{"id":"909","name":"柳林街道"},{"id":"910","name":"桃园街道"},{"id":"911","name":"梅江街道"},{"id":"912","name":"越秀路街道"},{"id":"913","name":"陈塘庄街道"},{"id":"914","name":"马场街道"}]},{"id":"58","name":"南开区","area":[{"id":"915","name":"万兴街道"},{"id":"916","name":"体育中心街道"},{"id":"917","name":"八里台街道"},{"id":"918","name":"兴南街道"},{"id":"919","name":"华苑街道"},{"id":"920","name":"向阳路街道"},{"id":"921","name":"嘉陵道街道"},{"id":"922","name":"学府街道"},{"id":"923","name":"广开街道"},{"id":"924","name":"王顶堤街道"},{"id":"925","name":"长虹街道"},{"id":"926","name":"鼓楼街道"}]},{"id":"59","name":"河北区","area":[{"id":"927","name":"光复道街道"},{"id":"928","name":"宁园街道"},{"id":"929","name":"建昌道街道"},{"id":"930","name":"新开河街道"},{"id":"931","name":"月牙河街道"},{"id":"932","name":"望海楼街道"},{"id":"933","name":"江都路街道"},{"id":"934","name":"王串场街道"},{"id":"935","name":"铁东路街道"},{"id":"936","name":"鸿顺里街道"}]},{"id":"60","name":"红桥区","area":[{"id":"937","name":"丁字沽街道"},{"id":"938","name":"三条石街道"},{"id":"939","name":"双环村街道"},{"id":"940","name":"咸阳北路街道"},{"id":"941","name":"大胡同街道"},{"id":"942","name":"芥园道街道"},{"id":"943","name":"西于庄街道"},{"id":"944","name":"西沽街道"},{"id":"945","name":"邵公庄街道"},{"id":"946","name":"铃铛阁街道"}]},{"id":"61","name":"塘沽区","area":[{"id":"947","name":"三槐路街道"},{"id":"948","name":"北塘街道"},{"id":"949","name":"向阳街道"},{"id":"950","name":"大沽街道"},{"id":"951","name":"新城镇"},{"id":"952","name":"新村街道"},{"id":"953","name":"新河街道"},{"id":"954","name":"新港街道"},{"id":"955","name":"杭州道街道"},{"id":"956","name":"渤海石油街道"},{"id":"957","name":"胡家园街道"},{"id":"958","name":"解放路街道"}]},{"id":"62","name":"汉沽区","area":[{"id":"959","name":"大田镇"},{"id":"960","name":"天化街道"},{"id":"961","name":"寨上街道"},{"id":"962","name":"杨家泊镇"},{"id":"963","name":"汉沽街道"},{"id":"964","name":"河西街道"},{"id":"965","name":"盐场街道"},{"id":"966","name":"茶淀镇"},{"id":"967","name":"营城镇"}]},{"id":"63","name":"大港区","area":[{"id":"968","name":"中塘镇"},{"id":"969","name":"古林街道"},{"id":"970","name":"太平镇"},{"id":"971","name":"小王庄镇"},{"id":"972","name":"海滨街道"},{"id":"973","name":"港西街道"},{"id":"974","name":"胜利街道"},{"id":"975","name":"迎宾街道"}]},{"id":"64","name":"东丽区","area":[{"id":"976","name":"万新街道"},{"id":"977","name":"丰年村街道"},{"id":"978","name":"么六桥乡"},{"id":"979","name":"军粮城镇"},{"id":"980","name":"华明镇"},{"id":"981","name":"大毕庄镇"},{"id":"982","name":"张贵庄街道"},{"id":"983","name":"新立街道"},{"id":"984","name":"无瑕街道"}]},{"id":"65","name":"西青区","area":[{"id":"985","name":"中北镇"},{"id":"986","name":"南河镇"},{"id":"987","name":"大寺镇"},{"id":"988","name":"张家窝镇"},{"id":"989","name":"李七庄街道"},{"id":"990","name":"杨柳青镇"},{"id":"991","name":"王稳庄镇"},{"id":"992","name":"西营门街道"},{"id":"993","name":"辛口镇"}]},{"id":"66","name":"津南区","area":[{"id":"994","name":"八里台镇"},{"id":"995","name":"北闸口镇"},{"id":"996","name":"双桥河镇"},{"id":"997","name":"双港镇"},{"id":"998","name":"咸水沽镇"},{"id":"999","name":"小站镇"},{"id":"1000","name":"葛沽镇"},{"id":"1001","name":"辛庄镇"},{"id":"1002","name":"长青办事处"}]},{"id":"67","name":"北辰区","area":[{"id":"1003","name":"北仓镇"},{"id":"1004","name":"双口镇"},{"id":"1005","name":"双街镇"},{"id":"1006","name":"大张庄镇"},{"id":"1007","name":"天穆镇"},{"id":"1008","name":"宜兴埠镇"},{"id":"1009","name":"小淀镇"},{"id":"1010","name":"普东街道"},{"id":"1011","name":"果园新村街道"},{"id":"1012","name":"西堤头镇"},{"id":"1013","name":"集贤里街道"},{"id":"1014","name":"青光镇"}]},{"id":"68","name":"武清区","area":[{"id":"1015","name":"上马台镇"},{"id":"1016","name":"下伍旗镇"},{"id":"1017","name":"下朱庄街道"},{"id":"1018","name":"东蒲洼街道"},{"id":"1019","name":"东马圈镇"},{"id":"1020","name":"南蔡村镇"},{"id":"1021","name":"城关镇"},{"id":"1022","name":"大孟庄镇"},{"id":"1023","name":"大王古庄镇"},{"id":"1024","name":"大碱厂镇"},{"id":"1025","name":"大良镇"},{"id":"1026","name":"大黄堡乡"},{"id":"1027","name":"崔黄口镇"},{"id":"1028","name":"徐官屯街道"},{"id":"1029","name":"曹子里乡"},{"id":"1030","name":"杨村街道"},{"id":"1031","name":"梅厂镇"},{"id":"1032","name":"汊沽港镇"},{"id":"1033","name":"河北屯镇"},{"id":"1034","name":"河西务镇"},{"id":"1035","name":"泗村店镇"},{"id":"1036","name":"王庆坨镇"},{"id":"1037","name":"白古屯乡"},{"id":"1038","name":"石各庄镇"},{"id":"1039","name":"豆张庄乡"},{"id":"1040","name":"运河西街道"},{"id":"1041","name":"陈咀镇"},{"id":"1042","name":"高村乡"},{"id":"1043","name":"黄庄街道"},{"id":"1044","name":"黄花店镇"}]},{"id":"69","name":"宝坻区","area":[{"id":"1045","name":"八门城镇"},{"id":"1046","name":"口东镇"},{"id":"1047","name":"史各庄镇"},{"id":"1048","name":"周良庄镇"},{"id":"1049","name":"城关镇"},{"id":"1050","name":"大口屯镇"},{"id":"1051","name":"大唐庄镇"},{"id":"1052","name":"大白庄镇"},{"id":"1053","name":"大钟庄镇"},{"id":"1054","name":"尔王庄乡"},{"id":"1055","name":"新安镇"},{"id":"1056","name":"新开口镇"},{"id":"1057","name":"方家庄镇"},{"id":"1058","name":"林亭口镇"},{"id":"1059","name":"牛家牌乡"},{"id":"1060","name":"牛道口镇"},{"id":"1061","name":"王卜庄镇"},{"id":"1062","name":"郝各庄镇"},{"id":"1063","name":"霍各庄镇"},{"id":"1064","name":"马家店镇"},{"id":"1065","name":"高家庄镇"},{"id":"1066","name":"黄庄乡"}]},{"id":"70","name":"宁河县","area":[{"id":"1067","name":"七里海镇"},{"id":"1068","name":"东棘坨镇"},{"id":"1069","name":"丰台镇"},{"id":"1070","name":"俵口乡"},{"id":"1071","name":"北淮淀乡"},{"id":"1072","name":"大北涧沽镇"},{"id":"1073","name":"宁河镇"},{"id":"1074","name":"岳龙镇"},{"id":"1075","name":"廉庄子乡"},{"id":"1076","name":"板桥镇"},{"id":"1077","name":"潘庄镇"},{"id":"1078","name":"芦台镇"},{"id":"1079","name":"苗庄镇"},{"id":"1080","name":"造甲城镇"}]},{"id":"71","name":"静海县","area":[{"id":"1081","name":"中旺镇"},{"id":"1082","name":"双塘镇"},{"id":"1083","name":"台头镇"},{"id":"1084","name":"唐官屯镇"},{"id":"1085","name":"团泊镇"},{"id":"1086","name":"大丰堆镇"},{"id":"1087","name":"大邱庄镇"},{"id":"1088","name":"子牙镇"},{"id":"1089","name":"杨成庄乡"},{"id":"1090","name":"梁头镇"},{"id":"1091","name":"沿庄镇"},{"id":"1092","name":"独流镇"},{"id":"1093","name":"王口镇"},{"id":"1094","name":"良王庄乡"},{"id":"1095","name":"蔡公庄镇"},{"id":"1096","name":"西翟庄镇"},{"id":"1097","name":"陈官屯镇"},{"id":"1098","name":"静海镇"}]},{"id":"72","name":"蓟县","area":[{"id":"1099","name":"上仓镇"},{"id":"1100","name":"下仓镇"},{"id":"1101","name":"下窝头镇"},{"id":"1102","name":"下营镇"},{"id":"1103","name":"东二营乡"},{"id":"1104","name":"东施古镇"},{"id":"1105","name":"东赵各庄乡"},{"id":"1106","name":"五百户镇"},{"id":"1107","name":"侯家营镇"},{"id":"1108","name":"出头岭镇"},{"id":"1109","name":"别山镇"},{"id":"1110","name":"城关镇"},{"id":"1111","name":"孙各庄满族乡"},{"id":"1112","name":"官庄镇"},{"id":"1113","name":"尤古庄镇"},{"id":"1114","name":"文昌街道"},{"id":"1115","name":"杨津庄镇"},{"id":"1116","name":"桑梓镇"},{"id":"1117","name":"洇溜镇"},{"id":"1118","name":"白涧镇"},{"id":"1119","name":"礼明庄乡"},{"id":"1120","name":"穿芳峪乡"},{"id":"1121","name":"罗庄子镇"},{"id":"1122","name":"西龙虎峪镇"},{"id":"1123","name":"许家台乡"},{"id":"1124","name":"邦均镇"},{"id":"1125","name":"马伸桥镇"}]}]},{"id":"3","name":"河北省","city":[{"id":"73","name":"石家庄市","area":[{"id":"1126","name":"井陉县"},{"id":"1127","name":"井陉矿区"},{"id":"1128","name":"元氏县"},{"id":"1129","name":"平山县"},{"id":"1130","name":"新乐市"},{"id":"1131","name":"新华区"},{"id":"1132","name":"无极县"},{"id":"1133","name":"晋州市"},{"id":"1134","name":"栾城县"},{"id":"1135","name":"桥东区"},{"id":"1136","name":"桥西区"},{"id":"1137","name":"正定县"},{"id":"1138","name":"深泽县"},{"id":"1139","name":"灵寿县"},{"id":"1140","name":"藁城市"},{"id":"1141","name":"行唐县"},{"id":"1142","name":"裕华区"},{"id":"1143","name":"赞皇县"},{"id":"1144","name":"赵县"},{"id":"1145","name":"辛集市"},{"id":"1146","name":"长安区"},{"id":"1147","name":"高邑县"},{"id":"1148","name":"鹿泉市"}]},{"id":"74","name":"唐山市","area":[{"id":"1149","name":"丰南区"},{"id":"1150","name":"丰润区"},{"id":"1151","name":"乐亭县"},{"id":"1152","name":"古冶区"},{"id":"1153","name":"唐海县"},{"id":"1154","name":"开平区"},{"id":"1155","name":"滦南县"},{"id":"1156","name":"滦县"},{"id":"1157","name":"玉田县"},{"id":"1158","name":"路北区"},{"id":"1159","name":"路南区"},{"id":"1160","name":"迁安市"},{"id":"1161","name":"迁西县"},{"id":"1162","name":"遵化市"}]},{"id":"75","name":"秦皇岛市","area":[{"id":"1163","name":"北戴河区"},{"id":"1164","name":"卢龙县"},{"id":"1165","name":"山海关区"},{"id":"1166","name":"抚宁县"},{"id":"1167","name":"昌黎县"},{"id":"1168","name":"海港区"},{"id":"1169","name":"青龙满族自治县"}]},{"id":"76","name":"邯郸市","area":[{"id":"1170","name":"丛台区"},{"id":"1171","name":"临漳县"},{"id":"1172","name":"复兴区"},{"id":"1173","name":"大名县"},{"id":"1174","name":"峰峰矿区"},{"id":"1175","name":"广平县"},{"id":"1176","name":"成安县"},{"id":"1177","name":"曲周县"},{"id":"1178","name":"武安市"},{"id":"1179","name":"永年县"},{"id":"1180","name":"涉县"},{"id":"1181","name":"磁县"},{"id":"1182","name":"肥乡县"},{"id":"1183","name":"邯山区"},{"id":"1184","name":"邯郸县"},{"id":"1185","name":"邱县"},{"id":"1186","name":"馆陶县"},{"id":"1187","name":"魏县"},{"id":"1188","name":"鸡泽县"}]},{"id":"77","name":"邢台市","area":[{"id":"1189","name":"临城县"},{"id":"1190","name":"临西县"},{"id":"1191","name":"任县"},{"id":"1192","name":"内丘县"},{"id":"1193","name":"南和县"},{"id":"1194","name":"南宫市"},{"id":"1195","name":"威县"},{"id":"1196","name":"宁晋县"},{"id":"1197","name":"巨鹿县"},{"id":"1198","name":"平乡县"},{"id":"1199","name":"广宗县"},{"id":"1200","name":"新河县"},{"id":"1201","name":"柏乡县"},{"id":"1202","name":"桥东区"},{"id":"1203","name":"桥西区"},{"id":"1204","name":"沙河市"},{"id":"1205","name":"清河县"},{"id":"1206","name":"邢台县"},{"id":"1207","name":"隆尧县"}]},{"id":"78","name":"保定市","area":[{"id":"1208","name":"北市区"},{"id":"1209","name":"南市区"},{"id":"1210","name":"博野县"},{"id":"1211","name":"唐县"},{"id":"1212","name":"安国市"},{"id":"1213","name":"安新县"},{"id":"1214","name":"定兴县"},{"id":"1215","name":"定州市"},{"id":"1216","name":"容城县"},{"id":"1217","name":"徐水县"},{"id":"1218","name":"新市区"},{"id":"1219","name":"易县"},{"id":"1220","name":"曲阳县"},{"id":"1221","name":"望都县"},{"id":"1222","name":"涞水县"},{"id":"1223","name":"涞源县"},{"id":"1224","name":"涿州市"},{"id":"1225","name":"清苑县"},{"id":"1226","name":"满城县"},{"id":"1227","name":"蠡县"},{"id":"1228","name":"阜平县"},{"id":"1229","name":"雄县"},{"id":"1230","name":"顺平县"},{"id":"1231","name":"高碑店市"},{"id":"1232","name":"高阳县"}]},{"id":"79","name":"张家口市","area":[{"id":"1233","name":"万全县"},{"id":"1234","name":"下花园区"},{"id":"1235","name":"宣化区"},{"id":"1236","name":"宣化县"},{"id":"1237","name":"尚义县"},{"id":"1238","name":"崇礼县"},{"id":"1239","name":"康保县"},{"id":"1240","name":"张北县"},{"id":"1241","name":"怀安县"},{"id":"1242","name":"怀来县"},{"id":"1243","name":"桥东区"},{"id":"1244","name":"桥西区"},{"id":"1245","name":"沽源县"},{"id":"1246","name":"涿鹿县"},{"id":"1247","name":"蔚县"},{"id":"1248","name":"赤城县"},{"id":"1249","name":"阳原县"}]},{"id":"80","name":"承德市","area":[{"id":"1250","name":"丰宁满族自治县"},{"id":"1251","name":"兴隆县"},{"id":"1252","name":"双桥区"},{"id":"1253","name":"双滦区"},{"id":"1254","name":"围场满族蒙古族自治县"},{"id":"1255","name":"宽城满族自治县"},{"id":"1256","name":"平泉县"},{"id":"1257","name":"承德县"},{"id":"1258","name":"滦平县"},{"id":"1259","name":"隆化县"},{"id":"1260","name":"鹰手营子矿区"}]},{"id":"81","name":"衡水市","area":[{"id":"1261","name":"冀州市"},{"id":"1262","name":"安平县"},{"id":"1263","name":"故城县"},{"id":"1264","name":"景县"},{"id":"1265","name":"枣强县"},{"id":"1266","name":"桃城区"},{"id":"1267","name":"武强县"},{"id":"1268","name":"武邑县"},{"id":"1269","name":"深州市"},{"id":"1270","name":"阜城县"},{"id":"1271","name":"饶阳县"}]},{"id":"82","name":"廊坊市","area":[{"id":"1272","name":"三河市"},{"id":"1273","name":"固安县"},{"id":"1274","name":"大厂回族自治县"},{"id":"1275","name":"大城县"},{"id":"1276","name":"安次区"},{"id":"1277","name":"广阳区"},{"id":"1278","name":"文安县"},{"id":"1279","name":"永清县"},{"id":"1280","name":"霸州市"},{"id":"1281","name":"香河县"}]},{"id":"83","name":"沧州市","area":[{"id":"1282","name":"东光县"},{"id":"1283","name":"任丘市"},{"id":"1284","name":"南皮县"},{"id":"1285","name":"吴桥县"},{"id":"1286","name":"孟村回族自治县"},{"id":"1287","name":"新华区"},{"id":"1288","name":"沧县"},{"id":"1289","name":"河间市"},{"id":"1290","name":"泊头市"},{"id":"1291","name":"海兴县"},{"id":"1292","name":"献县"},{"id":"1293","name":"盐山县"},{"id":"1294","name":"肃宁县"},{"id":"1295","name":"运河区"},{"id":"1296","name":"青县"},{"id":"1297","name":"黄骅市"}]}]},{"id":"4","name":"山西省","city":[{"id":"84","name":"太原市","area":[{"id":"1298","name":"万柏林区"},{"id":"1299","name":"古交市"},{"id":"1300","name":"娄烦县"},{"id":"1301","name":"小店区"},{"id":"1302","name":"尖草坪区"},{"id":"1303","name":"晋源区"},{"id":"1304","name":"杏花岭区"},{"id":"1305","name":"清徐县"},{"id":"1306","name":"迎泽区"},{"id":"1307","name":"阳曲县"}]},{"id":"85","name":"大同市","area":[{"id":"1308","name":"南郊区"},{"id":"1309","name":"城区"},{"id":"1310","name":"大同县"},{"id":"1311","name":"天镇县"},{"id":"1312","name":"左云县"},{"id":"1313","name":"广灵县"},{"id":"1314","name":"新荣区"},{"id":"1315","name":"浑源县"},{"id":"1316","name":"灵丘县"},{"id":"1317","name":"矿区"},{"id":"1318","name":"阳高县"}]},{"id":"86","name":"阳泉市","area":[{"id":"1319","name":"城区"},{"id":"1320","name":"平定县"},{"id":"1321","name":"盂县"},{"id":"1322","name":"矿区"},{"id":"1323","name":"郊区"}]},{"id":"87","name":"长治市","area":[{"id":"1324","name":"城区"},{"id":"1325","name":"壶关县"},{"id":"1326","name":"屯留县"},{"id":"1327","name":"平顺县"},{"id":"1328","name":"武乡县"},{"id":"1329","name":"沁县"},{"id":"1330","name":"沁源县"},{"id":"1331","name":"潞城市"},{"id":"1332","name":"襄垣县"},{"id":"1333","name":"郊区"},{"id":"1334","name":"长子县"},{"id":"1335","name":"长治县"},{"id":"1336","name":"黎城县"}]},{"id":"88","name":"晋城市","area":[{"id":"1337","name":"城区"},{"id":"1338","name":"沁水县"},{"id":"1339","name":"泽州县"},{"id":"1340","name":"阳城县"},{"id":"1341","name":"陵川县"},{"id":"1342","name":"高平市"}]},{"id":"89","name":"朔州市","area":[{"id":"1343","name":"右玉县"},{"id":"1344","name":"山阴县"},{"id":"1345","name":"平鲁区"},{"id":"1346","name":"应县"},{"id":"1347","name":"怀仁县"},{"id":"1348","name":"朔城区"}]},{"id":"90","name":"晋中市","area":[{"id":"1349","name":"介休市"},{"id":"1350","name":"和顺县"},{"id":"1351","name":"太谷县"},{"id":"1352","name":"寿阳县"},{"id":"1353","name":"左权县"},{"id":"1354","name":"平遥县"},{"id":"1355","name":"昔阳县"},{"id":"1356","name":"榆次区"},{"id":"1357","name":"榆社县"},{"id":"1358","name":"灵石县"},{"id":"1359","name":"祁县"}]},{"id":"91","name":"运城市","area":[{"id":"1360","name":"万荣县"},{"id":"1361","name":"临猗县"},{"id":"1362","name":"垣曲县"},{"id":"1363","name":"夏县"},{"id":"1364","name":"平陆县"},{"id":"1365","name":"新绛县"},{"id":"1366","name":"永济市"},{"id":"1367","name":"河津市"},{"id":"1368","name":"盐湖区"},{"id":"1369","name":"稷山县"},{"id":"1370","name":"绛县"},{"id":"1371","name":"芮城县"},{"id":"1372","name":"闻喜县"}]},{"id":"92","name":"忻州市","area":[{"id":"1373","name":"五台县"},{"id":"1374","name":"五寨县"},{"id":"1375","name":"代县"},{"id":"1376","name":"保德县"},{"id":"1377","name":"偏关县"},{"id":"1378","name":"原平市"},{"id":"1379","name":"宁武县"},{"id":"1380","name":"定襄县"},{"id":"1381","name":"岢岚县"},{"id":"1382","name":"忻府区"},{"id":"1383","name":"河曲县"},{"id":"1384","name":"神池县"},{"id":"1385","name":"繁峙县"},{"id":"1386","name":"静乐县"}]},{"id":"93","name":"临汾市","area":[{"id":"1387","name":"乡宁县"},{"id":"1388","name":"侯马市"},{"id":"1389","name":"古县"},{"id":"1390","name":"吉县"},{"id":"1391","name":"大宁县"},{"id":"1392","name":"安泽县"},{"id":"1393","name":"尧都区"},{"id":"1394","name":"曲沃县"},{"id":"1395","name":"永和县"},{"id":"1396","name":"汾西县"},{"id":"1397","name":"洪洞县"},{"id":"1398","name":"浮山县"},{"id":"1399","name":"翼城县"},{"id":"1400","name":"蒲县"},{"id":"1401","name":"襄汾县"},{"id":"1402","name":"隰县"},{"id":"1403","name":"霍州市"}]},{"id":"94","name":"吕梁市","area":[{"id":"1404","name":"中阳县"},{"id":"1405","name":"临县"},{"id":"1406","name":"交口县"},{"id":"1407","name":"交城县"},{"id":"1408","name":"兴县"},{"id":"1409","name":"孝义市"},{"id":"1410","name":"岚县"},{"id":"1411","name":"文水县"},{"id":"1412","name":"方山县"},{"id":"1413","name":"柳林县"},{"id":"1414","name":"汾阳市"},{"id":"1415","name":"石楼县"},{"id":"1416","name":"离石区"}]}]},{"id":"5","name":"内蒙古自治区","city":[{"id":"95","name":"呼和浩特市","area":[{"id":"1417","name":"和林格尔县"},{"id":"1418","name":"回民区"},{"id":"1419","name":"土默特左旗"},{"id":"1420","name":"托克托县"},{"id":"1421","name":"新城区"},{"id":"1422","name":"武川县"},{"id":"1423","name":"清水河县"},{"id":"1424","name":"玉泉区"},{"id":"1425","name":"赛罕区"}]},{"id":"96","name":"包头市","area":[{"id":"1426","name":"东河区"},{"id":"1427","name":"九原区"},{"id":"1428","name":"固阳县"},{"id":"1429","name":"土默特右旗"},{"id":"1430","name":"昆都仑区"},{"id":"1431","name":"白云矿区"},{"id":"1432","name":"石拐区"},{"id":"1433","name":"达尔罕茂明安联合旗"},{"id":"1434","name":"青山区"}]},{"id":"97","name":"乌海市","area":[{"id":"1435","name":"乌达区"},{"id":"1436","name":"海勃湾区"},{"id":"1437","name":"海南区"}]},{"id":"98","name":"赤峰市","area":[{"id":"1438","name":"元宝山区"},{"id":"1439","name":"克什克腾旗"},{"id":"1440","name":"喀喇沁旗"},{"id":"1441","name":"宁城县"},{"id":"1442","name":"巴林右旗"},{"id":"1443","name":"巴林左旗"},{"id":"1444","name":"敖汉旗"},{"id":"1445","name":"松山区"},{"id":"1446","name":"林西县"},{"id":"1447","name":"红山区"},{"id":"1448","name":"翁牛特旗"},{"id":"1449","name":"阿鲁科尔沁旗"}]},{"id":"99","name":"通辽市","area":[{"id":"1450","name":"奈曼旗"},{"id":"1451","name":"库伦旗"},{"id":"1452","name":"开鲁县"},{"id":"1453","name":"扎鲁特旗"},{"id":"1454","name":"科尔沁区"},{"id":"1455","name":"科尔沁左翼中旗"},{"id":"1456","name":"科尔沁左翼后旗"},{"id":"1457","name":"霍林郭勒市"}]},{"id":"100","name":"鄂尔多斯市","area":[{"id":"1458","name":"东胜区"},{"id":"1459","name":"乌审旗"},{"id":"1460","name":"伊金霍洛旗"},{"id":"1461","name":"准格尔旗"},{"id":"1462","name":"杭锦旗"},{"id":"1463","name":"达拉特旗"},{"id":"1464","name":"鄂东胜区"},{"id":"1465","name":"鄂托克前旗"},{"id":"1466","name":"鄂托克旗"}]},{"id":"101","name":"呼伦贝尔市","area":[{"id":"1467","name":"扎兰屯市"},{"id":"1468","name":"新巴尔虎右旗"},{"id":"1469","name":"新巴尔虎左旗"},{"id":"1470","name":"根河市"},{"id":"1471","name":"海拉尔区"},{"id":"1472","name":"满洲里市"},{"id":"1473","name":"牙克石市"},{"id":"1474","name":"莫力达瓦达斡尔族自治旗"},{"id":"1475","name":"鄂伦春自治旗"},{"id":"1476","name":"鄂温克族自治旗"},{"id":"1477","name":"阿荣旗"},{"id":"1478","name":"陈巴尔虎旗"},{"id":"1479","name":"额尔古纳市"}]},{"id":"102","name":"巴彦淖尔市","area":[{"id":"1480","name":"临河区"},{"id":"1481","name":"乌拉特中旗"},{"id":"1482","name":"乌拉特前旗"},{"id":"1483","name":"乌拉特后旗"},{"id":"1484","name":"五原县"},{"id":"1485","name":"杭锦后旗"},{"id":"1486","name":"磴口县"}]},{"id":"103","name":"乌兰察布市","area":[{"id":"1487","name":"丰镇市"},{"id":"1488","name":"兴和县"},{"id":"1489","name":"凉城县"},{"id":"1490","name":"化德县"},{"id":"1491","name":"卓资县"},{"id":"1492","name":"商都县"},{"id":"1493","name":"四子王旗"},{"id":"1494","name":"察哈尔右翼中旗"},{"id":"1495","name":"察哈尔右翼前旗"},{"id":"1496","name":"察哈尔右翼后旗"},{"id":"1497","name":"集宁区"}]},{"id":"104","name":"兴安盟","area":[{"id":"1498","name":"乌兰浩特市"},{"id":"1499","name":"扎赉特旗"},{"id":"1500","name":"科尔沁右翼中旗"},{"id":"1501","name":"科尔沁右翼前旗"},{"id":"1502","name":"突泉县"},{"id":"1503","name":"阿尔山市"}]},{"id":"105","name":"锡林郭勒盟","area":[{"id":"1504","name":"东乌珠穆沁旗"},{"id":"1505","name":"二连浩特市"},{"id":"1506","name":"多伦县"},{"id":"1507","name":"太仆寺旗"},{"id":"1508","name":"正蓝旗"},{"id":"1509","name":"正镶白旗"},{"id":"1510","name":"苏尼特右旗"},{"id":"1511","name":"苏尼特左旗"},{"id":"1512","name":"西乌珠穆沁旗"},{"id":"1513","name":"锡林浩特市"},{"id":"1514","name":"镶黄旗"},{"id":"1515","name":"阿巴嘎旗"}]},{"id":"106","name":"阿拉善盟","area":[{"id":"1516","name":"阿拉善右旗"},{"id":"1517","name":"阿拉善左旗"},{"id":"1518","name":"额济纳旗"}]}]},{"id":"6","name":"辽宁省","city":[{"id":"107","name":"沈阳市","area":[{"id":"1519","name":"东陵区"},{"id":"1520","name":"于洪区"},{"id":"1521","name":"和平区"},{"id":"1522","name":"大东区"},{"id":"1523","name":"康平县"},{"id":"1524","name":"新民市"},{"id":"1525","name":"沈北新区"},{"id":"1526","name":"沈河区"},{"id":"1527","name":"法库县"},{"id":"1528","name":"皇姑区"},{"id":"1529","name":"苏家屯区"},{"id":"1530","name":"辽中县"},{"id":"1531","name":"铁西区"}]},{"id":"108","name":"大连市","area":[{"id":"1532","name":"中山区"},{"id":"1533","name":"庄河市"},{"id":"1534","name":"旅顺口区"},{"id":"1535","name":"普兰店市"},{"id":"1536","name":"沙河口区"},{"id":"1537","name":"瓦房店市"},{"id":"1538","name":"甘井子区"},{"id":"1539","name":"西岗区"},{"id":"1540","name":"金州区"},{"id":"1541","name":"长海县"}]},{"id":"109","name":"鞍山市","area":[{"id":"1542","name":"千山区"},{"id":"1543","name":"台安县"},{"id":"1544","name":"岫岩满族自治县"},{"id":"1545","name":"海城市"},{"id":"1546","name":"立山区"},{"id":"1547","name":"铁东区"},{"id":"1548","name":"铁西区"}]},{"id":"110","name":"抚顺市","area":[{"id":"1549","name":"东洲区"},{"id":"1550","name":"抚顺县"},{"id":"1551","name":"新宾满族自治县"},{"id":"1552","name":"新抚区"},{"id":"1553","name":"望花区"},{"id":"1554","name":"清原满族自治县"},{"id":"1555","name":"顺城区"}]},{"id":"111","name":"本溪市","area":[{"id":"1556","name":"南芬区"},{"id":"1557","name":"平山区"},{"id":"1558","name":"明山区"},{"id":"1559","name":"本溪满族自治县"},{"id":"1560","name":"桓仁满族自治县"},{"id":"1561","name":"溪湖区"}]},{"id":"112","name":"丹东市","area":[{"id":"1562","name":"东港市"},{"id":"1563","name":"元宝区"},{"id":"1564","name":"凤城市"},{"id":"1565","name":"宽甸满族自治县"},{"id":"1566","name":"振兴区"},{"id":"1567","name":"振安区"}]},{"id":"113","name":"锦州市","area":[{"id":"1568","name":"义县"},{"id":"1569","name":"凌河区"},{"id":"1570","name":"凌海市"},{"id":"1571","name":"北镇市"},{"id":"1572","name":"古塔区"},{"id":"1573","name":"太和区"},{"id":"1574","name":"黑山县"}]},{"id":"114","name":"营口市","area":[{"id":"1575","name":"大石桥市"},{"id":"1576","name":"盖州市"},{"id":"1577","name":"站前区"},{"id":"1578","name":"老边区"},{"id":"1579","name":"西市区"},{"id":"1580","name":"鲅鱼圈区"}]},{"id":"115","name":"阜新市","area":[{"id":"1581","name":"太平区"},{"id":"1582","name":"彰武县"},{"id":"1583","name":"新邱区"},{"id":"1584","name":"海州区"},{"id":"1585","name":"清河门区"},{"id":"1586","name":"细河区"},{"id":"1587","name":"蒙古族自治县"}]},{"id":"116","name":"辽阳市","area":[{"id":"1588","name":"太子河区"},{"id":"1589","name":"宏伟区"},{"id":"1590","name":"弓长岭区"},{"id":"1591","name":"文圣区"},{"id":"1592","name":"灯塔市"},{"id":"1593","name":"白塔区"},{"id":"1594","name":"辽阳县"}]},{"id":"117","name":"盘锦市","area":[{"id":"1595","name":"兴隆台区"},{"id":"1596","name":"双台子区"},{"id":"1597","name":"大洼县"},{"id":"1598","name":"盘山县"}]},{"id":"118","name":"铁岭市","area":[{"id":"1599","name":"开原市"},{"id":"1600","name":"昌图县"},{"id":"1601","name":"清河区"},{"id":"1602","name":"西丰县"},{"id":"1603","name":"调兵山市"},{"id":"1604","name":"铁岭县"},{"id":"1605","name":"银州区"}]},{"id":"119","name":"朝阳市","area":[{"id":"1606","name":"凌源市"},{"id":"1607","name":"北票市"},{"id":"1608","name":"双塔区"},{"id":"1609","name":"喀喇沁左翼蒙古族自治县"},{"id":"1610","name":"建平县"},{"id":"1611","name":"朝阳县"},{"id":"1612","name":"龙城区"}]},{"id":"120","name":"葫芦岛市","area":[{"id":"1613","name":"兴城市"},{"id":"1614","name":"南票区"},{"id":"1615","name":"建昌县"},{"id":"1616","name":"绥中县"},{"id":"1617","name":"连山区"},{"id":"1618","name":"龙港区"}]}]},{"id":"7","name":"吉林省","city":[{"id":"121","name":"长春市","area":[{"id":"1619","name":"九台市"},{"id":"1620","name":"二道区"},{"id":"1621","name":"农安县"},{"id":"1622","name":"南关区"},{"id":"1623","name":"双阳区"},{"id":"1624","name":"宽城区"},{"id":"1625","name":"德惠市"},{"id":"1626","name":"朝阳区"},{"id":"1627","name":"榆树市"},{"id":"1628","name":"绿园区"}]},{"id":"122","name":"吉林市","area":[{"id":"1629","name":"丰满区"},{"id":"1630","name":"昌邑区"},{"id":"1631","name":"桦甸市"},{"id":"1632","name":"永吉县"},{"id":"1633","name":"磐石市"},{"id":"1634","name":"舒兰市"},{"id":"1635","name":"船营区"},{"id":"1636","name":"蛟河市"},{"id":"1637","name":"龙潭区"}]},{"id":"123","name":"四平市","area":[{"id":"1638","name":"伊通满族自治县"},{"id":"1639","name":"公主岭市"},{"id":"1640","name":"双辽市"},{"id":"1641","name":"梨树县"},{"id":"1642","name":"铁东区"},{"id":"1643","name":"铁西区"}]},{"id":"124","name":"辽源市","area":[{"id":"1644","name":"东丰县"},{"id":"1645","name":"东辽县"},{"id":"1646","name":"西安区"},{"id":"1647","name":"龙山区"}]},{"id":"125","name":"通化市","area":[{"id":"1648","name":"东昌区"},{"id":"1649","name":"二道江区"},{"id":"1650","name":"柳河县"},{"id":"1651","name":"梅河口市"},{"id":"1652","name":"辉南县"},{"id":"1653","name":"通化县"},{"id":"1654","name":"集安市"}]},{"id":"126","name":"白山市","area":[{"id":"1655","name":"临江市"},{"id":"1656","name":"八道江区"},{"id":"1657","name":"抚松县"},{"id":"1658","name":"江源区"},{"id":"1659","name":"长白朝鲜族自治县"},{"id":"1660","name":"靖宇县"}]},{"id":"127","name":"松原市","area":[{"id":"1661","name":"干安县"},{"id":"1662","name":"前郭尔罗斯蒙古族自治县"},{"id":"1663","name":"宁江区"},{"id":"1664","name":"扶余县"},{"id":"1665","name":"长岭县"}]},{"id":"128","name":"白城市","area":[{"id":"1666","name":"大安市"},{"id":"1667","name":"洮北区"},{"id":"1668","name":"洮南市"},{"id":"1669","name":"通榆县"},{"id":"1670","name":"镇赉县"}]},{"id":"129","name":"延边朝鲜族自治州","area":[{"id":"1671","name":"和龙市"},{"id":"1672","name":"图们市"},{"id":"1673","name":"安图县"},{"id":"1674","name":"延吉市"},{"id":"1675","name":"敦化市"},{"id":"1676","name":"汪清县"},{"id":"1677","name":"珲春市"},{"id":"1678","name":"龙井市"}]}]},{"id":"8","name":"黑龙江省","city":[{"id":"130","name":"哈尔滨市","area":[{"id":"1679","name":"五常市"},{"id":"1680","name":"依兰县"},{"id":"1681","name":"南岗区"},{"id":"1682","name":"双城市"},{"id":"1683","name":"呼兰区"},{"id":"1684","name":"哈尔滨市道里区"},{"id":"1685","name":"宾县"},{"id":"1686","name":"尚志市"},{"id":"1687","name":"巴彦县"},{"id":"1688","name":"平房区"},{"id":"1689","name":"延寿县"},{"id":"1690","name":"方正县"},{"id":"1691","name":"木兰县"},{"id":"1692","name":"松北区"},{"id":"1693","name":"通河县"},{"id":"1694","name":"道外区"},{"id":"1695","name":"阿城区"},{"id":"1696","name":"香坊区"}]},{"id":"131","name":"齐齐哈尔市","area":[{"id":"1697","name":"依安县"},{"id":"1698","name":"克东县"},{"id":"1699","name":"克山县"},{"id":"1700","name":"富拉尔基区"},{"id":"1701","name":"富裕县"},{"id":"1702","name":"建华区"},{"id":"1703","name":"拜泉县"},{"id":"1704","name":"昂昂溪区"},{"id":"1705","name":"梅里斯达斡尔族区"},{"id":"1706","name":"泰来县"},{"id":"1707","name":"甘南县"},{"id":"1708","name":"碾子山区"},{"id":"1709","name":"讷河市"},{"id":"1710","name":"铁锋区"},{"id":"1711","name":"龙江县"},{"id":"1712","name":"龙沙区"}]},{"id":"132","name":"鸡西市","area":[{"id":"1713","name":"城子河区"},{"id":"1714","name":"密山市"},{"id":"1715","name":"恒山区"},{"id":"1716","name":"梨树区"},{"id":"1717","name":"滴道区"},{"id":"1718","name":"虎林市"},{"id":"1719","name":"鸡东县"},{"id":"1720","name":"鸡冠区"},{"id":"1721","name":"麻山区"}]},{"id":"133","name":"鹤岗市","area":[{"id":"1722","name":"东山区"},{"id":"1723","name":"兴安区"},{"id":"1724","name":"兴山区"},{"id":"1725","name":"南山区"},{"id":"1726","name":"向阳区"},{"id":"1727","name":"工农区"},{"id":"1728","name":"绥滨县"},{"id":"1729","name":"萝北县"}]},{"id":"134","name":"双鸭山市","area":[{"id":"1730","name":"友谊县"},{"id":"1731","name":"四方台区"},{"id":"1732","name":"宝山区"},{"id":"1733","name":"宝清县"},{"id":"1734","name":"尖山区"},{"id":"1735","name":"岭东区"},{"id":"1736","name":"集贤县"},{"id":"1737","name":"饶河县"}]},{"id":"135","name":"大庆市","area":[{"id":"1738","name":"大同区"},{"id":"1739","name":"杜尔伯特蒙古族自治县"},{"id":"1740","name":"林甸县"},{"id":"1741","name":"红岗区"},{"id":"1742","name":"肇州县"},{"id":"1743","name":"肇源县"},{"id":"1744","name":"胡路区"},{"id":"1745","name":"萨尔图区"},{"id":"1746","name":"龙凤区"}]},{"id":"136","name":"伊春市","area":[{"id":"1747","name":"上甘岭区"},{"id":"1748","name":"乌伊岭区"},{"id":"1749","name":"乌马河区"},{"id":"1750","name":"五营区"},{"id":"1751","name":"伊春区"},{"id":"1752","name":"南岔区"},{"id":"1753","name":"友好区"},{"id":"1754","name":"嘉荫县"},{"id":"1755","name":"带岭区"},{"id":"1756","name":"新青区"},{"id":"1757","name":"汤旺河区"},{"id":"1758","name":"红星区"},{"id":"1759","name":"美溪区"},{"id":"1760","name":"翠峦区"},{"id":"1761","name":"西林区"},{"id":"1762","name":"金山屯区"},{"id":"1763","name":"铁力市"}]},{"id":"137","name":"佳木斯市","area":[{"id":"1764","name":"东风区"},{"id":"1765","name":"前进区"},{"id":"1766","name":"同江市"},{"id":"1767","name":"向阳区"},{"id":"1768","name":"富锦市"},{"id":"1769","name":"抚远县"},{"id":"1770","name":"桦南县"},{"id":"1771","name":"桦川县"},{"id":"1772","name":"汤原县"},{"id":"1773","name":"郊区"}]},{"id":"138","name":"七台河市","area":[{"id":"1774","name":"勃利县"},{"id":"1775","name":"新兴区"},{"id":"1776","name":"桃山区"},{"id":"1777","name":"茄子河区"}]},{"id":"139","name":"牡丹江市","area":[{"id":"1778","name":"东宁县"},{"id":"1779","name":"东安区"},{"id":"1780","name":"宁安市"},{"id":"1781","name":"林口县"},{"id":"1782","name":"海林市"},{"id":"1783","name":"爱民区"},{"id":"1784","name":"穆棱市"},{"id":"1785","name":"绥芬河市"},{"id":"1786","name":"西安区"},{"id":"1787","name":"阳明区"}]},{"id":"140","name":"黑河市","area":[{"id":"1788","name":"五大连池市"},{"id":"1789","name":"北安市"},{"id":"1790","name":"嫩江县"},{"id":"1791","name":"孙吴县"},{"id":"1792","name":"爱辉区"},{"id":"1793","name":"车逊克县"},{"id":"1794","name":"逊克县"}]},{"id":"141","name":"绥化市","area":[{"id":"1795","name":"兰西县"},{"id":"1796","name":"安达市"},{"id":"1797","name":"庆安县"},{"id":"1798","name":"明水县"},{"id":"1799","name":"望奎县"},{"id":"1800","name":"海伦市"},{"id":"1801","name":"绥化市北林区"},{"id":"1802","name":"绥棱县"},{"id":"1803","name":"肇东市"},{"id":"1804","name":"青冈县"}]},{"id":"142","name":"大兴安岭地区","area":[{"id":"1805","name":"呼玛县"},{"id":"1806","name":"塔河县"},{"id":"1807","name":"大兴安岭地区加格达奇区"},{"id":"1808","name":"大兴安岭地区呼中区"},{"id":"1809","name":"大兴安岭地区新林区"},{"id":"1810","name":"大兴安岭地区松岭区"},{"id":"1811","name":"漠河县"}]}]},{"id":"9","name":"上海市","city":[{"id":"143","name":"黄浦区","area":[{"id":"1812","name":"半淞园路街道"},{"id":"1813","name":"南京东路街道"},{"id":"1814","name":"外滩街道"},{"id":"1815","name":"小东门街道"},{"id":"1816","name":"老西门街道"},{"id":"1817","name":"豫园街道"}]},{"id":"144","name":"卢湾区","area":[{"id":"1818","name":"五里桥街道"},{"id":"1819","name":"打浦桥街道"},{"id":"1820","name":"淮海中路街道"},{"id":"1821","name":"瑞金二路街道"}]},{"id":"145","name":"徐汇区","area":[{"id":"1822","name":"凌云路街道"},{"id":"1823","name":"华泾镇"},{"id":"1824","name":"天平路街道"},{"id":"1825","name":"康健新村街道"},{"id":"1826","name":"徐家汇街道"},{"id":"1827","name":"斜土路街道"},{"id":"1828","name":"枫林路街道"},{"id":"1829","name":"湖南路街道"},{"id":"1830","name":"漕河泾街道"},{"id":"1831","name":"田林街道"},{"id":"1832","name":"虹梅路街道"},{"id":"1833","name":"长桥街道"},{"id":"1834","name":"龙华街道"}]},{"id":"146","name":"长宁区","area":[{"id":"1835","name":"仙霞新村街道"},{"id":"1836","name":"北新泾街道"},{"id":"1837","name":"华阳路街道"},{"id":"1838","name":"周家桥街道"},{"id":"1839","name":"天山路街道"},{"id":"1840","name":"新华路街道"},{"id":"1841","name":"新泾镇"},{"id":"1842","name":"江苏路街道"},{"id":"1843","name":"程家桥街道"},{"id":"1844","name":"虹桥街道"}]},{"id":"147","name":"静安区","area":[{"id":"1845","name":"南京西路街道"},{"id":"1846","name":"曹家渡街道"},{"id":"1847","name":"江宁路街道"},{"id":"1848","name":"石门二路街道"},{"id":"1849","name":"静安寺街道"}]},{"id":"148","name":"普陀区","area":[{"id":"1850","name":"宜川路街道"},{"id":"1851","name":"曹杨新村街道"},{"id":"1852","name":"桃浦镇"},{"id":"1853","name":"甘泉路街道"},{"id":"1854","name":"真如镇"},{"id":"1855","name":"石泉路街道"},{"id":"1856","name":"长寿路街道"},{"id":"1857","name":"长征镇"},{"id":"1858","name":"长风新村街道"}]},{"id":"149","name":"闸北区","area":[{"id":"1859","name":"临汾路街道"},{"id":"1860","name":"共和新路街道"},{"id":"1861","name":"北站街道"},{"id":"1862","name":"大宁路街道"},{"id":"1863","name":"天目西路街道"},{"id":"1864","name":"宝山路街道"},{"id":"1865","name":"彭浦新村街道"},{"id":"1866","name":"彭浦镇"},{"id":"1867","name":"芷江西路街道"}]},{"id":"150","name":"虹口区","area":[{"id":"1868","name":"乍浦路街道"},{"id":"1869","name":"凉城新村街道"},{"id":"1870","name":"嘉兴路街道"},{"id":"1871","name":"四川北路街道"},{"id":"1872","name":"广中路街道"},{"id":"1873","name":"提篮桥街道"},{"id":"1874","name":"新港路街道"},{"id":"1875","name":"曲阳路街道"},{"id":"1876","name":"欧阳路街道"},{"id":"1877","name":"江湾镇街道"}]},{"id":"151","name":"杨浦区","area":[{"id":"1878","name":"五角场街道"},{"id":"1879","name":"五角场镇"},{"id":"1880","name":"四平路街道"},{"id":"1881","name":"大桥街道"},{"id":"1882","name":"定海路街道"},{"id":"1883","name":"平凉路街道"},{"id":"1884","name":"延吉新村街道"},{"id":"1885","name":"控江路街道"},{"id":"1886","name":"新江湾城街道"},{"id":"1887","name":"殷行街道"},{"id":"1888","name":"江浦路街道"},{"id":"1889","name":"长白新村街道"}]},{"id":"152","name":"闵行区","area":[{"id":"1890","name":"七宝镇"},{"id":"1891","name":"华漕镇"},{"id":"1892","name":"古美街道"},{"id":"1893","name":"吴泾镇"},{"id":"1894","name":"梅陇镇"},{"id":"1895","name":"江川路街道"},{"id":"1896","name":"浦江镇"},{"id":"1897","name":"莘庄镇"},{"id":"1898","name":"虹桥镇"},{"id":"1899","name":"颛桥镇"},{"id":"1900","name":"马桥镇"},{"id":"1901","name":"龙柏街道"}]},{"id":"153","name":"宝山区","area":[{"id":"1902","name":"友谊路街道"},{"id":"1903","name":"吴淞街道"},{"id":"1904","name":"大场镇"},{"id":"1905","name":"庙行镇"},{"id":"1906","name":"张庙街道"},{"id":"1907","name":"月浦镇"},{"id":"1908","name":"杨行镇"},{"id":"1909","name":"淞南镇"},{"id":"1910","name":"罗店镇"},{"id":"1911","name":"罗泾镇"},{"id":"1912","name":"顾村镇"},{"id":"1913","name":"高境镇"}]},{"id":"154","name":"嘉定区","area":[{"id":"1914","name":"华亭镇"},{"id":"1915","name":"南翔镇"},{"id":"1916","name":"嘉定工业区"},{"id":"1917","name":"嘉定镇街道"},{"id":"1918","name":"外冈镇"},{"id":"1919","name":"安亭镇"},{"id":"1920","name":"徐行镇"},{"id":"1921","name":"新成路街道"},{"id":"1922","name":"江桥镇"},{"id":"1923","name":"真新新村街道"},{"id":"1924","name":"菊园新区"},{"id":"1925","name":"马陆镇"},{"id":"1926","name":"黄渡镇"}]},{"id":"155","name":"浦东新区","area":[{"id":"1927","name":"三林镇"},{"id":"1928","name":"上钢新村街道"},{"id":"1929","name":"东明路街道"},{"id":"1930","name":"北蔡镇"},{"id":"1931","name":"南码头路街道"},{"id":"1932","name":"合庆镇"},{"id":"1933","name":"周家渡街道"},{"id":"1934","name":"唐镇"},{"id":"1935","name":"塘桥街道"},{"id":"1936","name":"川沙新镇"},{"id":"1937","name":"张江镇"},{"id":"1938","name":"曹路镇"},{"id":"1939","name":"沪东新村街道"},{"id":"1940","name":"洋泾街道"},{"id":"1941","name":"浦兴路街道"},{"id":"1942","name":"潍坊新村街道"},{"id":"1943","name":"花木街道"},{"id":"1944","name":"金杨新村街道"},{"id":"1945","name":"金桥镇"},{"id":"1946","name":"陆家嘴街道"},{"id":"1947","name":"高东镇"},{"id":"1948","name":"高桥镇"},{"id":"1949","name":"高行镇"}]},{"id":"156","name":"金山区","area":[{"id":"1950","name":"亭林镇"},{"id":"1951","name":"吕巷镇"},{"id":"1952","name":"山阳镇"},{"id":"1953","name":"廊下镇"},{"id":"1954","name":"张堰镇"},{"id":"1955","name":"朱泾镇"},{"id":"1956","name":"枫泾镇"},{"id":"1957","name":"漕泾镇"},{"id":"1958","name":"石化街道"},{"id":"1959","name":"金山卫镇"}]},{"id":"157","name":"松江区","area":[{"id":"1960","name":"上海松江科技园区"},{"id":"1961","name":"中山街道"},{"id":"1962","name":"九亭镇"},{"id":"1963","name":"五厍农业园区"},{"id":"1964","name":"佘山度假区"},{"id":"1965","name":"佘山镇"},{"id":"1966","name":"叶榭镇"},{"id":"1967","name":"岳阳街道"},{"id":"1968","name":"新桥镇"},{"id":"1969","name":"新浜镇"},{"id":"1970","name":"方松街道"},{"id":"1971","name":"松江工业区"},{"id":"1972","name":"永丰街道"},{"id":"1973","name":"泖港镇"},{"id":"1974","name":"泗泾镇"},{"id":"1975","name":"洞泾镇"},{"id":"1976","name":"石湖荡镇"},{"id":"1977","name":"车墩镇"}]},{"id":"158","name":"青浦区","area":[{"id":"1978","name":"华新镇"},{"id":"1979","name":"夏阳街道"},{"id":"1980","name":"徐泾镇"},{"id":"1981","name":"朱家角镇"},{"id":"1982","name":"白鹤镇"},{"id":"1983","name":"盈浦街道"},{"id":"1984","name":"练塘镇"},{"id":"1985","name":"赵巷镇"},{"id":"1986","name":"重固镇"},{"id":"1987","name":"金泽镇"},{"id":"1988","name":"香花桥街道"}]},{"id":"159","name":"南汇区","area":[{"id":"1989","name":"万祥镇"},{"id":"1990","name":"书院镇"},{"id":"1991","name":"六灶镇"},{"id":"1992","name":"周浦镇"},{"id":"1993","name":"大团镇"},{"id":"1994","name":"宣桥镇"},{"id":"1995","name":"康桥镇"},{"id":"1996","name":"惠南镇"},{"id":"1997","name":"新场镇"},{"id":"1998","name":"泥城镇"},{"id":"1999","name":"祝桥镇"},{"id":"2000","name":"老港镇"},{"id":"2001","name":"航头镇"},{"id":"2002","name":"芦潮港镇"}]},{"id":"160","name":"奉贤区","area":[{"id":"2003","name":"南桥镇"},{"id":"2004","name":"四团镇"},{"id":"2005","name":"奉城镇"},{"id":"2006","name":"庄行镇"},{"id":"2007","name":"柘林镇"},{"id":"2008","name":"海湾镇"},{"id":"2009","name":"金汇镇"},{"id":"2010","name":"青村镇"}]},{"id":"161","name":"崇明县","area":[{"id":"2011","name":"三星镇"},{"id":"2012","name":"中兴镇"},{"id":"2013","name":"向化镇"},{"id":"2014","name":"城桥镇"},{"id":"2015","name":"堡镇"},{"id":"2016","name":"庙镇"},{"id":"2017","name":"建设镇"},{"id":"2018","name":"新村乡"},{"id":"2019","name":"新河镇"},{"id":"2020","name":"横沙乡"},{"id":"2021","name":"港沿镇"},{"id":"2022","name":"港西镇"},{"id":"2023","name":"竖新镇"},{"id":"2024","name":"绿华镇"},{"id":"2025","name":"长兴乡"},{"id":"2026","name":"陈家镇"}]}]},{"id":"10","name":"江苏省","city":[{"id":"162","name":"南京市","area":[{"id":"2027","name":"下关区"},{"id":"2028","name":"六合区"},{"id":"2029","name":"建邺区"},{"id":"2030","name":"栖霞区"},{"id":"2031","name":"江宁区"},{"id":"2032","name":"浦口区"},{"id":"2033","name":"溧水县"},{"id":"2034","name":"玄武区"},{"id":"2035","name":"白下区"},{"id":"2036","name":"秦淮区"},{"id":"2037","name":"雨花台区"},{"id":"2038","name":"高淳县"},{"id":"2039","name":"鼓楼区"}]},{"id":"163","name":"无锡市","area":[{"id":"2040","name":"北塘区"},{"id":"2041","name":"南长区"},{"id":"2042","name":"宜兴市"},{"id":"2043","name":"崇安区"},{"id":"2044","name":"惠山区"},{"id":"2045","name":"江阴市"},{"id":"2046","name":"滨湖区"},{"id":"2047","name":"锡山区"}]},{"id":"164","name":"徐州市","area":[{"id":"2048","name":"丰县"},{"id":"2049","name":"九里区"},{"id":"2050","name":"云龙区"},{"id":"2051","name":"新沂市"},{"id":"2052","name":"沛县"},{"id":"2053","name":"泉山区"},{"id":"2054","name":"睢宁县"},{"id":"2055","name":"贾汪区"},{"id":"2056","name":"邳州市"},{"id":"2057","name":"铜山县"},{"id":"2058","name":"鼓楼区"}]},{"id":"165","name":"常州市","area":[{"id":"2059","name":"天宁区"},{"id":"2060","name":"戚墅堰区"},{"id":"2061","name":"新北区"},{"id":"2062","name":"武进区"},{"id":"2063","name":"溧阳市"},{"id":"2064","name":"金坛市"},{"id":"2065","name":"钟楼区"}]},{"id":"166","name":"苏州市","area":[{"id":"2066","name":"吴中区"},{"id":"2067","name":"吴江市"},{"id":"2068","name":"太仓市"},{"id":"2069","name":"常熟市"},{"id":"2070","name":"平江区"},{"id":"2071","name":"张家港市"},{"id":"2072","name":"昆山市"},{"id":"2073","name":"沧浪区"},{"id":"2074","name":"相城区"},{"id":"2075","name":"苏州工业园区"},{"id":"2076","name":"虎丘区"},{"id":"2077","name":"金阊区"}]},{"id":"167","name":"南通市","area":[{"id":"2078","name":"启东市"},{"id":"2079","name":"如东县"},{"id":"2080","name":"如皋市"},{"id":"2081","name":"崇川区"},{"id":"2082","name":"海安县"},{"id":"2083","name":"海门市"},{"id":"2084","name":"港闸区"},{"id":"2085","name":"通州市"}]},{"id":"168","name":"连云港市","area":[{"id":"2086","name":"东海县"},{"id":"2087","name":"新浦区"},{"id":"2088","name":"海州区"},{"id":"2089","name":"灌云县"},{"id":"2090","name":"灌南县"},{"id":"2091","name":"赣榆县"},{"id":"2092","name":"连云区"}]},{"id":"169","name":"淮安市","area":[{"id":"2093","name":"楚州区"},{"id":"2094","name":"洪泽县"},{"id":"2095","name":"涟水县"},{"id":"2096","name":"淮阴区"},{"id":"2097","name":"清河区"},{"id":"2098","name":"清浦区"},{"id":"2099","name":"盱眙县"},{"id":"2100","name":"金湖县"}]},{"id":"170","name":"盐城市","area":[{"id":"2101","name":"东台市"},{"id":"2102","name":"亭湖区"},{"id":"2103","name":"响水县"},{"id":"2104","name":"大丰市"},{"id":"2105","name":"射阳县"},{"id":"2106","name":"建湖县"},{"id":"2107","name":"滨海县"},{"id":"2108","name":"盐都区"},{"id":"2109","name":"阜宁县"}]},{"id":"171","name":"扬州市","area":[{"id":"2110","name":"仪征市"},{"id":"2111","name":"宝应县"},{"id":"2112","name":"广陵区"},{"id":"2113","name":"江都市"},{"id":"2114","name":"维扬区"},{"id":"2115","name":"邗江区"},{"id":"2116","name":"高邮市"}]},{"id":"172","name":"镇江市","area":[{"id":"2117","name":"丹徒区"},{"id":"2118","name":"丹阳市"},{"id":"2119","name":"京口区"},{"id":"2120","name":"句容市"},{"id":"2121","name":"扬中市"},{"id":"2122","name":"润州区"}]},{"id":"173","name":"泰州市","area":[{"id":"2123","name":"兴化市"},{"id":"2124","name":"姜堰市"},{"id":"2125","name":"泰兴市"},{"id":"2126","name":"海陵区"},{"id":"2127","name":"靖江市"},{"id":"2128","name":"高港区"}]},{"id":"174","name":"宿迁市","area":[{"id":"2129","name":"宿城区"},{"id":"2130","name":"宿豫区"},{"id":"2131","name":"沭阳县"},{"id":"2132","name":"泗洪县"},{"id":"2133","name":"泗阳县"}]}]},{"id":"11","name":"浙江省","city":[{"id":"175","name":"杭州市","area":[{"id":"2134","name":"上城区"},{"id":"2135","name":"下城区"},{"id":"2136","name":"临安市"},{"id":"2137","name":"余杭区"},{"id":"2138","name":"富阳市"},{"id":"2139","name":"建德市"},{"id":"2140","name":"拱墅区"},{"id":"2141","name":"桐庐县"},{"id":"2142","name":"江干区"},{"id":"2143","name":"淳安县"},{"id":"2144","name":"滨江区"},{"id":"2145","name":"萧山区"},{"id":"2146","name":"西湖区"}]},{"id":"176","name":"宁波市","area":[{"id":"2147","name":"余姚市"},{"id":"2148","name":"北仑区"},{"id":"2149","name":"奉化市"},{"id":"2150","name":"宁海县"},{"id":"2151","name":"慈溪市"},{"id":"2152","name":"江东区"},{"id":"2153","name":"江北区"},{"id":"2154","name":"海曙区"},{"id":"2155","name":"象山县"},{"id":"2156","name":"鄞州区"},{"id":"2157","name":"镇海区"}]},{"id":"177","name":"温州市","area":[{"id":"2158","name":"乐清市"},{"id":"2159","name":"平阳县"},{"id":"2160","name":"文成县"},{"id":"2161","name":"永嘉县"},{"id":"2162","name":"泰顺县"},{"id":"2163","name":"洞头县"},{"id":"2164","name":"瑞安市"},{"id":"2165","name":"瓯海区"},{"id":"2166","name":"苍南县"},{"id":"2167","name":"鹿城区"},{"id":"2168","name":"龙湾区"}]},{"id":"178","name":"嘉兴市","area":[{"id":"2169","name":"南湖区"},{"id":"2170","name":"嘉善县"},{"id":"2171","name":"平湖市"},{"id":"2172","name":"桐乡市"},{"id":"2173","name":"海宁市"},{"id":"2174","name":"海盐县"},{"id":"2175","name":"秀洲区"}]},{"id":"179","name":"湖州市","area":[{"id":"2176","name":"南浔区"},{"id":"2177","name":"吴兴区"},{"id":"2178","name":"安吉县"},{"id":"2179","name":"德清县"},{"id":"2180","name":"长兴县"}]},{"id":"180","name":"绍兴市","area":[{"id":"2181","name":"上虞市"},{"id":"2182","name":"嵊州市"},{"id":"2183","name":"新昌县"},{"id":"2184","name":"绍兴县"},{"id":"2185","name":"诸暨市"},{"id":"2186","name":"越城区"}]},{"id":"181","name":"舟山市","area":[{"id":"2187","name":"定海区"},{"id":"2188","name":"岱山县"},{"id":"2189","name":"嵊泗县"},{"id":"2190","name":"普陀区"}]},{"id":"182","name":"衢州市","area":[{"id":"2191","name":"常山县"},{"id":"2192","name":"开化县"},{"id":"2193","name":"柯城区"},{"id":"2194","name":"江山市"},{"id":"2195","name":"衢江区"},{"id":"2196","name":"龙游县"}]},{"id":"183","name":"金华市","area":[{"id":"2197","name":"东阳市"},{"id":"2198","name":"义乌市"},{"id":"2199","name":"兰溪市"},{"id":"2200","name":"婺城区"},{"id":"2201","name":"武义县"},{"id":"2202","name":"永康市"},{"id":"2203","name":"浦江县"},{"id":"2204","name":"磐安县"},{"id":"2205","name":"金东区"}]},{"id":"184","name":"台州市","area":[{"id":"2206","name":"三门县"},{"id":"2207","name":"临海市"},{"id":"2208","name":"仙居县"},{"id":"2209","name":"天台县"},{"id":"2210","name":"椒江区"},{"id":"2211","name":"温岭市"},{"id":"2212","name":"玉环县"},{"id":"2213","name":"路桥区"},{"id":"2214","name":"黄岩区"}]},{"id":"185","name":"丽水市","area":[{"id":"2215","name":"云和县"},{"id":"2216","name":"庆元县"},{"id":"2217","name":"景宁畲族自治县"},{"id":"2218","name":"松阳县"},{"id":"2219","name":"缙云县"},{"id":"2220","name":"莲都区"},{"id":"2221","name":"遂昌县"},{"id":"2222","name":"青田县"},{"id":"2223","name":"龙泉市"}]}]},{"id":"12","name":"安徽省","city":[{"id":"186","name":"合肥市","area":[{"id":"2224","name":"包河区"},{"id":"2225","name":"庐阳区"},{"id":"2226","name":"瑶海区"},{"id":"2227","name":"肥东县"},{"id":"2228","name":"肥西县"},{"id":"2229","name":"蜀山区"},{"id":"2230","name":"长丰县"}]},{"id":"187","name":"芜湖市","area":[{"id":"2231","name":"三山区"},{"id":"2232","name":"南陵县"},{"id":"2233","name":"弋江区"},{"id":"2234","name":"繁昌县"},{"id":"2235","name":"芜湖县"},{"id":"2236","name":"镜湖区"},{"id":"2237","name":"鸠江区"}]},{"id":"188","name":"蚌埠市","area":[{"id":"2238","name":"五河县"},{"id":"2239","name":"固镇县"},{"id":"2240","name":"怀远县"},{"id":"2241","name":"淮上区"},{"id":"2242","name":"禹会区"},{"id":"2243","name":"蚌山区"},{"id":"2244","name":"龙子湖区"}]},{"id":"189","name":"淮南市","area":[{"id":"2245","name":"八公山区"},{"id":"2246","name":"凤台县"},{"id":"2247","name":"大通区"},{"id":"2248","name":"潘集区"},{"id":"2249","name":"田家庵区"},{"id":"2250","name":"谢家集区"}]},{"id":"190","name":"马鞍山市","area":[{"id":"2251","name":"当涂县"},{"id":"2252","name":"花山区"},{"id":"2253","name":"金家庄区"},{"id":"2254","name":"雨山区"}]},{"id":"191","name":"淮北市","area":[{"id":"2255","name":"杜集区"},{"id":"2256","name":"濉溪县"},{"id":"2257","name":"烈山区"},{"id":"2258","name":"相山区"}]},{"id":"192","name":"铜陵市","area":[{"id":"2259","name":"狮子山区"},{"id":"2260","name":"郊区"},{"id":"2261","name":"铜官山区"},{"id":"2262","name":"铜陵县"}]},{"id":"193","name":"安庆市","area":[{"id":"2263","name":"大观区"},{"id":"2264","name":"太湖县"},{"id":"2265","name":"宜秀区"},{"id":"2266","name":"宿松县"},{"id":"2267","name":"岳西县"},{"id":"2268","name":"怀宁县"},{"id":"2269","name":"望江县"},{"id":"2270","name":"枞阳县"},{"id":"2271","name":"桐城市"},{"id":"2272","name":"潜山县"},{"id":"2273","name":"迎江区"}]},{"id":"194","name":"黄山市","area":[{"id":"2274","name":"休宁县"},{"id":"2275","name":"屯溪区"},{"id":"2276","name":"徽州区"},{"id":"2277","name":"歙县"},{"id":"2278","name":"祁门县"},{"id":"2279","name":"黄山区"},{"id":"2280","name":"黟县"}]},{"id":"195","name":"滁州市","area":[{"id":"2281","name":"全椒县"},{"id":"2282","name":"凤阳县"},{"id":"2283","name":"南谯区"},{"id":"2284","name":"天长市"},{"id":"2285","name":"定远县"},{"id":"2286","name":"明光市"},{"id":"2287","name":"来安县"},{"id":"2288","name":"琅玡区"}]},{"id":"196","name":"阜阳市","area":[{"id":"2289","name":"临泉县"},{"id":"2290","name":"太和县"},{"id":"2291","name":"界首市"},{"id":"2292","name":"阜南县"},{"id":"2293","name":"颍东区"},{"id":"2294","name":"颍州区"},{"id":"2295","name":"颍泉区"},{"id":"2296","name":"颖上县"}]},{"id":"197","name":"宿州市","area":[{"id":"2297","name":"埇桥区"},{"id":"2298","name":"泗县辖"},{"id":"2299","name":"灵璧县"},{"id":"2300","name":"砀山县"},{"id":"2301","name":"萧县"}]},{"id":"198","name":"巢湖市","area":[{"id":"2302","name":"含山县"},{"id":"2303","name":"和县"},{"id":"2304","name":"居巢区"},{"id":"2305","name":"庐江县"},{"id":"2306","name":"无为县"}]},{"id":"199","name":"六安市","area":[{"id":"2307","name":"寿县"},{"id":"2308","name":"舒城县"},{"id":"2309","name":"裕安区"},{"id":"2310","name":"金安区"},{"id":"2311","name":"金寨县"},{"id":"2312","name":"霍山县"},{"id":"2313","name":"霍邱县"}]},{"id":"200","name":"亳州市","area":[{"id":"2314","name":"利辛县"},{"id":"2315","name":"涡阳县"},{"id":"2316","name":"蒙城县"},{"id":"2317","name":"谯城区"}]},{"id":"201","name":"池州市","area":[{"id":"2318","name":"东至县"},{"id":"2319","name":"石台县"},{"id":"2320","name":"贵池区"},{"id":"2321","name":"青阳县"}]},{"id":"202","name":"宣城市","area":[{"id":"2322","name":"宁国市"},{"id":"2323","name":"宣州区"},{"id":"2324","name":"广德县"},{"id":"2325","name":"旌德县"},{"id":"2326","name":"泾县"},{"id":"2327","name":"绩溪县"},{"id":"2328","name":"郎溪县"}]}]},{"id":"13","name":"福建省","city":[{"id":"203","name":"福州市","area":[{"id":"2329","name":"仓山区"},{"id":"2330","name":"台江区"},{"id":"2331","name":"平潭县"},{"id":"2332","name":"晋安区"},{"id":"2333","name":"永泰县"},{"id":"2334","name":"福清市"},{"id":"2335","name":"罗源县"},{"id":"2336","name":"连江县"},{"id":"2337","name":"长乐市"},{"id":"2338","name":"闽侯县"},{"id":"2339","name":"闽清县"},{"id":"2340","name":"马尾区"},{"id":"2341","name":"鼓楼区"}]},{"id":"204","name":"厦门市","area":[{"id":"2342","name":"同安区"},{"id":"2343","name":"思明区"},{"id":"2344","name":"海沧区"},{"id":"2345","name":"湖里区"},{"id":"2346","name":"翔安区"},{"id":"2347","name":"集美区"}]},{"id":"205","name":"莆田市","area":[{"id":"2348","name":"仙游县"},{"id":"2349","name":"城厢区"},{"id":"2350","name":"涵江区"},{"id":"2351","name":"秀屿区"},{"id":"2352","name":"荔城区"}]},{"id":"206","name":"三明市","area":[{"id":"2353","name":"三元区"},{"id":"2354","name":"大田县"},{"id":"2355","name":"宁化县"},{"id":"2356","name":"将乐县"},{"id":"2357","name":"尤溪县"},{"id":"2358","name":"建宁县"},{"id":"2359","name":"明溪县"},{"id":"2360","name":"梅列区"},{"id":"2361","name":"永安市"},{"id":"2362","name":"沙县"},{"id":"2363","name":"泰宁县"},{"id":"2364","name":"清流县"}]},{"id":"207","name":"泉州市","area":[{"id":"2365","name":"丰泽区"},{"id":"2366","name":"南安市"},{"id":"2367","name":"安溪县"},{"id":"2368","name":"德化县"},{"id":"2369","name":"惠安县"},{"id":"2370","name":"晋江市"},{"id":"2371","name":"永春县"},{"id":"2372","name":"泉港区"},{"id":"2373","name":"洛江区"},{"id":"2374","name":"石狮市"},{"id":"2375","name":"金门县"},{"id":"2376","name":"鲤城区"}]},{"id":"208","name":"漳州市","area":[{"id":"2377","name":"东山县"},{"id":"2378","name":"云霄县"},{"id":"2379","name":"华安县"},{"id":"2380","name":"南靖县"},{"id":"2381","name":"平和县"},{"id":"2382","name":"漳浦县"},{"id":"2383","name":"芗城区"},{"id":"2384","name":"诏安县"},{"id":"2385","name":"长泰县"},{"id":"2386","name":"龙文区"},{"id":"2387","name":"龙海市"}]},{"id":"209","name":"南平市","area":[{"id":"2388","name":"光泽县"},{"id":"2389","name":"延平区"},{"id":"2390","name":"建瓯市"},{"id":"2391","name":"建阳市"},{"id":"2392","name":"政和县"},{"id":"2393","name":"松溪县"},{"id":"2394","name":"武夷山市"},{"id":"2395","name":"浦城县"},{"id":"2396","name":"邵武市"},{"id":"2397","name":"顺昌县"}]},{"id":"210","name":"龙岩市","area":[{"id":"2398","name":"上杭县"},{"id":"2399","name":"新罗区"},{"id":"2400","name":"武平县"},{"id":"2401","name":"永定县"},{"id":"2402","name":"漳平市"},{"id":"2403","name":"连城县"},{"id":"2404","name":"长汀县"}]},{"id":"211","name":"宁德市","area":[{"id":"2405","name":"古田县"},{"id":"2406","name":"周宁县"},{"id":"2407","name":"寿宁县"},{"id":"2408","name":"屏南县"},{"id":"2409","name":"柘荣县"},{"id":"2410","name":"福安市"},{"id":"2411","name":"福鼎市"},{"id":"2412","name":"蕉城区"},{"id":"2413","name":"霞浦县"}]}]},{"id":"14","name":"江西省","city":[{"id":"212","name":"南昌市","area":[{"id":"2414","name":"东湖区"},{"id":"2415","name":"南昌县"},{"id":"2416","name":"安义县"},{"id":"2417","name":"新建县"},{"id":"2418","name":"湾里区"},{"id":"2419","name":"西湖区"},{"id":"2420","name":"进贤县"},{"id":"2421","name":"青云谱区"},{"id":"2422","name":"青山湖区"}]},{"id":"213","name":"景德镇市","area":[{"id":"2423","name":"乐平市"},{"id":"2424","name":"昌江区"},{"id":"2425","name":"浮梁县"},{"id":"2426","name":"珠山区"}]},{"id":"214","name":"萍乡市","area":[{"id":"2427","name":"上栗县"},{"id":"2428","name":"安源区"},{"id":"2429","name":"湘东区"},{"id":"2430","name":"芦溪县"},{"id":"2431","name":"莲花县"}]},{"id":"215","name":"九江市","area":[{"id":"2432","name":"九江县"},{"id":"2433","name":"修水县"},{"id":"2434","name":"庐山区"},{"id":"2435","name":"彭泽县"},{"id":"2436","name":"德安县"},{"id":"2437","name":"星子县"},{"id":"2438","name":"武宁县"},{"id":"2439","name":"永修县"},{"id":"2440","name":"浔阳区"},{"id":"2441","name":"湖口县"},{"id":"2442","name":"瑞昌市"},{"id":"2443","name":"都昌县"}]},{"id":"216","name":"新余市","area":[{"id":"2444","name":"分宜县"},{"id":"2445","name":"渝水区"}]},{"id":"217","name":"鹰潭市","area":[{"id":"2446","name":"余江县"},{"id":"2447","name":"月湖区"},{"id":"2448","name":"贵溪市"}]},{"id":"218","name":"赣州市","area":[{"id":"2449","name":"上犹县"},{"id":"2450","name":"于都县"},{"id":"2451","name":"会昌县"},{"id":"2452","name":"信丰县"},{"id":"2453","name":"全南县"},{"id":"2454","name":"兴国县"},{"id":"2455","name":"南康市"},{"id":"2456","name":"大余县"},{"id":"2457","name":"宁都县"},{"id":"2458","name":"安远县"},{"id":"2459","name":"定南县"},{"id":"2460","name":"寻乌县"},{"id":"2461","name":"崇义县"},{"id":"2462","name":"瑞金市"},{"id":"2463","name":"石城县"},{"id":"2464","name":"章贡区"},{"id":"2465","name":"赣县"},{"id":"2466","name":"龙南县"}]},{"id":"219","name":"吉安市","area":[{"id":"2467","name":"万安县"},{"id":"2468","name":"井冈山市"},{"id":"2469","name":"吉安县"},{"id":"2470","name":"吉州区"},{"id":"2471","name":"吉水县"},{"id":"2472","name":"安福县"},{"id":"2473","name":"峡江县"},{"id":"2474","name":"新干县"},{"id":"2475","name":"永丰县"},{"id":"2476","name":"永新县"},{"id":"2477","name":"泰和县"},{"id":"2478","name":"遂川县"},{"id":"2479","name":"青原区"}]},{"id":"220","name":"宜春市","area":[{"id":"2480","name":"万载县"},{"id":"2481","name":"上高县"},{"id":"2482","name":"丰城市"},{"id":"2483","name":"奉新县"},{"id":"2484","name":"宜丰县"},{"id":"2485","name":"樟树市"},{"id":"2486","name":"袁州区"},{"id":"2487","name":"铜鼓县"},{"id":"2488","name":"靖安县"},{"id":"2489","name":"高安市"}]},{"id":"221","name":"抚州市","area":[{"id":"2490","name":"东乡县"},{"id":"2491","name":"临川区"},{"id":"2492","name":"乐安县"},{"id":"2493","name":"南丰县"},{"id":"2494","name":"南城县"},{"id":"2495","name":"宜黄县"},{"id":"2496","name":"崇仁县"},{"id":"2497","name":"广昌县"},{"id":"2498","name":"资溪县"},{"id":"2499","name":"金溪县"},{"id":"2500","name":"黎川县"}]},{"id":"222","name":"上饶市","area":[{"id":"2501","name":"万年县"},{"id":"2502","name":"上饶县"},{"id":"2503","name":"余干县"},{"id":"2504","name":"信州区"},{"id":"2505","name":"婺源县"},{"id":"2506","name":"广丰县"},{"id":"2507","name":"弋阳县"},{"id":"2508","name":"德兴市"},{"id":"2509","name":"横峰县"},{"id":"2510","name":"玉山县"},{"id":"2511","name":"鄱阳县"},{"id":"2512","name":"铅山县"}]}]},{"id":"15","name":"山东省","city":[{"id":"223","name":"济南市","area":[{"id":"2513","name":"历下区"},{"id":"2514","name":"历城区"},{"id":"2515","name":"商河县"},{"id":"2516","name":"天桥区"},{"id":"2517","name":"市中区"},{"id":"2518","name":"平阴县"},{"id":"2519","name":"槐荫区"},{"id":"2520","name":"济阳县"},{"id":"2521","name":"章丘市"},{"id":"2522","name":"长清区"}]},{"id":"224","name":"青岛市","area":[{"id":"2523","name":"即墨市"},{"id":"2524","name":"四方区"},{"id":"2525","name":"城阳区"},{"id":"2526","name":"崂山区"},{"id":"2527","name":"市北区"},{"id":"2528","name":"市南区"},{"id":"2529","name":"平度市"},{"id":"2530","name":"李沧区"},{"id":"2531","name":"胶南市"},{"id":"2532","name":"胶州市"},{"id":"2533","name":"莱西市"},{"id":"2534","name":"黄岛区"}]},{"id":"225","name":"淄博市","area":[{"id":"2535","name":"临淄区"},{"id":"2536","name":"博山区"},{"id":"2537","name":"周村区"},{"id":"2538","name":"张店区"},{"id":"2539","name":"桓台县"},{"id":"2540","name":"沂源县"},{"id":"2541","name":"淄川区"},{"id":"2542","name":"高青县"}]},{"id":"226","name":"枣庄市","area":[{"id":"2543","name":"台儿庄区"},{"id":"2544","name":"山亭区"},{"id":"2545","name":"峄城区"},{"id":"2546","name":"市中区"},{"id":"2547","name":"滕州市"},{"id":"2548","name":"薛城区"}]},{"id":"227","name":"东营市","area":[{"id":"2549","name":"东营区"},{"id":"2550","name":"利津县"},{"id":"2551","name":"垦利县"},{"id":"2552","name":"广饶县"},{"id":"2553","name":"河口区"}]},{"id":"228","name":"烟台市","area":[{"id":"2554","name":"招远市"},{"id":"2555","name":"栖霞市"},{"id":"2556","name":"海阳市"},{"id":"2557","name":"牟平区"},{"id":"2558","name":"福山区"},{"id":"2559","name":"芝罘区"},{"id":"2560","name":"莱山区"},{"id":"2561","name":"莱州市"},{"id":"2562","name":"莱阳市"},{"id":"2563","name":"蓬莱市"},{"id":"2564","name":"长岛县"},{"id":"2565","name":"龙口市"}]},{"id":"229","name":"潍坊市","area":[{"id":"2566","name":"临朐县"},{"id":"2567","name":"坊子区"},{"id":"2568","name":"奎文区"},{"id":"2569","name":"安丘市"},{"id":"2570","name":"寒亭区"},{"id":"2571","name":"寿光市"},{"id":"2572","name":"昌乐县"},{"id":"2573","name":"昌邑市"},{"id":"2574","name":"潍城区"},{"id":"2575","name":"诸城市"},{"id":"2576","name":"青州市"},{"id":"2577","name":"高密市"}]},{"id":"230","name":"济宁市","area":[{"id":"2578","name":"任城区"},{"id":"2579","name":"兖州市"},{"id":"2580","name":"嘉祥县"},{"id":"2581","name":"市中区"},{"id":"2582","name":"微山县"},{"id":"2583","name":"曲阜市"},{"id":"2584","name":"梁山县"},{"id":"2585","name":"汶上县"},{"id":"2586","name":"泗水县"},{"id":"2587","name":"邹城市"},{"id":"2588","name":"金乡县"},{"id":"2589","name":"鱼台县"}]},{"id":"231","name":"泰安市","area":[{"id":"2590","name":"东平县"},{"id":"2591","name":"宁阳县"},{"id":"2592","name":"岱岳区"},{"id":"2593","name":"新泰市"},{"id":"2594","name":"泰山区"},{"id":"2595","name":"肥城市"}]},{"id":"232","name":"威海市","area":[{"id":"2596","name":"乳山市"},{"id":"2597","name":"文登市"},{"id":"2598","name":"环翠区"},{"id":"2599","name":"荣成市"}]},{"id":"233","name":"日照市","area":[{"id":"2600","name":"东港区"},{"id":"2601","name":"五莲县"},{"id":"2602","name":"岚山区"},{"id":"2603","name":"莒县"}]},{"id":"234","name":"莱芜市","area":[{"id":"2604","name":"莱城区"},{"id":"2605","name":"钢城区"}]},{"id":"235","name":"临沂市","area":[{"id":"2606","name":"临沭县"},{"id":"2607","name":"兰山区"},{"id":"2608","name":"平邑县"},{"id":"2609","name":"沂南县"},{"id":"2610","name":"沂水县"},{"id":"2611","name":"河东区"},{"id":"2612","name":"罗庄区"},{"id":"2613","name":"苍山县"},{"id":"2614","name":"莒南县"},{"id":"2615","name":"蒙阴县"},{"id":"2616","name":"费县"},{"id":"2617","name":"郯城县"}]},{"id":"236","name":"德州市","area":[{"id":"2618","name":"临邑县"},{"id":"2619","name":"乐陵市"},{"id":"2620","name":"夏津县"},{"id":"2621","name":"宁津县"},{"id":"2622","name":"平原县"},{"id":"2623","name":"庆云县"},{"id":"2624","name":"德城区"},{"id":"2625","name":"武城县"},{"id":"2626","name":"禹城市"},{"id":"2627","name":"陵县"},{"id":"2628","name":"齐河县"}]},{"id":"237","name":"聊城市","area":[{"id":"2629","name":"东昌府区"},{"id":"2630","name":"东阿县"},{"id":"2631","name":"临清市"},{"id":"2632","name":"冠县"},{"id":"2633","name":"茌平县"},{"id":"2634","name":"莘县"},{"id":"2635","name":"阳谷县"},{"id":"2636","name":"高唐县"}]},{"id":"238","name":"滨州市","area":[{"id":"2637","name":"博兴县"},{"id":"2638","name":"惠民县"},{"id":"2639","name":"无棣县"},{"id":"2640","name":"沾化县"},{"id":"2641","name":"滨城区"},{"id":"2642","name":"邹平县"},{"id":"2643","name":"阳信县"}]},{"id":"239","name":"菏泽市","area":[{"id":"2644","name":"东明县"},{"id":"2645","name":"单县"},{"id":"2646","name":"定陶县"},{"id":"2647","name":"巨野县"},{"id":"2648","name":"成武县"},{"id":"2649","name":"曹县"},{"id":"2650","name":"牡丹区"},{"id":"2651","name":"郓城县"},{"id":"2652","name":"鄄城县"}]}]},{"id":"16","name":"河南省","city":[{"id":"240","name":"郑州市","area":[{"id":"2653","name":"上街区"},{"id":"2654","name":"中原区"},{"id":"2655","name":"中牟县"},{"id":"2656","name":"二七区"},{"id":"2657","name":"巩义市"},{"id":"2658","name":"惠济区"},{"id":"2659","name":"新密市"},{"id":"2660","name":"新郑市"},{"id":"2661","name":"登封市"},{"id":"2662","name":"管城回族区"},{"id":"2663","name":"荥阳市"},{"id":"2664","name":"金水区"}]},{"id":"241","name":"开封市","area":[{"id":"2665","name":"兰考县"},{"id":"2666","name":"尉氏县"},{"id":"2667","name":"开封县"},{"id":"2668","name":"杞县"},{"id":"2669","name":"禹王台区"},{"id":"2670","name":"通许县"},{"id":"2671","name":"金明区"},{"id":"2672","name":"顺河回族区"},{"id":"2673","name":"鼓楼区"},{"id":"2674","name":"龙亭区"}]},{"id":"242","name":"洛阳市","area":[{"id":"2675","name":"伊川县"},{"id":"2676","name":"偃师市"},{"id":"2677","name":"吉利区"},{"id":"2678","name":"孟津县"},{"id":"2679","name":"宜阳县"},{"id":"2680","name":"嵩县"},{"id":"2681","name":"新安县"},{"id":"2682","name":"栾川县"},{"id":"2683","name":"汝阳县"},{"id":"2684","name":"洛宁县"},{"id":"2685","name":"洛龙区"},{"id":"2686","name":"涧西区"},{"id":"2687","name":"瀍河回族区"},{"id":"2688","name":"老城区"},{"id":"2689","name":"西工区"}]},{"id":"243","name":"平顶山市","area":[{"id":"2690","name":"卫东区"},{"id":"2691","name":"叶县"},{"id":"2692","name":"宝丰县"},{"id":"2693","name":"新华区"},{"id":"2694","name":"汝州市"},{"id":"2695","name":"湛河区"},{"id":"2696","name":"石龙区"},{"id":"2697","name":"舞钢市"},{"id":"2698","name":"郏县"},{"id":"2699","name":"鲁山县"}]},{"id":"244","name":"安阳市","area":[{"id":"2700","name":"内黄县"},{"id":"2701","name":"北关区"},{"id":"2702","name":"安阳县"},{"id":"2703","name":"文峰区"},{"id":"2704","name":"林州市"},{"id":"2705","name":"殷都区"},{"id":"2706","name":"汤阴县"},{"id":"2707","name":"滑县"},{"id":"2708","name":"龙安区"}]},{"id":"245","name":"鹤壁市","area":[{"id":"2709","name":"山城区"},{"id":"2710","name":"浚县"},{"id":"2711","name":"淇县"},{"id":"2712","name":"淇滨区"},{"id":"2713","name":"鹤山区"}]},{"id":"246","name":"新乡市","area":[{"id":"2714","name":"凤泉区"},{"id":"2715","name":"卫滨区"},{"id":"2716","name":"卫辉市"},{"id":"2717","name":"原阳县"},{"id":"2718","name":"封丘县"},{"id":"2719","name":"延津县"},{"id":"2720","name":"新乡县"},{"id":"2721","name":"牧野区"},{"id":"2722","name":"红旗区"},{"id":"2723","name":"获嘉县"},{"id":"2724","name":"辉县市"},{"id":"2725","name":"长垣县"}]},{"id":"247","name":"焦作市","area":[{"id":"2726","name":"中站区"},{"id":"2727","name":"修武县"},{"id":"2728","name":"博爱县"},{"id":"2729","name":"孟州市"},{"id":"2730","name":"山阳区"},{"id":"2731","name":"武陟县"},{"id":"2732","name":"沁阳市"},{"id":"2733","name":"温县"},{"id":"2734","name":"解放区"},{"id":"2735","name":"马村区"}]},{"id":"248","name":"濮阳市","area":[{"id":"2736","name":"华龙区"},{"id":"2737","name":"南乐县"},{"id":"2738","name":"台前县"},{"id":"2739","name":"清丰县"},{"id":"2740","name":"濮阳县"},{"id":"2741","name":"范县"}]},{"id":"249","name":"许昌市","area":[{"id":"2742","name":"禹州市"},{"id":"2743","name":"襄城县"},{"id":"2744","name":"许昌县"},{"id":"2745","name":"鄢陵县"},{"id":"2746","name":"长葛市"},{"id":"2747","name":"魏都区"}]},{"id":"250","name":"漯河市","area":[{"id":"2748","name":"临颍县"},{"id":"2749","name":"召陵区"},{"id":"2750","name":"源汇区"},{"id":"2751","name":"舞阳县"},{"id":"2752","name":"郾城区"}]},{"id":"251","name":"三门峡市","area":[{"id":"2753","name":"义马市"},{"id":"2754","name":"卢氏县"},{"id":"2755","name":"渑池县"},{"id":"2756","name":"湖滨区"},{"id":"2757","name":"灵宝市"},{"id":"2758","name":"陕县"}]},{"id":"252","name":"南阳市","area":[{"id":"2759","name":"内乡县"},{"id":"2760","name":"南召县"},{"id":"2761","name":"卧龙区"},{"id":"2762","name":"唐河县"},{"id":"2763","name":"宛城区"},{"id":"2764","name":"新野县"},{"id":"2765","name":"方城县"},{"id":"2766","name":"桐柏县"},{"id":"2767","name":"淅川县"},{"id":"2768","name":"社旗县"},{"id":"2769","name":"西峡县"},{"id":"2770","name":"邓州市"},{"id":"2771","name":"镇平县"}]},{"id":"253","name":"商丘市","area":[{"id":"2772","name":"夏邑县"},{"id":"2773","name":"宁陵县"},{"id":"2774","name":"柘城县"},{"id":"2775","name":"民权县"},{"id":"2776","name":"永城市"},{"id":"2777","name":"睢县"},{"id":"2778","name":"睢阳区"},{"id":"2779","name":"粱园区"},{"id":"2780","name":"虞城县"}]},{"id":"254","name":"信阳市","area":[{"id":"2781","name":"光山县"},{"id":"2782","name":"商城县"},{"id":"2783","name":"固始县"},{"id":"2784","name":"平桥区"},{"id":"2785","name":"息县"},{"id":"2786","name":"新县"},{"id":"2787","name":"浉河区"},{"id":"2788","name":"淮滨县"},{"id":"2789","name":"潢川县"},{"id":"2790","name":"罗山县"}]},{"id":"255","name":"周口市","area":[{"id":"2791","name":"商水县"},{"id":"2792","name":"太康县"},{"id":"2793","name":"川汇区"},{"id":"2794","name":"扶沟县"},{"id":"2795","name":"沈丘县"},{"id":"2796","name":"淮阳县"},{"id":"2797","name":"西华县"},{"id":"2798","name":"郸城县"},{"id":"2799","name":"项城市"},{"id":"2800","name":"鹿邑县"}]},{"id":"256","name":"驻马店市","area":[{"id":"2801","name":"上蔡县"},{"id":"2802","name":"平舆县"},{"id":"2803","name":"新蔡县"},{"id":"2804","name":"正阳县"},{"id":"2805","name":"汝南县"},{"id":"2806","name":"泌阳县"},{"id":"2807","name":"确山县"},{"id":"2808","name":"西平县"},{"id":"2809","name":"遂平县"},{"id":"2810","name":"驿城区"}]},{"id":"257","name":"济源市","area":[{"id":"2811","name":"济源市"}]}]},{"id":"17","name":"湖北省","city":[{"id":"258","name":"武汉市","area":[{"id":"2812","name":"东西湖区"},{"id":"2813","name":"新洲区"},{"id":"2814","name":"武昌区"},{"id":"2815","name":"汉南区"},{"id":"2816","name":"汉阳区"},{"id":"2817","name":"江夏区"},{"id":"2818","name":"江岸区"},{"id":"2819","name":"江汉区"},{"id":"2820","name":"洪山区"},{"id":"2821","name":"硚口区"},{"id":"2822","name":"蔡甸区"},{"id":"2823","name":"青山区"},{"id":"2824","name":"黄陂区"}]},{"id":"259","name":"黄石市","area":[{"id":"2825","name":"下陆区"},{"id":"2826","name":"大冶市"},{"id":"2827","name":"西塞山区"},{"id":"2828","name":"铁山区"},{"id":"2829","name":"阳新县"},{"id":"2830","name":"黄石港区"}]},{"id":"260","name":"十堰市","area":[{"id":"2831","name":"丹江口市"},{"id":"2832","name":"张湾区"},{"id":"2833","name":"房县"},{"id":"2834","name":"竹山县"},{"id":"2835","name":"竹溪县"},{"id":"2836","name":"茅箭区"},{"id":"2837","name":"郧县"},{"id":"2838","name":"郧西县"}]},{"id":"261","name":"宜昌市","area":[{"id":"2839","name":"五峰土家族自治县"},{"id":"2840","name":"伍家岗区"},{"id":"2841","name":"兴山县"},{"id":"2842","name":"夷陵区"},{"id":"2843","name":"宜都市"},{"id":"2844","name":"当阳市"},{"id":"2845","name":"枝江市"},{"id":"2846","name":"点军区"},{"id":"2847","name":"秭归县"},{"id":"2848","name":"虢亭区"},{"id":"2849","name":"西陵区"},{"id":"2850","name":"远安县"},{"id":"2851","name":"长阳土家族自治县"}]},{"id":"262","name":"襄樊市","area":[{"id":"2852","name":"保康县"},{"id":"2853","name":"南漳县"},{"id":"2854","name":"宜城市"},{"id":"2855","name":"枣阳市"},{"id":"2856","name":"樊城区"},{"id":"2857","name":"老河口市"},{"id":"2858","name":"襄城区"},{"id":"2859","name":"襄阳区"},{"id":"2860","name":"谷城县"}]},{"id":"263","name":"鄂州市","area":[{"id":"2861","name":"华容区"},{"id":"2862","name":"粱子湖"},{"id":"2863","name":"鄂城区"}]},{"id":"264","name":"荆门市","area":[{"id":"2864","name":"东宝区"},{"id":"2865","name":"京山县"},{"id":"2866","name":"掇刀区"},{"id":"2867","name":"沙洋县"},{"id":"2868","name":"钟祥市"}]},{"id":"265","name":"孝感市","area":[{"id":"2869","name":"云梦县"},{"id":"2870","name":"大悟县"},{"id":"2871","name":"孝南区"},{"id":"2872","name":"孝昌县"},{"id":"2873","name":"安陆市"},{"id":"2874","name":"应城市"},{"id":"2875","name":"汉川市"}]},{"id":"266","name":"荆州市","area":[{"id":"2876","name":"公安县"},{"id":"2877","name":"松滋市"},{"id":"2878","name":"江陵县"},{"id":"2879","name":"沙市区"},{"id":"2880","name":"洪湖市"},{"id":"2881","name":"监利县"},{"id":"2882","name":"石首市"},{"id":"2883","name":"荆州区"}]},{"id":"267","name":"黄冈市","area":[{"id":"2884","name":"团风县"},{"id":"2885","name":"武穴市"},{"id":"2886","name":"浠水县"},{"id":"2887","name":"红安县"},{"id":"2888","name":"罗田县"},{"id":"2889","name":"英山县"},{"id":"2890","name":"蕲春县"},{"id":"2891","name":"麻城市"},{"id":"2892","name":"黄州区"},{"id":"2893","name":"黄梅县"}]},{"id":"268","name":"咸宁市","area":[{"id":"2894","name":"咸安区"},{"id":"2895","name":"嘉鱼县"},{"id":"2896","name":"崇阳县"},{"id":"2897","name":"赤壁市"},{"id":"2898","name":"通城县"},{"id":"2899","name":"通山县"}]},{"id":"269","name":"随州市","area":[{"id":"2900","name":"广水市"},{"id":"2901","name":"曾都区"}]},{"id":"270","name":"恩施土家族苗族自治州","area":[{"id":"2902","name":"利川市"},{"id":"2903","name":"咸丰县"},{"id":"2904","name":"宣恩县"},{"id":"2905","name":"巴东县"},{"id":"2906","name":"建始县"},{"id":"2907","name":"恩施市"},{"id":"2908","name":"来凤县"},{"id":"2909","name":"鹤峰县"}]},{"id":"271","name":"仙桃市","area":[{"id":"2910","name":"仙桃市"}]},{"id":"272","name":"潜江市","area":[{"id":"2911","name":"潜江市"}]},{"id":"273","name":"天门市","area":[{"id":"2912","name":"天门市"}]},{"id":"274","name":"神农架林区","area":[{"id":"2913","name":"神农架林区"}]}]},{"id":"18","name":"湖南省","city":[{"id":"275","name":"长沙市","area":[{"id":"2914","name":"天心区"},{"id":"2915","name":"宁乡县"},{"id":"2916","name":"岳麓区"},{"id":"2917","name":"开福区"},{"id":"2918","name":"望城县"},{"id":"2919","name":"浏阳市"},{"id":"2920","name":"芙蓉区"},{"id":"2921","name":"长沙县"},{"id":"2922","name":"雨花区"}]},{"id":"276","name":"株洲市","area":[{"id":"2923","name":"天元区"},{"id":"2924","name":"攸县"},{"id":"2925","name":"株洲县"},{"id":"2926","name":"炎陵县"},{"id":"2927","name":"石峰区"},{"id":"2928","name":"芦淞区"},{"id":"2929","name":"茶陵县"},{"id":"2930","name":"荷塘区"},{"id":"2931","name":"醴陵市"}]},{"id":"277","name":"湘潭市","area":[{"id":"2932","name":"岳塘区"},{"id":"2933","name":"湘乡市"},{"id":"2934","name":"湘潭县"},{"id":"2935","name":"雨湖区"},{"id":"2936","name":"韶山市"}]},{"id":"278","name":"衡阳市","area":[{"id":"2937","name":"南岳区"},{"id":"2938","name":"常宁市"},{"id":"2939","name":"珠晖区"},{"id":"2940","name":"石鼓区"},{"id":"2941","name":"祁东县"},{"id":"2942","name":"耒阳市"},{"id":"2943","name":"蒸湘区"},{"id":"2944","name":"衡东县"},{"id":"2945","name":"衡南县"},{"id":"2946","name":"衡山县"},{"id":"2947","name":"衡阳县"},{"id":"2948","name":"雁峰区"}]},{"id":"279","name":"邵阳市","area":[{"id":"2949","name":"北塔区"},{"id":"2950","name":"双清区"},{"id":"2951","name":"城步苗族自治县"},{"id":"2952","name":"大祥区"},{"id":"2953","name":"新宁县"},{"id":"2954","name":"新邵县"},{"id":"2955","name":"武冈市"},{"id":"2956","name":"洞口县"},{"id":"2957","name":"绥宁县"},{"id":"2958","name":"邵东县"},{"id":"2959","name":"邵阳县"},{"id":"2960","name":"隆回县"}]},{"id":"280","name":"岳阳市","area":[{"id":"2961","name":"临湘市"},{"id":"2962","name":"云溪区"},{"id":"2963","name":"华容县"},{"id":"2964","name":"君山区"},{"id":"2965","name":"岳阳县"},{"id":"2966","name":"岳阳楼区"},{"id":"2967","name":"平江县"},{"id":"2968","name":"汨罗市"},{"id":"2969","name":"湘阴县"}]},{"id":"281","name":"常德市","area":[{"id":"2970","name":"临澧县"},{"id":"2971","name":"安乡县"},{"id":"2972","name":"桃源县"},{"id":"2973","name":"武陵区"},{"id":"2974","name":"汉寿县"},{"id":"2975","name":"津市市"},{"id":"2976","name":"澧县"},{"id":"2977","name":"石门县"},{"id":"2978","name":"鼎城区"}]},{"id":"282","name":"张家界市","area":[{"id":"2979","name":"慈利县"},{"id":"2980","name":"桑植县"},{"id":"2981","name":"武陵源区"},{"id":"2982","name":"永定区"}]},{"id":"283","name":"益阳市","area":[{"id":"2983","name":"南县"},{"id":"2984","name":"安化县"},{"id":"2985","name":"桃江县"},{"id":"2986","name":"沅江市"},{"id":"2987","name":"资阳区"},{"id":"2988","name":"赫山区"}]},{"id":"284","name":"郴州市","area":[{"id":"2989","name":"临武县"},{"id":"2990","name":"北湖区"},{"id":"2991","name":"嘉禾县"},{"id":"2992","name":"安仁县"},{"id":"2993","name":"宜章县"},{"id":"2994","name":"桂东县"},{"id":"2995","name":"桂阳县"},{"id":"2996","name":"永兴县"},{"id":"2997","name":"汝城县"},{"id":"2998","name":"苏仙区"},{"id":"2999","name":"资兴市"}]},{"id":"285","name":"永州市","area":[{"id":"3000","name":"东安县"},{"id":"3001","name":"冷水滩区"},{"id":"3002","name":"双牌县"},{"id":"3003","name":"宁远县"},{"id":"3004","name":"新田县"},{"id":"3005","name":"江华瑶族自治县"},{"id":"3006","name":"江永县"},{"id":"3007","name":"祁阳县"},{"id":"3008","name":"蓝山县"},{"id":"3009","name":"道县"},{"id":"3010","name":"零陵区"}]},{"id":"286","name":"怀化市","area":[{"id":"3011","name":"中方县"},{"id":"3012","name":"会同县"},{"id":"3013","name":"新晃侗族自治县"},{"id":"3014","name":"沅陵县"},{"id":"3015","name":"洪江市/洪江区"},{"id":"3016","name":"溆浦县"},{"id":"3017","name":"芷江侗族自治县"},{"id":"3018","name":"辰溪县"},{"id":"3019","name":"通道侗族自治县"},{"id":"3020","name":"靖州苗族侗族自治县"},{"id":"3021","name":"鹤城区"},{"id":"3022","name":"麻阳苗族自治县"}]},{"id":"287","name":"娄底市","area":[{"id":"3023","name":"冷水江市"},{"id":"3024","name":"双峰县"},{"id":"3025","name":"娄星区"},{"id":"3026","name":"新化县"},{"id":"3027","name":"涟源市"}]},{"id":"288","name":"湘西土家族苗族自治州","area":[{"id":"3028","name":"保靖县"},{"id":"3029","name":"凤凰县"},{"id":"3030","name":"古丈县"},{"id":"3031","name":"吉首市"},{"id":"3032","name":"永顺县"},{"id":"3033","name":"泸溪县"},{"id":"3034","name":"花垣县"},{"id":"3035","name":"龙山县"}]}]},{"id":"19","name":"广东省","city":[{"id":"289","name":"广州市","area":[{"id":"3036","name":"萝岗区"},{"id":"3037","name":"南沙区"},{"id":"3038","name":"从化市"},{"id":"3039","name":"增城市"},{"id":"3040","name":"天河区"},{"id":"3041","name":"海珠区"},{"id":"3042","name":"番禺区"},{"id":"3043","name":"白云区"},{"id":"3044","name":"花都区"},{"id":"3045","name":"荔湾区"},{"id":"3046","name":"越秀区"},{"id":"3047","name":"黄埔区"}]},{"id":"290","name":"韶关市","area":[{"id":"3048","name":"乐昌市"},{"id":"3049","name":"乳源瑶族自治县"},{"id":"3050","name":"仁化县"},{"id":"3051","name":"南雄市"},{"id":"3052","name":"始兴县"},{"id":"3053","name":"新丰县"},{"id":"3054","name":"曲江区"},{"id":"3055","name":"武江区"},{"id":"3056","name":"浈江区"},{"id":"3057","name":"翁源县"}]},{"id":"291","name":"深圳市","area":[{"id":"3058","name":"南山区"},{"id":"3059","name":"宝安区"},{"id":"3060","name":"盐田区"},{"id":"3061","name":"福田区"},{"id":"3062","name":"罗湖区"},{"id":"3063","name":"龙岗区"}]},{"id":"292","name":"珠海市","area":[{"id":"3064","name":"斗门区"},{"id":"3065","name":"金湾区"},{"id":"3066","name":"香洲区"}]},{"id":"293","name":"汕头市","area":[{"id":"3067","name":"南澳县"},{"id":"3068","name":"潮南区"},{"id":"3069","name":"潮阳区"},{"id":"3070","name":"澄海区"},{"id":"3071","name":"濠江区"},{"id":"3072","name":"金平区"},{"id":"3073","name":"龙湖区"}]},{"id":"294","name":"佛山市","area":[{"id":"3074","name":"三水区"},{"id":"3075","name":"南海区"},{"id":"3076","name":"禅城区"},{"id":"3077","name":"顺德区"},{"id":"3078","name":"高明区"}]},{"id":"295","name":"江门市","area":[{"id":"3079","name":"台山市"},{"id":"3080","name":"开平市"},{"id":"3081","name":"恩平市"},{"id":"3082","name":"新会区"},{"id":"3083","name":"江海区"},{"id":"3084","name":"蓬江区"},{"id":"3085","name":"鹤山市"}]},{"id":"296","name":"湛江市","area":[{"id":"3086","name":"吴川市"},{"id":"3087","name":"坡头区"},{"id":"3088","name":"廉江市"},{"id":"3089","name":"徐闻县"},{"id":"3090","name":"赤坎区"},{"id":"3091","name":"遂溪县"},{"id":"3092","name":"雷州市"},{"id":"3093","name":"霞山区"},{"id":"3094","name":"麻章区"}]},{"id":"297","name":"茂名市","area":[{"id":"3095","name":"信宜市"},{"id":"3096","name":"化州市"},{"id":"3097","name":"电白县"},{"id":"3098","name":"茂南区"},{"id":"3099","name":"茂港区"},{"id":"3100","name":"高州市"}]},{"id":"298","name":"肇庆市","area":[{"id":"3101","name":"四会市"},{"id":"3102","name":"封开县"},{"id":"3103","name":"广宁县"},{"id":"3104","name":"德庆县"},{"id":"3105","name":"怀集县"},{"id":"3106","name":"端州区"},{"id":"3107","name":"高要市"},{"id":"3108","name":"鼎湖区"}]},{"id":"299","name":"惠州市","area":[{"id":"3109","name":"博罗县"},{"id":"3110","name":"惠东县"},{"id":"3111","name":"惠城区"},{"id":"3112","name":"惠阳区"},{"id":"3113","name":"龙门县"}]},{"id":"300","name":"梅州市","area":[{"id":"3114","name":"丰顺县"},{"id":"3115","name":"五华县"},{"id":"3116","name":"兴宁市"},{"id":"3117","name":"大埔县"},{"id":"3118","name":"平远县"},{"id":"3119","name":"梅县"},{"id":"3120","name":"梅江区"},{"id":"3121","name":"蕉岭县"}]},{"id":"301","name":"汕尾市","area":[{"id":"3122","name":"城区"},{"id":"3123","name":"海丰县"},{"id":"3124","name":"陆丰市"},{"id":"3125","name":"陆河县"}]},{"id":"302","name":"河源市","area":[{"id":"3126","name":"东源县"},{"id":"3127","name":"和平县"},{"id":"3128","name":"源城区"},{"id":"3129","name":"紫金县"},{"id":"3130","name":"连平县"},{"id":"3131","name":"龙川县"}]},{"id":"303","name":"阳江市","area":[{"id":"3132","name":"江城区"},{"id":"3133","name":"阳东县"},{"id":"3134","name":"阳春市"},{"id":"3135","name":"阳西县"}]},{"id":"304","name":"清远市","area":[{"id":"3136","name":"佛冈县"},{"id":"3137","name":"清城区"},{"id":"3138","name":"清新县"},{"id":"3139","name":"英德市"},{"id":"3140","name":"连南瑶族自治县"},{"id":"3141","name":"连山壮族瑶族自治县"},{"id":"3142","name":"连州市"},{"id":"3143","name":"阳山县"}]},{"id":"305","name":"东莞市","area":[{"id":"3144","name":"东莞市"}]},{"id":"306","name":"中山市","area":[{"id":"3145","name":"中山市"}]},{"id":"307","name":"潮州市","area":[{"id":"3146","name":"湘桥区"},{"id":"3147","name":"潮安县"},{"id":"3148","name":"饶平县"}]},{"id":"308","name":"揭阳市","area":[{"id":"3149","name":"惠来县"},{"id":"3150","name":"揭东县"},{"id":"3151","name":"揭西县"},{"id":"3152","name":"普宁市"},{"id":"3153","name":"榕城区"}]},{"id":"309","name":"云浮市","area":[{"id":"3154","name":"云城区"},{"id":"3155","name":"云安县"},{"id":"3156","name":"新兴县"},{"id":"3157","name":"罗定市"},{"id":"3158","name":"郁南县"}]}]},{"id":"20","name":"广西壮族自治区","city":[{"id":"310","name":"南宁市","area":[{"id":"3159","name":"上林县"},{"id":"3160","name":"兴宁区"},{"id":"3161","name":"宾阳县"},{"id":"3162","name":"横县"},{"id":"3163","name":"武鸣县"},{"id":"3164","name":"江南区"},{"id":"3165","name":"良庆区"},{"id":"3166","name":"西乡塘区"},{"id":"3167","name":"邕宁区"},{"id":"3168","name":"隆安县"},{"id":"3169","name":"青秀区"},{"id":"3170","name":"马山县"}]},{"id":"311","name":"柳州市","area":[{"id":"3171","name":"三江侗族自治县"},{"id":"3172","name":"城中区"},{"id":"3173","name":"柳北区"},{"id":"3174","name":"柳南区"},{"id":"3175","name":"柳城县"},{"id":"3176","name":"柳江县"},{"id":"3177","name":"融安县"},{"id":"3178","name":"融水苗族自治县"},{"id":"3179","name":"鱼峰区"},{"id":"3180","name":"鹿寨县"}]},{"id":"312","name":"桂林市","area":[{"id":"3181","name":"七星区"},{"id":"3182","name":"临桂县"},{"id":"3183","name":"全州县"},{"id":"3184","name":"兴安县"},{"id":"3185","name":"叠彩区"},{"id":"3186","name":"平乐县"},{"id":"3187","name":"恭城瑶族自治县"},{"id":"3188","name":"永福县"},{"id":"3189","name":"灌阳县"},{"id":"3190","name":"灵川县"},{"id":"3191","name":"秀峰区"},{"id":"3192","name":"荔浦县"},{"id":"3193","name":"象山区"},{"id":"3194","name":"资源县"},{"id":"3195","name":"阳朔县"},{"id":"3196","name":"雁山区"},{"id":"3197","name":"龙胜各族自治县"}]},{"id":"313","name":"梧州市","area":[{"id":"3198","name":"万秀区"},{"id":"3199","name":"岑溪市"},{"id":"3200","name":"苍梧县"},{"id":"3201","name":"蒙山县"},{"id":"3202","name":"藤县"},{"id":"3203","name":"蝶山区"},{"id":"3204","name":"长洲区"}]},{"id":"314","name":"北海市","area":[{"id":"3205","name":"合浦县"},{"id":"3206","name":"海城区"},{"id":"3207","name":"铁山港区"},{"id":"3208","name":"银海区"}]},{"id":"315","name":"防城港市","area":[{"id":"3209","name":"上思县"},{"id":"3210","name":"东兴市"},{"id":"3211","name":"港口区"},{"id":"3212","name":"防城区"}]},{"id":"316","name":"钦州市","area":[{"id":"3213","name":"浦北县"},{"id":"3214","name":"灵山县"},{"id":"3215","name":"钦北区"},{"id":"3216","name":"钦南区"}]},{"id":"317","name":"贵港市","area":[{"id":"3217","name":"平南县"},{"id":"3218","name":"桂平市"},{"id":"3219","name":"港北区"},{"id":"3220","name":"港南区"},{"id":"3221","name":"覃塘区"}]},{"id":"318","name":"玉林市","area":[{"id":"3222","name":"兴业县"},{"id":"3223","name":"北流市"},{"id":"3224","name":"博白县"},{"id":"3225","name":"容县"},{"id":"3226","name":"玉州区"},{"id":"3227","name":"陆川县"}]},{"id":"319","name":"百色市","area":[{"id":"3228","name":"乐业县"},{"id":"3229","name":"凌云县"},{"id":"3230","name":"右江区"},{"id":"3231","name":"平果县"},{"id":"3232","name":"德保县"},{"id":"3233","name":"田东县"},{"id":"3234","name":"田林县"},{"id":"3235","name":"田阳县"},{"id":"3236","name":"西林县"},{"id":"3237","name":"那坡县"},{"id":"3238","name":"隆林各族自治县"},{"id":"3239","name":"靖西县"}]},{"id":"320","name":"贺州市","area":[{"id":"3240","name":"八步区"},{"id":"3241","name":"富川瑶族自治县"},{"id":"3242","name":"昭平县"},{"id":"3243","name":"钟山县"}]},{"id":"321","name":"河池市","area":[{"id":"3244","name":"东兰县"},{"id":"3245","name":"凤山县"},{"id":"3246","name":"南丹县"},{"id":"3247","name":"大化瑶族自治县"},{"id":"3248","name":"天峨县"},{"id":"3249","name":"宜州市"},{"id":"3250","name":"巴马瑶族自治县"},{"id":"3251","name":"环江毛南族自治县"},{"id":"3252","name":"罗城仫佬族自治县"},{"id":"3253","name":"都安瑶族自治县"},{"id":"3254","name":"金城江区"}]},{"id":"322","name":"来宾市","area":[{"id":"3255","name":"兴宾区"},{"id":"3256","name":"合山市"},{"id":"3257","name":"忻城县"},{"id":"3258","name":"武宣县"},{"id":"3259","name":"象州县"},{"id":"3260","name":"金秀瑶族自治县"}]},{"id":"323","name":"崇左市","area":[{"id":"3261","name":"凭祥市"},{"id":"3262","name":"大新县"},{"id":"3263","name":"天等县"},{"id":"3264","name":"宁明县"},{"id":"3265","name":"扶绥县"},{"id":"3266","name":"江州区"},{"id":"3267","name":"龙州县"}]}]},{"id":"21","name":"海南省","city":[{"id":"324","name":"海口市","area":[{"id":"3268","name":"琼山区"},{"id":"3269","name":"秀英区"},{"id":"3270","name":"美兰区"},{"id":"3271","name":"龙华区"}]},{"id":"325","name":"三亚市","area":[{"id":"3272","name":"三亚市"}]},{"id":"326","name":"五指山市","area":[{"id":"3273","name":"五指山市"}]},{"id":"327","name":"琼海市","area":[{"id":"3274","name":"琼海市"}]},{"id":"328","name":"儋州市","area":[{"id":"3275","name":"儋州市"}]},{"id":"329","name":"文昌市","area":[{"id":"3276","name":"文昌市"}]},{"id":"330","name":"万宁市","area":[{"id":"3277","name":"万宁市"}]},{"id":"331","name":"东方市","area":[{"id":"3278","name":"东方市"}]},{"id":"332","name":"定安县","area":[{"id":"3279","name":"定安县"}]},{"id":"333","name":"屯昌县","area":[{"id":"3280","name":"屯昌县"}]},{"id":"334","name":"澄迈县","area":[{"id":"3281","name":"澄迈县"}]},{"id":"335","name":"临高县","area":[{"id":"3282","name":"临高县"}]},{"id":"336","name":"白沙黎族自治县","area":[{"id":"3283","name":"白沙黎族自治县"}]},{"id":"337","name":"昌江黎族自治县","area":[{"id":"3284","name":"昌江黎族自治县"}]},{"id":"338","name":"乐东黎族自治县","area":[{"id":"3285","name":"乐东黎族自治县"}]},{"id":"339","name":"陵水黎族自治县","area":[{"id":"3286","name":"陵水黎族自治县"}]},{"id":"340","name":"保亭黎族苗族自治县","area":[{"id":"3287","name":"保亭黎族苗族自治县"}]},{"id":"341","name":"琼中黎族苗族自治县","area":[{"id":"3288","name":"琼中黎族苗族自治县"}]},{"id":"342","name":"西沙群岛","area":[]},{"id":"343","name":"南沙群岛","area":[]},{"id":"344","name":"中沙群岛的岛礁及其海域","area":[]}]},{"id":"22","name":"重庆市","city":[{"id":"345","name":"万州区","area":[{"id":"3289","name":"九池乡"},{"id":"3290","name":"五桥街道"},{"id":"3291","name":"余家镇"},{"id":"3292","name":"分水镇"},{"id":"3293","name":"双河口街道"},{"id":"3294","name":"后山镇"},{"id":"3295","name":"周家坝街道"},{"id":"3296","name":"响水镇"},{"id":"3297","name":"地宝乡"},{"id":"3298","name":"大周镇"},{"id":"3299","name":"天城镇"},{"id":"3300","name":"太安镇"},{"id":"3301","name":"太白街道"},{"id":"3302","name":"太龙镇"},{"id":"3303","name":"孙家镇"},{"id":"3304","name":"小周镇"},{"id":"3305","name":"弹子镇"},{"id":"3306","name":"恒合土家族乡"},{"id":"3307","name":"新乡镇"},{"id":"3308","name":"新田镇"},{"id":"3309","name":"普子乡"},{"id":"3310","name":"李河镇"},{"id":"3311","name":"柱山乡"},{"id":"3312","name":"梨树乡"},{"id":"3313","name":"武陵镇"},{"id":"3314","name":"沙河街道"},{"id":"3315","name":"溪口乡"},{"id":"3316","name":"瀼渡镇"},{"id":"3317","name":"熊家镇"},{"id":"3318","name":"燕山乡"},{"id":"3319","name":"牌楼街道"},{"id":"3320","name":"甘宁镇"},{"id":"3321","name":"白土镇"},{"id":"3322","name":"白羊镇"},{"id":"3323","name":"百安坝街道"},{"id":"3324","name":"罗田镇"},{"id":"3325","name":"茨竹乡"},{"id":"3326","name":"走马镇"},{"id":"3327","name":"郭村乡"},{"id":"3328","name":"钟鼓楼街道"},{"id":"3329","name":"铁峰乡"},{"id":"3330","name":"长坪乡"},{"id":"3331","name":"长岭镇"},{"id":"3332","name":"长滩镇"},{"id":"3333","name":"陈家坝街道"},{"id":"3334","name":"高峰镇"},{"id":"3335","name":"高梁镇"},{"id":"3336","name":"高笋塘街道"},{"id":"3337","name":"黄柏乡"},{"id":"3338","name":"龙沙镇"},{"id":"3339","name":"龙都街道"},{"id":"3340","name":"龙驹镇"}]},{"id":"346","name":"涪陵区","area":[{"id":"3341","name":"丛林乡"},{"id":"3342","name":"两汇乡"},{"id":"3343","name":"中峰乡"},{"id":"3344","name":"义和镇"},{"id":"3345","name":"仁义乡"},{"id":"3346","name":"南沱镇"},{"id":"3347","name":"卷洞乡"},{"id":"3348","name":"同乐乡"},{"id":"3349","name":"土地坡乡"},{"id":"3350","name":"堡子镇"},{"id":"3351","name":"增福乡"},{"id":"3352","name":"大木乡"},{"id":"3353","name":"天台乡"},{"id":"3354","name":"太和乡"},{"id":"3355","name":"山窝乡"},{"id":"3356","name":"崇义街道"},{"id":"3357","name":"惠民乡"},{"id":"3358","name":"敦仁街道"},{"id":"3359","name":"新妙镇"},{"id":"3360","name":"新村乡"},{"id":"3361","name":"明家乡"},{"id":"3362","name":"李渡镇"},{"id":"3363","name":"梓里乡"},{"id":"3364","name":"武陵山乡"},{"id":"3365","name":"江东街道"},{"id":"3366","name":"江北街道"},{"id":"3367","name":"清溪镇"},{"id":"3368","name":"焦石镇"},{"id":"3369","name":"珍溪镇"},{"id":"3370","name":"白涛镇"},{"id":"3371","name":"百胜镇"},{"id":"3372","name":"石和乡"},{"id":"3373","name":"石沱镇"},{"id":"3374","name":"石龙乡"},{"id":"3375","name":"罗云乡"},{"id":"3376","name":"聚宝乡"},{"id":"3377","name":"致韩镇"},{"id":"3378","name":"荔枝街道"},{"id":"3379","name":"蔺市镇"},{"id":"3380","name":"酒店乡"},{"id":"3381","name":"镇安镇"},{"id":"3382","name":"青羊镇"},{"id":"3383","name":"马武镇"},{"id":"3384","name":"龙桥镇"},{"id":"3385","name":"龙潭镇"}]},{"id":"347","name":"渝中区","area":[{"id":"3386","name":"七星岗街道"},{"id":"3387","name":"上清寺街道"},{"id":"3388","name":"两路口街道"},{"id":"3389","name":"化龙桥街道"},{"id":"3390","name":"南纪门街道"},{"id":"3391","name":"大坪街道"},{"id":"3392","name":"大溪沟街道"},{"id":"3393","name":"望龙门街道"},{"id":"3394","name":"朝天门街道"},{"id":"3395","name":"石油路街道"},{"id":"3396","name":"菜园坝街道"},{"id":"3397","name":"解放碑街道"}]},{"id":"348","name":"大渡口区","area":[{"id":"3398","name":"九宫庙街道"},{"id":"3399","name":"八桥镇"},{"id":"3400","name":"建胜镇"},{"id":"3401","name":"新山村街道"},{"id":"3402","name":"春晖路街道"},{"id":"3403","name":"茄子溪街道"},{"id":"3404","name":"跃进村街道"},{"id":"3405","name":"跳磴镇"}]},{"id":"349","name":"江北区","area":[{"id":"3406","name":"五宝镇"},{"id":"3407","name":"五里店街道"},{"id":"3408","name":"华新街街道"},{"id":"3409","name":"复盛镇"},{"id":"3410","name":"大石坝街道"},{"id":"3411","name":"寸滩街道"},{"id":"3412","name":"江北城街道"},{"id":"3413","name":"石马河街道"},{"id":"3414","name":"观音桥街道"},{"id":"3415","name":"郭家沱街道"},{"id":"3416","name":"铁山坪街道"},{"id":"3417","name":"鱼嘴镇"}]},{"id":"350","name":"沙坪坝区","area":[{"id":"3418","name":"中梁镇"},{"id":"3419","name":"井口街道"},{"id":"3420","name":"井口镇"},{"id":"3421","name":"凤凰镇"},{"id":"3422","name":"回龙坝镇"},{"id":"3423","name":"土主镇"},{"id":"3424","name":"土湾街道"},{"id":"3425","name":"天星桥街道"},{"id":"3426","name":"小龙坎街道"},{"id":"3427","name":"山洞街道"},{"id":"3428","name":"新桥街道"},{"id":"3429","name":"曾家镇"},{"id":"3430","name":"歌乐山街道"},{"id":"3431","name":"歌乐山镇"},{"id":"3432","name":"沙坪坝街道"},{"id":"3433","name":"渝碚路街道"},{"id":"3434","name":"石井坡街道"},{"id":"3435","name":"磁器口街道"},{"id":"3436","name":"童家桥街道"},{"id":"3437","name":"虎溪镇"},{"id":"3438","name":"西永镇"},{"id":"3439","name":"覃家岗镇"},{"id":"3440","name":"詹家溪街道"},{"id":"3441","name":"陈家桥镇"},{"id":"3442","name":"青木关镇"}]},{"id":"351","name":"九龙坡区","area":[{"id":"3443","name":"中梁山街道"},{"id":"3444","name":"九龙镇"},{"id":"3445","name":"华岩镇"},{"id":"3446","name":"含谷镇"},{"id":"3447","name":"巴福镇"},{"id":"3448","name":"杨家坪街道"},{"id":"3449","name":"渝州路街道"},{"id":"3450","name":"白市驿镇"},{"id":"3451","name":"石坪桥街道"},{"id":"3452","name":"石板镇"},{"id":"3453","name":"石桥铺街道"},{"id":"3454","name":"西彭镇"},{"id":"3455","name":"谢家湾街道"},{"id":"3456","name":"走马镇"},{"id":"3457","name":"金凤镇"},{"id":"3458","name":"铜罐驿镇"},{"id":"3459","name":"陶家镇"},{"id":"3460","name":"黄桷坪街道"}]},{"id":"352","name":"南岸区","area":[{"id":"3461","name":"南坪街道"},{"id":"3462","name":"南坪镇"},{"id":"3463","name":"南山街道"},{"id":"3464","name":"峡口镇"},{"id":"3465","name":"广阳镇"},{"id":"3466","name":"弹子石街道"},{"id":"3467","name":"海棠溪街道"},{"id":"3468","name":"涂山镇"},{"id":"3469","name":"花园路街道"},{"id":"3470","name":"迎龙镇"},{"id":"3471","name":"铜元局街道"},{"id":"3472","name":"长生桥镇"},{"id":"3473","name":"鸡冠石镇"},{"id":"3474","name":"龙门浩街道"}]},{"id":"353","name":"北碚区","area":[{"id":"3475","name":"三圣镇"},{"id":"3476","name":"东阳街道"},{"id":"3477","name":"北温泉街道"},{"id":"3478","name":"复兴镇"},{"id":"3479","name":"天府镇"},{"id":"3480","name":"天生街道"},{"id":"3481","name":"施家梁镇"},{"id":"3482","name":"朝阳街道"},{"id":"3483","name":"柳荫镇"},{"id":"3484","name":"歇马镇"},{"id":"3485","name":"水土镇"},{"id":"3486","name":"澄江镇"},{"id":"3487","name":"童家溪镇"},{"id":"3488","name":"蔡家岗镇"},{"id":"3489","name":"金刀峡镇"},{"id":"3490","name":"静观镇"},{"id":"3491","name":"龙凤桥街道"}]},{"id":"354","name":"双桥区","area":[{"id":"3492","name":"双路镇"},{"id":"3493","name":"通桥镇"},{"id":"3494","name":"龙滩子街道"}]},{"id":"355","name":"万盛区","area":[{"id":"3495","name":"万东镇"},{"id":"3496","name":"万盛街道"},{"id":"3497","name":"丛林镇"},{"id":"3498","name":"东林街道"},{"id":"3499","name":"关坝镇"},{"id":"3500","name":"南桐镇"},{"id":"3501","name":"石林镇"},{"id":"3502","name":"金桥镇"},{"id":"3503","name":"青年镇"},{"id":"3504","name":"黑山镇"}]},{"id":"356","name":"渝北区","area":[{"id":"3505","name":"人和街道"},{"id":"3506","name":"兴隆镇"},{"id":"3507","name":"华蓥山镇"},{"id":"3508","name":"双凤桥街道"},{"id":"3509","name":"双龙湖街道"},{"id":"3510","name":"古路镇"},{"id":"3511","name":"回兴街道"},{"id":"3512","name":"大塆镇"},{"id":"3513","name":"大盛镇"},{"id":"3514","name":"大竹林街道"},{"id":"3515","name":"天宫殿街道"},{"id":"3516","name":"张关镇"},{"id":"3517","name":"御临镇"},{"id":"3518","name":"悦来镇"},{"id":"3519","name":"明月镇"},{"id":"3520","name":"木耳镇"},{"id":"3521","name":"洛碛镇"},{"id":"3522","name":"玉峰山镇"},{"id":"3523","name":"王家镇"},{"id":"3524","name":"石坪镇"},{"id":"3525","name":"石船镇"},{"id":"3526","name":"礼嘉镇"},{"id":"3527","name":"统景镇"},{"id":"3528","name":"翠云街道"},{"id":"3529","name":"茨竹"},{"id":"3530","name":"高嘴镇"},{"id":"3531","name":"鸳鸯街道"},{"id":"3532","name":"麻柳沱镇"},{"id":"3533","name":"龙兴镇"},{"id":"3534","name":"龙塔街道"},{"id":"3535","name":"龙山街道"},{"id":"3536","name":"龙溪街道"}]},{"id":"357","name":"巴南区","area":[{"id":"3537","name":"一品镇"},{"id":"3538","name":"东泉镇"},{"id":"3539","name":"丰盛镇"},{"id":"3540","name":"二圣镇"},{"id":"3541","name":"南彭镇"},{"id":"3542","name":"南泉镇"},{"id":"3543","name":"双河口镇"},{"id":"3544","name":"天星寺镇"},{"id":"3545","name":"姜家镇"},{"id":"3546","name":"安澜镇"},{"id":"3547","name":"惠民镇"},{"id":"3548","name":"接龙镇"},{"id":"3549","name":"木洞镇"},{"id":"3550","name":"李家沱街道"},{"id":"3551","name":"界石镇"},{"id":"3552","name":"石滩镇"},{"id":"3553","name":"石龙镇"},{"id":"3554","name":"花溪镇"},{"id":"3555","name":"跳石镇"},{"id":"3556","name":"鱼洞街道"},{"id":"3557","name":"麻柳嘴镇"}]},{"id":"358","name":"黔江区","area":[{"id":"3558","name":"两河镇"},{"id":"3559","name":"中塘乡"},{"id":"3560","name":"五里乡"},{"id":"3561","name":"冯家镇"},{"id":"3562","name":"城东街道"},{"id":"3563","name":"城南街道"},{"id":"3564","name":"城西街道"},{"id":"3565","name":"太极乡"},{"id":"3566","name":"小南海镇"},{"id":"3567","name":"新华乡"},{"id":"3568","name":"杉岭乡"},{"id":"3569","name":"正阳镇"},{"id":"3570","name":"水市乡"},{"id":"3571","name":"水田乡"},{"id":"3572","name":"沙坝乡"},{"id":"3573","name":"濯水镇"},{"id":"3574","name":"白土乡"},{"id":"3575","name":"白石乡"},{"id":"3576","name":"石会镇"},{"id":"3577","name":"石家镇"},{"id":"3578","name":"舟白镇"},{"id":"3579","name":"蓬东乡"},{"id":"3580","name":"邻鄂镇"},{"id":"3581","name":"金洞乡"},{"id":"3582","name":"金溪镇"},{"id":"3583","name":"马喇镇"},{"id":"3584","name":"鹅池镇"},{"id":"3585","name":"黄溪镇"},{"id":"3586","name":"黎水镇"},{"id":"3587","name":"黑溪镇"}]},{"id":"359","name":"长寿区","area":[{"id":"3588","name":"万顺镇"},{"id":"3589","name":"云台镇"},{"id":"3590","name":"云集镇"},{"id":"3591","name":"但渡镇"},{"id":"3592","name":"八颗镇"},{"id":"3593","name":"凤城街道"},{"id":"3594","name":"双龙镇"},{"id":"3595","name":"新市镇"},{"id":"3596","name":"晏家街道"},{"id":"3597","name":"江南镇"},{"id":"3598","name":"洪湖镇"},{"id":"3599","name":"海棠镇"},{"id":"3600","name":"渡舟镇"},{"id":"3601","name":"石堰镇"},{"id":"3602","name":"葛兰镇"},{"id":"3603","name":"邻封镇"},{"id":"3604","name":"长寿湖镇"},{"id":"3605","name":"龙河镇"}]},{"id":"360","name":"綦江县","area":[{"id":"3606","name":"丁山镇"},{"id":"3607","name":"三江镇"},{"id":"3608","name":"三角镇"},{"id":"3609","name":"东溪镇"},{"id":"3610","name":"中峰镇"},{"id":"3611","name":"古南镇"},{"id":"3612","name":"安稳镇"},{"id":"3613","name":"打通镇"},{"id":"3614","name":"扶欢镇"},{"id":"3615","name":"新盛镇"},{"id":"3616","name":"横山镇"},{"id":"3617","name":"永城镇"},{"id":"3618","name":"永新镇"},{"id":"3619","name":"石壕镇"},{"id":"3620","name":"石角镇"},{"id":"3621","name":"篆塘镇"},{"id":"3622","name":"赶水镇"},{"id":"3623","name":"郭扶镇"},{"id":"3624","name":"隆盛镇"}]},{"id":"361","name":"潼南县","area":[{"id":"3625","name":"上和镇"},{"id":"3626","name":"五桂镇"},{"id":"3627","name":"别口乡"},{"id":"3628","name":"卧佛镇"},{"id":"3629","name":"双江镇"},{"id":"3630","name":"古溪镇"},{"id":"3631","name":"塘坝镇"},{"id":"3632","name":"太安镇"},{"id":"3633","name":"宝龙镇"},{"id":"3634","name":"寿桥乡"},{"id":"3635","name":"小渡镇"},{"id":"3636","name":"崇龛镇"},{"id":"3637","name":"新胜镇"},{"id":"3638","name":"柏梓镇"},{"id":"3639","name":"桂林街道"},{"id":"3640","name":"梓潼街道"},{"id":"3641","name":"玉溪镇"},{"id":"3642","name":"田家乡"},{"id":"3643","name":"米心镇"},{"id":"3644","name":"群力镇"},{"id":"3645","name":"花岩镇"},{"id":"3646","name":"龙形镇"}]},{"id":"362","name":"铜梁县","area":[{"id":"3647","name":"东城街道"},{"id":"3648","name":"二坪镇"},{"id":"3649","name":"侣俸镇"},{"id":"3650","name":"华兴镇"},{"id":"3651","name":"南城街道"},{"id":"3652","name":"双山乡"},{"id":"3653","name":"围龙镇"},{"id":"3654","name":"土桥镇"},{"id":"3655","name":"大庙镇"},{"id":"3656","name":"太平镇"},{"id":"3657","name":"安居镇"},{"id":"3658","name":"安溪镇"},{"id":"3659","name":"小林乡"},{"id":"3660","name":"少云镇"},{"id":"3661","name":"巴川街道"},{"id":"3662","name":"平滩镇"},{"id":"3663","name":"庆隆乡"},{"id":"3664","name":"旧县镇"},{"id":"3665","name":"水口镇"},{"id":"3666","name":"永嘉镇"},{"id":"3667","name":"白羊镇"},{"id":"3668","name":"石鱼镇"},{"id":"3669","name":"福果镇"},{"id":"3670","name":"维新镇"},{"id":"3671","name":"蒲吕镇"},{"id":"3672","name":"虎峰镇"},{"id":"3673","name":"西河镇"},{"id":"3674","name":"高楼镇"}]},{"id":"363","name":"大足县","area":[{"id":"3675","name":"万古镇"},{"id":"3676","name":"三驱镇"},{"id":"3677","name":"中敖镇"},{"id":"3678","name":"古龙乡"},{"id":"3679","name":"回龙镇"},{"id":"3680","name":"国梁镇"},{"id":"3681","name":"季家镇"},{"id":"3682","name":"宝兴镇"},{"id":"3683","name":"宝顶镇"},{"id":"3684","name":"拾万镇"},{"id":"3685","name":"智凤镇"},{"id":"3686","name":"棠香街道"},{"id":"3687","name":"玉龙镇"},{"id":"3688","name":"珠溪镇"},{"id":"3689","name":"石马镇"},{"id":"3690","name":"邮亭镇"},{"id":"3691","name":"金山镇"},{"id":"3692","name":"铁山镇"},{"id":"3693","name":"雍溪镇"},{"id":"3694","name":"高升场镇"},{"id":"3695","name":"高坪乡"},{"id":"3696","name":"龙岗街道"},{"id":"3697","name":"龙水镇"},{"id":"3698","name":"龙石镇"}]},{"id":"364","name":"荣昌县","area":[{"id":"3699","name":"仁义镇"},{"id":"3700","name":"双河镇"},{"id":"3701","name":"古昌镇"},{"id":"3702","name":"吴家镇"},{"id":"3703","name":"安富镇"},{"id":"3704","name":"峰高镇"},{"id":"3705","name":"广顺镇"},{"id":"3706","name":"昌元镇"},{"id":"3707","name":"河包镇"},{"id":"3708","name":"清升镇"},{"id":"3709","name":"清江镇"},{"id":"3710","name":"清流镇"},{"id":"3711","name":"盘龙镇"},{"id":"3712","name":"直升镇"},{"id":"3713","name":"荣隆镇"},{"id":"3714","name":"观胜镇"},{"id":"3715","name":"路孔镇"},{"id":"3716","name":"远觉镇"},{"id":"3717","name":"铜鼓镇"},{"id":"3718","name":"龙集镇"}]},{"id":"365","name":"璧山县","area":[{"id":"3719","name":"丁家镇"},{"id":"3720","name":"七塘镇"},{"id":"3721","name":"三合镇"},{"id":"3722","name":"健龙乡"},{"id":"3723","name":"八塘镇"},{"id":"3724","name":"大兴镇"},{"id":"3725","name":"大路镇"},{"id":"3726","name":"广普镇"},{"id":"3727","name":"正兴镇"},{"id":"3728","name":"河边镇"},{"id":"3729","name":"璧城街道"},{"id":"3730","name":"福禄镇"},{"id":"3731","name":"青杠街道"}]},{"id":"366","name":"梁平县","area":[{"id":"3732","name":"七星镇"},{"id":"3733","name":"云龙镇"},{"id":"3734","name":"仁贤镇"},{"id":"3735","name":"合兴镇"},{"id":"3736","name":"和林镇"},{"id":"3737","name":"回龙镇"},{"id":"3738","name":"城东乡"},{"id":"3739","name":"城北乡"},{"id":"3740","name":"复平乡"},{"id":"3741","name":"大观镇"},{"id":"3742","name":"安胜乡"},{"id":"3743","name":"屏锦镇"},{"id":"3744","name":"文化镇"},{"id":"3745","name":"新盛镇"},{"id":"3746","name":"明达镇"},{"id":"3747","name":"曲水乡"},{"id":"3748","name":"柏家镇"},{"id":"3749","name":"梁山镇"},{"id":"3750","name":"石安镇"},{"id":"3751","name":"碧山镇"},{"id":"3752","name":"礼让镇"},{"id":"3753","name":"福禄镇"},{"id":"3754","name":"竹山镇"},{"id":"3755","name":"紫照乡"},{"id":"3756","name":"聚奎镇"},{"id":"3757","name":"荫平镇"},{"id":"3758","name":"虎城镇"},{"id":"3759","name":"蟠龙镇"},{"id":"3760","name":"袁驿镇"},{"id":"3761","name":"金带镇"},{"id":"3762","name":"铁门乡"},{"id":"3763","name":"龙胜乡"},{"id":"3764","name":"龙门镇"}]},{"id":"367","name":"城口县","area":[{"id":"3765","name":"东安乡"},{"id":"3766","name":"修齐镇"},{"id":"3767","name":"北屏乡"},{"id":"3768","name":"厚坪乡"},{"id":"3769","name":"双河乡"},{"id":"3770","name":"周溪乡"},{"id":"3771","name":"咸宜乡"},{"id":"3772","name":"坪坝镇"},{"id":"3773","name":"岚天乡"},{"id":"3774","name":"左岚乡"},{"id":"3775","name":"巴山镇"},{"id":"3776","name":"庙坝镇"},{"id":"3777","name":"明中乡"},{"id":"3778","name":"明通镇"},{"id":"3779","name":"河鱼乡"},{"id":"3780","name":"治平乡"},{"id":"3781","name":"沿河乡"},{"id":"3782","name":"葛城镇"},{"id":"3783","name":"蓼子乡"},{"id":"3784","name":"高楠乡"},{"id":"3785","name":"高燕乡"},{"id":"3786","name":"高观镇"},{"id":"3787","name":"鸡鸣乡"},{"id":"3788","name":"龙田乡"}]},{"id":"368","name":"丰都县","area":[{"id":"3789","name":"三元镇"},{"id":"3790","name":"三合镇"},{"id":"3791","name":"三坝乡"},{"id":"3792","name":"三建乡"},{"id":"3793","name":"仁沙乡"},{"id":"3794","name":"保合乡"},{"id":"3795","name":"兴义镇"},{"id":"3796","name":"包鸾镇"},{"id":"3797","name":"十直镇"},{"id":"3798","name":"南天湖镇"},{"id":"3799","name":"双路镇"},{"id":"3800","name":"双龙场乡"},{"id":"3801","name":"名山镇"},{"id":"3802","name":"太平坝乡"},{"id":"3803","name":"崇兴乡"},{"id":"3804","name":"暨龙乡"},{"id":"3805","name":"树人镇"},{"id":"3806","name":"栗子乡"},{"id":"3807","name":"武平镇"},{"id":"3808","name":"江池镇"},{"id":"3809","name":"湛普镇"},{"id":"3810","name":"社坛镇"},{"id":"3811","name":"董家镇"},{"id":"3812","name":"虎威镇"},{"id":"3813","name":"许明寺镇"},{"id":"3814","name":"都督乡"},{"id":"3815","name":"镇江镇"},{"id":"3816","name":"青龙乡"},{"id":"3817","name":"高家镇"},{"id":"3818","name":"龙孔乡"},{"id":"3819","name":"龙河镇"}]},{"id":"369","name":"垫江县","area":[{"id":"3820","name":"三溪乡"},{"id":"3821","name":"五洞镇"},{"id":"3822","name":"包家乡"},{"id":"3823","name":"周嘉镇"},{"id":"3824","name":"坪山镇"},{"id":"3825","name":"大石乡"},{"id":"3826","name":"太平镇"},{"id":"3827","name":"新民镇"},{"id":"3828","name":"普顺镇"},{"id":"3829","name":"曹回乡"},{"id":"3830","name":"杠家乡"},{"id":"3831","name":"桂溪镇"},{"id":"3832","name":"永安镇"},{"id":"3833","name":"永平乡"},{"id":"3834","name":"沙坪镇"},{"id":"3835","name":"沙河乡"},{"id":"3836","name":"澄溪镇"},{"id":"3837","name":"白家乡"},{"id":"3838","name":"砚台镇"},{"id":"3839","name":"裴兴乡"},{"id":"3840","name":"长龙乡"},{"id":"3841","name":"高安镇"},{"id":"3842","name":"高峰镇"},{"id":"3843","name":"鹤游镇"},{"id":"3844","name":"黄沙乡"}]},{"id":"370","name":"武隆县","area":[{"id":"3845","name":"仙女山镇"},{"id":"3846","name":"凤来乡"},{"id":"3847","name":"双河乡"},{"id":"3848","name":"后坪乡"},{"id":"3849","name":"和顺乡"},{"id":"3850","name":"土地乡"},{"id":"3851","name":"土坎镇"},{"id":"3852","name":"巷口镇"},{"id":"3853","name":"平桥镇"},{"id":"3854","name":"庙垭乡"},{"id":"3855","name":"接龙乡"},{"id":"3856","name":"文复乡"},{"id":"3857","name":"桐梓镇"},{"id":"3858","name":"江口镇"},{"id":"3859","name":"沧沟乡"},{"id":"3860","name":"浩口乡"},{"id":"3861","name":"火炉镇"},{"id":"3862","name":"白云乡"},{"id":"3863","name":"白马镇"},{"id":"3864","name":"石桥乡"},{"id":"3865","name":"羊角镇"},{"id":"3866","name":"赵家乡"},{"id":"3867","name":"铁矿乡"},{"id":"3868","name":"长坝镇"},{"id":"3869","name":"鸭江镇"},{"id":"3870","name":"黄莺乡"}]},{"id":"371","name":"忠县","area":[{"id":"3871","name":"三汇镇"},{"id":"3872","name":"东溪镇"},{"id":"3873","name":"乌杨镇"},{"id":"3874","name":"任家镇"},{"id":"3875","name":"兴峰乡"},{"id":"3876","name":"双桂镇"},{"id":"3877","name":"善广乡"},{"id":"3878","name":"复兴镇"},{"id":"3879","name":"官坝镇"},{"id":"3880","name":"忠州镇"},{"id":"3881","name":"拔山镇"},{"id":"3882","name":"新生镇"},{"id":"3883","name":"新立镇"},{"id":"3884","name":"永丰镇"},{"id":"3885","name":"汝溪镇"},{"id":"3886","name":"洋渡镇"},{"id":"3887","name":"涂井乡"},{"id":"3888","name":"白石镇"},{"id":"3889","name":"石子乡"},{"id":"3890","name":"石宝镇"},{"id":"3891","name":"石黄镇"},{"id":"3892","name":"磨子土家族乡"},{"id":"3893","name":"花桥镇"},{"id":"3894","name":"野鹤镇"},{"id":"3895","name":"金声乡"},{"id":"3896","name":"金鸡镇"},{"id":"3897","name":"马灌镇"},{"id":"3898","name":"黄金镇"}]},{"id":"372","name":"开县","area":[{"id":"3899","name":"三汇口乡"},{"id":"3900","name":"中和镇"},{"id":"3901","name":"丰乐街道"},{"id":"3902","name":"临江镇"},{"id":"3903","name":"义和镇"},{"id":"3904","name":"九龙山镇"},{"id":"3905","name":"五通乡"},{"id":"3906","name":"关面乡"},{"id":"3907","name":"南门镇"},{"id":"3908","name":"南雅镇"},{"id":"3909","name":"厚坝镇"},{"id":"3910","name":"和谦镇"},{"id":"3911","name":"大德乡"},{"id":"3912","name":"大进镇"},{"id":"3913","name":"天和乡"},{"id":"3914","name":"岳溪镇"},{"id":"3915","name":"巫山乡"},{"id":"3916","name":"敦好镇"},{"id":"3917","name":"汉丰街道"},{"id":"3918","name":"河堰镇"},{"id":"3919","name":"渠口镇"},{"id":"3920","name":"温泉镇"},{"id":"3921","name":"满月乡"},{"id":"3922","name":"白桥乡"},{"id":"3923","name":"白泉乡"},{"id":"3924","name":"白鹤街道"},{"id":"3925","name":"竹溪镇"},{"id":"3926","name":"紫水乡"},{"id":"3927","name":"谭家乡"},{"id":"3928","name":"赵家镇"},{"id":"3929","name":"郭家镇"},{"id":"3930","name":"金峰乡"},{"id":"3931","name":"铁桥镇"},{"id":"3932","name":"镇东街道"},{"id":"3933","name":"镇安镇"},{"id":"3934","name":"长沙镇"},{"id":"3935","name":"高桥镇"},{"id":"3936","name":"麻柳乡"}]},{"id":"373","name":"云阳县","area":[{"id":"3937","name":"上坝乡"},{"id":"3938","name":"云安镇"},{"id":"3939","name":"云硐乡"},{"id":"3940","name":"云阳镇"},{"id":"3941","name":"人和镇"},{"id":"3942","name":"养鹿乡"},{"id":"3943","name":"农坝镇"},{"id":"3944","name":"凤鸣镇"},{"id":"3945","name":"南溪镇"},{"id":"3946","name":"双土镇"},{"id":"3947","name":"双江街道"},{"id":"3948","name":"双龙乡"},{"id":"3949","name":"后叶乡"},{"id":"3950","name":"堰坪乡"},{"id":"3951","name":"外郎乡"},{"id":"3952","name":"大阳乡"},{"id":"3953","name":"宝坪镇"},{"id":"3954","name":"巴阳镇"},{"id":"3955","name":"平安镇"},{"id":"3956","name":"故陵镇"},{"id":"3957","name":"新津乡"},{"id":"3958","name":"普安乡"},{"id":"3959","name":"栖霞乡"},{"id":"3960","name":"桑坪镇"},{"id":"3961","name":"毛坝乡"},{"id":"3962","name":"水口乡"},{"id":"3963","name":"江口镇"},{"id":"3964","name":"沙市镇"},{"id":"3965","name":"泥溪乡"},{"id":"3966","name":"洞鹿乡"},{"id":"3967","name":"清水土家族乡"},{"id":"3968","name":"渠马镇"},{"id":"3969","name":"盘龙镇"},{"id":"3970","name":"石门乡"},{"id":"3971","name":"票草乡"},{"id":"3972","name":"红狮镇"},{"id":"3973","name":"耀灵乡"},{"id":"3974","name":"路阳镇"},{"id":"3975","name":"青龙街道"},{"id":"3976","name":"高阳镇"},{"id":"3977","name":"鱼泉镇"},{"id":"3978","name":"黄石镇"},{"id":"3979","name":"龙洞乡"},{"id":"3980","name":"龙角镇"}]},{"id":"374","name":"奉节县","area":[{"id":"3981","name":"云雾土家族乡"},{"id":"3982","name":"五马乡"},{"id":"3983","name":"公平镇"},{"id":"3984","name":"兴隆镇"},{"id":"3985","name":"冯坪乡"},{"id":"3986","name":"吐祥镇"},{"id":"3987","name":"大树镇"},{"id":"3988","name":"太和乡"},{"id":"3989","name":"安坪乡"},{"id":"3990","name":"岩湾乡"},{"id":"3991","name":"平安乡"},{"id":"3992","name":"康乐镇"},{"id":"3993","name":"康坪乡"},{"id":"3994","name":"新政乡"},{"id":"3995","name":"新民镇"},{"id":"3996","name":"朱衣镇"},{"id":"3997","name":"永乐镇"},{"id":"3998","name":"永安镇"},{"id":"3999","name":"汾河镇"},{"id":"4000","name":"甲高镇"},{"id":"4001","name":"白帝镇"},{"id":"4002","name":"石岗乡"},{"id":"4003","name":"竹园镇"},{"id":"4004","name":"红土乡"},{"id":"4005","name":"羊市镇"},{"id":"4006","name":"草堂镇"},{"id":"4007","name":"长安土家族乡"},{"id":"4008","name":"青龙镇"},{"id":"4009","name":"鹤峰乡"},{"id":"4010","name":"龙桥土家族乡"}]},{"id":"375","name":"巫山县","area":[{"id":"4011","name":"三溪乡"},{"id":"4012","name":"两坪乡"},{"id":"4013","name":"双龙镇"},{"id":"4014","name":"培石乡"},{"id":"4015","name":"大昌镇"},{"id":"4016","name":"大溪乡"},{"id":"4017","name":"官渡镇"},{"id":"4018","name":"官阳镇"},{"id":"4019","name":"巫峡镇"},{"id":"4020","name":"平河乡"},{"id":"4021","name":"庙堂乡"},{"id":"4022","name":"庙宇镇"},{"id":"4023","name":"建平乡"},{"id":"4024","name":"当阳乡"},{"id":"4025","name":"抱龙镇"},{"id":"4026","name":"曲尺乡"},{"id":"4027","name":"福田镇"},{"id":"4028","name":"竹贤乡"},{"id":"4029","name":"笃坪乡"},{"id":"4030","name":"红椿土家族乡"},{"id":"4031","name":"邓家土家族乡"},{"id":"4032","name":"金坪乡"},{"id":"4033","name":"铜鼓镇"},{"id":"4034","name":"骡坪镇"},{"id":"4035","name":"龙井乡"},{"id":"4036","name":"龙溪镇"}]},{"id":"376","name":"巫溪县","area":[{"id":"4037","name":"上磺镇"},{"id":"4038","name":"下堡镇"},{"id":"4039","name":"中岗乡"},{"id":"4040","name":"中梁乡"},{"id":"4041","name":"乌龙乡"},{"id":"4042","name":"兰英乡"},{"id":"4043","name":"凤凰镇"},{"id":"4044","name":"双阳乡"},{"id":"4045","name":"古路镇"},{"id":"4046","name":"土城乡"},{"id":"4047","name":"城厢镇"},{"id":"4048","name":"塘坊乡"},{"id":"4049","name":"大河乡"},{"id":"4050","name":"天元乡"},{"id":"4051","name":"天星乡"},{"id":"4052","name":"宁厂镇"},{"id":"4053","name":"尖山镇"},{"id":"4054","name":"峰灵乡"},{"id":"4055","name":"徐家镇"},{"id":"4056","name":"文峰镇"},{"id":"4057","name":"朝阳洞乡"},{"id":"4058","name":"田坝乡"},{"id":"4059","name":"白鹿镇"},{"id":"4060","name":"胜利乡"},{"id":"4061","name":"花台乡"},{"id":"4062","name":"菱角乡"},{"id":"4063","name":"蒲莲乡"},{"id":"4064","name":"通城乡"},{"id":"4065","name":"长桂乡"},{"id":"4066","name":"鱼鳞乡"}]},{"id":"377","name":"石柱土家族自治县","area":[{"id":"4067","name":"万朝乡"},{"id":"4068","name":"三星乡"},{"id":"4069","name":"三河乡"},{"id":"4070","name":"三益乡"},{"id":"4071","name":"下路镇"},{"id":"4072","name":"中益乡"},{"id":"4073","name":"临溪镇"},{"id":"4074","name":"六塘乡"},{"id":"4075","name":"冷水乡"},{"id":"4076","name":"南宾镇"},{"id":"4077","name":"大歇乡"},{"id":"4078","name":"悦崃镇"},{"id":"4079","name":"新乐乡"},{"id":"4080","name":"枫木乡"},{"id":"4081","name":"桥头乡"},{"id":"4082","name":"沙子镇"},{"id":"4083","name":"河嘴乡"},{"id":"4084","name":"沿溪镇"},{"id":"4085","name":"洗新乡"},{"id":"4086","name":"渔池镇"},{"id":"4087","name":"王场镇"},{"id":"4088","name":"王家乡"},{"id":"4089","name":"石家乡"},{"id":"4090","name":"西沱镇"},{"id":"4091","name":"金竹乡"},{"id":"4092","name":"金铃乡"},{"id":"4093","name":"马武镇"},{"id":"4094","name":"黄水镇"},{"id":"4095","name":"黄鹤乡"},{"id":"4096","name":"黎场乡"},{"id":"4097","name":"龙沙镇"},{"id":"4098","name":"龙潭乡"}]},{"id":"378","name":"秀山土家族苗族自治县","area":[{"id":"4099","name":"中和镇"},{"id":"4100","name":"中平乡"},{"id":"4101","name":"保安乡"},{"id":"4102","name":"兰桥镇"},{"id":"4103","name":"塘坳乡"},{"id":"4104","name":"大溪乡"},{"id":"4105","name":"妙泉乡"},{"id":"4106","name":"孝溪乡"},{"id":"4107","name":"宋农乡"},{"id":"4108","name":"官庄镇"},{"id":"4109","name":"官舟乡"},{"id":"4110","name":"岑溪乡"},{"id":"4111","name":"峨溶镇"},{"id":"4112","name":"巴家乡"},{"id":"4113","name":"干川乡"},{"id":"4114","name":"平凯镇"},{"id":"4115","name":"平马乡"},{"id":"4116","name":"梅江镇"},{"id":"4117","name":"洪安镇"},{"id":"4118","name":"海洋乡"},{"id":"4119","name":"涌洞乡"},{"id":"4120","name":"清溪场镇"},{"id":"4121","name":"溪口乡"},{"id":"4122","name":"溶溪镇"},{"id":"4123","name":"石堤镇"},{"id":"4124","name":"石耶镇"},{"id":"4125","name":"膏田乡"},{"id":"4126","name":"里仁乡"},{"id":"4127","name":"钟灵乡"},{"id":"4128","name":"隘口镇"},{"id":"4129","name":"雅江镇"},{"id":"4130","name":"龙池镇"}]},{"id":"379","name":"酉阳土家族苗族自治县","area":[{"id":"4131","name":"丁市镇"},{"id":"4132","name":"万木乡"},{"id":"4133","name":"两罾乡"},{"id":"4134","name":"五福乡"},{"id":"4135","name":"偏柏乡"},{"id":"4136","name":"兴隆镇"},{"id":"4137","name":"南腰界乡"},{"id":"4138","name":"双泉乡"},{"id":"4139","name":"可大乡"},{"id":"4140","name":"后坪坝乡"},{"id":"4141","name":"后溪镇"},{"id":"4142","name":"大溪镇"},{"id":"4143","name":"天馆乡"},{"id":"4144","name":"官清乡"},{"id":"4145","name":"宜居乡"},{"id":"4146","name":"小河镇"},{"id":"4147","name":"庙溪乡"},{"id":"4148","name":"木叶乡"},{"id":"4149","name":"李溪镇"},{"id":"4150","name":"板桥乡"},{"id":"4151","name":"板溪乡"},{"id":"4152","name":"楠木乡"},{"id":"4153","name":"毛坝乡"},{"id":"4154","name":"江丰乡"},{"id":"4155","name":"泔溪镇"},{"id":"4156","name":"浪坪乡"},{"id":"4157","name":"涂市乡"},{"id":"4158","name":"清泉乡"},{"id":"4159","name":"腴地乡"},{"id":"4160","name":"花田乡"},{"id":"4161","name":"苍岭镇"},{"id":"4162","name":"车田乡"},{"id":"4163","name":"酉酬镇"},{"id":"4164","name":"钟多镇"},{"id":"4165","name":"铜鼓乡"},{"id":"4166","name":"麻旺镇"},{"id":"4167","name":"黑水镇"},{"id":"4168","name":"龙潭镇"},{"id":"4169","name":"龚滩镇"}]},{"id":"380","name":"彭水苗族土家族自治县","area":[{"id":"4170","name":"万足乡"},{"id":"4171","name":"三义乡"},{"id":"4172","name":"乔梓乡"},{"id":"4173","name":"保家镇"},{"id":"4174","name":"双龙乡"},{"id":"4175","name":"善感乡"},{"id":"4176","name":"大垭乡"},{"id":"4177","name":"太原乡"},{"id":"4178","name":"小厂乡"},{"id":"4179","name":"岩东乡"},{"id":"4180","name":"平安乡"},{"id":"4181","name":"新田乡"},{"id":"4182","name":"普子镇"},{"id":"4183","name":"朗溪乡"},{"id":"4184","name":"桐楼乡"},{"id":"4185","name":"桑柘镇"},{"id":"4186","name":"梅子垭乡"},{"id":"4187","name":"棣棠乡"},{"id":"4188","name":"汉葭镇"},{"id":"4189","name":"润溪乡"},{"id":"4190","name":"石柳乡"},{"id":"4191","name":"石盘乡"},{"id":"4192","name":"联合乡"},{"id":"4193","name":"芦塘乡"},{"id":"4194","name":"诸佛乡"},{"id":"4195","name":"走马乡"},{"id":"4196","name":"迁乔乡"},{"id":"4197","name":"连湖镇"},{"id":"4198","name":"郁山镇"},{"id":"4199","name":"长滩乡"},{"id":"4200","name":"靛水乡"},{"id":"4201","name":"鞍子乡"},{"id":"4202","name":"高谷镇"},{"id":"4203","name":"鹿角镇"},{"id":"4204","name":"鹿鸣乡"},{"id":"4205","name":"黄家镇"},{"id":"4206","name":"龙塘乡"},{"id":"4207","name":"龙射镇"},{"id":"4208","name":"龙溪乡"}]},{"id":"381","name":"江津市","area":[]},{"id":"382","name":"合川市","area":[]},{"id":"383","name":"永川市","area":[]},{"id":"384","name":"南川市","area":[]}]},{"id":"23","name":"四川省","city":[{"id":"385","name":"成都市","area":[{"id":"4209","name":"双流县"},{"id":"4210","name":"大邑县"},{"id":"4211","name":"崇州市"},{"id":"4212","name":"彭州市"},{"id":"4213","name":"成华区"},{"id":"4214","name":"新津县"},{"id":"4215","name":"新都区"},{"id":"4216","name":"武侯区"},{"id":"4217","name":"温江区"},{"id":"4218","name":"蒲江县"},{"id":"4219","name":"邛崃市"},{"id":"4220","name":"郫县"},{"id":"4221","name":"都江堰市"},{"id":"4222","name":"金堂县"},{"id":"4223","name":"金牛区"},{"id":"4224","name":"锦江区"},{"id":"4225","name":"青白江区"},{"id":"4226","name":"青羊区"},{"id":"4227","name":"龙泉驿区"}]},{"id":"386","name":"自贡市","area":[{"id":"4228","name":"大安区"},{"id":"4229","name":"富顺县"},{"id":"4230","name":"沿滩区"},{"id":"4231","name":"自流井区"},{"id":"4232","name":"荣县"},{"id":"4233","name":"贡井区"}]},{"id":"387","name":"攀枝花市","area":[{"id":"4234","name":"东区"},{"id":"4235","name":"仁和区"},{"id":"4236","name":"盐边县"},{"id":"4237","name":"米易县"},{"id":"4238","name":"西区"}]},{"id":"388","name":"泸州市","area":[{"id":"4239","name":"叙永县"},{"id":"4240","name":"古蔺县"},{"id":"4241","name":"合江县"},{"id":"4242","name":"江阳区"},{"id":"4243","name":"泸县"},{"id":"4244","name":"纳溪区"},{"id":"4245","name":"龙马潭区"}]},{"id":"389","name":"德阳市","area":[{"id":"4246","name":"中江县"},{"id":"4247","name":"什邡市"},{"id":"4248","name":"广汉市"},{"id":"4249","name":"旌阳区"},{"id":"4250","name":"绵竹市"},{"id":"4251","name":"罗江县"}]},{"id":"390","name":"绵阳市","area":[{"id":"4252","name":"三台县"},{"id":"4253","name":"北川羌族自治县"},{"id":"4254","name":"安县"},{"id":"4255","name":"平武县"},{"id":"4256","name":"梓潼县"},{"id":"4257","name":"江油市"},{"id":"4258","name":"涪城区"},{"id":"4259","name":"游仙区"},{"id":"4260","name":"盐亭县"}]},{"id":"391","name":"广元市","area":[{"id":"4261","name":"元坝区"},{"id":"4262","name":"利州区"},{"id":"4263","name":"剑阁县"},{"id":"4264","name":"旺苍县"},{"id":"4265","name":"朝天区"},{"id":"4266","name":"苍溪县"},{"id":"4267","name":"青川县"}]},{"id":"392","name":"遂宁市","area":[{"id":"4268","name":"大英县"},{"id":"4269","name":"安居区"},{"id":"4270","name":"射洪县"},{"id":"4271","name":"船山区"},{"id":"4272","name":"蓬溪县"}]},{"id":"393","name":"内江市","area":[{"id":"4273","name":"东兴区"},{"id":"4274","name":"威远县"},{"id":"4275","name":"市中区"},{"id":"4276","name":"资中县"},{"id":"4277","name":"隆昌县"}]},{"id":"394","name":"乐山市","area":[{"id":"4278","name":"五通桥区"},{"id":"4279","name":"井研县"},{"id":"4280","name":"夹江县"},{"id":"4281","name":"峨眉山市"},{"id":"4282","name":"峨边彝族自治县"},{"id":"4283","name":"市中区"},{"id":"4284","name":"沐川县"},{"id":"4285","name":"沙湾区"},{"id":"4286","name":"犍为县"},{"id":"4287","name":"金口河区"},{"id":"4288","name":"马边彝族自治县"}]},{"id":"395","name":"南充市","area":[{"id":"4289","name":"仪陇县"},{"id":"4290","name":"南充市嘉陵区"},{"id":"4291","name":"南部县"},{"id":"4292","name":"嘉陵区"},{"id":"4293","name":"营山县"},{"id":"4294","name":"蓬安县"},{"id":"4295","name":"西充县"},{"id":"4296","name":"阆中市"},{"id":"4297","name":"顺庆区"},{"id":"4298","name":"高坪区"}]},{"id":"396","name":"眉山市","area":[{"id":"4299","name":"东坡区"},{"id":"4300","name":"丹棱县"},{"id":"4301","name":"仁寿县"},{"id":"4302","name":"彭山县"},{"id":"4303","name":"洪雅县"},{"id":"4304","name":"青神县"}]},{"id":"397","name":"宜宾市","area":[{"id":"4305","name":"兴文县"},{"id":"4306","name":"南溪县"},{"id":"4307","name":"宜宾县"},{"id":"4308","name":"屏山县"},{"id":"4309","name":"江安县"},{"id":"4310","name":"珙县"},{"id":"4311","name":"筠连县"},{"id":"4312","name":"翠屏区"},{"id":"4313","name":"长宁县"},{"id":"4314","name":"高县"}]},{"id":"398","name":"广安市","area":[{"id":"4315","name":"华蓥市"},{"id":"4316","name":"岳池县"},{"id":"4317","name":"广安区"},{"id":"4318","name":"武胜县"},{"id":"4319","name":"邻水县"}]},{"id":"399","name":"达州市","area":[{"id":"4320","name":"万源市"},{"id":"4321","name":"大竹县"},{"id":"4322","name":"宣汉县"},{"id":"4323","name":"开江县"},{"id":"4324","name":"渠县"},{"id":"4325","name":"达县"},{"id":"4326","name":"通川区"}]},{"id":"400","name":"雅安市","area":[{"id":"4327","name":"名山县"},{"id":"4328","name":"天全县"},{"id":"4329","name":"宝兴县"},{"id":"4330","name":"汉源县"},{"id":"4331","name":"石棉县"},{"id":"4332","name":"芦山县"},{"id":"4333","name":"荥经县"},{"id":"4334","name":"雨城区"}]},{"id":"401","name":"巴中市","area":[{"id":"4335","name":"南江县"},{"id":"4336","name":"巴州区"},{"id":"4337","name":"平昌县"},{"id":"4338","name":"通江县"}]},{"id":"402","name":"资阳市","area":[{"id":"4339","name":"乐至县"},{"id":"4340","name":"安岳县"},{"id":"4341","name":"简阳市"},{"id":"4342","name":"雁江区"}]},{"id":"403","name":"阿坝藏族羌族自治州","area":[{"id":"4343","name":"九寨沟县"},{"id":"4344","name":"壤塘县"},{"id":"4345","name":"小金县"},{"id":"4346","name":"松潘县"},{"id":"4347","name":"汶川县"},{"id":"4348","name":"理县"},{"id":"4349","name":"红原县"},{"id":"4350","name":"若尔盖县"},{"id":"4351","name":"茂县"},{"id":"4352","name":"金川县"},{"id":"4353","name":"阿坝县"},{"id":"4354","name":"马尔康县"},{"id":"4355","name":"黑水县"}]},{"id":"404","name":"甘孜藏族自治州","area":[{"id":"4356","name":"丹巴县"},{"id":"4357","name":"乡城县"},{"id":"4358","name":"巴塘县"},{"id":"4359","name":"康定县"},{"id":"4360","name":"得荣县"},{"id":"4361","name":"德格县"},{"id":"4362","name":"新龙县"},{"id":"4363","name":"泸定县"},{"id":"4364","name":"炉霍县"},{"id":"4365","name":"理塘县"},{"id":"4366","name":"甘孜县"},{"id":"4367","name":"白玉县"},{"id":"4368","name":"石渠县"},{"id":"4369","name":"稻城县"},{"id":"4370","name":"色达县"},{"id":"4371","name":"道孚县"},{"id":"4372","name":"雅江县"}]},{"id":"405","name":"凉山彝族自治州","area":[{"id":"4373","name":"会东县"},{"id":"4374","name":"会理县"},{"id":"4375","name":"冕宁县"},{"id":"4376","name":"喜德县"},{"id":"4377","name":"宁南县"},{"id":"4378","name":"布拖县"},{"id":"4379","name":"德昌县"},{"id":"4380","name":"昭觉县"},{"id":"4381","name":"普格县"},{"id":"4382","name":"木里藏族自治县"},{"id":"4383","name":"甘洛县"},{"id":"4384","name":"盐源县"},{"id":"4385","name":"美姑县"},{"id":"4386","name":"西昌"},{"id":"4387","name":"越西县"},{"id":"4388","name":"金阳县"},{"id":"4389","name":"雷波县"}]}]},{"id":"24","name":"贵州省","city":[{"id":"406","name":"贵阳市","area":[{"id":"4390","name":"乌当区"},{"id":"4391","name":"云岩区"},{"id":"4392","name":"修文县"},{"id":"4393","name":"南明区"},{"id":"4394","name":"小河区"},{"id":"4395","name":"开阳县"},{"id":"4396","name":"息烽县"},{"id":"4397","name":"清镇市"},{"id":"4398","name":"白云区"},{"id":"4399","name":"花溪区"}]},{"id":"407","name":"六盘水市","area":[{"id":"4400","name":"六枝特区"},{"id":"4401","name":"水城县"},{"id":"4402","name":"盘县"},{"id":"4403","name":"钟山区"}]},{"id":"408","name":"遵义市","area":[{"id":"4404","name":"习水县"},{"id":"4405","name":"仁怀市"},{"id":"4406","name":"余庆县"},{"id":"4407","name":"凤冈县"},{"id":"4408","name":"务川仡佬族苗族自治县"},{"id":"4409","name":"桐梓县"},{"id":"4410","name":"正安县"},{"id":"4411","name":"汇川区"},{"id":"4412","name":"湄潭县"},{"id":"4413","name":"红花岗区"},{"id":"4414","name":"绥阳县"},{"id":"4415","name":"赤水市"},{"id":"4416","name":"道真仡佬族苗族自治县"},{"id":"4417","name":"遵义县"}]},{"id":"409","name":"安顺市","area":[{"id":"4418","name":"关岭布依族苗族自治县"},{"id":"4419","name":"平坝县"},{"id":"4420","name":"普定县"},{"id":"4421","name":"紫云苗族布依族自治县"},{"id":"4422","name":"西秀区"},{"id":"4423","name":"镇宁布依族苗族自治县"}]},{"id":"410","name":"铜仁地区","area":[{"id":"4424","name":"万山特区"},{"id":"4425","name":"印江土家族苗族自治县"},{"id":"4426","name":"德江县"},{"id":"4427","name":"思南县"},{"id":"4428","name":"松桃苗族自治县"},{"id":"4429","name":"江口县"},{"id":"4430","name":"沿河土家族自治县"},{"id":"4431","name":"玉屏侗族自治县"},{"id":"4432","name":"石阡县"},{"id":"4433","name":"铜仁市"}]},{"id":"411","name":"黔西南布依族苗族自治州","area":[{"id":"4434","name":"兴义市"},{"id":"4435","name":"兴仁县"},{"id":"4436","name":"册亨县"},{"id":"4437","name":"安龙县"},{"id":"4438","name":"普安县"},{"id":"4439","name":"晴隆县"},{"id":"4440","name":"望谟县"},{"id":"4441","name":"贞丰县"}]},{"id":"412","name":"毕节地区","area":[{"id":"4442","name":"大方县"},{"id":"4443","name":"威宁彝族回族苗族自治县"},{"id":"4444","name":"毕节市"},{"id":"4445","name":"纳雍县"},{"id":"4446","name":"织金县"},{"id":"4447","name":"赫章县"},{"id":"4448","name":"金沙县"},{"id":"4449","name":"黔西县"}]},{"id":"413","name":"黔东南苗族侗族自治州","area":[{"id":"4450","name":"三穗县"},{"id":"4451","name":"丹寨县"},{"id":"4452","name":"从江县"},{"id":"4453","name":"凯里市"},{"id":"4454","name":"剑河县"},{"id":"4455","name":"台江县"},{"id":"4456","name":"天柱县"},{"id":"4457","name":"岑巩县"},{"id":"4458","name":"施秉县"},{"id":"4459","name":"榕江县"},{"id":"4460","name":"锦屏县"},{"id":"4461","name":"镇远县"},{"id":"4462","name":"雷山县"},{"id":"4463","name":"麻江县"},{"id":"4464","name":"黄平县"},{"id":"4465","name":"黎平县"}]},{"id":"414","name":"黔南布依族苗族自治州","area":[{"id":"4466","name":"三都水族自治县"},{"id":"4467","name":"平塘县"},{"id":"4468","name":"惠水县"},{"id":"4469","name":"独山县"},{"id":"4470","name":"瓮安县"},{"id":"4471","name":"福泉市"},{"id":"4472","name":"罗甸县"},{"id":"4473","name":"荔波县"},{"id":"4474","name":"贵定县"},{"id":"4475","name":"都匀市"},{"id":"4476","name":"长顺县"},{"id":"4477","name":"龙里县"}]}]},{"id":"25","name":"云南省","city":[{"id":"415","name":"昆明市","area":[{"id":"4478","name":"东川区"},{"id":"4479","name":"五华区"},{"id":"4480","name":"呈贡县"},{"id":"4481","name":"安宁市"},{"id":"4482","name":"官渡区"},{"id":"4483","name":"宜良县"},{"id":"4484","name":"富民县"},{"id":"4485","name":"寻甸回族彝族自治县"},{"id":"4486","name":"嵩明县"},{"id":"4487","name":"晋宁县"},{"id":"4488","name":"盘龙区"},{"id":"4489","name":"石林彝族自治县"},{"id":"4490","name":"禄劝彝族苗族自治县"},{"id":"4491","name":"西山区"}]},{"id":"416","name":"曲靖市","area":[{"id":"4492","name":"会泽县"},{"id":"4493","name":"宣威市"},{"id":"4494","name":"富源县"},{"id":"4495","name":"师宗县"},{"id":"4496","name":"沾益县"},{"id":"4497","name":"罗平县"},{"id":"4498","name":"陆良县"},{"id":"4499","name":"马龙县"},{"id":"4500","name":"麒麟区"}]},{"id":"417","name":"玉溪市","area":[{"id":"4501","name":"元江哈尼族彝族傣族自治县"},{"id":"4502","name":"华宁县"},{"id":"4503","name":"峨山彝族自治县"},{"id":"4504","name":"新平彝族傣族自治县"},{"id":"4505","name":"易门县"},{"id":"4506","name":"江川县"},{"id":"4507","name":"澄江县"},{"id":"4508","name":"红塔区"},{"id":"4509","name":"通海县"}]},{"id":"418","name":"保山市","area":[{"id":"4510","name":"施甸县"},{"id":"4511","name":"昌宁县"},{"id":"4512","name":"腾冲县"},{"id":"4513","name":"隆阳区"},{"id":"4514","name":"龙陵县"}]},{"id":"419","name":"昭通市","area":[{"id":"4515","name":"大关县"},{"id":"4516","name":"威信县"},{"id":"4517","name":"巧家县"},{"id":"4518","name":"彝良县"},{"id":"4519","name":"昭阳区"},{"id":"4520","name":"水富县"},{"id":"4521","name":"永善县"},{"id":"4522","name":"盐津县"},{"id":"4523","name":"绥江县"},{"id":"4524","name":"镇雄县"},{"id":"4525","name":"鲁甸县"}]},{"id":"420","name":"丽江市","area":[{"id":"4526","name":"华坪县"},{"id":"4527","name":"古城区"},{"id":"4528","name":"宁蒗彝族自治县"},{"id":"4529","name":"永胜县"},{"id":"4530","name":"玉龙纳西族自治县"}]},{"id":"421","name":"思茅市","area":[]},{"id":"422","name":"临沧市","area":[{"id":"4531","name":"临翔区"},{"id":"4532","name":"云县"},{"id":"4533","name":"凤庆县"},{"id":"4534","name":"双江拉祜族佤族布朗族傣族自治县"},{"id":"4535","name":"永德县"},{"id":"4536","name":"沧源佤族自治县"},{"id":"4537","name":"耿马傣族佤族自治县"},{"id":"4538","name":"镇康县"}]},{"id":"423","name":"楚雄彝族自治州","area":[{"id":"4539","name":"元谋县"},{"id":"4540","name":"南华县"},{"id":"4541","name":"双柏县"},{"id":"4542","name":"大姚县"},{"id":"4543","name":"姚安县"},{"id":"4544","name":"楚雄市"},{"id":"4545","name":"武定县"},{"id":"4546","name":"永仁县"},{"id":"4547","name":"牟定县"},{"id":"4548","name":"禄丰县"}]},{"id":"424","name":"红河哈尼族彝族自治州","area":[{"id":"4549","name":"个旧市"},{"id":"4550","name":"元阳县"},{"id":"4551","name":"屏边苗族自治县"},{"id":"4552","name":"建水县"},{"id":"4553","name":"开远市"},{"id":"4554","name":"弥勒县"},{"id":"4555","name":"河口瑶族自治县"},{"id":"4556","name":"泸西县"},{"id":"4557","name":"石屏县"},{"id":"4558","name":"红河县"},{"id":"4559","name":"绿春县"},{"id":"4560","name":"蒙自县"},{"id":"4561","name":"金平苗族瑶族傣族自治县"}]},{"id":"425","name":"文山壮族苗族自治州","area":[{"id":"4562","name":"丘北县"},{"id":"4563","name":"富宁县"},{"id":"4564","name":"广南县"},{"id":"4565","name":"文山县"},{"id":"4566","name":"砚山县"},{"id":"4567","name":"西畴县"},{"id":"4568","name":"马关县"},{"id":"4569","name":"麻栗坡县"}]},{"id":"426","name":"西双版纳傣族自治州","area":[{"id":"4570","name":"勐海县"},{"id":"4571","name":"勐腊县"},{"id":"4572","name":"景洪市"}]},{"id":"427","name":"大理白族自治州","area":[{"id":"4573","name":"云龙县"},{"id":"4574","name":"剑川县"},{"id":"4575","name":"南涧彝族自治县"},{"id":"4576","name":"大理市"},{"id":"4577","name":"宾川县"},{"id":"4578","name":"巍山彝族回族自治县"},{"id":"4579","name":"弥渡县"},{"id":"4580","name":"永平县"},{"id":"4581","name":"洱源县"},{"id":"4582","name":"漾濞彝族自治县"},{"id":"4583","name":"祥云县"},{"id":"4584","name":"鹤庆县"}]},{"id":"428","name":"德宏傣族景颇族自治州","area":[{"id":"4585","name":"梁河县"},{"id":"4586","name":"潞西市"},{"id":"4587","name":"瑞丽市"},{"id":"4588","name":"盈江县"},{"id":"4589","name":"陇川县"}]},{"id":"429","name":"怒江傈僳族自治州","area":[]},{"id":"430","name":"迪庆藏族自治州","area":[{"id":"4590","name":"德钦县"},{"id":"4591","name":"维西傈僳族自治县"},{"id":"4592","name":"香格里拉县"}]}]},{"id":"26","name":"西藏自治区","city":[{"id":"431","name":"拉萨市","area":[{"id":"4593","name":"城关区"},{"id":"4594","name":"堆龙德庆县"},{"id":"4595","name":"墨竹工卡县"},{"id":"4596","name":"尼木县"},{"id":"4597","name":"当雄县"},{"id":"4598","name":"曲水县"},{"id":"4599","name":"林周县"},{"id":"4600","name":"达孜县"}]},{"id":"432","name":"昌都地区","area":[{"id":"4601","name":"丁青县"},{"id":"4602","name":"八宿县"},{"id":"4603","name":"察雅县"},{"id":"4604","name":"左贡县"},{"id":"4605","name":"昌都县"},{"id":"4606","name":"江达县"},{"id":"4607","name":"洛隆县"},{"id":"4608","name":"类乌齐县"},{"id":"4609","name":"芒康县"},{"id":"4610","name":"贡觉县"},{"id":"4611","name":"边坝县"}]},{"id":"433","name":"山南地区","area":[{"id":"4612","name":"乃东县"},{"id":"4613","name":"加查县"},{"id":"4614","name":"扎囊县"},{"id":"4615","name":"措美县"},{"id":"4616","name":"曲松县"},{"id":"4617","name":"桑日县"},{"id":"4618","name":"洛扎县"},{"id":"4619","name":"浪卡子县"},{"id":"4620","name":"琼结县"},{"id":"4621","name":"贡嘎县"},{"id":"4622","name":"错那县"},{"id":"4623","name":"隆子县"}]},{"id":"434","name":"日喀则地区","area":[{"id":"4624","name":"亚东县"},{"id":"4625","name":"仁布县"},{"id":"4626","name":"仲巴县"},{"id":"4627","name":"南木林县"},{"id":"4628","name":"吉隆县"},{"id":"4629","name":"定日县"},{"id":"4630","name":"定结县"},{"id":"4631","name":"岗巴县"},{"id":"4632","name":"康马县"},{"id":"4633","name":"拉孜县"},{"id":"4634","name":"日喀则市"},{"id":"4635","name":"昂仁县"},{"id":"4636","name":"江孜县"},{"id":"4637","name":"白朗县"},{"id":"4638","name":"聂拉木县"},{"id":"4639","name":"萨嘎县"},{"id":"4640","name":"萨迦县"},{"id":"4641","name":"谢通门县"}]},{"id":"435","name":"那曲地区","area":[{"id":"4642","name":"嘉黎县"},{"id":"4643","name":"安多县"},{"id":"4644","name":"尼玛县"},{"id":"4645","name":"巴青县"},{"id":"4646","name":"比如县"},{"id":"4647","name":"班戈县"},{"id":"4648","name":"申扎县"},{"id":"4649","name":"索县"},{"id":"4650","name":"聂荣县"},{"id":"4651","name":"那曲县"}]},{"id":"436","name":"阿里地区","area":[{"id":"4652","name":"噶尔县"},{"id":"4653","name":"措勤县"},{"id":"4654","name":"改则县"},{"id":"4655","name":"日土县"},{"id":"4656","name":"普兰县"},{"id":"4657","name":"札达县"},{"id":"4658","name":"革吉县"}]},{"id":"437","name":"林芝地区","area":[{"id":"4659","name":"墨脱县"},{"id":"4660","name":"察隅县"},{"id":"4661","name":"工布江达县"},{"id":"4662","name":"朗县"},{"id":"4663","name":"林芝县"},{"id":"4664","name":"波密县"},{"id":"4665","name":"米林县"}]}]},{"id":"27","name":"陕西省","city":[{"id":"438","name":"西安市","area":[{"id":"4666","name":"临潼区"},{"id":"4667","name":"周至县"},{"id":"4668","name":"户县"},{"id":"4669","name":"新城区"},{"id":"4670","name":"未央区"},{"id":"4671","name":"灞桥区"},{"id":"4672","name":"碑林区"},{"id":"4673","name":"莲湖区"},{"id":"4674","name":"蓝田县"},{"id":"4675","name":"长安区"},{"id":"4676","name":"阎良区"},{"id":"4677","name":"雁塔区"},{"id":"4678","name":"高陵县"}]},{"id":"439","name":"铜川市","area":[{"id":"4679","name":"印台区"},{"id":"4680","name":"宜君县"},{"id":"4681","name":"王益区"},{"id":"4682","name":"耀州区"}]},{"id":"440","name":"宝鸡市","area":[{"id":"4683","name":"凤县"},{"id":"4684","name":"凤翔县"},{"id":"4685","name":"千阳县"},{"id":"4686","name":"太白县"},{"id":"4687","name":"岐山县"},{"id":"4688","name":"扶风县"},{"id":"4689","name":"渭滨区"},{"id":"4690","name":"眉县"},{"id":"4691","name":"金台区"},{"id":"4692","name":"陇县"},{"id":"4693","name":"陈仓区"},{"id":"4694","name":"麟游县"}]},{"id":"441","name":"咸阳市","area":[{"id":"4695","name":"三原县"},{"id":"4696","name":"干县"},{"id":"4697","name":"兴平市"},{"id":"4698","name":"彬县"},{"id":"4699","name":"旬邑县"},{"id":"4700","name":"杨陵区"},{"id":"4701","name":"武功县"},{"id":"4702","name":"永寿县"},{"id":"4703","name":"泾阳县"},{"id":"4704","name":"淳化县"},{"id":"4705","name":"渭城区"},{"id":"4706","name":"礼泉县"},{"id":"4707","name":"秦都区"},{"id":"4708","name":"长武县"}]},{"id":"442","name":"渭南市","area":[{"id":"4709","name":"临渭区"},{"id":"4710","name":"华县"},{"id":"4711","name":"华阴市"},{"id":"4712","name":"合阳县"},{"id":"4713","name":"大荔县"},{"id":"4714","name":"富平县"},{"id":"4715","name":"潼关县"},{"id":"4716","name":"澄城县"},{"id":"4717","name":"白水县"},{"id":"4718","name":"蒲城县"},{"id":"4719","name":"韩城市"}]},{"id":"443","name":"延安市","area":[{"id":"4720","name":"吴起县"},{"id":"4721","name":"子长县"},{"id":"4722","name":"安塞县"},{"id":"4723","name":"宜川县"},{"id":"4724","name":"宝塔区"},{"id":"4725","name":"富县"},{"id":"4726","name":"延川县"},{"id":"4727","name":"延长县"},{"id":"4728","name":"志丹县"},{"id":"4729","name":"洛川县"},{"id":"4730","name":"甘泉县"},{"id":"4731","name":"黄陵县"},{"id":"4732","name":"黄龙县"}]},{"id":"444","name":"汉中市","area":[{"id":"4733","name":"佛坪县"},{"id":"4734","name":"勉县"},{"id":"4735","name":"南郑县"},{"id":"4736","name":"城固县"},{"id":"4737","name":"宁强县"},{"id":"4738","name":"汉台区"},{"id":"4739","name":"洋县"},{"id":"4740","name":"留坝县"},{"id":"4741","name":"略阳县"},{"id":"4742","name":"西乡县"},{"id":"4743","name":"镇巴县"}]},{"id":"445","name":"榆林市","area":[{"id":"4744","name":"佳县"},{"id":"4745","name":"吴堡县"},{"id":"4746","name":"子洲县"},{"id":"4747","name":"定边县"},{"id":"4748","name":"府谷县"},{"id":"4749","name":"榆林市榆阳区"},{"id":"4750","name":"横山县"},{"id":"4751","name":"清涧县"},{"id":"4752","name":"神木县"},{"id":"4753","name":"米脂县"},{"id":"4754","name":"绥德县"},{"id":"4755","name":"靖边县"}]},{"id":"446","name":"安康市","area":[{"id":"4756","name":"宁陕县"},{"id":"4757","name":"岚皋县"},{"id":"4758","name":"平利县"},{"id":"4759","name":"旬阳县"},{"id":"4760","name":"汉滨区"},{"id":"4761","name":"汉阴县"},{"id":"4762","name":"白河县"},{"id":"4763","name":"石泉县"},{"id":"4764","name":"紫阳县"},{"id":"4765","name":"镇坪县"}]},{"id":"447","name":"商洛市","area":[{"id":"4766","name":"丹凤县"},{"id":"4767","name":"商南县"},{"id":"4768","name":"商州区"},{"id":"4769","name":"山阳县"},{"id":"4770","name":"柞水县"},{"id":"4771","name":"洛南县"},{"id":"4772","name":"镇安县"}]}]},{"id":"28","name":"甘肃省","city":[{"id":"448","name":"兰州市","area":[{"id":"4773","name":"七里河区"},{"id":"4774","name":"城关区"},{"id":"4775","name":"安宁区"},{"id":"4776","name":"榆中县"},{"id":"4777","name":"永登县"},{"id":"4778","name":"皋兰县"},{"id":"4779","name":"红古区"},{"id":"4780","name":"西固区"}]},{"id":"449","name":"嘉峪关市","area":[{"id":"4781","name":"嘉峪关市"}]},{"id":"450","name":"金昌市","area":[{"id":"4782","name":"永昌县"},{"id":"4783","name":"金川区"}]},{"id":"451","name":"白银市","area":[{"id":"4784","name":"会宁县"},{"id":"4785","name":"平川区"},{"id":"4786","name":"景泰县"},{"id":"4787","name":"白银区"},{"id":"4788","name":"靖远县"}]},{"id":"452","name":"天水市","area":[{"id":"4789","name":"张家川回族自治县"},{"id":"4790","name":"武山县"},{"id":"4791","name":"清水县"},{"id":"4792","name":"甘谷县"},{"id":"4793","name":"秦安县"},{"id":"4794","name":"秦州区"},{"id":"4795","name":"麦积区"}]},{"id":"453","name":"武威市","area":[{"id":"4796","name":"凉州区"},{"id":"4797","name":"古浪县"},{"id":"4798","name":"天祝藏族自治县"},{"id":"4799","name":"民勤县"}]},{"id":"454","name":"张掖市","area":[{"id":"4800","name":"临泽县"},{"id":"4801","name":"山丹县"},{"id":"4802","name":"民乐县"},{"id":"4803","name":"甘州区"},{"id":"4804","name":"肃南裕固族自治县"},{"id":"4805","name":"高台县"}]},{"id":"455","name":"平凉市","area":[{"id":"4806","name":"华亭县"},{"id":"4807","name":"崆峒区"},{"id":"4808","name":"崇信县"},{"id":"4809","name":"庄浪县"},{"id":"4810","name":"泾川县"},{"id":"4811","name":"灵台县"},{"id":"4812","name":"静宁县"}]},{"id":"456","name":"酒泉市","area":[{"id":"4813","name":"敦煌市"},{"id":"4814","name":"玉门市"},{"id":"4815","name":"瓜州县（原安西县）"},{"id":"4816","name":"肃北蒙古族自治县"},{"id":"4817","name":"肃州区"},{"id":"4818","name":"金塔县"},{"id":"4819","name":"阿克塞哈萨克族自治县"}]},{"id":"457","name":"庆阳市","area":[{"id":"4820","name":"华池县"},{"id":"4821","name":"合水县"},{"id":"4822","name":"宁县"},{"id":"4823","name":"庆城县"},{"id":"4824","name":"正宁县"},{"id":"4825","name":"环县"},{"id":"4826","name":"西峰区"},{"id":"4827","name":"镇原县"}]},{"id":"458","name":"定西市","area":[{"id":"4828","name":"临洮县"},{"id":"4829","name":"安定区"},{"id":"4830","name":"岷县"},{"id":"4831","name":"渭源县"},{"id":"4832","name":"漳县"},{"id":"4833","name":"通渭县"},{"id":"4834","name":"陇西县"}]},{"id":"459","name":"陇南市","area":[{"id":"4835","name":"两当县"},{"id":"4836","name":"宕昌县"},{"id":"4837","name":"康县"},{"id":"4838","name":"徽县"},{"id":"4839","name":"成县"},{"id":"4840","name":"文县"},{"id":"4841","name":"武都区"},{"id":"4842","name":"礼县"},{"id":"4843","name":"西和县"}]},{"id":"460","name":"临夏回族自治州","area":[{"id":"4844","name":"东乡族自治县"},{"id":"4845","name":"临夏县"},{"id":"4846","name":"临夏市"},{"id":"4847","name":"和政县"},{"id":"4848","name":"广河县"},{"id":"4849","name":"康乐县"},{"id":"4850","name":"永靖县"},{"id":"4851","name":"积石山保安族东乡族撒拉族自治县"}]},{"id":"461","name":"甘南藏族自治州","area":[{"id":"4852","name":"临潭县"},{"id":"4853","name":"卓尼县"},{"id":"4854","name":"合作市"},{"id":"4855","name":"夏河县"},{"id":"4856","name":"玛曲县"},{"id":"4857","name":"碌曲县"},{"id":"4858","name":"舟曲县"},{"id":"4859","name":"迭部县"}]}]},{"id":"29","name":"青海省","city":[{"id":"462","name":"西宁市","area":[{"id":"4860","name":"城东区"},{"id":"4861","name":"城中区"},{"id":"4862","name":"城北区"},{"id":"4863","name":"城西区"},{"id":"4864","name":"大通回族土族自治县"},{"id":"4865","name":"湟中县"},{"id":"4866","name":"湟源县"}]},{"id":"463","name":"海东地区","area":[{"id":"4867","name":"乐都县"},{"id":"4868","name":"互助土族自治县"},{"id":"4869","name":"化隆回族自治县"},{"id":"4870","name":"平安县"},{"id":"4871","name":"循化撒拉族自治县"},{"id":"4872","name":"民和回族土族自治县"}]},{"id":"464","name":"海北藏族自治州","area":[{"id":"4873","name":"刚察县"},{"id":"4874","name":"海晏县"},{"id":"4875","name":"祁连县"},{"id":"4876","name":"门源回族自治县"}]},{"id":"465","name":"黄南藏族自治州","area":[{"id":"4877","name":"同仁县"},{"id":"4878","name":"尖扎县"},{"id":"4879","name":"河南蒙古族自治县"},{"id":"4880","name":"泽库县"}]},{"id":"466","name":"海南藏族自治州","area":[{"id":"4881","name":"共和县"},{"id":"4882","name":"兴海县"},{"id":"4883","name":"同德县"},{"id":"4884","name":"贵南县"},{"id":"4885","name":"贵德县"}]},{"id":"467","name":"果洛藏族自治州","area":[{"id":"4886","name":"久治县"},{"id":"4887","name":"玛多县"},{"id":"4888","name":"玛沁县"},{"id":"4889","name":"班玛县"},{"id":"4890","name":"甘德县"},{"id":"4891","name":"达日县"}]},{"id":"468","name":"玉树藏族自治州","area":[{"id":"4892","name":"囊谦县"},{"id":"4893","name":"曲麻莱县"},{"id":"4894","name":"杂多县"},{"id":"4895","name":"治多县"},{"id":"4896","name":"玉树县"},{"id":"4897","name":"称多县"}]},{"id":"469","name":"海西蒙古族藏族自治州","area":[{"id":"4898","name":"乌兰县"},{"id":"4899","name":"冷湖行委"},{"id":"4900","name":"大柴旦行委"},{"id":"4901","name":"天峻县"},{"id":"4902","name":"德令哈市"},{"id":"4903","name":"格尔木市"},{"id":"4904","name":"茫崖行委"},{"id":"4905","name":"都兰县"}]}]},{"id":"30","name":"宁夏回族自治区","city":[{"id":"470","name":"银川市","area":[{"id":"4906","name":"兴庆区"},{"id":"4907","name":"永宁县"},{"id":"4908","name":"灵武市"},{"id":"4909","name":"西夏区"},{"id":"4910","name":"贺兰县"},{"id":"4911","name":"金凤区"}]},{"id":"471","name":"石嘴山市","area":[{"id":"4912","name":"大武口区"},{"id":"4913","name":"平罗县"},{"id":"4914","name":"惠农区"}]},{"id":"472","name":"吴忠市","area":[{"id":"4915","name":"利通区"},{"id":"4916","name":"同心县"},{"id":"4917","name":"盐池县"},{"id":"4918","name":"青铜峡市"}]},{"id":"473","name":"固原市","area":[{"id":"4919","name":"原州区"},{"id":"4920","name":"彭阳县"},{"id":"4921","name":"泾源县"},{"id":"4922","name":"西吉县"},{"id":"4923","name":"隆德县"}]},{"id":"474","name":"中卫市","area":[{"id":"4924","name":"中宁县"},{"id":"4925","name":"沙坡头区"},{"id":"4926","name":"海原县"}]}]},{"id":"31","name":"新疆维吾尔自治区","city":[{"id":"475","name":"乌鲁木齐市","area":[{"id":"4927","name":"东山区"},{"id":"4928","name":"乌鲁木齐县"},{"id":"4929","name":"天山区"},{"id":"4930","name":"头屯河区"},{"id":"4931","name":"新市区"},{"id":"4932","name":"水磨沟区"},{"id":"4933","name":"沙依巴克区"},{"id":"4934","name":"达坂城区"}]},{"id":"476","name":"克拉玛依市","area":[{"id":"4935","name":"乌尔禾区"},{"id":"4936","name":"克拉玛依区"},{"id":"4937","name":"独山子区"},{"id":"4938","name":"白碱滩区"}]},{"id":"477","name":"吐鲁番地区","area":[{"id":"4939","name":"吐鲁番市"},{"id":"4940","name":"托克逊县"},{"id":"4941","name":"鄯善县"}]},{"id":"478","name":"哈密地区","area":[{"id":"4942","name":"伊吾县"},{"id":"4943","name":"哈密市"},{"id":"4944","name":"巴里坤哈萨克自治县"}]},{"id":"479","name":"昌吉回族自治州","area":[{"id":"4945","name":"吉木萨尔县"},{"id":"4946","name":"呼图壁县"},{"id":"4947","name":"奇台县"},{"id":"4948","name":"昌吉市"},{"id":"4949","name":"木垒哈萨克自治县"},{"id":"4950","name":"玛纳斯县"},{"id":"4951","name":"米泉市"},{"id":"4952","name":"阜康市"}]},{"id":"480","name":"博尔塔拉蒙古自治州","area":[{"id":"4953","name":"博乐市"},{"id":"4954","name":"温泉县"},{"id":"4955","name":"精河县"}]},{"id":"481","name":"巴音郭楞蒙古自治州","area":[{"id":"4956","name":"博湖县"},{"id":"4957","name":"和硕县"},{"id":"4958","name":"和静县"},{"id":"4959","name":"尉犁县"},{"id":"4960","name":"库尔勒市"},{"id":"4961","name":"焉耆回族自治县"},{"id":"4962","name":"若羌县"},{"id":"4963","name":"轮台县"}]},{"id":"482","name":"阿克苏地区","area":[{"id":"4964","name":"乌什县"},{"id":"4965","name":"库车县"},{"id":"4966","name":"拜城县"},{"id":"4967","name":"新和县"},{"id":"4968","name":"柯坪县"},{"id":"4969","name":"沙雅县"},{"id":"4970","name":"温宿县"},{"id":"4971","name":"阿克苏市"},{"id":"4972","name":"阿瓦提县"}]},{"id":"483","name":"克孜勒苏柯尔克孜自治州","area":[{"id":"4973","name":"乌恰县"},{"id":"4974","name":"阿克陶县"},{"id":"4975","name":"阿合奇县"},{"id":"4976","name":"阿图什市"}]},{"id":"484","name":"喀什地区","area":[{"id":"4977","name":"伽师县"},{"id":"4978","name":"叶城县"},{"id":"4979","name":"喀什市"},{"id":"4980","name":"塔什库尔干塔吉克自治县"},{"id":"4981","name":"岳普湖县"},{"id":"4982","name":"巴楚县"},{"id":"4983","name":"泽普县"},{"id":"4984","name":"疏勒县"},{"id":"4985","name":"疏附县"},{"id":"4986","name":"英吉沙县"},{"id":"4987","name":"莎车县"},{"id":"4988","name":"麦盖提县"}]},{"id":"485","name":"和田地区","area":[{"id":"4989","name":"于田县"},{"id":"4990","name":"和田县"},{"id":"4991","name":"和田市"},{"id":"4992","name":"墨玉县"},{"id":"4993","name":"民丰县"},{"id":"4994","name":"洛浦县"},{"id":"4995","name":"皮山县"},{"id":"4996","name":"策勒县"}]},{"id":"486","name":"伊犁哈萨克自治州","area":[{"id":"4997","name":"伊宁县"},{"id":"4998","name":"伊宁市"},{"id":"4999","name":"奎屯市"},{"id":"5000","name":"察布查尔锡伯自治县"},{"id":"5001","name":"尼勒克县"},{"id":"5002","name":"巩留县"},{"id":"5003","name":"新源县"},{"id":"5004","name":"昭苏县"},{"id":"5005","name":"特克斯县"},{"id":"5006","name":"霍城县"}]},{"id":"487","name":"塔城地区","area":[{"id":"5007","name":"乌苏市"},{"id":"5008","name":"和布克赛尔蒙古自治县"},{"id":"5009","name":"塔城市"},{"id":"5010","name":"托里县"},{"id":"5011","name":"沙湾县"},{"id":"5012","name":"裕民县"},{"id":"5013","name":"额敏县"}]},{"id":"488","name":"阿勒泰地区","area":[{"id":"5014","name":"吉木乃县"},{"id":"5015","name":"哈巴河县"},{"id":"5016","name":"富蕴县"},{"id":"5017","name":"布尔津县"},{"id":"5018","name":"福海县"},{"id":"5019","name":"阿勒泰市"},{"id":"5020","name":"青河县"}]},{"id":"489","name":"石河子市","area":[{"id":"5021","name":"石河子市"}]},{"id":"490","name":"阿拉尔市","area":[{"id":"5022","name":"阿拉尔市"}]},{"id":"491","name":"图木舒克市","area":[{"id":"5023","name":"图木舒克市"}]},{"id":"492","name":"五家渠市","area":[{"id":"5024","name":"五家渠市"}]}]},{"id":"32","name":"台湾省","city":[{"id":"493","name":"台北市","area":[]},{"id":"494","name":"高雄市","area":[]},{"id":"495","name":"基隆市","area":[]},{"id":"496","name":"台中市","area":[]},{"id":"497","name":"台南市","area":[]},{"id":"498","name":"新竹市","area":[]},{"id":"499","name":"嘉义市","area":[]},{"id":"500","name":"台北县","area":[]},{"id":"501","name":"宜兰县","area":[]},{"id":"502","name":"桃园县","area":[]},{"id":"503","name":"新竹县","area":[]},{"id":"504","name":"苗栗县","area":[]},{"id":"505","name":"台中县","area":[]},{"id":"506","name":"彰化县","area":[]},{"id":"507","name":"南投县","area":[]},{"id":"508","name":"云林县","area":[]},{"id":"509","name":"嘉义县","area":[]},{"id":"510","name":"台南县","area":[]},{"id":"511","name":"高雄县","area":[]},{"id":"512","name":"屏东县","area":[]},{"id":"513","name":"澎湖县","area":[]},{"id":"514","name":"台东县","area":[]},{"id":"515","name":"花莲县","area":[]}]},{"id":"33","name":"香港特别行政区","city":[{"id":"516","name":"中西区","area":[]},{"id":"517","name":"东区","area":[]},{"id":"518","name":"九龙城区","area":[]},{"id":"519","name":"观塘区","area":[]},{"id":"520","name":"南区","area":[]},{"id":"521","name":"深水埗区","area":[]},{"id":"522","name":"黄大仙区","area":[]},{"id":"523","name":"湾仔区","area":[]},{"id":"524","name":"油尖旺区","area":[]},{"id":"525","name":"离岛区","area":[]},{"id":"526","name":"葵青区","area":[]},{"id":"527","name":"北区","area":[]},{"id":"528","name":"西贡区","area":[]},{"id":"529","name":"沙田区","area":[]},{"id":"530","name":"屯门区","area":[]},{"id":"531","name":"大埔区","area":[]},{"id":"532","name":"荃湾区","area":[]},{"id":"533","name":"元朗区","area":[]}]},{"id":"34","name":"澳门特别行政区","city":[{"id":"534","name":"澳门特别行政区","area":[]}]},{"id":"35","name":"海外","city":[{"id":"535","name":"美国","area":[]},{"id":"536","name":"加拿大","area":[]},{"id":"537","name":"澳大利亚","area":[]},{"id":"538","name":"新西兰","area":[]},{"id":"539","name":"英国","area":[]},{"id":"540","name":"法国","area":[]},{"id":"541","name":"德国","area":[]},{"id":"542","name":"捷克","area":[]},{"id":"543","name":"荷兰","area":[]},{"id":"544","name":"瑞士","area":[]},{"id":"545","name":"希腊","area":[]},{"id":"546","name":"挪威","area":[]},{"id":"547","name":"瑞典","area":[]},{"id":"548","name":"丹麦","area":[]},{"id":"549","name":"芬兰","area":[]},{"id":"550","name":"爱尔兰","area":[]},{"id":"551","name":"奥地利","area":[]},{"id":"552","name":"意大利","area":[]},{"id":"553","name":"乌克兰","area":[]},{"id":"554","name":"俄罗斯","area":[]},{"id":"555","name":"西班牙","area":[]},{"id":"556","name":"韩国","area":[]},{"id":"557","name":"新加坡","area":[]},{"id":"558","name":"马来西亚","area":[]},{"id":"559","name":"印度","area":[]},{"id":"560","name":"泰国","area":[]},{"id":"561","name":"日本","area":[]},{"id":"562","name":"巴西","area":[]},{"id":"563","name":"阿根廷","area":[]},{"id":"564","name":"南非","area":[]},{"id":"565","name":"埃及","area":[]}]},{"id":"36","name":"其它","city":[{"id":"566","name":"其它","area":[{"id":"45052","name":"其它"}]}]}];

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 21:
/*!***********************************************!*\
  !*** D:/桌面文件/添选项目/tianxuan/common/request.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {// const commonUrl = "http://ttianxuan.local/"; //公共路径 
var commonUrl = "/api/"; //公共路径 

// post请求封装
function postRequest(url, data) {var _this = this;
  var promise = new Promise(function (resolve, reject) {
    var that = _this;
    var postData = data;
    var plugins_params = '';
    var token = '';
    uni.request({
      url: commonUrl + "index.php?s=/api/" + url + plugins_params + "&application=app&application_client_type=weixin" +
      "&token=" +
      token +
      "&ajax=ajax",
      data: postData,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded" },

      success: function success(res) {
        //返回什么就相应的做调整
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          // 请求服务器成功，但是由于服务器没有数据返回，此时无code。会导致这个空数据
          //接口后面的then执行
          // 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
          //不会被阻断在那里执行不下去！
          resolve(res.data.msg);
        }
      },
      error: function error(e) {
        reject("网络出错");
      } });

  });
  return promise;
}

// get请求封装
function getRequest(url, data) {var _this2 = this;
  var promise = new Promise(function (resolve, reject) {
    var that = _this2;
    var postData = data;
    uni.request({
      url: commonUrl + url,
      data: postData,
      method: "GET",
      dataType: "json",
      header: {
        "content-type": "application/x-www-form-urlencoded" },

      success: function success(res) {
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          resolve(res.data);
        }
      },
      error: function error(e) {
        reject("网络出错");
      } });

  });
  return promise;
}


module.exports = {
  post: postRequest,
  get: getRequest };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!************************************************************************!*\
  !*** D:/桌面文件/添选项目/tianxuan/components/mescroll-uni/mescroll-mixins.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // mescroll-body 和 mescroll-uni 通用

// import MescrollUni from "./mescroll-uni.vue";
// import MescrollBody from "./mescroll-body.vue";

var MescrollMixin = {
  // components: { // 非H5端无法通过mixin注册组件, 只能在main.js中注册全局组件或具体界面中注册
  // 	MescrollUni,
  // 	MescrollBody
  // },
  data: function data() {
    return {
      mescroll: null //mescroll实例对象
    };
  },
  // 注册系统自带的下拉刷新 (配置down.native为true时生效, 还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
  onPullDownRefresh: function onPullDownRefresh() {
    this.mescroll && this.mescroll.onPullDownRefresh();
  },
  // 注册列表滚动事件,用于判定在顶部可下拉刷新,在指定位置可显示隐藏回到顶部按钮 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onPageScroll: function onPageScroll(e) {
    this.mescroll && this.mescroll.onPageScroll(e);
  },
  // 注册滚动到底部的事件,用于上拉加载 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onReachBottom: function onReachBottom() {
    this.mescroll && this.mescroll.onReachBottom();
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit: function mescrollInit(mescroll) {
      this.mescroll = mescroll;
      this.mescrollInitByRef(); // 兼容字节跳动小程序
    },
    // 以ref的方式初始化mescroll对象 (兼容字节跳动小程序: http://www.mescroll.com/qa.html?v=20200107#q26)
    mescrollInitByRef: function mescrollInitByRef() {
      if (!this.mescroll || !this.mescroll.resetUpScroll) {
        var mescrollRef = this.$refs.mescrollRef;
        if (mescrollRef) this.mescroll = mescrollRef.mescroll;
      }
    },
    // 下拉刷新的回调
    downCallback: function downCallback() {
      // mixin默认resetUpScroll
      this.mescroll.resetUpScroll();
    },
    // 上拉加载的回调
    upCallback: function upCallback() {var _this = this;
      // mixin默认延时500自动结束加载
      setTimeout(function () {
        _this.mescroll.endErr();
      }, 500);
    } },

  mounted: function mounted() {
    this.mescrollInitByRef(); // 兼容字节跳动小程序, 避免未设置@init或@init此时未能取到ref的情况
  } };var _default =



MescrollMixin;exports.default = _default;

/***/ }),

/***/ 4:
/*!****************************************!*\
  !*** D:/桌面文件/添选项目/tianxuan/pages.json ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 47:
/*!*************************************************************!*\
  !*** D:/桌面文件/添选项目/tianxuan/components/jweixin-sdk/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}!function (e, n) { true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {return n(e);}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;}(window, function (o, e) {if (!o.jWeixin) {var _w;var n,c = { config: "preVerifyJSAPI", onMenuShareTimeline: "menu:share:timeline", onMenuShareAppMessage: "menu:share:appmessage", onMenuShareQQ: "menu:share:qq", onMenuShareWeibo: "menu:share:weiboApp", onMenuShareQZone: "menu:share:QZone", previewImage: "imagePreview", getLocation: "geoLocation", openProductSpecificView: "openProductViewWithPid", addCard: "batchAddCard", openCard: "batchViewCard", chooseWXPay: "getBrandWCPayRequest", openEnterpriseRedPacket: "getRecevieBizHongBaoRequest", startSearchBeacons: "startMonitoringBeacons", stopSearchBeacons: "stopMonitoringBeacons", onSearchBeacons: "onBeaconsInRange", consumeAndShareCard: "consumedShareCard", openAddress: "editAddress" },a = function () {var e = {};for (var n in c) {e[c[n]] = n;}return e;}(),i = o.document,t = i.title,r = navigator.userAgent.toLowerCase(),s = navigator.platform.toLowerCase(),d = !(!s.match("mac") && !s.match("win")),u = -1 != r.indexOf("wxdebugger"),l = -1 != r.indexOf("micromessenger"),p = -1 != r.indexOf("android"),f = -1 != r.indexOf("iphone") || -1 != r.indexOf("ipad"),m = (n = r.match(/micromessenger\/(\d+\.\d+\.\d+)/) || r.match(/micromessenger\/(\d+\.\d+)/)) ? n[1] : "",g = { initStartTime: L(), initEndTime: 0, preVerifyStartTime: 0, preVerifyEndTime: 0 },h = { version: 1, appId: "", initTime: 0, preVerifyTime: 0, networkType: "", isPreVerifyOk: 1, systemType: f ? 1 : p ? 2 : -1, clientVersion: m, url: encodeURIComponent(location.href) },v = {},S = { _completes: [] },y = { state: 0, data: {} };O(function () {g.initEndTime = L();});var I = !1,_ = [],w = (_w = { config: function config(e) {B("config", v = e);var t = !1 !== v.check;O(function () {if (t) M(c.config, { verifyJsApiList: C(v.jsApiList), verifyOpenTagList: C(v.openTagList) }, function () {S._complete = function (e) {g.preVerifyEndTime = L(), y.state = 1, y.data = e;}, S.success = function (e) {h.isPreVerifyOk = 0;}, S.fail = function (e) {S._fail ? S._fail(e) : y.state = -1;};var t = S._completes;return t.push(function () {!function () {if (!(d || u || v.debug || m < "6.0.2" || h.systemType < 0)) {var i = new Image();h.appId = v.appId, h.initTime = g.initEndTime - g.initStartTime, h.preVerifyTime = g.preVerifyEndTime - g.preVerifyStartTime, w.getNetworkType({ isInnerInvoke: !0, success: function success(e) {h.networkType = e.networkType;var n = "https://open.weixin.qq.com/sdk/report?v=" + h.version + "&o=" + h.isPreVerifyOk + "&s=" + h.systemType + "&c=" + h.clientVersion + "&a=" + h.appId + "&n=" + h.networkType + "&i=" + h.initTime + "&p=" + h.preVerifyTime + "&u=" + h.url;i.src = n;} });}}();}), S.complete = function (e) {for (var n = 0, i = t.length; n < i; ++n) {t[n]();}S._completes = [];}, S;}()), g.preVerifyStartTime = L();else {y.state = 1;for (var e = S._completes, n = 0, i = e.length; n < i; ++n) {e[n]();}S._completes = [];}}), w.invoke || (w.invoke = function (e, n, i) {o.WeixinJSBridge && WeixinJSBridge.invoke(e, x(n), i);}, w.on = function (e, n) {o.WeixinJSBridge && WeixinJSBridge.on(e, n);});}, ready: function ready(e) {0 != y.state ? e() : (S._completes.push(e), !l && v.debug && e());}, error: function error(e) {m < "6.0.2" || (-1 == y.state ? e(y.data) : S._fail = e);}, checkJsApi: function checkJsApi(e) {M("checkJsApi", { jsApiList: C(e.jsApiList) }, (e._complete = function (e) {if (p) {var n = e.checkResult;n && (e.checkResult = JSON.parse(n));}e = function (e) {var n = e.checkResult;for (var i in n) {var t = a[i];t && (n[t] = n[i], delete n[i]);}return e;}(e);}, e));}, onMenuShareTimeline: function onMenuShareTimeline(e) {P(c.onMenuShareTimeline, { complete: function complete() {M("shareTimeline", { title: e.title || t, desc: e.title || t, img_url: e.imgUrl || "", link: e.link || location.href, type: e.type || "link", data_url: e.dataUrl || "" }, e);} }, e);}, onMenuShareAppMessage: function onMenuShareAppMessage(n) {P(c.onMenuShareAppMessage, { complete: function complete(e) {"favorite" === e.scene ? M("sendAppMessage", { title: n.title || t, desc: n.desc || "", link: n.link || location.href, img_url: n.imgUrl || "", type: n.type || "link", data_url: n.dataUrl || "" }) : M("sendAppMessage", { title: n.title || t, desc: n.desc || "", link: n.link || location.href, img_url: n.imgUrl || "", type: n.type || "link", data_url: n.dataUrl || "" }, n);} }, n);}, onMenuShareQQ: function onMenuShareQQ(e) {P(c.onMenuShareQQ, { complete: function complete() {M("shareQQ", { title: e.title || t, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, onMenuShareWeibo: function onMenuShareWeibo(e) {P(c.onMenuShareWeibo, { complete: function complete() {M("shareWeiboApp", { title: e.title || t, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, onMenuShareQZone: function onMenuShareQZone(e) {P(c.onMenuShareQZone, { complete: function complete() {M("shareQZone", { title: e.title || t, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, updateTimelineShareData: function updateTimelineShareData(e) {M("updateTimelineShareData", { title: e.title, link: e.link, imgUrl: e.imgUrl }, e);}, updateAppMessageShareData: function updateAppMessageShareData(e) {M("updateAppMessageShareData", { title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl }, e);}, startRecord: function startRecord(e) {M("startRecord", {}, e);}, stopRecord: function stopRecord(e) {M("stopRecord", {}, e);}, onVoiceRecordEnd: function onVoiceRecordEnd(e) {P("onVoiceRecordEnd", e);}, playVoice: function playVoice(e) {M("playVoice", { localId: e.localId }, e);}, pauseVoice: function pauseVoice(e) {M("pauseVoice", { localId: e.localId }, e);}, stopVoice: function stopVoice(e) {M("stopVoice", { localId: e.localId }, e);}, onVoicePlayEnd: function onVoicePlayEnd(e) {P("onVoicePlayEnd", e);}, uploadVoice: function uploadVoice(e) {M("uploadVoice", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, downloadVoice: function downloadVoice(e) {M("downloadVoice", { serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, translateVoice: function translateVoice(e) {M("translateVoice", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, chooseImage: function chooseImage(e) {M("chooseImage", { scene: "1|2", count: e.count || 9, sizeType: e.sizeType || ["original", "compressed"], sourceType: e.sourceType || ["album", "camera"] }, (e._complete = function (e) {if (p) {var n = e.localIds;try {n && (e.localIds = JSON.parse(n));} catch (e) {}}}, e));}, getLocation: function getLocation(e) {}, previewImage: function previewImage(e) {M(c.previewImage, { current: e.current, urls: e.urls }, e);}, uploadImage: function uploadImage(e) {M("uploadImage", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, downloadImage: function downloadImage(e) {M("downloadImage", { serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, getLocalImgData: function getLocalImgData(e) {!1 === I ? (I = !0, M("getLocalImgData", { localId: e.localId }, (e._complete = function (e) {if (I = !1, 0 < _.length) {var n = _.shift();wx.getLocalImgData(n);}}, e))) : _.push(e);}, getNetworkType: function getNetworkType(e) {M("getNetworkType", {}, (e._complete = function (e) {e = function (e) {var n = e.errMsg;e.errMsg = "getNetworkType:ok";var i = e.subtype;if (delete e.subtype, i) e.networkType = i;else {var t = n.indexOf(":"),o = n.substring(t + 1);switch (o) {case "wifi":case "edge":case "wwan":e.networkType = o;break;default:e.errMsg = "getNetworkType:fail";}}return e;}(e);}, e));}, openLocation: function openLocation(e) {M("openLocation", { latitude: e.latitude, longitude: e.longitude, name: e.name || "", address: e.address || "", scale: e.scale || 28, infoUrl: e.infoUrl || "" }, e);} }, _defineProperty(_w, "getLocation", function getLocation(e) {M(c.getLocation, { type: (e = e || {}).type || "wgs84" }, (e._complete = function (e) {delete e.type;}, e));}), _defineProperty(_w, "hideOptionMenu", function hideOptionMenu(e) {M("hideOptionMenu", {}, e);}), _defineProperty(_w, "showOptionMenu", function showOptionMenu(e) {M("showOptionMenu", {}, e);}), _defineProperty(_w, "closeWindow", function closeWindow(e) {M("closeWindow", {}, e = e || {});}), _defineProperty(_w, "hideMenuItems", function hideMenuItems(e) {M("hideMenuItems", { menuList: e.menuList }, e);}), _defineProperty(_w, "showMenuItems", function showMenuItems(e) {M("showMenuItems", { menuList: e.menuList }, e);}), _defineProperty(_w, "hideAllNonBaseMenuItem", function hideAllNonBaseMenuItem(e) {M("hideAllNonBaseMenuItem", {}, e);}), _defineProperty(_w, "showAllNonBaseMenuItem", function showAllNonBaseMenuItem(e) {M("showAllNonBaseMenuItem", {}, e);}), _defineProperty(_w, "scanQRCode", function scanQRCode(e) {M("scanQRCode", { needResult: (e = e || {}).needResult || 0, scanType: e.scanType || ["qrCode", "barCode"] }, (e._complete = function (e) {if (f) {var n = e.resultStr;if (n) {var i = JSON.parse(n);e.resultStr = i && i.scan_code && i.scan_code.scan_result;}}}, e));}), _defineProperty(_w, "openAddress", function openAddress(e) {M(c.openAddress, {}, (e._complete = function (e) {e = function (e) {return e.postalCode = e.addressPostalCode, delete e.addressPostalCode, e.provinceName = e.proviceFirstStageName, delete e.proviceFirstStageName, e.cityName = e.addressCitySecondStageName, delete e.addressCitySecondStageName, e.countryName = e.addressCountiesThirdStageName, delete e.addressCountiesThirdStageName, e.detailInfo = e.addressDetailInfo, delete e.addressDetailInfo, e;}(e);}, e));}), _defineProperty(_w, "openProductSpecificView", function openProductSpecificView(e) {M(c.openProductSpecificView, { pid: e.productId, view_type: e.viewType || 0, ext_info: e.extInfo }, e);}), _defineProperty(_w, "addCard", function addCard(e) {for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {var r = n[t],a = { card_id: r.cardId, card_ext: r.cardExt };i.push(a);}M(c.addCard, { card_list: i }, (e._complete = function (e) {var n = e.card_list;if (n) {for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {var o = n[i];o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, delete o.card_ext, delete o.is_succ;}e.cardList = n, delete e.card_list;}}, e));}), _defineProperty(_w, "chooseCard", function chooseCard(e) {M("chooseCard", { app_id: v.appId, location_id: e.shopId || "", sign_type: e.signType || "SHA1", card_id: e.cardId || "", card_type: e.cardType || "", card_sign: e.cardSign, time_stamp: e.timestamp + "", nonce_str: e.nonceStr }, (e._complete = function (e) {e.cardList = e.choose_card_info, delete e.choose_card_info;}, e));}), _defineProperty(_w, "openCard", function openCard(e) {for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {var r = n[t],a = { card_id: r.cardId, code: r.code };i.push(a);}M(c.openCard, { card_list: i }, e);}), _defineProperty(_w, "consumeAndShareCard", function consumeAndShareCard(e) {M(c.consumeAndShareCard, { consumedCardId: e.cardId, consumedCode: e.code }, e);}), _defineProperty(_w, "chooseWXPay", function chooseWXPay(e) {M(c.chooseWXPay, V(e), e);}), _defineProperty(_w, "openEnterpriseRedPacket", function openEnterpriseRedPacket(e) {M(c.openEnterpriseRedPacket, V(e), e);}), _defineProperty(_w, "startSearchBeacons", function startSearchBeacons(e) {M(c.startSearchBeacons, { ticket: e.ticket }, e);}), _defineProperty(_w, "stopSearchBeacons", function stopSearchBeacons(e) {M(c.stopSearchBeacons, {}, e);}), _defineProperty(_w, "onSearchBeacons", function onSearchBeacons(e) {P(c.onSearchBeacons, e);}), _defineProperty(_w, "openEnterpriseChat", function openEnterpriseChat(e) {M("openEnterpriseChat", { useridlist: e.userIds, chatname: e.groupName }, e);}), _defineProperty(_w, "launchMiniProgram", function launchMiniProgram(e) {M("launchMiniProgram", { targetAppId: e.targetAppId, path: function (e) {if ("string" == typeof e && 0 < e.length) {var n = e.split("?")[0],i = e.split("?")[1];return n += ".html", void 0 !== i ? n + "?" + i : n;}}(e.path), envVersion: e.envVersion }, e);}), _defineProperty(_w, "openBusinessView", function openBusinessView(e) {M("openBusinessView", { businessType: e.businessType, queryString: e.queryString || "", envVersion: e.envVersion }, (e._complete = function (n) {if (p) {var e = n.extraData;if (e) try {n.extraData = JSON.parse(e);} catch (e) {n.extraData = {};}}}, e));}), _defineProperty(_w, "miniProgram", { navigateBack: function navigateBack(e) {e = e || {}, O(function () {M("invokeMiniProgramAPI", { name: "navigateBack", arg: { delta: e.delta || 1 } }, e);});}, navigateTo: function navigateTo(e) {O(function () {M("invokeMiniProgramAPI", { name: "navigateTo", arg: { url: e.url } }, e);});}, redirectTo: function redirectTo(e) {O(function () {M("invokeMiniProgramAPI", { name: "redirectTo", arg: { url: e.url } }, e);});}, switchTab: function switchTab(e) {O(function () {M("invokeMiniProgramAPI", { name: "switchTab", arg: { url: e.url } }, e);});}, reLaunch: function reLaunch(e) {O(function () {M("invokeMiniProgramAPI", { name: "reLaunch", arg: { url: e.url } }, e);});}, postMessage: function postMessage(e) {O(function () {M("invokeMiniProgramAPI", { name: "postMessage", arg: e.data || {} }, e);});}, getEnv: function getEnv(e) {O(function () {e({ miniprogram: "miniprogram" === o.__wxjs_environment });});} }), _w),T = 1,k = {};return i.addEventListener("error", function (e) {if (!p) {var n = e.target,i = n.tagName,t = n.src;if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) if (-1 != t.indexOf("wxlocalresource://")) {e.preventDefault(), e.stopPropagation();var o = n["wx-id"];if (o || (o = T++, n["wx-id"] = o), k[o]) return;k[o] = !0, wx.ready(function () {wx.getLocalImgData({ localId: t, success: function success(e) {n.src = e.localData;} });});}}}, !0), i.addEventListener("load", function (e) {if (!p) {var n = e.target,i = n.tagName;n.src;if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {var t = n["wx-id"];t && (k[t] = !1);}}}, !0), e && (o.wx = o.jWeixin = w), w;}function M(n, e, i) {o.WeixinJSBridge ? WeixinJSBridge.invoke(n, x(e), function (e) {A(n, e, i);}) : B(n, i);}function P(n, i, t) {o.WeixinJSBridge ? WeixinJSBridge.on(n, function (e) {t && t.trigger && t.trigger(e), A(n, e, i);}) : B(n, t || i);}function x(e) {return (e = e || {}).appId = v.appId, e.verifyAppId = v.appId, e.verifySignType = "sha1", e.verifyTimestamp = v.timestamp + "", e.verifyNonceStr = v.nonceStr, e.verifySignature = v.signature, e;}function V(e) {return { timeStamp: e.timestamp + "", nonceStr: e.nonceStr, package: e.package, paySign: e.paySign, signType: e.signType || "SHA1" };}function A(e, n, i) {"openEnterpriseChat" != e && "openBusinessView" !== e || (n.errCode = n.err_code), delete n.err_code, delete n.err_desc, delete n.err_detail;var t = n.errMsg;t || (t = n.err_msg, delete n.err_msg, t = function (e, n) {var i = e,t = a[i];t && (i = t);var o = "ok";if (n) {var r = n.indexOf(":");"confirm" == (o = n.substring(r + 1)) && (o = "ok"), "failed" == o && (o = "fail"), -1 != o.indexOf("failed_") && (o = o.substring(7)), -1 != o.indexOf("fail_") && (o = o.substring(5)), "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"), "config" == i && "function not exist" == o && (o = "ok"), "" == o && (o = "fail");}return n = i + ":" + o;}(e, t), n.errMsg = t), (i = i || {})._complete && (i._complete(n), delete i._complete), t = n.errMsg || "", v.debug && !i.isInnerInvoke && alert(JSON.stringify(n));var o = t.indexOf(":");switch (t.substring(o + 1)) {case "ok":i.success && i.success(n);break;case "cancel":i.cancel && i.cancel(n);break;default:i.fail && i.fail(n);}i.complete && i.complete(n);}function C(e) {if (e) {for (var n = 0, i = e.length; n < i; ++n) {var t = e[n],o = c[t];o && (e[n] = o);}return e;}}function B(e, n) {if (!(!v.debug || n && n.isInnerInvoke)) {var i = a[e];i && (e = i), n && n._complete && delete n._complete, console.log('"' + e + '",', n || "");}}function L() {return new Date().getTime();}function O(e) {l && (o.WeixinJSBridge ? e() : i.addEventListener && i.addEventListener("WeixinJSBridgeReady", e, !1));}});

/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26920200424005","_inBundle":false,"_integrity":"sha512-FT8Z/C5xSmIxooqhV1v69jTkxATPz+FsRQIFOrbdlWekjGkrE73jfrdNMWm7gL5u41ALPJTVArxN1Re9by1bjQ==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26920200424005.tgz","_shasum":"47f4375095eda3089cf4678b4b96fc656a7ab623","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"94494d54ed23e2dcf9ab8e3245b48b770b4e98a9","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26920200424005"};

/***/ }),

/***/ 7:
/*!*********************************************************!*\
  !*** D:/桌面文件/添选项目/tianxuan/pages.json?{"type":"style"} ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationStyle": "custom" }, "pages/list/list": { "navigationBarTitleText": "全部商品" }, "pages/shopping/shopping": { "navigationBarTitleText": "购物车" }, "pages/login/login": { "navigationBarTitleText": "登录" }, "pages/mine/mine": { "navigationBarTitleText": "个人中心" }, "pages/mine/mineSetup": { "navigationBarTitleText": "设置" }, "pages/productDetails/productDetails": { "navigationBarTitleText": "商品详情" }, "pages/productList/productList": { "navigationBarBackgroundColor": "#F8F2F2" }, "pages/service/service": { "navigationBarTitleText": "客服" }, "pages/address/addressList": { "navigationBarTitleText": "地址管理", "navigationBarBackgroundColor": "#F7F3F1" }, "pages/address/addressEdit": { "navigationBarTitleText": "添加收货地址", "navigationBarBackgroundColor": "#F7F3F1" } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "添选", "navigationBarBackgroundColor": "#FFFFFF" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!********************************************************!*\
  !*** D:/桌面文件/添选项目/tianxuan/pages.json?{"type":"stat"} ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map