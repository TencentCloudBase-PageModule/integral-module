module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1646189828825, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudbase = exports.isInvokeByCloudFunction = exports.callSelfDefinedMethod = exports.init = exports.pageModule = exports.PageModule = void 0;
const pagemodule_1 = require("./pagemodule");
var pagemodule_2 = require("./pagemodule");
Object.defineProperty(exports, "PageModule", { enumerable: true, get: function () { return pagemodule_2.PageModule; } });
/**
 * 全局单例的 PageModule 实例
 */
exports.pageModule = new pagemodule_1.PageModule();
/**
 * 初始化全局的单例 PageModule
 * @param moduleName - 模块名称
 * @param options    - 模块参数
 * @returns
 */
function init(moduleName, options = {}) {
    return exports.pageModule.init(moduleName, options);
}
exports.init = init;
var framework_1 = require("./framework");
Object.defineProperty(exports, "callSelfDefinedMethod", { enumerable: true, get: function () { return framework_1.callSelfDefinedMethod; } });
Object.defineProperty(exports, "isInvokeByCloudFunction", { enumerable: true, get: function () { return framework_1.isInvokeByCloudFunction; } });
var cloudbase_1 = require("./cloudbase");
Object.defineProperty(exports, "cloudbase", { enumerable: true, get: function () { return cloudbase_1.cloudbase; } });

}, function(modId) {var map = {"./pagemodule":1646189828826,"./framework":1646189828829,"./cloudbase":1646189828827}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1646189828826, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.PageModule = void 0;
const cloudbase_1 = require("./cloudbase");
class PageModule {
    constructor(moduleName, options) {
        this.inited = false;
        if (moduleName) {
            this.init(moduleName, options);
        }
    }
    init(moduleName, options = {}) {
        if (this.inited) {
            throw new Error('[ERROR]PageModule has already been inited, do not repeat initialization.');
        }
        this.moduleName = `${moduleName}`;
        this.env = `$:${moduleName}`;
        this.initCloudbaseInstance(this.env, options.cloudbaseInstanceInitOptions);
        this.inited = true;
        return this;
    }
    callMethod(methodName, data, options = {}) {
        this.checkInited();
        return this.cloudbaseInstance.callFunction({
            name: methodName,
            data: {
                ...options,
                moduleName: this.moduleName,
                envType: options.envType || 'prod',
                // 数据源参数放到 params 中
                params: data,
            },
        });
    }
    database() {
        return this.cloudbaseInstance.database();
    }
    uploadFile(options) {
    }
    deleteFile(options) {
    }
    downloadFile(options) {
    }
    getTempFileURL(options) {
    }
    initCloudbaseInstance(env, options = {}) {
        this.cloudbaseInstance = (0, cloudbase_1.initCloudbaseInstance)(env, options);
    }
    checkInited() {
        if (!this.inited) {
            throw new Error('[ERROR]PageModule is not inited, please call `init()` method first.');
        }
    }
}
exports.PageModule = PageModule;

}, function(modId) { var map = {"./cloudbase":1646189828827}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1646189828827, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initCloudbaseInstance = exports.initCloudbaseInstanceForWxClient = exports.cloudbase = exports.initCloudbaseInstanceForNodejsForCurrentEnv = exports.initCloudbaseInstanceForNodejs = void 0;
const utils_1 = require("./utils");
const kBaseSdk = 'wx-server-sdk';
const kRuntimeEnv = (0, utils_1.identifyRuntimeEnv)();
/* eslint-disable max-len */
function initCloudbaseInstanceForNodejs(env, options = {}) {
    (0, utils_1.checkNodeModuleDependencies)(kBaseSdk);
    /* eslint-disable @typescript-eslint/no-require-imports */
    const cloud = require(kBaseSdk);
    const cloudInstance = cloud.createNewInstance({
        ...options,
        env,
    });
    return cloudInstance;
}
exports.initCloudbaseInstanceForNodejs = initCloudbaseInstanceForNodejs;
function initCloudbaseInstanceForNodejsForCurrentEnv() {
    if (kRuntimeEnv === utils_1.RuntimeEnv.NODEJS) {
        (0, utils_1.checkNodeModuleDependencies)(kBaseSdk);
        /* eslint-disable @typescript-eslint/no-require-imports */
        const cloud = require(kBaseSdk);
        return initCloudbaseInstanceForNodejs(cloud.getWXContext().ENV);
    }
    return null;
}
exports.initCloudbaseInstanceForNodejsForCurrentEnv = initCloudbaseInstanceForNodejsForCurrentEnv;
exports.cloudbase = initCloudbaseInstanceForNodejsForCurrentEnv();
function initCloudbaseInstanceForWxClient(env, options = {}) {
    // 微信小程序环境
    const cloudInstance = new wx.cloud.Cloud({
        resourceEnv: env,
    });
    cloudInstance.init(options);
    return cloudInstance;
}
exports.initCloudbaseInstanceForWxClient = initCloudbaseInstanceForWxClient;
function initCloudbaseInstance(env, options = {}) {
    if (kRuntimeEnv === utils_1.RuntimeEnv.NODEJS) {
        return initCloudbaseInstanceForNodejs(env, options);
    }
    if (kRuntimeEnv === utils_1.RuntimeEnv.WX_CLIENT) {
        return initCloudbaseInstanceForWxClient(env, options);
    }
    /* eslint-disable max-len */
    throw new Error('[ERROR] Unknown runtime environment, please use in Node.js or WX_CLIENT environment');
}
exports.initCloudbaseInstance = initCloudbaseInstance;

}, function(modId) { var map = {"./utils":1646189828828}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1646189828828, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNodeModuleDependencies = exports.identifyRuntimeEnv = exports.RuntimeEnv = exports.isNodeEnv = exports.isSupportCloudbase = exports.isInWxEnv = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
function isInWxEnv() {
    // window && window.__wxjs_environment
    return !!__wxConfig;
}
exports.isInWxEnv = isInWxEnv;
/* eslint-enable @typescript-eslint/naming-convention */
function isSupportCloudbase() {
    return !!wx.cloud;
}
exports.isSupportCloudbase = isSupportCloudbase;
function isNodeEnv() {
    var _a, _b;
    return ((_b = (_a = global === null || global === void 0 ? void 0 : global.process) === null || _a === void 0 ? void 0 : _a.release) === null || _b === void 0 ? void 0 : _b.name) === 'node';
}
exports.isNodeEnv = isNodeEnv;
var RuntimeEnv;
(function (RuntimeEnv) {
    RuntimeEnv["NODEJS"] = "nodejs";
    RuntimeEnv["WX_CLIENT"] = "WX_CLIENT";
    RuntimeEnv["UNKNOWN"] = "unknown";
})(RuntimeEnv = exports.RuntimeEnv || (exports.RuntimeEnv = {}));
function identifyRuntimeEnv() {
    // 注意检查顺序：先检查是否在 Node.js 环境，再检查是否在小程序环境
    if (isNodeEnv()) {
        return RuntimeEnv.NODEJS;
    }
    if (isInWxEnv() && isSupportCloudbase()) {
        return RuntimeEnv.WX_CLIENT;
    }
    return RuntimeEnv.UNKNOWN;
}
exports.identifyRuntimeEnv = identifyRuntimeEnv;
function checkNodeModuleDependencies(pkgName) {
    try {
        /* eslint-disable @typescript-eslint/no-require-imports */
        require(pkgName);
    }
    catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
            /* eslint-disable max-len */
            throw new Error(`[ERROR][${pkgName}] is required for Node.js environment, please install '${pkgName}' first.`);
        }
        else {
            throw e;
        }
    }
}
exports.checkNodeModuleDependencies = checkNodeModuleDependencies;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1646189828829, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.callSelfDefinedMethod = exports.checkInvokePermission = exports.isInvokeByCloudFunction = exports.isInvokeByServerSide = void 0;
const cloudbase_1 = require("./cloudbase");
/**
 * isInvokeByServerSide - 是否调用自服务端 即上一跳是用户自己服务器，包括云函数
 * @param source
 * @returns
 */
