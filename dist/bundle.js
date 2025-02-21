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
        // public OpenPopup(html: string) { // prob doesnt exist in trollbox anymore
        //     return new Promise(resolve => {
        //         //@ts-ignore
        //         window.popup(html,resolve); // resolve gets called when the popup is open
        //     })
        // }
    }
    init() {
        this.logger.log("Initializing trollbox API");
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
        window.printMsg(msg);
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

//@ts-ignore
window.modbox = ModBox;
// setTimeout(() => {
//     alert("balls")
//@ts-ignore
window.modbox.ModAPI.LoadMod(_mblogger__WEBPACK_IMPORTED_MODULE_1__["default"]);
//@ts-ignore
window.modbox.ModAPI.LoadMod(_trollbox__WEBPACK_IMPORTED_MODULE_2__["default"]);
//@ts-ignore
window.modbox.ModAPI.LoadMod(_modstorage__WEBPACK_IMPORTED_MODULE_3__["default"]);
//@ts-ignore
window.modbox.ModAPI.LoadMod(_loader_js__WEBPACK_IMPORTED_MODULE_4__["default"]);
//@ts-ignore
window.modbox.ModAPI.LoadMod(ModLoader);
// }, 500)
// //@ts-ignore
// $kernel.on("splash:ready", ()=>{ // run when w93 boots
//     // TODO: make this less shitty
//     // alert("launched!")
//     //@ts-ignore
//     // window.modbox = ModBox;
//     // setInterval(()=>{
//     //     for(let frame of document.getElementsByTagName("iframe")) {
//     //         console.log(frame.src);
//     //         if (frame.src == "https://www.windows93.net/trollbox/index.php") {
//     //             //@ts-ignore
//     //             if (frame.contentWindow.modbox != null) { continue; }
//     //             //@ts-ignore
//     //             frame.contentWindow.modbox = ModBox;
//     //             setTimeout(()=> {
//     //                 //@ts-ignore
//     //                 frame.contentWindow.modbox.ModAPI.LoadMod(MBLogger);
//     //                 //@ts-ignore
//     //                 frame.contentWindow.modbox.ModAPI.LoadMod(trollbox);
//     //                 //@ts-ignore
//     //                 frame.contentWindow.modbox.ModAPI.LoadMod(ModStorage);
//     //                 //@ts-ignore
//     //                 frame.contentWindow.modbox.ModAPI.LoadMod(LoaderMod);
//     //                 //@ts-ignore
//     //                 frame.contentWindow.modbox.ModAPI.LoadMod(ModLoader);
//     //             },500)
//     //         }
//     //     }
//     // })
// })

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVMsQ0FBQyxDQUFDO0FBQ3hDLFVBQVU7QUFFVixlQUFlO0FBQ2YseURBQXlEO0FBQ3pELHFDQUFxQztBQUNyQyw0QkFBNEI7QUFDNUIsbUJBQW1CO0FBQ25CLGlDQUFpQztBQUNqQywyQkFBMkI7QUFDM0IseUVBQXlFO0FBQ3pFLHlDQUF5QztBQUN6QyxvRkFBb0Y7QUFDcEYsa0NBQWtDO0FBQ2xDLDJFQUEyRTtBQUUzRSxrQ0FBa0M7QUFDbEMsMERBQTBEO0FBRTFELHVDQUF1QztBQUN2QyxzQ0FBc0M7QUFDdEMsOEVBQThFO0FBQzlFLHNDQUFzQztBQUN0Qyw4RUFBOEU7QUFDOUUsc0NBQXNDO0FBQ3RDLGdGQUFnRjtBQUNoRixzQ0FBc0M7QUFDdEMsK0VBQStFO0FBQy9FLHNDQUFzQztBQUN0QywrRUFBK0U7QUFDL0UsNEJBQTRCO0FBQzVCLG1CQUFtQjtBQUNuQixlQUFlO0FBQ2YsWUFBWTtBQUNaLEtBQUsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb2Rib3gvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL21vZGJveC8uL3NyYy9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vbW9kYm94Ly4vc3JjL2xvYWRlci1qcy50cyIsIndlYnBhY2s6Ly9tb2Rib3gvLi9zcmMvbWJsb2dnZXIudHMiLCJ3ZWJwYWNrOi8vbW9kYm94Ly4vc3JjL21vZGFwaS50cyIsIndlYnBhY2s6Ly9tb2Rib3gvLi9zcmMvbW9kc3RvcmFnZS50cyIsIndlYnBhY2s6Ly9tb2Rib3gvLi9zcmMvdHJvbGxib3gudHMiLCJ3ZWJwYWNrOi8vbW9kYm94Ly4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vbW9kYm94L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21vZGJveC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbW9kYm94L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbW9kYm94L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbW9kYm94Ly4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm1vZGJveFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJtb2Rib3hcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwiaW50ZXJmYWNlIGNhbGxiYWNrZHVjIHtcbiAgICBba2V5OiBzdHJpbmddOiBGdW5jdGlvbltdO1xufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgICBwdWJsaWMgX2NhbGxiYWNrczogY2FsbGJhY2tkdWM7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIH1cbiAgICBvbihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzW2V2ZW50TmFtZV0pIHRoaXMuX2NhbGxiYWNrc1tldmVudE5hbWVdID0gW107XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgICBvZmYoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrc1tldmVudE5hbWVdKSByZXR1cm47XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrc1tldmVudE5hbWVdLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBjYWxsYmFjaykgdGhpcy5fY2FsbGJhY2tzW2V2ZW50TmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgb25jZShldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMub24oZXZlbnROYW1lLCAoLi4uZDogYW55W10pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGQpO1xuICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnROYW1lLCBhcmd1bWVudHMuY2FsbGVlKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgZW1pdChldmVudE5hbWU6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3NbZXZlbnROYW1lXSkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9jYWxsYmFja3NbZXZlbnROYW1lXS5mb3JFYWNoKHggPT4geCguLi5hcmdzKSk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEV2ZW50IHtcbiAgICBwdWJsaWMgZGVmYXVsdFByZXZlbnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBkYXRhOiBhbnksIHB1YmxpYyBkZWZhdWx0YWN0aW9uOiBGdW5jdGlvbikge307XG4gICAgcHJldmVudERlZmF1bHQoKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7XG4gICAgfVxuICAgIHJ1bl9kZWZhdWx0KC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmICghdGhpcy5kZWZhdWx0UHJldmVudGVkKSB0aGlzLmRlZmF1bHRhY3Rpb24oLi4uYXJncyk7XG4gICAgfVxufSIsImltcG9ydCB7IE1vZCB9IGZyb20gXCIuL21vZGFwaVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGVyTW9kIGV4dGVuZHMgTW9kIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJKYXZhU2NyaXB0IExvYWRlclwiO1xuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJUaGUgZGVmYXVsdCBsb2FkZXIgZm9yIG1vZGJveC5cIjtcbiAgICBwdWJsaWMgdmVyc2lvbjogc3RyaW5nID0gXCIwLjAuMVwiO1xuICAgIHB1YmxpYyBuYW1lc3BhY2U6IHN0cmluZyA9IFwibG9hZGVyLWpzXCI7XG4gICAgTG9hZChkYXRhOiBzdHJpbmcpOiBNb2Qge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGV2YWwoYChmdW5jdGlvbigpe3JldHVybiAke2RhdGF9fSkoKTtgKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAoZnVuY3Rpb24oKXtyZXR1cm4gJHtkYXRhfX0pKCk7YClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTW9kO1xuICAgICAgICB9XG4gICAgfVxuICAgIENhbkxvYWQoZmlsZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmaWxlLmVuZHNXaXRoKFwiLmpzXCIpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBNb2QgfSBmcm9tIFwiLi9tb2RhcGlcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1CTG9nZ2VyIGV4dGVuZHMgTW9kIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJNQkxvZ2dlclwiO1xuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJUaGUgZGVmYXVsdCBsb2dnZXIgZm9yIG1vZGJveC5cIjtcbiAgICBwdWJsaWMgdmVyc2lvbjogc3RyaW5nID0gXCIwLjAuMVwiO1xuICAgIHB1YmxpYyBuYW1lc3BhY2U6IHN0cmluZyA9IFwibWJsb2dnZXJcIjtcbiAgICBwdWJsaWMgaW5pdCgpIHt9XG4gICAgcHVibGljIENyZWF0ZUxvZ2dlcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMb2dnZXIobmFtZSk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIExvZ2dlciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge31cbiAgICBwcml2YXRlIGdldFRpbWUoKSB7XG4gICAgICAgIGxldCBkID0gbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IGhvdXIgPSBkLmdldEhvdXJzKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gICAgICAgIGxldCBtaW51dGUgPSBkLmdldE1pbnV0ZXMoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICAgICAgbGV0IHNlY29uZCA9IGQuZ2V0U2Vjb25kcygpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICAgICAgICByZXR1cm4gYCR7aG91cn06JHttaW51dGV9OiR7c2Vjb25kfWA7XG4gICAgfVxuICAgIHB1YmxpYyBsb2coLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY29uc29sZS5sb2coYFske3RoaXMuZ2V0VGltZSgpfV0gWyR7dGhpcy5uYW1lfV1gLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgcHVibGljIGluZm8oLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY29uc29sZS5pbmZvKGBbJHt0aGlzLmdldFRpbWUoKX1dIFske3RoaXMubmFtZX1dIFtJTkZPXWAsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBwdWJsaWMgd2FybiguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zb2xlLndhcm4oYFske3RoaXMuZ2V0VGltZSgpfV0gWyR7dGhpcy5uYW1lfV0gW1dBUk5dYCwgLi4uYXJncyk7XG4gICAgfVxuICAgIHB1YmxpYyBlcnJvciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBbJHt0aGlzLmdldFRpbWUoKX1dIFske3RoaXMubmFtZX1dIFtFUlJPUl1gLCAuLi5hcmdzKTtcbiAgICB9XG59IiwiaW1wb3J0IEV2ZW50RW1pdHRlciwgeyBFdmVudCB9IGZyb20gXCIuL2V2ZW50c1wiO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuL3V0aWwnO1xubGV0IHdpbm8gPSB3aW5kb3cgYXMgYW55O1xuXG5leHBvcnQgY2xhc3MgTW9kIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJubyBuYW1lXCI7XG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIm5vIGRlc2NyaXB0aW9uXCI7XG4gICAgcHVibGljIHZlcnNpb246IHN0cmluZyA9IFwiMC4wLjBcIjtcbiAgICBwdWJsaWMgbmFtZXNwYWNlOiBzdHJpbmcgPSBcIm1vZFwiO1xuICAgIGluaXQoKSB7fVxuICAgIGNvbnN0cnVjdG9yKCl7fTtcbn1cbmV4cG9ydCBjbGFzcyBNb2RBUElfQyBleHRlbmRzIE1vZCB7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiTW9kQVBJXCI7XG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIkFuIEFQSSBmb3Igcm10cm9sbGJveCBtb2RzXCI7XG4gICAgcHVibGljIHZlcnNpb246IHN0cmluZyA9IFwiMC4wLjFcIjtcbiAgICBwdWJsaWMgbmFtZXNwYWNlOiBzdHJpbmcgPSBcIm1vZGFwaVwiO1xuICAgIHByaXZhdGUgbG9hZGVkOiBNb2RbXSA9IFtdO1xuICAgIHByaXZhdGUgaG9va3M6IHtba2V5OiBzdHJpbmddOiBFdmVudEVtaXR0ZXJ9ID0ge307XG4gICAgcHVibGljIEdldE1vZDxUPihuYW1lc3BhY2U6IHN0cmluZykge1xuICAgICAgICBsZXQgYSA9IHRoaXMubG9hZGVkLmZpbmQoeCA9PiB4Lm5hbWVzcGFjZSA9PT0gbmFtZXNwYWNlKTtcbiAgICAgICAgaWYgKCFhKSB0aHJvdyBuZXcgRXJyb3IoYE1vZCB3aXRoIG5hbWVzcGFjZSAke25hbWVzcGFjZX0gbm90IGZvdW5kLmApO1xuICAgICAgICByZXR1cm4gYSBhcyB1bmtub3duIGFzIFQ7XG4gICAgfVxuICAgIHB1YmxpYyBHZXRNb2RCeU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZC5maW5kKHggPT4geC5uYW1lID09PSBuYW1lKTtcbiAgICB9XG4gICAgcHVibGljIEdldE1vZHMoKTogTW9kW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XG4gICAgfVxuICAgIHB1YmxpYyBMb2FkTW9kKG1vZDogYW55KSB7XG4gICAgICAgIGlmIChtb2QgPT0gbnVsbCkge1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAkYWxlcnQoXCJVaCBvaCEgU29tZXRoaW5nIHdlbnQgaG9ycmlibHkgd3JvbmcgbG9hZGluZyBhIG1vZCFcIik7XG4gICAgICAgICAgICAvLyByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxtb2Q6IE1vZCA9IG5ldyBtb2QoKTtcbiAgICAgICAgaWYgKHRoaXMubG9hZGVkLmZpbmQoeCA9PiB4Lm5hbWUgPT09IGxtb2QubmFtZSkpIHJldHVybjtcbiAgICAgICAgdGhpcy5sb2FkZWQucHVzaChsbW9kKTtcbiAgICAgICAgbG1vZC5pbml0KCk7XG4gICAgICAgIC8vIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBwdWJsaWMgUmVwbGFjZU1vZChtb2Q6IE1vZCwgbmV3bW9kOiBNb2QpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5sb2FkZWQuZmluZEluZGV4KHggPT4geC5uYW1lID09PSBtb2QubmFtZSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHJldHVybjtcbiAgICAgICAgdGhpcy5sb2FkZWRbaW5kZXhdID0gbmV3bW9kO1xuICAgIH1cbiAgICBwdWJsaWMgSG9vayhmdW5jdGlvbl9uYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9va3NbZnVuY3Rpb25fbmFtZV0pIHJldHVybiB0aGlzLmhvb2tzW2Z1bmN0aW9uX25hbWVdO1xuICAgICAgICBsZXQgZXZlbSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgbGV0IG9nZnVuYyA9IHdpbm9bZnVuY3Rpb25fbmFtZV07XG4gICAgICAgIHdpbm9bZnVuY3Rpb25fbmFtZV0gPSAoYXN5bmMgZnVuY3Rpb24gKG9nZnVuYzogRnVuY3Rpb24sIC4uLmZhcmdzOiBhbnlbXSkge1xuICAgICAgICAgICAgbGV0IG5hcmdzID0gdXRpbC5hcnJheS5kZWVwQ2xvbmUoZmFyZ3MpO1xuICAgICAgICAgICAgZXZlbS5lbWl0KCdiZWZvcmVfY2FsbCcsIG5hcmdzKTsgLy8geW91IGNhbiB1c2UgYmVmb3JlIGNhbGwgdG8gcXVpY2tseSBtb2RpZnkgdGhlIGFyZ3VtZW50c1xuICAgICAgICAgICAgbGV0IGZldmVudCA9IG5ldyBFdmVudCgnaG9va2VkX2Z1bmN0aW9uX2NhbGwnLCB7ZnVuY2FyZ3M6IG5hcmdzfSwgb2dmdW5jKTtcbiAgICAgICAgICAgIGV2ZW0uZW1pdCgnY2FsbCcsZmV2ZW50KTtcbiAgICAgICAgICAgIGF3YWl0IHV0aWwuc2xlZXAoODApO1xuICAgICAgICAgICAgZmV2ZW50LnJ1bl9kZWZhdWx0KC4uLm5hcmdzKTtcbiAgICAgICAgICAgIGV2ZW0uZW1pdChcImFmdGVyX2NhbGxcIik7XG4gICAgICAgIH0pLmJpbmQodGhpcywgb2dmdW5jKTtcbiAgICAgICAgdGhpcy5ob29rc1tmdW5jdGlvbl9uYW1lXSA9IGV2ZW07XG4gICAgICAgIHJldHVybiBldmVtO1xuICAgIH1cbiAgICBwdWJsaWMgRmlsdGVyTW9kczxUPihwcmVmaXg6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZWQuZmlsdGVyKHggPT4geC5uYW1lc3BhY2Uuc3RhcnRzV2l0aChwcmVmaXgpKSBhcyB1bmtub3duIGFzIFRbXTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgTW9kQVBJID0gbmV3IE1vZEFQSV9DKCk7IiwiaW1wb3J0IHsgTW9kIH0gZnJvbSBcIi4vbW9kYXBpXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RTdG9yYWdlIGV4dGVuZHMgTW9kIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJNb2RTdG9yYWdlXCI7XG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIkEgbW9kIHRoYXQgc3RvcmVzIG1vZCBkYXRhXCI7XG4gICAgcHVibGljIHZlcnNpb246IHN0cmluZyA9IFwiMC4wLjFcIjtcbiAgICBwdWJsaWMgbmFtZXNwYWNlOiBzdHJpbmcgPSBcInN0b3JhZ2VcIjtcbiAgICBwdWJsaWMgaW5pdCgpIHt9XG4gICAgcHVibGljIEdldFN0b3JhZ2UobmFtZTogc3RyaW5nKTogU3RvcmFnZURhdGEge1xuICAgICAgICByZXR1cm4gbmV3IFN0b3JhZ2VEYXRhKG5hbWUpO1xuICAgIH1cbn1cbmNsYXNzIFN0b3JhZ2VEYXRhIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7fVxuICAgIHB1YmxpYyBHZXQoa2V5OiBzdHJpbmcsIGM6IEZ1bmN0aW9uKTogYW55IHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICRkYi5nZXQoYG1vZGJveC8ke3RoaXMubmFtZX0vJHtrZXl9YCwgKF8sIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKF8sIGNvbnRlbnQpXG4gICAgICAgICAgICBjKGNvbnRlbnQpO1xuICAgICAgICB9KVxuICAgICAgICAvLyByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG1vZGJveC8ke3RoaXMubmFtZX0vJHtrZXl9YCk7XG4gICAgfVxuICAgIHB1YmxpYyBTZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICRkYi5zZXQoYG1vZGJveC8ke3RoaXMubmFtZX0vJHtrZXl9YCx2YWx1ZSk7XG4gICAgICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBtb2Rib3gvJHt0aGlzLm5hbWV9LyR7a2V5fWAsIHZhbHVlKTtcbiAgICB9XG4gICAgcHVibGljIFJlbW92ZShrZXk6IHN0cmluZykge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgJGRiLmRlbChgbW9kYm94LyR7dGhpcy5uYW1lfS8ke2tleX1gKTtcbiAgICAgICAgLy8gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYG1vZGJveC8ke3RoaXMubmFtZX0vJHtrZXl9YCk7XG4gICAgfVxuICAgIHB1YmxpYyBMaXN0KGM6IEZ1bmN0aW9uKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gJGRiLmtleXMoKF8sIGtleXM6IEFycmF5PFN0cmluZz4pID0+IHtcbiAgICAgICAgICAgIGxldCBtb2RzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5c1tpXS5zdGFydHNXaXRoKFwibW9kYm94L1wiK3RoaXMubmFtZStcIi9cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kcy5wdXNoKGtleXNbaV0ucmVwbGFjZShgbW9kYm94LyR7dGhpcy5uYW1lfS9gLCBcIlwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYyhtb2RzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGxldCBrZXlzID0gT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKTtcbiAgICB9XG4gICAgcHVibGljIENsZWFyKCkge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5MaXN0KChrZXlzKT0+IHtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAga2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5SZW1vdmUoa2V5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cbn0iLCJpbXBvcnQgeyBNb2QsIE1vZEFQSSB9IGZyb20gXCIuL21vZGFwaVwiO1xuaW1wb3J0IE1CTG9nZ2VyIGZyb20gXCIuL21ibG9nZ2VyXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyLCB7RXZlbnR9IGZyb20gXCIuL2V2ZW50c1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lc3NhZ2Uge1xuICAgIG5pY2s6IHN0cmluZztcbiAgICBob21lOiBzdHJpbmc7XG4gICAgbXNnOiBzdHJpbmc7XG4gICAgZGF0ZTogbnVtYmVyO1xuICAgIGNvbG9yOiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIENvbW1hbmQge1xuICAgIG5hbWVzcGFjZTogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHVzYWdlOiBzdHJpbmc7XG4gICAgYWxpYXNlczogc3RyaW5nW107XG4gICAgZXhlY3V0ZTogKGFyZ3M6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0cm9sbGJveCBleHRlbmRzIE1vZCB7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwidHJvbGxib3hcIjtcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IFwidHJvbGxib3ggQVBJXCI7XG4gICAgcHVibGljIHZlcnNpb246IHN0cmluZyA9IFwiMC4wLjFcIjtcbiAgICBwdWJsaWMgbmFtZXNwYWNlOiBzdHJpbmcgPSBcInRyb2xsYm94XCI7XG4gICAgcHVibGljIGxvZ2dlciA9IE1vZEFQSS5HZXRNb2Q8TUJMb2dnZXI+KFwibWJsb2dnZXJcIikuQ3JlYXRlTG9nZ2VyKFwidHJvbGxib3hcIik7XG4gICAgcHJpdmF0ZSByZWdpc3RlcmVkQ29tbWFuZHM6IENvbW1hbmRbXSA9IFtdO1xuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICB0aGlzLmxvZ2dlci5sb2coXCJJbml0aWFsaXppbmcgdHJvbGxib3ggQVBJXCIpO1xuICAgICAgICBsZXQgc25kTXNnSG9vayA9IE1vZEFQSS5Ib29rKFwic2VuZE1zZ1wiKTtcbiAgICAgICAgc25kTXNnSG9vay5vbihcImNhbGxcIiwgKGV2OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IG1zZyA9IGV2LmRhdGEuZnVuY2FyZ3NbMF07XG4gICAgICAgICAgICBpZiAobXNnLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgICAgIGxldCBhcmdzID0gbXNnLnN1YnN0cigxKS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIGxldCBjbWQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVzcGFjZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKGNtZC5pbmNsdWRlcygnOicpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZSA9IGNtZC5zcGxpdCgnOicpWzBdO1xuICAgICAgICAgICAgICAgICAgICBjbWQgPSBjbWQuc3BsaXQoJzonKVsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGNtZHMgPSB0aGlzLnJlZ2lzdGVyZWRDb21tYW5kcy5maWx0ZXIoYyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjLm5hbWVzcGFjZSA9PT0gbmFtZXNwYWNlICYmIChjLm5hbWUgPT09IGNtZCB8fCBjLmFsaWFzZXMuaW5jbHVkZXMoY21kKSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjLm5hbWUgPT0gY21kIHx8IGMuYWxpYXNlcy5pbmNsdWRlcyhjbWQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoY21kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGNtZHNbMF0uZXhlY3V0ZShhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXCJ0cm9sbGJveCBhcGkgaW5pdGlhbGl6ZWRcIik7XG4gICAgICAgIHRoaXMuUHJpbnRNZXNzYWdlKHtcbiAgICAgICAgICAgIG5pY2s6IFwibW9kYm94XCIsXG4gICAgICAgICAgICBjb2xvcjogXCJncmVlblwiLFxuICAgICAgICAgICAgaG9tZTogXCJiYWxsc1wiLFxuICAgICAgICAgICAgZGF0ZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIG1zZzogXCJNb2Rib3ggYWN0aXZlIVwiXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHB1YmxpYyBQcmludE1lc3NhZ2UobXNnOiBNZXNzYWdlKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB3aW5kb3cucHJpbnRNc2cobXNnKTtcbiAgICB9XG4gICAgcHVibGljIFJlZ2lzdGVyQ29tbWFuZChjbWQ6IENvbW1hbmQpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlcmVkQ29tbWFuZHMucHVzaChjbWQpO1xuICAgIH1cbiAgICBwdWJsaWMgR2V0RWxlbWVudCh1aWVsZW1lbnQ6IFVJRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Ryb2xsYm94ID4gJHt1aWVsZW1lbnQuR2V0U2VsZWN0b3IoKX1gKTtcbiAgICB9XG4gICAgLy8gcHVibGljIE9wZW5Qb3B1cChodG1sOiBzdHJpbmcpIHsgLy8gcHJvYiBkb2VzbnQgZXhpc3QgaW4gdHJvbGxib3ggYW55bW9yZVxuICAgIC8vICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgLy8gICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAvLyAgICAgICAgIHdpbmRvdy5wb3B1cChodG1sLHJlc29sdmUpOyAvLyByZXNvbHZlIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBvcHVwIGlzIG9wZW5cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG59XG5jbGFzcyBVSUVsZW1lbnQge1xuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBVSUVsZW1lbnRbXSA9IFtdO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBlbGVtZW50OiBzdHJpbmcpIHt9XG4gICAgcHVibGljIEdldFNlbGVjdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgIH1cbiAgICBwdWJsaWMgU2V0Q2hpbGRyZW4oY2hpbGRzOiBVSUVsZW1lbnRbXSkge1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IGNoaWxkcy5tYXAoeCA9PiB7XG4gICAgICAgICAgICB4LmVsZW1lbnQgPSBgJHt0aGlzLmVsZW1lbnR9ID4gJHt4LmVsZW1lbnR9YDtcbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHB1YmxpYyBHZXQobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBhID0gdGhpcy5fY2hpbGRyZW4uZmluZCh4ID0+IHgubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIGlmICghYSkgdGhyb3cgbmV3IEVycm9yKGBObyBjaGlsZCBuYW1lZCAke25hbWV9YCk7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBnZXQgY2hpbGRyZW4oKToge1trZXk6IHN0cmluZ106IFVJRWxlbWVudH0ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKHRoaXMuX2NoaWxkcmVuLm1hcCh4ID0+IFt4Lm5hbWUsIHhdKSlcbiAgICB9XG59XG4vKmV4cG9ydCBjb25zdCBVSSA9IHtcbiAgICBGb3JtOiB7XG4gICAgICAgIF9fY29tYmluZTogXCIjdHJvbGxib3hfZm9ybVwiLFxuICAgICAgICBnZXQgSW5wdXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5fX2NvbWJpbmV9ID4gdGV4dGFyZWEjdHJvbGxib3hfaW5wdXRgO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgU2VuZEJ1dHRvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLl9fY29tYmluZX0gPiBidXR0b25gO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgTmlja0J1dHRvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLl9fY29tYmluZX0gPiBidXR0b24jdHJvbGxib3hfbmlja19idG5gO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgVXBsb2FkQnV0dG9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuX19jb21iaW5lfSA+IGJ1dHRvbiN0cm9sbGJveF91cGxvYWRfYnRuYDtcbiAgICAgICAgfVxuICAgIH1cbn0qL1xuZXhwb3J0IGNvbnN0IFVJID0ge1xuICAgIEZvcm06IG5ldyBVSUVsZW1lbnQoXCJGb3JtXCIsIFwiI3Ryb2xsYm94X2Zvcm1cIikuU2V0Q2hpbGRyZW4oW1xuICAgICAgICBuZXcgVUlFbGVtZW50KFwiSW5wdXRcIiwgXCJ0ZXh0YXJlYSN0cm9sbGJveF9pbnB1dFwiKSxcbiAgICAgICAgbmV3IFVJRWxlbWVudChcIlNlbmRCdXR0b25cIiwgXCJidXR0b25cIiksXG4gICAgICAgIG5ldyBVSUVsZW1lbnQoXCJOaWNrQnV0dG9uXCIsIFwiYnV0dG9uI3Ryb2xsYm94X25pY2tfYnRuXCIpLFxuICAgICAgICBuZXcgVUlFbGVtZW50KFwiVXBsb2FkQnV0dG9uXCIsIFwiYnV0dG9uI3Ryb2xsYm94X3VwbG9hZF9idG5cIilcblxuICAgIF0pXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gc2xlZXAobXM6IG51bWJlcikge3JldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKX07XG5leHBvcnQgbmFtZXNwYWNlIGFycmF5IHtcbiAgICBleHBvcnQgZnVuY3Rpb24gZGVlcENsb25lKGFycjogYW55W10pOiBhbnlbXSB7XG4gICAgICAgIGxldCBuZXdhcnI6IGFueVtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGFycltpXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIikgZGF0YSA9IG9iamVjdC5kZWVwQ2xvbmUoZGF0YSk7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkgZGF0YSA9IGRlZXBDbG9uZShkYXRhKTtcbiAgICAgICAgICAgIG5ld2Fyci5wdXNoKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdhcnI7XG4gICAgfTtcbiAgICBleHBvcnQgZnVuY3Rpb24gcmVtb3ZlKGluZGV4OiBudW1iZXIsIGFycjogYW55W10pe1xuICAgICAgICByZXR1cm4gYXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufVxuZXhwb3J0IG5hbWVzcGFjZSBvYmplY3Qge1xuICAgIGV4cG9ydCBmdW5jdGlvbiBoYXNGdW5jdGlvbnMob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChsZXQgaXRlbSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2l0ZW1dID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbaXRlbV0gPT09IFwib2JqZWN0XCIpIHJldHVybiBoYXNGdW5jdGlvbnMob2JqW2l0ZW1dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGV4cG9ydCBmdW5jdGlvbiBkZWVwQ2xvbmUob2JqOiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAoKHdpbmRvdyBhcyBhbnkpLnN0cnVjdHVyZWRDbG9uZSkgcmV0dXJuICh3aW5kb3cgYXMgYW55KS5zdHJ1Y3R1cmVkQ2xvbmUob2JqKVxuICAgICAgICBpZiAoIWhhc0Z1bmN0aW9ucyhvYmopKSByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgICAgICAgbGV0IG5ld29iajogYW55ID0ge307XG4gICAgICAgIGZvciAobGV0IGl0ZW0gaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9ialtpdGVtXSA9PT0gXCJvYmplY3RcIikge25ld29ialtpdGVtXSA9IGRlZXBDbG9uZShvYmpbaXRlbV0pOyBjb250aW51ZX1cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtpdGVtXSkpIHtuZXdvYmpbaXRlbV0gPSBhcnJheS5kZWVwQ2xvbmUob2JqW2l0ZW1dKTsgY29udGludWV9XG4gICAgICAgICAgICBuZXdvYmpbaXRlbV0gPSBvYmpbaXRlbV07XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBNb2RBUEksIE1vZCwgTW9kQVBJX0MgfSBmcm9tIFwiLi9tb2RhcGlcIjtcbmltcG9ydCBNQkxvZ2dlciwgeyBMb2dnZXIgfSBmcm9tIFwiLi9tYmxvZ2dlclwiO1xuaW1wb3J0IHRyb2xsYm94IGZyb20gXCIuL3Ryb2xsYm94XCI7XG5pbXBvcnQgTW9kU3RvcmFnZSBmcm9tIFwiLi9tb2RzdG9yYWdlXCI7XG5pbXBvcnQgTG9hZGVyTW9kIGZyb20gXCIuL2xvYWRlci1qc1wiO1xuXG50eXBlIFRNb2RCb3ggPSB7XG4gICAgTW9kQVBJOiBNb2RBUElfQ1xuICAgIE1vZDogYW55XG59XG5cbmNvbnN0IE1vZEJveDogVE1vZEJveCA9IHtcbiAgICBNb2RBUEk6IE1vZEFQSSxcbiAgICBNb2Q6IE1vZFxufVxuXG5jbGFzcyBNb2RMb2FkZXIgZXh0ZW5kcyBNb2Qge1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIk1vZCBMb2FkZXJcIjtcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiQSBtb2QgdGhhdCBsb2FkcyBtb2RzXCI7XG4gICAgcHVibGljIHZlcnNpb246IHN0cmluZyA9IFwiMC4wLjFcIjtcbiAgICBwdWJsaWMgbmFtZXNwYWNlOiBzdHJpbmcgPSBcIm1vZGxvYWRlclwiO1xuICAgIHByaXZhdGUgbG9nZ2VyID0gTW9kQVBJLkdldE1vZDxNQkxvZ2dlcj4oXCJtYmxvZ2dlclwiKS5DcmVhdGVMb2dnZXIoXCJtb2Rsb2FkZXJcIik7XG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIC8qLy9AdHMtaWdub3JlXG4gICAgICAgIHdpbmRvdy5Nb2RBUEkgPSBNb2RBUEk7IC8vIGV4cG9zZSB0aGUgTW9kQVBJIHRvIHRoZSB3aW5kb3dcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnTW9kQVBJIGV4cG9zZWQgdG8gd2luZG93Jyk7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB3aW5kb3cuTW9kID0gTW9kO1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdNb2QgY2xhc3MgZXhwb3NlZCB0byB3aW5kb3cnKTsqL1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdMb2FkaW5nIG1vZHMuLi4nKTtcbiAgICAgICAgbGV0IG1vZHMgPSBNb2RBUEkuR2V0TW9kPE1vZFN0b3JhZ2U+KFwic3RvcmFnZVwiKS5HZXRTdG9yYWdlKFwibW9kc1wiKVxuICAgICAgICAvLyBsZXQgbW9kTGlzdCA9IG1vZHMuTGlzdCgpO1xuICAgICAgICBtb2RzLkxpc3QoKG1vZExpc3Q6IEFycmF5PHN0cmluZz4pPT57XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBGb3VuZCAke21vZExpc3QubGVuZ3RofSBtb2RzYCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kTmFtZTogc3RyaW5nID0gbW9kTGlzdFtpXVxuICAgICAgICAgICAgICAgIG1vZHMuR2V0KG1vZE5hbWUsIChtb2Q6IHN0cmluZyk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgTG9hZGluZyAke21vZE5hbWV9YCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsb2FkZXJzID0gTW9kQVBJLkZpbHRlck1vZHM8TG9hZGVyTW9kPihcImxvYWRlci1cIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbG9hZGVyIG9mIGxvYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2FkZXIuQ2FuTG9hZChtb2ROYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYExvYWRpbmcgbW9kICR7bW9kTmFtZX0gd2l0aCBsb2FkZXIgJHtsb2FkZXIubmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuTG9hZE1vZChsb2FkZXIuTG9hZChtb2QpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBMb2FkZWQgJHttb2ROYW1lfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGBDb3VsZCBub3QgbG9hZCBtb2QgJHttb2ROYW1lfTogbm8gbG9hZGVyIGZvdW5kIGZvciBpdGApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGAke01vZEFQSS5HZXRNb2RzKCkubGVuZ3RofSBNb2RzIGxvYWRlZGApO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgTW9kLCBNb2RBUEksIE1vZEFQSV9DIH07XG5cbi8vQHRzLWlnbm9yZVxud2luZG93Lm1vZGJveCA9IE1vZEJveDtcblxuLy8gc2V0VGltZW91dCgoKSA9PiB7XG4vLyAgICAgYWxlcnQoXCJiYWxsc1wiKVxuLy9AdHMtaWdub3JlXG53aW5kb3cubW9kYm94Lk1vZEFQSS5Mb2FkTW9kKE1CTG9nZ2VyKTtcbi8vQHRzLWlnbm9yZVxud2luZG93Lm1vZGJveC5Nb2RBUEkuTG9hZE1vZCh0cm9sbGJveCk7XG4vL0B0cy1pZ25vcmVcbndpbmRvdy5tb2Rib3guTW9kQVBJLkxvYWRNb2QoTW9kU3RvcmFnZSk7XG4vL0B0cy1pZ25vcmVcbndpbmRvdy5tb2Rib3guTW9kQVBJLkxvYWRNb2QoTG9hZGVyTW9kKTtcbi8vQHRzLWlnbm9yZVxud2luZG93Lm1vZGJveC5Nb2RBUEkuTG9hZE1vZChNb2RMb2FkZXIpO1xuLy8gfSwgNTAwKVxuXG4vLyAvL0B0cy1pZ25vcmVcbi8vICRrZXJuZWwub24oXCJzcGxhc2g6cmVhZHlcIiwgKCk9PnsgLy8gcnVuIHdoZW4gdzkzIGJvb3RzXG4vLyAgICAgLy8gVE9ETzogbWFrZSB0aGlzIGxlc3Mgc2hpdHR5XG4vLyAgICAgLy8gYWxlcnQoXCJsYXVuY2hlZCFcIilcbi8vICAgICAvL0B0cy1pZ25vcmVcbi8vICAgICAvLyB3aW5kb3cubW9kYm94ID0gTW9kQm94O1xuLy8gICAgIC8vIHNldEludGVydmFsKCgpPT57XG4vLyAgICAgLy8gICAgIGZvcihsZXQgZnJhbWUgb2YgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpZnJhbWVcIikpIHtcbi8vICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGZyYW1lLnNyYyk7XG4vLyAgICAgLy8gICAgICAgICBpZiAoZnJhbWUuc3JjID09IFwiaHR0cHM6Ly93d3cud2luZG93czkzLm5ldC90cm9sbGJveC9pbmRleC5waHBcIikge1xuLy8gICAgIC8vICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuLy8gICAgIC8vICAgICAgICAgICAgIGlmIChmcmFtZS5jb250ZW50V2luZG93Lm1vZGJveCAhPSBudWxsKSB7IGNvbnRpbnVlOyB9XG5cbi8vICAgICAvLyAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbi8vICAgICAvLyAgICAgICAgICAgICBmcmFtZS5jb250ZW50V2luZG93Lm1vZGJveCA9IE1vZEJveDtcblxuLy8gICAgIC8vICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG4vLyAgICAgLy8gICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuLy8gICAgIC8vICAgICAgICAgICAgICAgICBmcmFtZS5jb250ZW50V2luZG93Lm1vZGJveC5Nb2RBUEkuTG9hZE1vZChNQkxvZ2dlcik7XG4vLyAgICAgLy8gICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuLy8gICAgIC8vICAgICAgICAgICAgICAgICBmcmFtZS5jb250ZW50V2luZG93Lm1vZGJveC5Nb2RBUEkuTG9hZE1vZCh0cm9sbGJveCk7XG4vLyAgICAgLy8gICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuLy8gICAgIC8vICAgICAgICAgICAgICAgICBmcmFtZS5jb250ZW50V2luZG93Lm1vZGJveC5Nb2RBUEkuTG9hZE1vZChNb2RTdG9yYWdlKTtcbi8vICAgICAvLyAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4vLyAgICAgLy8gICAgICAgICAgICAgICAgIGZyYW1lLmNvbnRlbnRXaW5kb3cubW9kYm94Lk1vZEFQSS5Mb2FkTW9kKExvYWRlck1vZCk7XG4vLyAgICAgLy8gICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuLy8gICAgIC8vICAgICAgICAgICAgICAgICBmcmFtZS5jb250ZW50V2luZG93Lm1vZGJveC5Nb2RBUEkuTG9hZE1vZChNb2RMb2FkZXIpO1xuLy8gICAgIC8vICAgICAgICAgICAgIH0sNTAwKVxuLy8gICAgIC8vICAgICAgICAgfVxuLy8gICAgIC8vICAgICB9XG4vLyAgICAgLy8gfSlcbi8vIH0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9