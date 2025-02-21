(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["modbox"] = factory();
	else
		root["modbox"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/events.ts":
/*!***********************!*\
  !*** ./src/events.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Event: () => (/* binding */ Event),
/* harmony export */   "default": () => (/* binding */ EventEmitter)
/* harmony export */ });
class EventEmitter {
    constructor() {
        this._callbacks = {};
    }
    on(eventName, callback) {
        if (!this._callbacks[eventName])
            this._callbacks[eventName] = [];
        this._callbacks[eventName].push(callback);
    }
    off(eventName, callback) {
        if (!this._callbacks[eventName])
            return;
        this._callbacks[eventName].forEach((value, index) => {
            if (value === callback)
                this._callbacks[eventName].splice(index, 1);
        });
    }
    once(eventName, callback) {
        this.on(eventName, (...d) => {
            callback(d);
            this.off(eventName, arguments.callee);
        });
    }
    emit(eventName, ...args) {
        if (!this._callbacks[eventName])
            return;
        this._callbacks[eventName].forEach(x => x(...args));
    }
}
class Event {
    constructor(name, data, defaultaction) {
        this.name = name;
        this.data = data;
        this.defaultaction = defaultaction;
        this.defaultPrevented = false;
    }
    ;
    preventDefault() {
        this.defaultPrevented = true;
    }
    run_default(...args) {
        if (!this.defaultPrevented)
            this.defaultaction(...args);
    }
}


/***/ }),

/***/ "./src/loader-js.ts":
/*!**************************!*\
  !*** ./src/loader-js.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoaderMod)
/* harmony export */ });
/* harmony import */ var _modapi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modapi */ "./src/modapi.ts");

class LoaderMod extends _modapi__WEBPACK_IMPORTED_MODULE_0__.Mod {
    constructor() {
        super(...arguments);
        this.name = "JavaScript Loader";
        this.description = "The default loader for modbox.";
        this.version = "0.0.1";
        this.namespace = "loader-js";
    }
    Load(data) {
        return eval(`(function(){return ${data}})();`);
    }
    CanLoad(file) {
        return file.endsWith(".js");
    }
}


/***/ }),

/***/ "./src/mblogger.ts":
/*!*************************!*\
  !*** ./src/mblogger.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Logger: () => (/* binding */ Logger),
/* harmony export */   "default": () => (/* binding */ MBLogger)
/* harmony export */ });
/* harmony import */ var _modapi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modapi */ "./src/modapi.ts");

class MBLogger extends _modapi__WEBPACK_IMPORTED_MODULE_0__.Mod {
    constructor() {
        super(...arguments);
        this.name = "MBLogger";
        this.description = "The default logger for modbox.";
        this.version = "0.0.1";
        this.namespace = "mblogger";
    }
    init() { }
    CreateLogger(name) {
        return new Logger(name);
    }
}
class Logger {
    constructor(name) {
        this.name = name;
    }
    getTime() {
        let d = new Date();
        let hour = d.getHours().toString().padStart(2, "0");
        let minute = d.getMinutes().toString().padStart(2, "0");
        let second = d.getSeconds().toString().padStart(2, "0");
        return `${hour}:${minute}:${second}`;
    }
    log(...args) {
        console.log(`[${this.getTime()}] [${this.name}]`, ...args);
    }
    info(...args) {
        console.info(`[${this.getTime()}] [${this.name}] [INFO]`, ...args);
    }
    warn(...args) {
        console.warn(`[${this.getTime()}] [${this.name}] [WARN]`, ...args);
    }
    error(...args) {
        console.error(`[${this.getTime()}] [${this.name}] [ERROR]`, ...args);
    }
}


/***/ }),

/***/ "./src/modapi.ts":
/*!***********************!*\
  !*** ./src/modapi.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mod: () => (/* binding */ Mod),
/* harmony export */   ModAPI: () => (/* binding */ ModAPI),
/* harmony export */   ModAPI_C: () => (/* binding */ ModAPI_C)
/* harmony export */ });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/events.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.ts");


let wino = window;
class Mod {
    constructor() {
        this.name = "no name";
        this.description = "no description";
        this.version = "0.0.0";
        this.namespace = "mod";
    }
    init() { }
}
class ModAPI_C extends Mod {
    constructor() {
        super(...arguments);
        this.name = "ModAPI";
        this.description = "A API for rmtrollbox mods";
        this.version = "0.0.1";
        this.namespace = "modapi";
        this.loaded = [];
        this.hooks = {};
    }
    GetMod(namespace) {
        let a = this.loaded.find(x => x.namespace === namespace);
        if (!a)
            throw new Error(`Mod with namespace ${namespace} not found.`);
        return a;
    }
    GetModByName(name) {
        return this.loaded.find(x => x.name === name);
    }
    GetMods() {
        return this.loaded;
    }
    LoadMod(mod) {
        let lmod = new mod();
        if (this.loaded.find(x => x.name === lmod.name))
            return;
        this.loaded.push(lmod);
        lmod.init();
    }
    ReplaceMod(mod, newmod) {
        let index = this.loaded.findIndex(x => x.name === mod.name);
        if (index === -1)
            return;
        this.loaded[index] = newmod;
    }
    Hook(function_name) {
        if (this.hooks[function_name])
            return this.hooks[function_name];
        let evem = new _events__WEBPACK_IMPORTED_MODULE_0__["default"]();
        let ogfunc = wino[function_name];
        wino[function_name] = (async function (ogfunc, ...fargs) {
            let nargs = _util__WEBPACK_IMPORTED_MODULE_1__.array.deepClone(fargs);
            evem.emit('before_call', nargs); // you can use before call to quickly modify the arguments
            let fevent = new _events__WEBPACK_IMPORTED_MODULE_0__.Event('hooked_function_call', { funcargs: nargs }, ogfunc);
            evem.emit('call', fevent);
            await _util__WEBPACK_IMPORTED_MODULE_1__.sleep(80);
            fevent.run_default(...nargs);
            evem.emit("after_call");
        }).bind(this, ogfunc);
        this.hooks[function_name] = evem;
        return evem;
    }
    FilterMods(prefix) {
        return this.loaded.filter(x => x.namespace.startsWith(prefix));
    }
}
const ModAPI = new ModAPI_C();


/***/ }),

/***/ "./src/modstorage.ts":
/*!***************************!*\
  !*** ./src/modstorage.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModStorage)
/* harmony export */ });
/* harmony import */ var _modapi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modapi */ "./src/modapi.ts");

class ModStorage extends _modapi__WEBPACK_IMPORTED_MODULE_0__.Mod {
    constructor() {
        super(...arguments);
        this.name = "ModStorage";
        this.description = "A mod that stores mod data";
        this.version = "0.0.1";
        this.namespace = "storage";
    }
    init() { }
    GetStorage(name) {
        return new StorageData(name);
    }
}
class StorageData {
    constructor(name) {
        this.name = name;
    }
    Get(key) {
        return localStorage.getItem(`${this.name}/${key}`);
    }
    Set(key, value) {
        localStorage.setItem(`${this.name}/${key}`, value);
    }
    Remove(key) {
        localStorage.removeItem(`${this.name}/${key}`);
    }
    List() {
        let keys = Object.keys(localStorage);
        let mods = [];
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].startsWith(this.name + "/")) {
                mods.push(keys[i].replace(`${this.name}/`, ""));
            }
        }
        return mods;
    }
    Clear() {
        this.List().forEach(key => {
            this.Remove(key);
        });
    }
}