function isInvokeByServerSide(source = '') {
    const { SOURCE } = cloudbase_1.cloudbase.getWXContext();
    const invokeSource = source || SOURCE || '';
    // ,not_scf server -> scf
    // ,not_scf client -> server -> scf
    // ,scf     client -> scf    -> scf
    // ,scf     server -> scf
    // ,scf     server -> scf    -> scf
    return invokeSource.includes(',');
}
exports.isInvokeByServerSide = isInvokeByServerSide;
/**
 * isInvokeByCloudFunction - 是否调自云函数 即上一跳是云函数
 * @param source
 * @returns
 */
function isInvokeByCloudFunction(source = '') {
    const { SOURCE } = cloudbase_1.cloudbase.getWXContext();
    const invokeSource = source || SOURCE || '';
    return invokeSource && invokeSource.endsWith(',scf');
}
exports.isInvokeByCloudFunction = isInvokeByCloudFunction;
/**
 * checkInvokePermission - 检查调用权限
 * @param source
 * @returns
 */
function checkInvokePermission(source) {
    // 自定义接口配置时第二步检测接口海鲜时，来源时为 undefined
    const isFromConsoleInvoke = source === undefined;
    // 只允许来自云函数/延迟任务的调用，例如以下来源
    // https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/utils/Cloud.getWXContext.html#%E8%BF%94%E5%9B%9E%E5%80%BC
    // wx_client,scf wx_client,scf,scf   wx_delaytask
    return (isInvokeByServerSide(source)) || source === 'wx_delaytask' || isFromConsoleInvoke;
}
exports.checkInvokePermission = checkInvokePermission;
const kErrorCodes = {
    PERMISSION_DENIED: 'PERMISSION_DENIED',
    METHOD_NOT_FOUND: 'METHOD_NOT_FOUND',
    METHOD_NOT_FUNCTION: 'METHOD_NOT_FUNCTION',
    METHOD_EXEC_FAILURE: 'METHOD_EXEC_FAILURE',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};
