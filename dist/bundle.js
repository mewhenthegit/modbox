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
        try {
            let result = eval(`(function(){return ${data}})();`);
            console.log(`(function(){return ${data}})();`);
            console.log(result);
            return result;
        }
        catch (e) {
            console.error(e);
            return new _modapi__WEBPACK_IMPORTED_MODULE_0__.Mod;
        }
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
    init() { }
    constructor() {
        this.name = "no name";
        this.description = "no description";
        this.version = "0.0.0";
        this.namespace = "mod";
    }
    ;
}
class ModAPI_C extends Mod {
    constructor() {
        super(...arguments);
        this.name = "ModAPI";
        this.description = "An API for rmtrollbox mods";
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
        if (mod == null) {
            //@ts-ignore
            $alert("Uh oh! Something went horribly wrong loading a mod!");
            // return false;
        }
        let lmod = new mod();
        if (this.loaded.find(x => x.name === lmod.name))
            return;
        this.loaded.push(lmod);
        lmod.init();
        // return true;
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
    Get(key, c) {
        //@ts-ignore
        $db.get(`modbox/${this.name}/${key}`, (_, content) => {
            console.log(_, content);
            c(content);
        });
        // return localStorage.getItem(`modbox/${this.name}/${key}`);
    }
    Set(key, value) {
        //@ts-ignore
        $db.set(`modbox/${this.name}/${key}`, value);
        // localStorage.setItem(`modbox/${this.name}/${key}`, value);
    }
    Remove(key) {
        //@ts-ignore
        $db.del(`modbox/${this.name}/${key}`);
        // localStorage.removeItem(`modbox/${this.name}/${key}`);
    }
    List(c) {
        //@ts-ignore
        return $db.keys((_, keys) => {
            let mods = [];
            for (let i = 0; i < keys.length; i++) {
                if (keys[i].startsWith("modbox/" + this.name + "/")) {
                    mods.push(keys[i].replace(`modbox/${this.name}/`, ""));
                }
            }
            c(mods);
        });
        // let keys = Object.keys(localStorage);
    }
    Clear() {
        //@ts-ignore
        this.List((keys) => {
            //@ts-ignore
            keys.forEach(key => {
                this.Remove(key);
            });
        });
    }
}


/***/ }),

/***/ "./src/trollbox.ts":
/*!*************************!*\
  !*** ./src/trollbox.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UI: () => (/* binding */ UI),
/* harmony export */   "default": () => (/* binding */ trollbox)
/* harmony export */ });
/* harmony import */ var _modapi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modapi */ "./src/modapi.ts");

class trollbox extends _modapi__WEBPACK_IMPORTED_MODULE_0__.Mod {
    constructor() {
        super(...arguments);
        this.name = "trollbox";
        this.description = "trollbox API";
        this.version = "0.0.1";
        this.namespace = "trollbox";
        this.logger = _modapi__WEBPACK_IMPORTED_MODULE_0__.ModAPI.GetMod("mblogger").CreateLogger("trollbox");
        this.registeredCommands = [];
        this.frame = document.createElement("iframe");
        // public OpenPopup(html: string) { // prob doesnt exist in trollbox anymore
        //     return new Promise(resolve => {
        //         //@ts-ignore
        //         frame.contentWindow.popup(html,resolve); // resolve gets called when the popup is open
        //     })
        // }
    }
    init() {
        this.logger.log("Initializing trollbox API");
        for (let iframe of document.getElementsByTagName("iframe")) {
            if (iframe.src == "https://www.windows93.net/trollbox/index.php") {
                this.frame = iframe;
                break;
            }
        }
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
        this.logger.info("trollbox api initialized");
        this.PrintMessage({
            nick: "modbox",
            color: "green",
            home: "balls",
            date: Date.now(),
            msg: "Modbox active!"
        });
    }
    PrintMessage(msg) {
        //@ts-ignore
        this.frame.contentWindow.printMsg(msg);
    }
    RegisterCommand(cmd) {
        this.registeredCommands.push(cmd);
    }
    GetElement(uielement) {
        return document.querySelector(`#trollbox > ${uielement.GetSelector()}`);
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
/* harmony import */ var _trollbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./trollbox */ "./src/trollbox.ts");
/* harmony import */ var _modstorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modstorage */ "./src/modstorage.ts");
/* harmony import */ var _loader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loader-js */ "./src/loader-js.ts");





const ModBox = {
    ModAPI: _modapi__WEBPACK_IMPORTED_MODULE_0__.ModAPI,
    Mod: _modapi__WEBPACK_IMPORTED_MODULE_0__.Mod
};
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
        // let modList = mods.List();
        mods.List((modList) => {
            this.logger.info(`Found ${modList.length} mods`);
            for (let i = 0; i < modList.length; i++) {
                let modName = modList[i];
                mods.Get(modName, (mod) => {
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
                });
            }
        });
        this.logger.info(`${_modapi__WEBPACK_IMPORTED_MODULE_0__.ModAPI.GetMods().length} Mods loaded`);
    }
}