/***/ }),

/***/ "./src/rmtrollbox.ts":
/*!***************************!*\
  !*** ./src/rmtrollbox.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UI: () => (/* binding */ UI),
/* harmony export */   "default": () => (/* binding */ rmtrollbox)
/* harmony export */ });
/* harmony import */ var _modapi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modapi */ "./src/modapi.ts");

class rmtrollbox extends _modapi__WEBPACK_IMPORTED_MODULE_0__.Mod {
    constructor() {
        super(...arguments);
        this.name = "rmtrollbox";
        this.description = "rmtrollbox API";
        this.version = "0.0.1";
        this.namespace = "rmtrollbox";
        this.logger = _modapi__WEBPACK_IMPORTED_MODULE_0__.ModAPI.GetMod("mblogger").CreateLogger("rmtrollbox");
        this.registeredCommands = [];
    }
    init() {
        this.logger.log("Initializing rmtrollbox API");
        let sndMsgHook = _modapi__WEBPACK_IMPORTED_MODULE_0__.ModAPI.Hook("sendMsg");
        sndMsgHook.on("call", (ev) => {
            let msg = ev.data.funcargs[0];
            if (msg.startsWith('/')) {
                let args = msg.substr(1).split(' ');
                let cmd = args.shift();
                let namespace = "";
                if (cmd.includes(':')) {
                    namespace = cmd.split(':')[0];
                    cmd = cmd.split(':')[1];
                }
                let cmds = this.registeredCommands.filter(c => {
                    if (namespace) {
                        return c.namespace === namespace && (c.name === cmd || c.aliases.includes(cmd));
                    }
                    else {
                        return c.name == cmd || c.aliases.includes(cmd);
                    }
                });
                if (cmds.length > 0) {
                    ev.preventDefault();
                    cmds[0].execute(args);
                }
            }
        });
        this.logger.info("rmtrollbox api initialized");
    }
    PrintMessage(msg) {
        //@ts-ignore
        window.printMsg(msg);
    }
    RegisterCommand(cmd) {
        this.registeredCommands.push(cmd);
    }
    GetElement(uielement) {
        return document.querySelector(`#trollbox > ${uielement.GetSelector()}`);
    }
    OpenPopup(html) {
        return new Promise(resolve => {
            //@ts-ignore
            window.popup(html, resolve); // resolve gets called when the popup is open
        });
    }
}
class UIElement {
    constructor(name, element) {
        this.name = name;
        this.element = element;
        this._children = [];
    }
    GetSelector() {
        return this.element;
    }
    SetChildren(childs) {
        this._children = childs.map(x => {
            x.element = `${this.element} > ${x.element}`;
            return x;
        });
        return this;
    }
    Get(name) {
        let a = this._children.find(x => x.name === name);
        if (!a)
            throw new Error(`No child named ${name}`);
        return a;
    }
    get children() {
        return Object.fromEntries(this._children.map(x => [x.name, x]));
    }
}
/*export const UI = {
    Form: {
        __combine: "#trollbox_form",
        get Input() {
            return `${this.__combine} > textarea#trollbox_input`;
        },
        get SendButton() {
            return `${this.__combine} > button`;
        },
        get NickButton() {
            return `${this.__combine} > button#trollbox_nick_btn`;
        },
        get UploadButton() {
            return `${this.__combine} > button#trollbox_upload_btn`;
        }
    }
}*/
const UI = {
    Form: new UIElement("Form", "#trollbox_form").SetChildren([
        new UIElement("Input", "textarea#trollbox_input"),
        new UIElement("SendButton", "button"),
        new UIElement("NickButton", "button#trollbox_nick_btn"),
        new UIElement("UploadButton", "button#trollbox_upload_btn")
    ])
};


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   array: () => (/* binding */ array),
/* harmony export */   object: () => (/* binding */ object),
/* harmony export */   sleep: () => (/* binding */ sleep)
/* harmony export */ });
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
;
var array;
(function (array) {
    function deepClone(arr) {
        let newarr = [];
        for (let i = 0; i < arr.length; i++) {
            let data = arr[i];
            if (typeof data === "object")
                data = object.deepClone(data);
            if (Array.isArray(data))
                data = deepClone(data);
            newarr.push(data);
        }
        return newarr;
    }
    array.deepClone = deepClone;
    ;
    function remove(index, arr) {
        return arr.splice(index, 1);
    }
    array.remove = remove;
})(array || (array = {}));
var object;
(function (object) {
    function hasFunctions(obj) {
        for (let item in obj) {
            if (typeof obj[item] === "function")
                return true;
            if (typeof obj[item] === "object")
                return hasFunctions(obj[item]);
        }
        return false;
    }
    object.hasFunctions = hasFunctions;
    function deepClone(obj) {
        if (window.structuredClone)
            return window.structuredClone(obj);
        if (!hasFunctions(obj))
            return JSON.parse(JSON.stringify(obj));
        let newobj = {};
        for (let item in obj) {
            if (typeof obj[item] === "object") {
                newobj[item] = deepClone(obj[item]);
                continue;
            }
            if (Array.isArray(obj[item])) {
                newobj[item] = array.deepClone(obj[item]);
                continue;
            }
            newobj[item] = obj[item];
        }
    }
    object.deepClone = deepClone;
})(object || (object = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mod: () => (/* reexport safe */ _modapi__WEBPACK_IMPORTED_MODULE_0__.Mod),
/* harmony export */   ModAPI: () => (/* reexport safe */ _modapi__WEBPACK_IMPORTED_MODULE_0__.ModAPI),
/* harmony export */   ModAPI_C: () => (/* reexport safe */ _modapi__WEBPACK_IMPORTED_MODULE_0__.ModAPI_C)
/* harmony export */ });
/* harmony import */ var _modapi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modapi */ "./src/modapi.ts");
/* harmony import */ var _mblogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mblogger */ "./src/mblogger.ts");
/* harmony import */ var _rmtrollbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rmtrollbox */ "./src/rmtrollbox.ts");
/* harmony import */ var _modstorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modstorage */ "./src/modstorage.ts");
/* harmony import */ var _loader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loader-js */ "./src/loader-js.ts");





class ModLoader extends _modapi__WEBPACK_IMPORTED_MODULE_0__.Mod {
    constructor() {
        super(...arguments);
        this.name = "Mod Loader";
        this.description = "A mod that loads mods";
        this.version = "0.0.1";
        this.namespace = "modloader";
        this.logger = _modapi__WEBPACK_IMPORTED_MODULE_0__.ModAPI.GetMod("mblogger").CreateLogger("modloader");
    }
    init() {
        /*//@ts-ignore
        window.ModAPI = ModAPI; // expose the ModAPI to the window
        this.logger.info('ModAPI exposed to window');
        //@ts-ignore
        window.Mod = Mod;
        this.logger.info('Mod class exposed to window');*/
        this.logger.info('Loading mods...');
        let mods = _modapi__WEBPACK_IMPORTED_MODULE_0__.ModAPI.GetMod("storage").GetStorage("mods");
        let modList = mods.List();
        this.logger.info(`Found ${mods.List().length} mods`);
        for (let i = 0; i < mods.List().length; i++) {
            let modName = mods.List()[i];
            let mod = mods.Get(modName);
            this.logger.info(`Loading ${modName}`);
            let loaders = _modapi__WEBPACK_IMPORTED_MODULE_0__.ModAPI.FilterMods("loader-");
            let loaded = false;
            for (let loader of loaders) {
                if (loader.CanLoad(modName)) {
                    this.logger.info(`Loading mod ${modName} with loader ${loader.name}`);
                    _modapi__WEBPACK_IMPORTED_MODULE_0__.ModAPI.LoadMod(loader.Load(mod));
                    this.logger.info(`Loaded ${modName}`);
                    loaded = true;
                    break;
                }
            }
            if (!loaded) {
                this.logger.error(`Could not load mod ${modName}: no loader found for it`);
            }
        }
        this.logger.info(`${_modapi__WEBPACK_IMPORTED_MODULE_0__.ModAPI.GetMods().length} Mods loaded`);
    }
}