/**
 * 解析出参数
 * @param { object } event - 入参对象
 * @param { string } event.methodName - 具体的接口名，对应于api目录下的文件名，例如，打卡签到模块的自定义接口methodName的枚举值为：sendIntegral、sendPrize
 * @param { object } event.data - 自定义接口的入参
 * @param { object } context - 请求的上下文对象
 * @returns { object } - 返回指定出参对象，必须按下面出参返回
 * @returns { number } code 返回的状态标记，成功返回0， 非0代表错误
 * @returns { string } [msg]  如果成功，则可以不返回，如果失败把相应的错误原因中文描述放在这里
 */
async function callSelfDefinedMethod(event, context) {
    const result = await doCallSelfDefinedMethod(event, context);
    console.log('CallSelfDefinedMethodResult:', result);
    return result;
}
exports.callSelfDefinedMethod = callSelfDefinedMethod;
async function doCallSelfDefinedMethod(event, context) {
    const { ENV, SOURCE } = cloudbase_1.cloudbase.getWXContext();
    const { methodName, params } = event;
    console.log(`[callSelfDefinedMethod]当前环境：${ENV}，调用来源：${SOURCE}，调用方法：${methodName}，入参：${JSON.stringify(params)}`);
    if (!checkInvokePermission(SOURCE)) {
        return {
            code: kErrorCodes.PERMISSION_DENIED,
            msg: `无权限调用 ${methodName}`,
        };
    }
    try {
        /* eslint-disable @typescript-eslint/no-require-imports */
        // 根据自定义接口名，自动路由到 api 目录下的文件实现
        const path = require('path');
        const m = require(path.join(process.cwd(), 'api', methodName));
        let fn = null;
        if (typeof m === 'function') {
            fn = m;
        }
        else if (typeof m.default === 'function') {
            fn = m.default;
        }
        if (typeof fn !== 'function') {
            return {
                code: kErrorCodes.METHOD_NOT_FUNCTION,
                msg: `自定义方法 ${methodName} 不是一个函数`,
            };
        }
        try {
            return await fn(params, context);
        }
        catch (e) {
            return {
                code: kErrorCodes.METHOD_EXEC_FAILURE,
                msg: `自定义方法 ${methodName} 执行异常：${e.message}`,
                e,
            };
        }
    }
    catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
            return {
                code: kErrorCodes.METHOD_NOT_FOUND,
                msg: `自定义方法 ${methodName} 不存在：${e.message}`,
                e,
            };
        }
        return {
            code: kErrorCodes.UNKNOWN_ERROR,
            msg: `未知错误：${e.message}`,
            e,
        };
    }
}

}, function(modId) { var map = {"./cloudbase":1646189828827}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1646189828825);
})()
//miniprogram-npm-outsideDeps=["path"]
//# sourceMappingURL=index.js.map