// setTimeout(() => {
//     alert("balls")
//     // //@ts-ignore
//     // window.modbox.ModAPI.LoadMod(MBLogger);
//     // //@ts-ignore
//     // window.modbox.ModAPI.LoadMod(rmtrollbox);
//     // //@ts-ignore
//     // window.modbox.ModAPI.LoadMod(ModStorage);
//     // //@ts-ignore
//     // window.modbox.ModAPI.LoadMod(LoaderMod);
//     // //@ts-ignore
//     // window.modbox.ModAPI.LoadMod(ModLoader);
// }, 500)
//@ts-ignore
$kernel.on("splash:ready", () => {
    // TODO: make this less shitty
    // alert("launched!")
    //@ts-ignore
    window.modbox = ModBox;
    setInterval(() => {
        for (let frame of document.getElementsByTagName("iframe")) {
            console.log(frame.src);
            if (frame.src == "https://www.windows93.net/trollbox/index.php") {
                //@ts-ignore
                if (frame.contentWindow.modbox != null) {
                    continue;
                }
                //@ts-ignore
                frame.contentWindow.modbox = ModBox;
                setTimeout(() => {
                    //@ts-ignore
                    frame.contentWindow.modbox.ModAPI.LoadMod(_mblogger__WEBPACK_IMPORTED_MODULE_1__["default"]);
                    //@ts-ignore
                    frame.contentWindow.modbox.ModAPI.LoadMod(_trollbox__WEBPACK_IMPORTED_MODULE_2__["default"]);
                    //@ts-ignore
                    frame.contentWindow.modbox.ModAPI.LoadMod(_modstorage__WEBPACK_IMPORTED_MODULE_3__["default"]);
                    //@ts-ignore
                    frame.contentWindow.modbox.ModAPI.LoadMod(_loader_js__WEBPACK_IMPORTED_MODULE_4__["default"]);
                    //@ts-ignore
                    frame.contentWindow.modbox.ModAPI.LoadMod(ModLoader);
                }, 500);
            }
        }
    });
});

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO2FBQ1Q7U0FDSjtJQUNMLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21vZGJveC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vbW9kYm94Ly4vc3JjL2V2ZW50cy50cyIsIndlYnBhY2s6Ly9tb2Rib3gvLi9zcmMvbG9hZGVyLWpzLnRzIiwid2VicGFjazovL21vZGJveC8uL3NyYy9tYmxvZ2dlci50cyIsIndlYnBhY2s6Ly9tb2Rib3gvLi9zcmMvbW9kYXBpLnRzIiwid2VicGFjazovL21vZGJveC8uL3NyYy9tb2RzdG9yYWdlLnRzIiwid2VicGFjazovL21vZGJveC8uL3NyYy90cm9sbGJveC50cyIsIndlYnBhY2s6Ly9tb2Rib3gvLi9zcmMvdXRpbC50cyIsIndlYnBhY2s6Ly9tb2Rib3gvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbW9kYm94L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tb2Rib3gvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tb2Rib3gvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tb2Rib3gvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibW9kYm94XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm1vZGJveFwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCJpbnRlcmZhY2UgY2FsbGJhY2tkdWMge1xuICAgIFtrZXk6IHN0cmluZ106IEZ1bmN0aW9uW107XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEVtaXR0ZXIge1xuICAgIHB1YmxpYyBfY2FsbGJhY2tzOiBjYWxsYmFja2R1YztcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgfVxuICAgIG9uKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3NbZXZlbnROYW1lXSkgdGhpcy5fY2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICAgIG9mZihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzW2V2ZW50TmFtZV0pIHJldHVybjtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzW2V2ZW50TmFtZV0uZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGNhbGxiYWNrKSB0aGlzLl9jYWxsYmFja3NbZXZlbnROYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBvbmNlKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5vbihldmVudE5hbWUsICguLi5kOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZCk7XG4gICAgICAgICAgICB0aGlzLm9mZihldmVudE5hbWUsIGFyZ3VtZW50cy5jYWxsZWUpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBlbWl0KGV2ZW50TmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrc1tldmVudE5hbWVdKSByZXR1cm47XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrc1tldmVudE5hbWVdLmZvckVhY2goeCA9PiB4KC4uLmFyZ3MpKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgRXZlbnQge1xuICAgIHB1YmxpYyBkZWZhdWx0UHJldmVudGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIGRhdGE6IGFueSwgcHVibGljIGRlZmF1bHRhY3Rpb246IEZ1bmN0aW9uKSB7fTtcbiAgICBwcmV2ZW50RGVmYXVsdCgpIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcnVuX2RlZmF1bHQoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKCF0aGlzLmRlZmF1bHRQcmV2ZW50ZWQpIHRoaXMuZGVmYXVsdGFjdGlvbiguLi5hcmdzKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTW9kIH0gZnJvbSBcIi4vbW9kYXBpXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkZXJNb2QgZXh0ZW5kcyBNb2Qge1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIkphdmFTY3JpcHQgTG9hZGVyXCI7XG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlRoZSBkZWZhdWx0IGxvYWRlciBmb3IgbW9kYm94LlwiO1xuICAgIHB1YmxpYyB2ZXJzaW9uOiBzdHJpbmcgPSBcIjAuMC4xXCI7XG4gICAgcHVibGljIG5hbWVzcGFjZTogc3RyaW5nID0gXCJsb2FkZXItanNcIjtcbiAgICBMb2FkKGRhdGE6IHN0cmluZyk6IE1vZCB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZXZhbChgKGZ1bmN0aW9uKCl7cmV0dXJuICR7ZGF0YX19KSgpO2ApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYChmdW5jdGlvbigpe3JldHVybiAke2RhdGF9fSkoKTtgKVxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNb2Q7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ2FuTG9hZChmaWxlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZpbGUuZW5kc1dpdGgoXCIuanNcIik7XG4gICAgfVxufSIsImltcG9ydCB7IE1vZCB9IGZyb20gXCIuL21vZGFwaVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTUJMb2dnZXIgZXh0ZW5kcyBNb2Qge1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIk1CTG9nZ2VyXCI7XG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlRoZSBkZWZhdWx0IGxvZ2dlciBmb3IgbW9kYm94LlwiO1xuICAgIHB1YmxpYyB2ZXJzaW9uOiBzdHJpbmcgPSBcIjAuMC4xXCI7XG4gICAgcHVibGljIG5hbWVzcGFjZTogc3RyaW5nID0gXCJtYmxvZ2dlclwiO1xuICAgIHB1YmxpYyBpbml0KCkge31cbiAgICBwdWJsaWMgQ3JlYXRlTG9nZ2VyKG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IExvZ2dlcihuYW1lKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgTG9nZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7fVxuICAgIHByaXZhdGUgZ2V0VGltZSgpIHtcbiAgICAgICAgbGV0IGQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgaG91ciA9IGQuZ2V0SG91cnMoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICAgICAgbGV0IG1pbnV0ZSA9IGQuZ2V0TWludXRlcygpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICAgICAgICBsZXQgc2Vjb25kID0gZC5nZXRTZWNvbmRzKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gICAgICAgIHJldHVybiBgJHtob3VyfToke21pbnV0ZX06JHtzZWNvbmR9YDtcbiAgICB9XG4gICAgcHVibGljIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgWyR7dGhpcy5nZXRUaW1lKCl9XSBbJHt0aGlzLm5hbWV9XWAsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBwdWJsaWMgaW5mbyguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zb2xlLmluZm8oYFske3RoaXMuZ2V0VGltZSgpfV0gWyR7dGhpcy5uYW1lfV0gW0lORk9dYCwgLi4uYXJncyk7XG4gICAgfVxuICAgIHB1YmxpYyB3YXJuKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgWyR7dGhpcy5nZXRUaW1lKCl9XSBbJHt0aGlzLm5hbWV9XSBbV0FSTl1gLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgcHVibGljIGVycm9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFske3RoaXMuZ2V0VGltZSgpfV0gWyR7dGhpcy5uYW1lfV0gW0VSUk9SXWAsIC4uLmFyZ3MpO1xuICAgIH1cbn0iLCJpbXBvcnQgRXZlbnRFbWl0dGVyLCB7IEV2ZW50IH0gZnJvbSBcIi4vZXZlbnRzXCI7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4vdXRpbCc7XG5sZXQgd2lubyA9IHdpbmRvdyBhcyBhbnk7XG5cbmV4cG9ydCBjbGFzcyBNb2Qge1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIm5vIG5hbWVcIjtcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IFwibm8gZGVzY3JpcHRpb25cIjtcbiAgICBwdWJsaWMgdmVyc2lvbjogc3RyaW5nID0gXCIwLjAuMFwiO1xuICAgIHB1YmxpYyBuYW1lc3BhY2U6IHN0cmluZyA9IFwibW9kXCI7XG4gICAgaW5pdCgpIHt9XG4gICAgY29uc3RydWN0b3IoKXt9O1xufVxuZXhwb3J0IGNsYXNzIE1vZEFQSV9DIGV4dGVuZHMgTW9kIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJNb2RBUElcIjtcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiQW4gQVBJIGZvciBybXRyb2xsYm94IG1vZHNcIjtcbiAgICBwdWJsaWMgdmVyc2lvbjogc3RyaW5nID0gXCIwLjAuMVwiO1xuICAgIHB1YmxpYyBuYW1lc3BhY2U6IHN0cmluZyA9IFwibW9kYXBpXCI7XG4gICAgcHJpdmF0ZSBsb2FkZWQ6IE1vZFtdID0gW107XG4gICAgcHJpdmF0ZSBob29rczoge1trZXk6IHN0cmluZ106IEV2ZW50RW1pdHRlcn0gPSB7fTtcbiAgICBwdWJsaWMgR2V0TW9kPFQ+KG5hbWVzcGFjZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBhID0gdGhpcy5sb2FkZWQuZmluZCh4ID0+IHgubmFtZXNwYWNlID09PSBuYW1lc3BhY2UpO1xuICAgICAgICBpZiAoIWEpIHRocm93IG5ldyBFcnJvcihgTW9kIHdpdGggbmFtZXNwYWNlICR7bmFtZXNwYWNlfSBub3QgZm91bmQuYCk7XG4gICAgICAgIHJldHVybiBhIGFzIHVua25vd24gYXMgVDtcbiAgICB9XG4gICAgcHVibGljIEdldE1vZEJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVkLmZpbmQoeCA9PiB4Lm5hbWUgPT09IG5hbWUpO1xuICAgIH1cbiAgICBwdWJsaWMgR2V0TW9kcygpOiBNb2RbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgICB9XG4gICAgcHVibGljIExvYWRNb2QobW9kOiBhbnkpIHtcbiAgICAgICAgaWYgKG1vZCA9PSBudWxsKSB7XG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICRhbGVydChcIlVoIG9oISBTb21ldGhpbmcgd2VudCBob3JyaWJseSB3cm9uZyBsb2FkaW5nIGEgbW9kIVwiKTtcbiAgICAgICAgICAgIC8vIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbG1vZDogTW9kID0gbmV3IG1vZCgpO1xuICAgICAgICBpZiAodGhpcy5sb2FkZWQuZmluZCh4ID0+IHgubmFtZSA9PT0gbG1vZC5uYW1lKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmxvYWRlZC5wdXNoKGxtb2QpO1xuICAgICAgICBsbW9kLmluaXQoKTtcbiAgICAgICAgLy8gcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHB1YmxpYyBSZXBsYWNlTW9kKG1vZDogTW9kLCBuZXdtb2Q6IE1vZCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmxvYWRlZC5maW5kSW5kZXgoeCA9PiB4Lm5hbWUgPT09IG1vZC5uYW1lKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmxvYWRlZFtpbmRleF0gPSBuZXdtb2Q7XG4gICAgfVxuICAgIHB1YmxpYyBIb29rKGZ1bmN0aW9uX25hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5ob29rc1tmdW5jdGlvbl9uYW1lXSkgcmV0dXJuIHRoaXMuaG9va3NbZnVuY3Rpb25fbmFtZV07XG4gICAgICAgIGxldCBldmVtID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICBsZXQgb2dmdW5jID0gd2lub1tmdW5jdGlvbl9uYW1lXTtcbiAgICAgICAgd2lub1tmdW5jdGlvbl9uYW1lXSA9IChhc3luYyBmdW5jdGlvbiAob2dmdW5jOiBGdW5jdGlvbiwgLi4uZmFyZ3M6IGFueVtdKSB7XG4gICAgICAgICAgICBsZXQgbmFyZ3MgPSB1dGlsLmFycmF5LmRlZXBDbG9uZShmYXJncyk7XG4gICAgICAgICAgICBldmVtLmVtaXQoJ2JlZm9yZV9jYWxsJywgbmFyZ3MpOyAvLyB5b3UgY2FuIHVzZSBiZWZvcmUgY2FsbCB0byBxdWlja2x5IG1vZGlmeSB0aGUgYXJndW1lbnRzXG4gICAgICAgICAgICBsZXQgZmV2ZW50ID0gbmV3IEV2ZW50KCdob29rZWRfZnVuY3Rpb25fY2FsbCcsIHtmdW5jYXJnczogbmFyZ3N9LCBvZ2Z1bmMpO1xuICAgICAgICAgICAgZXZlbS5lbWl0KCdjYWxsJyxmZXZlbnQpO1xuICAgICAgICAgICAgYXdhaXQgdXRpbC5zbGVlcCg4MCk7XG4gICAgICAgICAgICBmZXZlbnQucnVuX2RlZmF1bHQoLi4ubmFyZ3MpO1xuICAgICAgICAgICAgZXZlbS5lbWl0KFwiYWZ0ZXJfY2FsbFwiKTtcbiAgICAgICAgfSkuYmluZCh0aGlzLCBvZ2Z1bmMpO1xuICAgICAgICB0aGlzLmhvb2tzW2Z1bmN0aW9uX25hbWVdID0gZXZlbTtcbiAgICAgICAgcmV0dXJuIGV2ZW07XG4gICAgfVxuICAgIHB1YmxpYyBGaWx0ZXJNb2RzPFQ+KHByZWZpeDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZC5maWx0ZXIoeCA9PiB4Lm5hbWVzcGFjZS5zdGFydHNXaXRoKHByZWZpeCkpIGFzIHVua25vd24gYXMgVFtdO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBNb2RBUEkgPSBuZXcgTW9kQVBJX0MoKTsiLCJpbXBvcnQgeyBNb2QgfSBmcm9tIFwiLi9tb2RhcGlcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZFN0b3JhZ2UgZXh0ZW5kcyBNb2Qge1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIk1vZFN0b3JhZ2VcIjtcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiQSBtb2QgdGhhdCBzdG9yZXMgbW9kIGRhdGFcIjtcbiAgICBwdWJsaWMgdmVyc2lvbjogc3RyaW5nID0gXCIwLjAuMVwiO1xuICAgIHB1YmxpYyBuYW1lc3BhY2U6IHN0cmluZyA9IFwic3RvcmFnZVwiO1xuICAgIHB1YmxpYyBpbml0KCkge31cbiAgICBwdWJsaWMgR2V0U3RvcmFnZShuYW1lOiBzdHJpbmcpOiBTdG9yYWdlRGF0YSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RvcmFnZURhdGEobmFtZSk7XG4gICAgfVxufVxuY2xhc3MgU3RvcmFnZURhdGEge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHt9XG4gICAgcHVibGljIEdldChrZXk6IHN0cmluZywgYzogRnVuY3Rpb24pOiBhbnkge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgJGRiLmdldChgbW9kYm94LyR7dGhpcy5uYW1lfS8ke2tleX1gLCAoXywgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXywgY29udGVudClcbiAgICAgICAgICAgIGMoY29udGVudCk7XG4gICAgICAgIH0pXG4gICAgICAgIC8vIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgbW9kYm94LyR7dGhpcy5uYW1lfS8ke2tleX1gKTtcbiAgICB9XG4gICAgcHVibGljIFNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgJGRiLnNldChgbW9kYm94LyR7dGhpcy5uYW1lfS8ke2tleX1gLHZhbHVlKTtcbiAgICAgICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG1vZGJveC8ke3RoaXMubmFtZX0vJHtrZXl9YCwgdmFsdWUpO1xuICAgIH1cbiAgICBwdWJsaWMgUmVtb3ZlKGtleTogc3RyaW5nKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAkZGIuZGVsKGBtb2Rib3gvJHt0aGlzLm5hbWV9LyR7a2V5fWApO1xuICAgICAgICAvLyBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgbW9kYm94LyR7dGhpcy5uYW1lfS8ke2tleX1gKTtcbiAgICB9XG4gICAgcHVibGljIExpc3QoYzogRnVuY3Rpb24pIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHJldHVybiAkZGIua2V5cygoXywga2V5czogQXJyYXk8U3RyaW5nPikgPT4ge1xuICAgICAgICAgICAgbGV0IG1vZHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChrZXlzW2ldLnN0YXJ0c1dpdGgoXCJtb2Rib3gvXCIrdGhpcy5uYW1lK1wiL1wiKSkge1xuICAgICAgICAgICAgICAgICAgICBtb2RzLnB1c2goa2V5c1tpXS5yZXBsYWNlKGBtb2Rib3gvJHt0aGlzLm5hbWV9L2AsIFwiXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjKG1vZHMpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gbGV0IGtleXMgPSBPYmplY3Qua2V5cyhsb2NhbFN0b3JhZ2UpO1xuICAgIH1cbiAgICBwdWJsaWMgQ2xlYXIoKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLkxpc3QoKGtleXMpPT4ge1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBrZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLlJlbW92ZShrZXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxufSIsImltcG9ydCB7IE1vZCwgTW9kQVBJIH0gZnJvbSBcIi4vbW9kYXBpXCI7XG5pbXBvcnQgTUJMb2dnZXIgZnJvbSBcIi4vbWJsb2dnZXJcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIsIHtFdmVudH0gZnJvbSBcIi4vZXZlbnRzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZSB7XG4gICAgbmljazogc3RyaW5nO1xuICAgIGhvbWU6IHN0cmluZztcbiAgICBtc2c6IHN0cmluZztcbiAgICBkYXRlOiBudW1iZXI7XG4gICAgY29sb3I6IHN0cmluZztcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZCB7XG4gICAgbmFtZXNwYWNlOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgdXNhZ2U6IHN0cmluZztcbiAgICBhbGlhc2VzOiBzdHJpbmdbXTtcbiAgICBleGVjdXRlOiAoYXJnczogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRyb2xsYm94IGV4dGVuZHMgTW9kIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJ0cm9sbGJveFwiO1xuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJ0cm9sbGJveCBBUElcIjtcbiAgICBwdWJsaWMgdmVyc2lvbjogc3RyaW5nID0gXCIwLjAuMVwiO1xuICAgIHB1YmxpYyBuYW1lc3BhY2U6IHN0cmluZyA9IFwidHJvbGxib3hcIjtcbiAgICBwdWJsaWMgbG9nZ2VyID0gTW9kQVBJLkdldE1vZDxNQkxvZ2dlcj4oXCJtYmxvZ2dlclwiKS5DcmVhdGVMb2dnZXIoXCJ0cm9sbGJveFwiKTtcbiAgICBwcml2YXRlIHJlZ2lzdGVyZWRDb21tYW5kczogQ29tbWFuZFtdID0gW107XG4gICAgcHVibGljIGZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhcIkluaXRpYWxpemluZyB0cm9sbGJveCBBUElcIik7XG4gICAgICAgIGZvciAobGV0IGlmcmFtZSBvZiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlmcmFtZVwiKSkge1xuICAgICAgICAgICAgaWYgKGlmcmFtZS5zcmMgPT0gXCJodHRwczovL3d3dy53aW5kb3dzOTMubmV0L3Ryb2xsYm94L2luZGV4LnBocFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZSA9IGlmcmFtZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzbmRNc2dIb29rID0gTW9kQVBJLkhvb2soXCJzZW5kTXNnXCIpO1xuICAgICAgICBzbmRNc2dIb29rLm9uKFwiY2FsbFwiLCAoZXY6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgbXNnID0gZXYuZGF0YS5mdW5jYXJnc1swXTtcbiAgICAgICAgICAgIGlmIChtc2cuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFyZ3MgPSBtc2cuc3Vic3RyKDEpLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgbGV0IGNtZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZXNwYWNlID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoY21kLmluY2x1ZGVzKCc6JykpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlID0gY21kLnNwbGl0KCc6JylbMF07XG4gICAgICAgICAgICAgICAgICAgIGNtZCA9IGNtZC5zcGxpdCgnOicpWzFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgY21kcyA9IHRoaXMucmVnaXN0ZXJlZENvbW1hbmRzLmZpbHRlcihjID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGMubmFtZXNwYWNlID09PSBuYW1lc3BhY2UgJiYgKGMubmFtZSA9PT0gY21kIHx8IGMuYWxpYXNlcy5pbmNsdWRlcyhjbWQpKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGMubmFtZSA9PSBjbWQgfHwgYy5hbGlhc2VzLmluY2x1ZGVzKGNtZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChjbWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgY21kc1swXS5leGVjdXRlKGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcInRyb2xsYm94IGFwaSBpbml0aWFsaXplZFwiKTtcbiAgICAgICAgdGhpcy5QcmludE1lc3NhZ2Uoe1xuICAgICAgICAgICAgbmljazogXCJtb2Rib3hcIixcbiAgICAgICAgICAgIGNvbG9yOiBcImdyZWVuXCIsXG4gICAgICAgICAgICBob21lOiBcImJhbGxzXCIsXG4gICAgICAgICAgICBkYXRlOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgbXNnOiBcIk1vZGJveCBhY3RpdmUhXCJcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcHVibGljIFByaW50TWVzc2FnZShtc2c6IE1lc3NhZ2UpIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHRoaXMuZnJhbWUuY29udGVudFdpbmRvdy5wcmludE1zZyhtc2cpO1xuICAgIH1cbiAgICBwdWJsaWMgUmVnaXN0ZXJDb21tYW5kKGNtZDogQ29tbWFuZCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyZWRDb21tYW5kcy5wdXNoKGNtZCk7XG4gICAgfVxuICAgIHB1YmxpYyBHZXRFbGVtZW50KHVpZWxlbWVudDogVUlFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjdHJvbGxib3ggPiAke3VpZWxlbWVudC5HZXRTZWxlY3RvcigpfWApO1xuICAgIH1cbiAgICAvLyBwdWJsaWMgT3BlblBvcHVwKGh0bWw6IHN0cmluZykgeyAvLyBwcm9iIGRvZXNudCBleGlzdCBpbiB0cm9sbGJveCBhbnltb3JlXG4gICAgLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAvLyAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgIC8vICAgICAgICAgZnJhbWUuY29udGVudFdpbmRvdy5wb3B1cChodG1sLHJlc29sdmUpOyAvLyByZXNvbHZlIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBvcHVwIGlzIG9wZW5cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG59XG5jbGFzcyBVSUVsZW1lbnQge1xuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBVSUVsZW1lbnRbXSA9IFtdO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBlbGVtZW50OiBzdHJpbmcpIHt9XG4gICAgcHVibGljIEdldFNlbGVjdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgIH1cbiAgICBwdWJsaWMgU2V0Q2hpbGRyZW4oY2hpbGRzOiBVSUVsZW1lbnRbXSkge1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IGNoaWxkcy5tYXAoeCA9PiB7XG4gICAgICAgICAgICB4LmVsZW1lbnQgPSBgJHt0aGlzLmVsZW1lbnR9ID4gJHt4LmVsZW1lbnR9YDtcbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHB1YmxpYyBHZXQobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBhID0gdGhpcy5fY2hpbGRyZW4uZmluZCh4ID0+IHgubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIGlmICghYSkgdGhyb3cgbmV3IEVycm9yKGBObyBjaGlsZCBuYW1lZCAke25hbWV9YCk7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBnZXQgY2hpbGRyZW4oKToge1trZXk6IHN0cmluZ106IFVJRWxlbWVudH0ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKHRoaXMuX2NoaWxkcmVuLm1hcCh4ID0+IFt4Lm5hbWUsIHhdKSlcbiAgICB9XG59XG4vKmV4cG9ydCBjb25zdCBVSSA9IHtcbiAgICBGb3JtOiB7XG4gICAgICAgIF9fY29tYmluZTogXCIjdHJvbGxib3hfZm9ybVwiLFxuICAgICAgICBnZXQgSW5wdXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5fX2NvbWJpbmV9ID4gdGV4dGFyZWEjdHJvbGxib3hfaW5wdXRgO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgU2VuZEJ1dHRvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLl9fY29tYmluZX0gPiBidXR0b25gO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgTmlja0J1dHRvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLl9fY29tYmluZX0gPiBidXR0b24jdHJvbGxib3hfbmlja19idG5gO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgVXBsb2FkQnV0dG9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuX19jb21iaW5lfSA+IGJ1dHRvbiN0cm9sbGJveF91cGxvYWRfYnRuYDtcbiAgICAgICAgfVxuICAgIH1cbn0qL1xuZXhwb3J0IGNvbnN0IFVJID0ge1xuICAgIEZvcm06IG5ldyBVSUVsZW1lbnQoXCJGb3JtXCIsIFwiI3Ryb2xsYm94X2Zvcm1cIikuU2V0Q2hpbGRyZW4oW1xuICAgICAgICBuZXcgVUlFbGVtZW50KFwiSW5wdXRcIiwgXCJ0ZXh0YXJlYSN0cm9sbGJveF9pbnB1dFwiKSxcbiAgICAgICAgbmV3IFVJRWxlbWVudChcIlNlbmRCdXR0b25cIiwgXCJidXR0b25cIiksXG4gICAgICAgIG5ldyBVSUVsZW1lbnQoXCJOaWNrQnV0dG9uXCIsIFwiYnV0dG9uI3Ryb2xsYm94X25pY2tfYnRuXCIpLFxuICAgICAgICBuZXcgVUlFbGVtZW50KFwiVXBsb2FkQnV0dG9uXCIsIFwiYnV0dG9uI3Ryb2xsYm94X3VwbG9hZF9idG5cIilcblxuICAgIF0pXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gc2xlZXAobXM6IG51bWJlcikge3JldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKX07XG5leHBvcnQgbmFtZXNwYWNlIGFycmF5IHtcbiAgICBleHBvcnQgZnVuY3Rpb24gZGVlcENsb25lKGFycjogYW55W10pOiBhbnlbXSB7XG4gICAgICAgIGxldCBuZXdhcnI6IGFueVtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGFycltpXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIikgZGF0YSA9IG9iamVjdC5kZWVwQ2xvbmUoZGF0YSk7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkgZGF0YSA9IGRlZXBDbG9uZShkYXRhKTtcbiAgICAgICAgICAgIG5ld2Fyci5wdXNoKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdhcnI7XG4gICAgfTtcbiAgICBleHBvcnQgZnVuY3Rpb24gcmVtb3ZlKGluZGV4OiBudW1iZXIsIGFycjogYW55W10pe1xuICAgICAgICByZXR1cm4gYXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufVxuZXhwb3J0IG5hbWVzcGFjZSBvYmplY3Qge1xuICAgIGV4cG9ydCBmdW5jdGlvbiBoYXNGdW5jdGlvbnMob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChsZXQgaXRlbSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2l0ZW1dID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbaXRlbV0gPT09IFwib2JqZWN0XCIpIHJldHVybiBoYXNGdW5jdGlvbnMob2JqW2l0ZW1dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGV4cG9ydCBmdW5jdGlvbiBkZWVwQ2xvbmUob2JqOiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAoKHdpbmRvdyBhcyBhbnkpLnN0cnVjdHVyZWRDbG9uZSkgcmV0dXJuICh3aW5kb3cgYXMgYW55KS5zdHJ1Y3R1cmVkQ2xvbmUob2JqKVxuICAgICAgICBpZiAoIWhhc0Z1bmN0aW9ucyhvYmopKSByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgICAgICAgbGV0IG5ld29iajogYW55ID0ge307XG4gICAgICAgIGZvciAobGV0IGl0ZW0gaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9ialtpdGVtXSA9PT0gXCJvYmplY3RcIikge25ld29ialtpdGVtXSA9IGRlZXBDbG9uZShvYmpbaXRlbV0pOyBjb250aW51ZX1cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtpdGVtXSkpIHtuZXdvYmpbaXRlbV0gPSBhcnJheS5kZWVwQ2xvbmUob2JqW2l0ZW1dKTsgY29udGludWV9XG4gICAgICAgICAgICBuZXdvYmpbaXRlbV0gPSBvYmpbaXRlbV07XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBNb2RBUEksIE1vZCwgTW9kQVBJX0MgfSBmcm9tIFwiLi9tb2RhcGlcIjtcbmltcG9ydCBNQkxvZ2dlciwgeyBMb2dnZXIgfSBmcm9tIFwiLi9tYmxvZ2dlclwiO1xuaW1wb3J0IHRyb2xsYm94IGZyb20gXCIuL3Ryb2xsYm94XCI7XG5pbXBvcnQgTW9kU3RvcmFnZSBmcm9tIFwiLi9tb2RzdG9yYWdlXCI7XG5pbXBvcnQgTG9hZGVyTW9kIGZyb20gXCIuL2xvYWRlci1qc1wiO1xuXG50eXBlIFRNb2RCb3ggPSB7XG4gICAgTW9kQVBJOiBNb2RBUElfQ1xuICAgIE1vZDogYW55XG59XG5cbmNvbnN0IE1vZEJveDogVE1vZEJveCA9IHtcbiAgICBNb2RBUEk6IE1vZEFQSSxcbiAgICBNb2Q6IE1vZFxufVxuXG5jbGFzcyBNb2RMb2FkZXIgZXh0ZW5kcyBNb2Qge1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIk1vZCBMb2FkZXJcIjtcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiQSBtb2QgdGhhdCBsb2FkcyBtb2RzXCI7XG4gICAgcHVibGljIHZlcnNpb246IHN0cmluZyA9IFwiMC4wLjFcIjtcbiAgICBwdWJsaWMgbmFtZXNwYWNlOiBzdHJpbmcgPSBcIm1vZGxvYWRlclwiO1xuICAgIHByaXZhdGUgbG9nZ2VyID0gTW9kQVBJLkdldE1vZDxNQkxvZ2dlcj4oXCJtYmxvZ2dlclwiKS5DcmVhdGVMb2dnZXIoXCJtb2Rsb2FkZXJcIik7XG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIC8qLy9AdHMtaWdub3JlXG4gICAgICAgIHdpbmRvdy5Nb2RBUEkgPSBNb2RBUEk7IC8vIGV4cG9zZSB0aGUgTW9kQVBJIHRvIHRoZSB3aW5kb3dcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnTW9kQVBJIGV4cG9zZWQgdG8gd2luZG93Jyk7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB3aW5kb3cuTW9kID0gTW9kO1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdNb2QgY2xhc3MgZXhwb3NlZCB0byB3aW5kb3cnKTsqL1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdMb2FkaW5nIG1vZHMuLi4nKTtcbiAgICAgICAgbGV0IG1vZHMgPSBNb2RBUEkuR2V0TW9kPE1vZFN0b3JhZ2U+KFwic3RvcmFnZVwiKS5HZXRTdG9yYWdlKFwibW9kc1wiKVxuICAgICAgICAvLyBsZXQgbW9kTGlzdCA9IG1vZHMuTGlzdCgpO1xuICAgICAgICBtb2RzLkxpc3QoKG1vZExpc3Q6IEFycmF5PHN0cmluZz4pPT57XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBGb3VuZCAke21vZExpc3QubGVuZ3RofSBtb2RzYCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kTmFtZTogc3RyaW5nID0gbW9kTGlzdFtpXVxuICAgICAgICAgICAgICAgIG1vZHMuR2V0KG1vZE5hbWUsIChtb2Q6IHN0cmluZyk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgTG9hZGluZyAke21vZE5hbWV9YCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsb2FkZXJzID0gTW9kQVBJLkZpbHRlck1vZHM8TG9hZGVyTW9kPihcImxvYWRlci1cIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbG9hZGVyIG9mIGxvYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2FkZXIuQ2FuTG9hZChtb2ROYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYExvYWRpbmcgbW9kICR7bW9kTmFtZX0gd2l0aCBsb2FkZXIgJHtsb2FkZXIubmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuTG9hZE1vZChsb2FkZXIuTG9hZChtb2QpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBMb2FkZWQgJHttb2ROYW1lfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGBDb3VsZCBub3QgbG9hZCBtb2QgJHttb2ROYW1lfTogbm8gbG9hZGVyIGZvdW5kIGZvciBpdGApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGAke01vZEFQSS5HZXRNb2RzKCkubGVuZ3RofSBNb2RzIGxvYWRlZGApO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgTW9kLCBNb2RBUEksIE1vZEFQSV9DIH07XG5cbi8vIHNldFRpbWVvdXQoKCkgPT4ge1xuLy8gICAgIGFsZXJ0KFwiYmFsbHNcIilcbi8vICAgICAvLyAvL0B0cy1pZ25vcmVcbi8vICAgICAvLyB3aW5kb3cubW9kYm94Lk1vZEFQSS5Mb2FkTW9kKE1CTG9nZ2VyKTtcbi8vICAgICAvLyAvL0B0cy1pZ25vcmVcbi8vICAgICAvLyB3aW5kb3cubW9kYm94Lk1vZEFQSS5Mb2FkTW9kKHJtdHJvbGxib3gpO1xuLy8gICAgIC8vIC8vQHRzLWlnbm9yZVxuLy8gICAgIC8vIHdpbmRvdy5tb2Rib3guTW9kQVBJLkxvYWRNb2QoTW9kU3RvcmFnZSk7XG4vLyAgICAgLy8gLy9AdHMtaWdub3JlXG4vLyAgICAgLy8gd2luZG93Lm1vZGJveC5Nb2RBUEkuTG9hZE1vZChMb2FkZXJNb2QpO1xuLy8gICAgIC8vIC8vQHRzLWlnbm9yZVxuLy8gICAgIC8vIHdpbmRvdy5tb2Rib3guTW9kQVBJLkxvYWRNb2QoTW9kTG9hZGVyKTtcbi8vIH0sIDUwMClcblxuLy9AdHMtaWdub3JlXG4ka2VybmVsLm9uKFwic3BsYXNoOnJlYWR5XCIsICgpPT57IC8vIHJ1biB3aGVuIHc5MyBib290c1xuICAgIC8vIFRPRE86IG1ha2UgdGhpcyBsZXNzIHNoaXR0eVxuICAgIC8vIGFsZXJ0KFwibGF1bmNoZWQhXCIpXG4gICAgLy9AdHMtaWdub3JlXG4gICAgd2luZG93Lm1vZGJveCA9IE1vZEJveDtcbiAgICBzZXRJbnRlcnZhbCgoKT0+e1xuICAgICAgICBmb3IobGV0IGZyYW1lIG9mIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaWZyYW1lXCIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmcmFtZS5zcmMpO1xuICAgICAgICAgICAgaWYgKGZyYW1lLnNyYyA9PSBcImh0dHBzOi8vd3d3LndpbmRvd3M5My5uZXQvdHJvbGxib3gvaW5kZXgucGhwXCIpIHtcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBpZiAoZnJhbWUuY29udGVudFdpbmRvdy5tb2Rib3ggIT0gbnVsbCkgeyBjb250aW51ZTsgfVxuXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgZnJhbWUuY29udGVudFdpbmRvdy5tb2Rib3ggPSBNb2RCb3g7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgZnJhbWUuY29udGVudFdpbmRvdy5tb2Rib3guTW9kQVBJLkxvYWRNb2QoTUJMb2dnZXIpO1xuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgZnJhbWUuY29udGVudFdpbmRvdy5tb2Rib3guTW9kQVBJLkxvYWRNb2QodHJvbGxib3gpO1xuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgZnJhbWUuY29udGVudFdpbmRvdy5tb2Rib3guTW9kQVBJLkxvYWRNb2QoTW9kU3RvcmFnZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBmcmFtZS5jb250ZW50V2luZG93Lm1vZGJveC5Nb2RBUEkuTG9hZE1vZChMb2FkZXJNb2QpO1xuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgZnJhbWUuY29udGVudFdpbmRvdy5tb2Rib3guTW9kQVBJLkxvYWRNb2QoTW9kTG9hZGVyKTtcbiAgICAgICAgICAgICAgICB9LDUwMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==