setTimeout(() => {
    //@ts-ignore
    window.modbox.ModAPI.LoadMod(_mblogger__WEBPACK_IMPORTED_MODULE_1__["default"]);
    //@ts-ignore
    window.modbox.ModAPI.LoadMod(_rmtrollbox__WEBPACK_IMPORTED_MODULE_2__["default"]);
    //@ts-ignore
    window.modbox.ModAPI.LoadMod(_modstorage__WEBPACK_IMPORTED_MODULE_3__["default"]);
    //@ts-ignore
    window.modbox.ModAPI.LoadMod(_loader_js__WEBPACK_IMPORTED_MODULE_4__["default"]);
    //@ts-ignore
    window.modbox.ModAPI.LoadMod(ModLoader);
}, 500);

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7Ozs7Ozs7QUNQZSxNQUFNLFlBQVk7SUFFN0I7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0QsRUFBRSxDQUFDLFNBQWlCLEVBQUUsUUFBa0I7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1lBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUNELEdBQUcsQ0FBQyxTQUFpQixFQUFFLFFBQWtCO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUFFLE9BQU87UUFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDaEQsSUFBSSxLQUFLLEtBQUssUUFBUTtnQkFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUNELElBQUksQ0FBQyxTQUFpQixFQUFFLFFBQWtCO1FBQ3RDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFRLEVBQUUsRUFBRTtZQUMvQixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUNELElBQUksQ0FBQyxTQUFpQixFQUFFLEdBQUcsSUFBVztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFBRSxPQUFPO1FBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQ0o7QUFDTSxNQUFNLEtBQUs7SUFFZCxZQUFtQixJQUFZLEVBQVMsSUFBUyxFQUFTLGFBQXVCO1FBQTlELFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQVU7UUFEMUUscUJBQWdCLEdBQVksS0FBSyxDQUFDO0lBQzJDLENBQUM7SUFBQSxDQUFDO0lBQ3RGLGNBQWM7UUFDVixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFDRCxXQUFXLENBQUMsR0FBRyxJQUFXO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCO1lBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDOEI7QUFDaEIsTUFBTSxTQUFVLFNBQVEsd0NBQUc7SUFBMUM7O1FBQ1csU0FBSSxHQUFXLG1CQUFtQixDQUFDO1FBQ25DLGdCQUFXLEdBQVcsZ0NBQWdDLENBQUM7UUFDdkQsWUFBTyxHQUFXLE9BQU8sQ0FBQztRQUMxQixjQUFTLEdBQVcsV0FBVyxDQUFDO0lBTzNDLENBQUM7SUFORyxJQUFJLENBQUMsSUFBWTtRQUNiLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixJQUFJLE9BQU8sQ0FBUSxDQUFDO0lBQzFELENBQUM7SUFDRCxPQUFPLENBQUMsSUFBWTtRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1o4QjtBQUNoQixNQUFNLFFBQVMsU0FBUSx3Q0FBRztJQUF6Qzs7UUFDVyxTQUFJLEdBQVcsVUFBVSxDQUFDO1FBQzFCLGdCQUFXLEdBQVcsZ0NBQWdDLENBQUM7UUFDdkQsWUFBTyxHQUFXLE9BQU8sQ0FBQztRQUMxQixjQUFTLEdBQVcsVUFBVSxDQUFDO0lBSzFDLENBQUM7SUFKVSxJQUFJLEtBQUksQ0FBQztJQUNULFlBQVksQ0FBQyxJQUFZO1FBQzVCLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNKO0FBQ00sTUFBTSxNQUFNO0lBQ2YsWUFBbUIsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7SUFBRyxDQUFDO0lBQzNCLE9BQU87UUFDWCxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sR0FBRyxJQUFJLElBQUksTUFBTSxJQUFJLE1BQU0sRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFDTSxHQUFHLENBQUMsR0FBRyxJQUFXO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNNLElBQUksQ0FBQyxHQUFHLElBQVc7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsSUFBSSxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ00sSUFBSSxDQUFDLEdBQUcsSUFBVztRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxJQUFJLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFDTSxLQUFLLENBQUMsR0FBRyxJQUFXO1FBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLElBQUksV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDekUsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEM4QztBQUNoQjtBQUMvQixJQUFJLElBQUksR0FBRyxNQUFhLENBQUM7QUFFbEIsTUFBTSxHQUFHO0lBQWhCO1FBQ1csU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUN6QixnQkFBVyxHQUFXLGdCQUFnQixDQUFDO1FBQ3ZDLFlBQU8sR0FBVyxPQUFPLENBQUM7UUFDMUIsY0FBUyxHQUFXLEtBQUssQ0FBQztJQUVyQyxDQUFDO0lBREcsSUFBSSxLQUFJLENBQUM7Q0FDWjtBQUNNLE1BQU0sUUFBUyxTQUFRLEdBQUc7SUFBakM7O1FBQ1csU0FBSSxHQUFXLFFBQVEsQ0FBQztRQUN4QixnQkFBVyxHQUFXLDJCQUEyQixDQUFDO1FBQ2xELFlBQU8sR0FBVyxPQUFPLENBQUM7UUFDMUIsY0FBUyxHQUFXLFFBQVEsQ0FBQztRQUM1QixXQUFNLEdBQVUsRUFBRSxDQUFDO1FBQ25CLFVBQUssR0FBa0MsRUFBRSxDQUFDO0lBMEN0RCxDQUFDO0lBekNVLE1BQU0sQ0FBSSxTQUFpQjtRQUM5QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLENBQUM7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixTQUFTLGFBQWEsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sQ0FBaUIsQ0FBQztJQUM3QixDQUFDO0lBQ00sWUFBWSxDQUFDLElBQVk7UUFDNUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNNLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNNLE9BQU8sQ0FBQyxHQUFRO1FBQ25CLElBQUksSUFBSSxHQUFRLElBQUksR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU87UUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDTSxVQUFVLENBQUMsR0FBUSxFQUFFLE1BQVc7UUFDbkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RCxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ2hDLENBQUM7SUFDTSxJQUFJLENBQUMsYUFBcUI7UUFDN0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRSxJQUFJLElBQUksR0FBRyxJQUFJLCtDQUFZLEVBQUUsQ0FBQztRQUM5QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxXQUFXLE1BQWdCLEVBQUUsR0FBRyxLQUFZO1lBQ3BFLElBQUksS0FBSyxHQUFHLHdDQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsMERBQTBEO1lBQzNGLElBQUksTUFBTSxHQUFHLElBQUksMENBQUssQ0FBQyxzQkFBc0IsRUFBRSxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsQ0FBQztZQUN6QixNQUFNLHdDQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNqQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ00sVUFBVSxDQUFJLE1BQWM7UUFDL0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFtQixDQUFDO0lBQ3JGLENBQUM7Q0FDSjtBQUNNLE1BQU0sTUFBTSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RE47QUFDaEIsTUFBTSxVQUFXLFNBQVEsd0NBQUc7SUFBM0M7O1FBQ1csU0FBSSxHQUFXLFlBQVksQ0FBQztRQUM1QixnQkFBVyxHQUFXLDRCQUE0QixDQUFDO1FBQ25ELFlBQU8sR0FBVyxPQUFPLENBQUM7UUFDMUIsY0FBUyxHQUFXLFNBQVMsQ0FBQztJQUt6QyxDQUFDO0lBSlUsSUFBSSxLQUFJLENBQUM7SUFDVCxVQUFVLENBQUMsSUFBWTtRQUMxQixPQUFPLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Q0FDSjtBQUNELE1BQU0sV0FBVztJQUNiLFlBQW1CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO0lBQUcsQ0FBQztJQUM1QixHQUFHLENBQUMsR0FBVztRQUNsQixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNNLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBVTtRQUM5QixZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ00sTUFBTSxDQUFDLEdBQVc7UUFDckIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ00sSUFBSTtRQUNQLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ25EO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ00sS0FBSztRQUNSLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ3NDO0FBb0J4QixNQUFNLFVBQVcsU0FBUSx3Q0FBRztJQUEzQzs7UUFDVyxTQUFJLEdBQVcsWUFBWSxDQUFDO1FBQzVCLGdCQUFXLEdBQVcsZ0JBQWdCLENBQUM7UUFDdkMsWUFBTyxHQUFXLE9BQU8sQ0FBQztRQUMxQixjQUFTLEdBQVcsWUFBWSxDQUFDO1FBQ2pDLFdBQU0sR0FBRywyQ0FBTSxDQUFDLE1BQU0sQ0FBVyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdkUsdUJBQWtCLEdBQWMsRUFBRSxDQUFDO0lBNkMvQyxDQUFDO0lBNUNVLElBQUk7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQy9DLElBQUksVUFBVSxHQUFHLDJDQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBUyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN2QixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7Z0JBQ25CLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDbkIsU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMzQjtnQkFDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUMxQyxJQUFJLFNBQVMsRUFBRTt3QkFDWCxPQUFPLENBQUMsQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2xGO3lCQUFNO3dCQUNILE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO3FCQUNsRDtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNqQixFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3pCO2FBQ0o7UUFDTCxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDTSxZQUFZLENBQUMsR0FBYztRQUM5QixZQUFZO1FBQ1osTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ00sZUFBZSxDQUFDLEdBQVk7UUFDL0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ00sVUFBVSxDQUFDLFNBQW9CO1FBQ2xDLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUNNLFNBQVMsQ0FBQyxJQUFZO1FBQ3pCLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDekIsWUFBWTtZQUNaLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsNkNBQTZDO1FBQzdFLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE1BQU0sU0FBUztJQUVYLFlBQW1CLElBQVksRUFBUyxPQUFlO1FBQXBDLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRC9DLGNBQVMsR0FBZ0IsRUFBRSxDQUFDO0lBQ3NCLENBQUM7SUFDcEQsV0FBVztRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBQ00sV0FBVyxDQUFDLE1BQW1CO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM1QixDQUFDLENBQUMsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0MsT0FBTyxDQUFDLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTSxHQUFHLENBQUMsSUFBWTtRQUNuQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLENBQUM7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNELElBQUksUUFBUTtRQUNSLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FDSjtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0ksTUFBTSxFQUFFLEdBQUc7SUFDZCxJQUFJLEVBQUUsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ3RELElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSx5QkFBeUIsQ0FBQztRQUNqRCxJQUFJLFNBQVMsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDO1FBQ3JDLElBQUksU0FBUyxDQUFDLFlBQVksRUFBRSwwQkFBMEIsQ0FBQztRQUN2RCxJQUFJLFNBQVMsQ0FBQyxjQUFjLEVBQUUsNEJBQTRCLENBQUM7S0FFOUQsQ0FBQztDQUNMOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZITSxTQUFTLEtBQUssQ0FBQyxFQUFVLElBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBQztBQUFBLENBQUM7QUFDcEYsSUFBVSxLQUFLLENBY3JCO0FBZEQsV0FBaUIsS0FBSztJQUNsQixTQUFnQixTQUFTLENBQUMsR0FBVTtRQUNoQyxJQUFJLE1BQU0sR0FBVSxFQUFFLENBQUM7UUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtnQkFBRSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFUZSxlQUFTLFlBU3hCO0lBQUEsQ0FBQztJQUNGLFNBQWdCLE1BQU0sQ0FBQyxLQUFhLEVBQUUsR0FBVTtRQUM1QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFGZSxZQUFNLFNBRXJCO0FBQ0wsQ0FBQyxFQWRnQixLQUFLLEtBQUwsS0FBSyxRQWNyQjtBQUNNLElBQVUsTUFBTSxDQWtCdEI7QUFsQkQsV0FBaUIsTUFBTTtJQUNuQixTQUFnQixZQUFZLENBQUMsR0FBUTtRQUNqQyxLQUFLLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtZQUNsQixJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVU7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDakQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxRQUFRO2dCQUFFLE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQU5lLG1CQUFZLGVBTTNCO0lBQ0QsU0FBZ0IsU0FBUyxDQUFDLEdBQVE7UUFDOUIsSUFBSyxNQUFjLENBQUMsZUFBZTtZQUFFLE9BQVEsTUFBYyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUM7UUFDaEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQztRQUNyQixLQUFLLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtZQUNsQixJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUFDLFNBQVE7YUFBQztZQUNsRixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQUMsU0FBUTthQUFDO1lBQ25GLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBVGUsZ0JBQVMsWUFTeEI7QUFDTCxDQUFDLEVBbEJnQixNQUFNLEtBQU4sTUFBTSxRQWtCdEI7Ozs7Ozs7VUNsQ0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05pRDtBQUNmO0FBQ0k7QUFDQTtBQUNGO0FBRXBDLE1BQU0sU0FBVSxTQUFRLHdDQUFHO0lBQTNCOztRQUNXLFNBQUksR0FBVyxZQUFZLENBQUM7UUFDNUIsZ0JBQVcsR0FBVyx1QkFBdUIsQ0FBQztRQUM5QyxZQUFPLEdBQVcsT0FBTyxDQUFDO1FBQzFCLGNBQVMsR0FBVyxXQUFXLENBQUM7UUFDL0IsV0FBTSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFXLFVBQVUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQWlDbkYsQ0FBQztJQWhDVSxJQUFJO1FBQ1A7Ozs7OzBEQUtrRDtRQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3BDLElBQUksSUFBSSxHQUFHLDJDQUFNLENBQUMsTUFBTSxDQUFhLFNBQVMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDbEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUM7UUFDckQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDdkMsSUFBSSxPQUFPLEdBQUcsMkNBQU0sQ0FBQyxVQUFVLENBQVksU0FBUyxDQUFDLENBQUM7WUFDdEQsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ25CLEtBQUssSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO2dCQUN4QixJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsT0FBTyxnQkFBZ0IsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ3RFLDJDQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUN0QyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNkLE1BQU07aUJBQ1Q7YUFDSjtZQUNELElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLE9BQU8sMEJBQTBCLENBQUMsQ0FBQzthQUM5RTtTQUNKO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRywyQ0FBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sY0FBYyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNKO0FBRWdDO0FBRWpDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7SUFDWixZQUFZO0lBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGlEQUFRLENBQUMsQ0FBQztJQUN2QyxZQUFZO0lBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG1EQUFVLENBQUMsQ0FBQztJQUN6QyxZQUFZO0lBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG1EQUFVLENBQUMsQ0FBQztJQUN6QyxZQUFZO0lBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGtEQUFTLENBQUMsQ0FBQztJQUN4QyxZQUFZO0lBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzVDLENBQUMsRUFBRSxHQUFHLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb2Rib3gvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL21vZGJveC8uL3NyYy9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vbW9kYm94Ly4vc3JjL2xvYWRlci1qcy50cyIsIndlYnBhY2s6Ly9tb2Rib3gvLi9zcmMvbWJsb2dnZXIudHMiLCJ3ZWJwYWNrOi8vbW9kYm94Ly4vc3JjL21vZGFwaS50cyIsIndlYnBhY2s6Ly9tb2Rib3gvLi9zcmMvbW9kc3RvcmFnZS50cyIsIndlYnBhY2s6Ly9tb2Rib3gvLi9zcmMvcm10cm9sbGJveC50cyIsIndlYnBhY2s6Ly9tb2Rib3gvLi9zcmMvdXRpbC50cyIsIndlYnBhY2s6Ly9tb2Rib3gvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbW9kYm94L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tb2Rib3gvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tb2Rib3gvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tb2Rib3gvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibW9kYm94XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm1vZGJveFwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCJpbnRlcmZhY2UgY2FsbGJhY2tkdWMge1xuICAgIFtrZXk6IHN0cmluZ106IEZ1bmN0aW9uW107XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEVtaXR0ZXIge1xuICAgIHB1YmxpYyBfY2FsbGJhY2tzOiBjYWxsYmFja2R1YztcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgfVxuICAgIG9uKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3NbZXZlbnROYW1lXSkgdGhpcy5fY2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICAgIG9mZihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzW2V2ZW50TmFtZV0uZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGNhbGxiYWNrKSB0aGlzLl9jYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBvbmNlKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5vbihldmVudE5hbWUsICguLi5kOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZCk7XG4gICAgICAgICAgICB0aGlzLm9mZihldmVudE5hbWUsIGFyZ3VtZW50cy5jYWxsZWUpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBlbWl0KGV2ZW50TmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrc1tldmVudE5hbWVdKSByZXR1cm47XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrc1tldmVudE5hbWVdLmZvckVhY2goeCA9PiB4KC4uLmFyZ3MpKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgRXZlbnQge1xuICAgIHB1YmxpYyBkZWZhdWx0UHJldmVudGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIGRhdGE6IGFueSwgcHVibGljIGRlZmF1bHRhY3Rpb246IEZ1bmN0aW9uKSB7fTtcbiAgICBwcmV2ZW50RGVmYXVsdCgpIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcnVuX2RlZmF1bHQoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKCF0aGlzLmRlZmF1bHRQcmV2ZW50ZWQpIHRoaXMuZGVmYXVsdGFjdGlvbiguLi5hcmdzKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTW9kIH0gZnJvbSBcIi4vbW9kYXBpXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkZXJNb2QgZXh0ZW5kcyBNb2Qge1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIkphdmFTY3JpcHQgTG9hZGVyXCI7XG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlRoZSBkZWZhdWx0IGxvYWRlciBmb3IgbW9kYm94LlwiO1xuICAgIHB1YmxpYyB2ZXJzaW9uOiBzdHJpbmcgPSBcIjAuMC4xXCI7XG4gICAgcHVibGljIG5hbWVzcGFjZTogc3RyaW5nID0gXCJsb2FkZXItanNcIjtcbiAgICBMb2FkKGRhdGE6IHN0cmluZyk6IE1vZCB7XG4gICAgICAgIHJldHVybiBldmFsKGAoZnVuY3Rpb24oKXtyZXR1cm4gJHtkYXRhfX0pKCk7YCkgYXMgTW9kO1xuICAgIH1cbiAgICBDYW5Mb2FkKGZpbGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmlsZS5lbmRzV2l0aChcIi5qc1wiKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTW9kIH0gZnJvbSBcIi4vbW9kYXBpXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNQkxvZ2dlciBleHRlbmRzIE1vZCB7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiTUJMb2dnZXJcIjtcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiVGhlIGRlZmF1bHQgbG9nZ2VyIGZvciBtb2Rib3guXCI7XG4gICAgcHVibGljIHZlcnNpb246IHN0cmluZyA9IFwiMC4wLjFcIjtcbiAgICBwdWJsaWMgbmFtZXNwYWNlOiBzdHJpbmcgPSBcIm1ibG9nZ2VyXCI7XG4gICAgcHVibGljIGluaXQoKSB7fVxuICAgIHB1YmxpYyBDcmVhdGVMb2dnZXIobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgTG9nZ2VyKG5hbWUpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHt9XG4gICAgcHJpdmF0ZSBnZXRUaW1lKCkge1xuICAgICAgICBsZXQgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBob3VyID0gZC5nZXRIb3VycygpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICAgICAgICBsZXQgbWludXRlID0gZC5nZXRNaW51dGVzKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gICAgICAgIGxldCBzZWNvbmQgPSBkLmdldFNlY29uZHMoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICAgICAgcmV0dXJuIGAke2hvdXJ9OiR7bWludXRlfToke3NlY29uZH1gO1xuICAgIH1cbiAgICBwdWJsaWMgbG9nKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBbJHt0aGlzLmdldFRpbWUoKX1dIFske3RoaXMubmFtZX1dYCwgLi4uYXJncyk7XG4gICAgfVxuICAgIHB1YmxpYyBpbmZvKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhgWyR7dGhpcy5nZXRUaW1lKCl9XSBbJHt0aGlzLm5hbWV9XSBbSU5GT11gLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgcHVibGljIHdhcm4oLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBbJHt0aGlzLmdldFRpbWUoKX1dIFske3RoaXMubmFtZX1dIFtXQVJOXWAsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBwdWJsaWMgZXJyb3IoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgWyR7dGhpcy5nZXRUaW1lKCl9XSBbJHt0aGlzLm5hbWV9XSBbRVJST1JdYCwgLi4uYXJncyk7XG4gICAgfVxufSIsImltcG9ydCBFdmVudEVtaXR0ZXIsIHsgRXZlbnQgfSBmcm9tIFwiLi9ldmVudHNcIjtcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi91dGlsJztcbmxldCB3aW5vID0gd2luZG93IGFzIGFueTtcblxuZXhwb3J0IGNsYXNzIE1vZCB7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwibm8gbmFtZVwiO1xuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJubyBkZXNjcmlwdGlvblwiO1xuICAgIHB1YmxpYyB2ZXJzaW9uOiBzdHJpbmcgPSBcIjAuMC4wXCI7XG4gICAgcHVibGljIG5hbWVzcGFjZTogc3RyaW5nID0gXCJtb2RcIjtcbiAgICBpbml0KCkge31cbn1cbmV4cG9ydCBjbGFzcyBNb2RBUElfQyBleHRlbmRzIE1vZCB7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiTW9kQVBJXCI7XG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIkEgQVBJIGZvciBybXRyb2xsYm94IG1vZHNcIjtcbiAgICBwdWJsaWMgdmVyc2lvbjogc3RyaW5nID0gXCIwLjAuMVwiO1xuICAgIHB1YmxpYyBuYW1lc3BhY2U6IHN0cmluZyA9IFwibW9kYXBpXCI7XG4gICAgcHJpdmF0ZSBsb2FkZWQ6IE1vZFtdID0gW107XG4gICAgcHJpdmF0ZSBob29rczoge1trZXk6IHN0cmluZ106IEV2ZW50RW1pdHRlcn0gPSB7fTtcbiAgICBwdWJsaWMgR2V0TW9kPFQ+KG5hbWVzcGFjZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBhID0gdGhpcy5sb2FkZWQuZmluZCh4ID0+IHgubmFtZXNwYWNlID09PSBuYW1lc3BhY2UpO1xuICAgICAgICBpZiAoIWEpIHRocm93IG5ldyBFcnJvcihgTW9kIHdpdGggbmFtZXNwYWNlICR7bmFtZXNwYWNlfSBub3QgZm91bmQuYCk7XG4gICAgICAgIHJldHVybiBhIGFzIHVua25vd24gYXMgVDtcbiAgICB9XG4gICAgcHVibGljIEdldE1vZEJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVkLmZpbmQoeCA9PiB4Lm5hbWUgPT09IG5hbWUpO1xuICAgIH1cbiAgICBwdWJsaWMgR2V0TW9kcygpOiBNb2RbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgICB9XG4gICAgcHVibGljIExvYWRNb2QobW9kOiBhbnkpIHtcbiAgICAgICAgbGV0IGxtb2Q6IE1vZCA9IG5ldyBtb2QoKTtcbiAgICAgICAgaWYgKHRoaXMubG9hZGVkLmZpbmQoeCA9PiB4Lm5hbWUgPT09IGxtb2QubmFtZSkpIHJldHVybjtcbiAgICAgICAgdGhpcy5sb2FkZWQucHVzaChsbW9kKTtcbiAgICAgICAgbG1vZC5pbml0KCk7XG4gICAgfVxuICAgIHB1YmxpYyBSZXBsYWNlTW9kKG1vZDogTW9kLCBuZXdtb2Q6IE1vZCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmxvYWRlZC5maW5kSW5kZXgoeCA9PiB4Lm5hbWUgPT09IG1vZC5uYW1lKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmxvYWRlZFtpbmRleF0gPSBuZXdtb2Q7XG4gICAgfVxuICAgIHB1YmxpYyBIb29rKGZ1bmN0aW9uX25hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5ob29rc1tmdW5jdGlvbl9uYW1lXSkgcmV0dXJuIHRoaXMuaG9va3NbZnVuY3Rpb25fbmFtZV07XG4gICAgICAgIGxldCBldmVtID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICBsZXQgb2dmdW5jID0gd2lub1tmdW5jdGlvbl9uYW1lXTtcbiAgICAgICAgd2lub1tmdW5jdGlvbl9uYW1lXSA9IChhc3luYyBmdW5jdGlvbiAob2dmdW5jOiBGdW5jdGlvbiwgLi4uZmFyZ3M6IGFueVtdKSB7XG4gICAgICAgICAgICBsZXQgbmFyZ3MgPSB1dGlsLmFycmF5LmRlZXBDbG9uZShmYXJncyk7XG4gICAgICAgICAgICBldmVtLmVtaXQoJ2JlZm9yZV9jYWxsJywgbmFyZ3MpOyAvLyB5b3UgY2FuIHVzZSBiZWZvcmUgY2FsbCB0byBxdWlja2x5IG1vZGlmeSB0aGUgYXJndW1lbnRzXG4gICAgICAgICAgICBsZXQgZmV2ZW50ID0gbmV3IEV2ZW50KCdob29rZWRfZnVuY3Rpb25fY2FsbCcsIHtmdW5jYXJnczogbmFyZ3N9LCBvZ2Z1bmMpO1xuICAgICAgICAgICAgZXZlbS5lbWl0KCdjYWxsJyxmZXZlbnQpO1xuICAgICAgICAgICAgYXdhaXQgdXRpbC5zbGVlcCg4MCk7XG4gICAgICAgICAgICBmZXZlbnQucnVuX2RlZmF1bHQoLi4ubmFyZ3MpO1xuICAgICAgICAgICAgZXZlbS5lbWl0KFwiYWZ0ZXJfY2FsbFwiKTtcbiAgICAgICAgfSkuYmluZCh0aGlzLCBvZ2Z1bmMpO1xuICAgICAgICB0aGlzLmhvb2tzW2Z1bmN0aW9uX25hbWVdID0gZXZlbTtcbiAgICAgICAgcmV0dXJuIGV2ZW07XG4gICAgfVxuICAgIHB1YmxpYyBGaWx0ZXJNb2RzPFQ+KHByZWZpeDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZC5maWx0ZXIoeCA9PiB4Lm5hbWVzcGFjZS5zdGFydHNXaXRoKHByZWZpeCkpIGFzIHVua25vd24gYXMgVFtdO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBNb2RBUEkgPSBuZXcgTW9kQVBJX0MoKTsiLCJpbXBvcnQgeyBNb2QgfSBmcm9tIFwiLi9tb2RhcGlcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZFN0b3JhZ2UgZXh0ZW5kcyBNb2Qge1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIk1vZFN0b3JhZ2VcIjtcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiQSBtb2QgdGhhdCBzdG9yZXMgbW9kIGRhdGFcIjtcbiAgICBwdWJsaWMgdmVyc2lvbjogc3RyaW5nID0gXCIwLjAuMVwiO1xuICAgIHB1YmxpYyBuYW1lc3BhY2U6IHN0cmluZyA9IFwic3RvcmFnZVwiO1xuICAgIHB1YmxpYyBpbml0KCkge31cbiAgICBwdWJsaWMgR2V0U3RvcmFnZShuYW1lOiBzdHJpbmcpOiBTdG9yYWdlRGF0YSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RvcmFnZURhdGEobmFtZSk7XG4gICAgfVxufVxuY2xhc3MgU3RvcmFnZURhdGEge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHt9XG4gICAgcHVibGljIEdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHt0aGlzLm5hbWV9LyR7a2V5fWApO1xuICAgIH1cbiAgICBwdWJsaWMgU2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke3RoaXMubmFtZX0vJHtrZXl9YCwgdmFsdWUpO1xuICAgIH1cbiAgICBwdWJsaWMgUmVtb3ZlKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke3RoaXMubmFtZX0vJHtrZXl9YCk7XG4gICAgfVxuICAgIHB1YmxpYyBMaXN0KCkge1xuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSk7XG4gICAgICAgIGxldCBtb2RzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGtleXNbaV0uc3RhcnRzV2l0aCh0aGlzLm5hbWUrXCIvXCIpKSB7XG4gICAgICAgICAgICAgICAgbW9kcy5wdXNoKGtleXNbaV0ucmVwbGFjZShgJHt0aGlzLm5hbWV9L2AsIFwiXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbW9kcztcbiAgICB9XG4gICAgcHVibGljIENsZWFyKCkge1xuICAgICAgICB0aGlzLkxpc3QoKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICB0aGlzLlJlbW92ZShrZXkpO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTW9kLCBNb2RBUEkgfSBmcm9tIFwiLi9tb2RhcGlcIjtcbmltcG9ydCBNQkxvZ2dlciBmcm9tIFwiLi9tYmxvZ2dlclwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciwge0V2ZW50fSBmcm9tIFwiLi9ldmVudHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBybU1lc3NhZ2Uge1xuICAgIG5pY2s6IHN0cmluZztcbiAgICBob21lOiBzdHJpbmc7XG4gICAgbXNnOiBzdHJpbmc7XG4gICAgZGF0ZTogbnVtYmVyO1xuICAgIGNvbG9yOiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIENvbW1hbmQge1xuICAgIG5hbWVzcGFjZTogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHVzYWdlOiBzdHJpbmc7XG4gICAgYWxpYXNlczogc3RyaW5nW107XG4gICAgZXhlY3V0ZTogKGFyZ3M6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBybXRyb2xsYm94IGV4dGVuZHMgTW9kIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJybXRyb2xsYm94XCI7XG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcInJtdHJvbGxib3ggQVBJXCI7XG4gICAgcHVibGljIHZlcnNpb246IHN0cmluZyA9IFwiMC4wLjFcIjtcbiAgICBwdWJsaWMgbmFtZXNwYWNlOiBzdHJpbmcgPSBcInJtdHJvbGxib3hcIjtcbiAgICBwdWJsaWMgbG9nZ2VyID0gTW9kQVBJLkdldE1vZDxNQkxvZ2dlcj4oXCJtYmxvZ2dlclwiKS5DcmVhdGVMb2dnZXIoXCJybXRyb2xsYm94XCIpO1xuICAgIHByaXZhdGUgcmVnaXN0ZXJlZENvbW1hbmRzOiBDb21tYW5kW10gPSBbXTtcbiAgICBwdWJsaWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKFwiSW5pdGlhbGl6aW5nIHJtdHJvbGxib3ggQVBJXCIpO1xuICAgICAgICBsZXQgc25kTXNnSG9vayA9IE1vZEFQSS5Ib29rKFwic2VuZE1zZ1wiKTtcbiAgICAgICAgc25kTXNnSG9vay5vbihcImNhbGxcIiwgKGV2OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IG1zZyA9IGV2LmRhdGEuZnVuY2FyZ3NbMF07XG4gICAgICAgICAgICBpZiAobXNnLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgICAgIGxldCBhcmdzID0gbXNnLnN1YnN0cigxKS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIGxldCBjbWQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVzcGFjZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKGNtZC5pbmNsdWRlcygnOicpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZSA9IGNtZC5zcGxpdCgnOicpWzBdO1xuICAgICAgICAgICAgICAgICAgICBjbWQgPSBjbWQuc3BsaXQoJzonKVsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGNtZHMgPSB0aGlzLnJlZ2lzdGVyZWRDb21tYW5kcy5maWx0ZXIoYyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjLm5hbWVzcGFjZSA9PT0gbmFtZXNwYWNlICYmIChjLm5hbWUgPT09IGNtZCB8fCBjLmFsaWFzZXMuaW5jbHVkZXMoY21kKSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjLm5hbWUgPT0gY21kIHx8IGMuYWxpYXNlcy5pbmNsdWRlcyhjbWQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoY21kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGNtZHNbMF0uZXhlY3V0ZShhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXCJybXRyb2xsYm94IGFwaSBpbml0aWFsaXplZFwiKTtcbiAgICB9XG4gICAgcHVibGljIFByaW50TWVzc2FnZShtc2c6IHJtTWVzc2FnZSkge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgd2luZG93LnByaW50TXNnKG1zZyk7XG4gICAgfVxuICAgIHB1YmxpYyBSZWdpc3RlckNvbW1hbmQoY21kOiBDb21tYW5kKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJlZENvbW1hbmRzLnB1c2goY21kKTtcbiAgICB9XG4gICAgcHVibGljIEdldEVsZW1lbnQodWllbGVtZW50OiBVSUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCN0cm9sbGJveCA+ICR7dWllbGVtZW50LkdldFNlbGVjdG9yKCl9YCk7XG4gICAgfVxuICAgIHB1YmxpYyBPcGVuUG9wdXAoaHRtbDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgd2luZG93LnBvcHVwKGh0bWwscmVzb2x2ZSk7IC8vIHJlc29sdmUgZ2V0cyBjYWxsZWQgd2hlbiB0aGUgcG9wdXAgaXMgb3BlblxuICAgICAgICB9KVxuICAgIH1cbn1cbmNsYXNzIFVJRWxlbWVudCB7XG4gICAgcHJpdmF0ZSBfY2hpbGRyZW46IFVJRWxlbWVudFtdID0gW107XG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIGVsZW1lbnQ6IHN0cmluZykge31cbiAgICBwdWJsaWMgR2V0U2VsZWN0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gICAgfVxuICAgIHB1YmxpYyBTZXRDaGlsZHJlbihjaGlsZHM6IFVJRWxlbWVudFtdKSB7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gY2hpbGRzLm1hcCh4ID0+IHtcbiAgICAgICAgICAgIHguZWxlbWVudCA9IGAke3RoaXMuZWxlbWVudH0gPiAke3guZWxlbWVudH1gO1xuICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcHVibGljIEdldChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGEgPSB0aGlzLl9jaGlsZHJlbi5maW5kKHggPT4geC5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgaWYgKCFhKSB0aHJvdyBuZXcgRXJyb3IoYE5vIGNoaWxkIG5hbWVkICR7bmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGdldCBjaGlsZHJlbigpOiB7W2tleTogc3RyaW5nXTogVUlFbGVtZW50fSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXModGhpcy5fY2hpbGRyZW4ubWFwKHggPT4gW3gubmFtZSwgeF0pKVxuICAgIH1cbn1cbi8qZXhwb3J0IGNvbnN0IFVJID0ge1xuICAgIEZvcm06IHtcbiAgICAgICAgX19jb21iaW5lOiBcIiN0cm9sbGJveF9mb3JtXCIsXG4gICAgICAgIGdldCBJbnB1dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLl9fY29tYmluZX0gPiB0ZXh0YXJlYSN0cm9sbGJveF9pbnB1dGA7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBTZW5kQnV0dG9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuX19jb21iaW5lfSA+IGJ1dHRvbmA7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBOaWNrQnV0dG9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuX19jb21iaW5lfSA+IGJ1dHRvbiN0cm9sbGJveF9uaWNrX2J0bmA7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBVcGxvYWRCdXR0b24oKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5fX2NvbWJpbmV9ID4gYnV0dG9uI3Ryb2xsYm94X3VwbG9hZF9idG5gO1xuICAgICAgICB9XG4gICAgfVxufSovXG5leHBvcnQgY29uc3QgVUkgPSB7XG4gICAgRm9ybTogbmV3IFVJRWxlbWVudChcIkZvcm1cIiwgXCIjdHJvbGxib3hfZm9ybVwiKS5TZXRDaGlsZHJlbihbXG4gICAgICAgIG5ldyBVSUVsZW1lbnQoXCJJbnB1dFwiLCBcInRleHRhcmVhI3Ryb2xsYm94X2lucHV0XCIpLFxuICAgICAgICBuZXcgVUlFbGVtZW50KFwiU2VuZEJ1dHRvblwiLCBcImJ1dHRvblwiKSxcbiAgICAgICAgbmV3IFVJRWxlbWVudChcIk5pY2tCdXR0b25cIiwgXCJidXR0b24jdHJvbGxib3hfbmlja19idG5cIiksXG4gICAgICAgIG5ldyBVSUVsZW1lbnQoXCJVcGxvYWRCdXR0b25cIiwgXCJidXR0b24jdHJvbGxib3hfdXBsb2FkX2J0blwiKVxuXG4gICAgXSlcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBzbGVlcChtczogbnVtYmVyKSB7cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpfTtcbmV4cG9ydCBuYW1lc3BhY2UgYXJyYXkge1xuICAgIGV4cG9ydCBmdW5jdGlvbiBkZWVwQ2xvbmUoYXJyOiBhbnlbXSk6IGFueVtdIHtcbiAgICAgICAgbGV0IG5ld2FycjogYW55W10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gYXJyW2ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiKSBkYXRhID0gb2JqZWN0LmRlZXBDbG9uZShkYXRhKTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSBkYXRhID0gZGVlcENsb25lKGRhdGEpO1xuICAgICAgICAgICAgbmV3YXJyLnB1c2goZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld2FycjtcbiAgICB9O1xuICAgIGV4cG9ydCBmdW5jdGlvbiByZW1vdmUoaW5kZXg6IG51bWJlciwgYXJyOiBhbnlbXSl7XG4gICAgICAgIHJldHVybiBhcnIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59XG5leHBvcnQgbmFtZXNwYWNlIG9iamVjdCB7XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGhhc0Z1bmN0aW9ucyhvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGxldCBpdGVtIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbaXRlbV0gPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9ialtpdGVtXSA9PT0gXCJvYmplY3RcIikgcmV0dXJuIGhhc0Z1bmN0aW9ucyhvYmpbaXRlbV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGRlZXBDbG9uZShvYmo6IGFueSk6IGFueSB7XG4gICAgICAgIGlmICgod2luZG93IGFzIGFueSkuc3RydWN0dXJlZENsb25lKSByZXR1cm4gKHdpbmRvdyBhcyBhbnkpLnN0cnVjdHVyZWRDbG9uZShvYmopXG4gICAgICAgIGlmICghaGFzRnVuY3Rpb25zKG9iaikpIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgICAgICBsZXQgbmV3b2JqOiBhbnkgPSB7fTtcbiAgICAgICAgZm9yIChsZXQgaXRlbSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2l0ZW1dID09PSBcIm9iamVjdFwiKSB7bmV3b2JqW2l0ZW1dID0gZGVlcENsb25lKG9ialtpdGVtXSk7IGNvbnRpbnVlfVxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqW2l0ZW1dKSkge25ld29ialtpdGVtXSA9IGFycmF5LmRlZXBDbG9uZShvYmpbaXRlbV0pOyBjb250aW51ZX1cbiAgICAgICAgICAgIG5ld29ialtpdGVtXSA9IG9ialtpdGVtXTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IE1vZEFQSSwgTW9kLCBNb2RBUElfQyB9IGZyb20gXCIuL21vZGFwaVwiO1xuaW1wb3J0IE1CTG9nZ2VyIGZyb20gXCIuL21ibG9nZ2VyXCI7XG5pbXBvcnQgcm10cm9sbGJveCBmcm9tIFwiLi9ybXRyb2xsYm94XCI7XG5pbXBvcnQgTW9kU3RvcmFnZSBmcm9tIFwiLi9tb2RzdG9yYWdlXCI7XG5pbXBvcnQgTG9hZGVyTW9kIGZyb20gXCIuL2xvYWRlci1qc1wiO1xuXG5jbGFzcyBNb2RMb2FkZXIgZXh0ZW5kcyBNb2Qge1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIk1vZCBMb2FkZXJcIjtcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiQSBtb2QgdGhhdCBsb2FkcyBtb2RzXCI7XG4gICAgcHVibGljIHZlcnNpb246IHN0cmluZyA9IFwiMC4wLjFcIjtcbiAgICBwdWJsaWMgbmFtZXNwYWNlOiBzdHJpbmcgPSBcIm1vZGxvYWRlclwiO1xuICAgIHByaXZhdGUgbG9nZ2VyID0gTW9kQVBJLkdldE1vZDxNQkxvZ2dlcj4oXCJtYmxvZ2dlclwiKS5DcmVhdGVMb2dnZXIoXCJtb2Rsb2FkZXJcIik7XG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIC8qLy9AdHMtaWdub3JlXG4gICAgICAgIHdpbmRvdy5Nb2RBUEkgPSBNb2RBUEk7IC8vIGV4cG9zZSB0aGUgTW9kQVBJIHRvIHRoZSB3aW5kb3dcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnTW9kQVBJIGV4cG9zZWQgdG8gd2luZG93Jyk7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB3aW5kb3cuTW9kID0gTW9kO1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdNb2QgY2xhc3MgZXhwb3NlZCB0byB3aW5kb3cnKTsqL1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdMb2FkaW5nIG1vZHMuLi4nKTtcbiAgICAgICAgbGV0IG1vZHMgPSBNb2RBUEkuR2V0TW9kPE1vZFN0b3JhZ2U+KFwic3RvcmFnZVwiKS5HZXRTdG9yYWdlKFwibW9kc1wiKVxuICAgICAgICBsZXQgbW9kTGlzdCA9IG1vZHMuTGlzdCgpO1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBGb3VuZCAke21vZHMuTGlzdCgpLmxlbmd0aH0gbW9kc2ApO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZHMuTGlzdCgpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbW9kTmFtZSA9IG1vZHMuTGlzdCgpW2ldXG4gICAgICAgICAgICBsZXQgbW9kID0gbW9kcy5HZXQobW9kTmFtZSlcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYExvYWRpbmcgJHttb2ROYW1lfWApO1xuICAgICAgICAgICAgbGV0IGxvYWRlcnMgPSBNb2RBUEkuRmlsdGVyTW9kczxMb2FkZXJNb2Q+KFwibG9hZGVyLVwiKTtcbiAgICAgICAgICAgIGxldCBsb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGxvYWRlciBvZiBsb2FkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvYWRlci5DYW5Mb2FkKG1vZE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYExvYWRpbmcgbW9kICR7bW9kTmFtZX0gd2l0aCBsb2FkZXIgJHtsb2FkZXIubmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgTW9kQVBJLkxvYWRNb2QobG9hZGVyLkxvYWQobW9kKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYExvYWRlZCAke21vZE5hbWV9YCk7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYENvdWxkIG5vdCBsb2FkIG1vZCAke21vZE5hbWV9OiBubyBsb2FkZXIgZm91bmQgZm9yIGl0YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgJHtNb2RBUEkuR2V0TW9kcygpLmxlbmd0aH0gTW9kcyBsb2FkZWRgKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IE1vZCwgTW9kQVBJLCBNb2RBUElfQyB9O1xuXG5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICB3aW5kb3cubW9kYm94Lk1vZEFQSS5Mb2FkTW9kKE1CTG9nZ2VyKTtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICB3aW5kb3cubW9kYm94Lk1vZEFQSS5Mb2FkTW9kKHJtdHJvbGxib3gpO1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIHdpbmRvdy5tb2Rib3guTW9kQVBJLkxvYWRNb2QoTW9kU3RvcmFnZSk7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgd2luZG93Lm1vZGJveC5Nb2RBUEkuTG9hZE1vZChMb2FkZXJNb2QpO1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIHdpbmRvdy5tb2Rib3guTW9kQVBJLkxvYWRNb2QoTW9kTG9hZGVyKTtcbn0sIDUwMClcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==