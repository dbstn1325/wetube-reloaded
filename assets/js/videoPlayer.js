/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/***/ ((module, exports) => {

eval("\n\n// ref: https://github.com/tc39/proposal-global\nvar getGlobal = function () {\n\t// the only reliable means to get the global object is\n\t// `Function('return this')()`\n\t// However, this causes CSP violations in Chrome apps.\n\tif (typeof self !== 'undefined') { return self; }\n\tif (typeof window !== 'undefined') { return window; }\n\tif (typeof global !== 'undefined') { return global; }\n\tthrow new Error('unable to locate global object');\n}\n\nvar global = getGlobal();\n\nmodule.exports = exports = global.fetch;\n\n// Needed for TypeScript and Webpack.\nif (global.fetch) {\n\texports.default = global.fetch.bind(global);\n}\n\nexports.Headers = global.Headers;\nexports.Request = global.Request;\nexports.Response = global.Response;\n\n//# sourceURL=webpack://wetube/./node_modules/node-fetch/browser.js?");

/***/ }),

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\");\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst video = document.querySelector(\"video\");\r\nconst  playBtn = document.getElementById(\"play\");\r\nconst  muteBtn = document.getElementById(\"mute\");\r\nconst  currenTime = document.getElementById(\"currenTime\");\r\nconst  totalTime = document.getElementById(\"totalTime\");\r\nconst  volumeRange = document.getElementById(\"volume\");\r\nconst timeLine = document.getElementById(\"timeLine\");\r\nconst fullscreen = document.getElementById(\"fullScreen\");\r\nconst videoContainer = document.getElementById(\"videoContainer\");\r\nconst videoControls = document.getElementById(\"videoControls\");\r\n\r\nlet controlsMovementTimeout = null;\r\nlet controlsTimeout = null;\r\nlet volumeValue = 0.5;\r\nvideo.volume = volumeValue;\r\n\r\nconst handlePlayClick = (e) =>{\r\n    if(video.paused){   //play라는버튼이눌렀을때(addEvent) video가멈춰져있다면\r\n        video.play();\r\n    } else{\r\n        video.pause();\r\n    }\r\n    playBtn.innerHTML = video.paused ? '<i class=\"fas fa-play\"></i>' : '<i class=\"fas fa-pause\"></i>';\r\n}\r\n\r\nconst handleMute = (e) =>{\r\n    muteBtn.innerHTML = !video.muted ? '<i class=\"fas fa-volume-off\"></i>' : '<i class=\"fas fa-volume-mute\"></i>';   //글자먼저바꾸고 음소거 시키기\r\n    if(!video.muted){\r\n        video.muted=true;\r\n    }else{\r\n        video.muted=false;\r\n    }\r\n\r\n    volumeRange.value = video.muted ? 0 : volumeValue;      //표시되는 볼륨\r\n}\r\n\r\nconst handleVolumeChange = (event) => {\r\n    const {\r\n        target : { value },\r\n    } = event;\r\n    // if(video.muted){\r\n    //     video.muted=false;\r\n    //     muteBtn.innerHTML='<i class=\"fas fa-volume-off\"></i>';\r\n    // }else{\r\n    //     video.muted=true;\r\n    //     muteBtn.innerHTML='<i class=\"fas fa-volume-mute\"></i>';\r\n    // }\r\n    volumeValue = value;\r\n    video.volume = value;              //실제볼륨\r\n}\r\n\r\n\r\n\r\nconst handlePlay = (e) => playBtn.innerText=\"Play\";\r\nconst handlePause = (e) => playBtn.innerText=\"Pasue\";\r\n\r\nconst formatTime = (seconds) => {\r\n    return new Date(seconds*1000).toISOString().substr(11, 8);\r\n}\r\n\r\nconst handleMetaData = () => {\r\n    totalTime.innerText = formatTime(Math.floor(video.duration));\r\n    timeLine.max=Math.ceil(video.duration);\r\n}\r\n\r\nconst handleTimeUpdate = () => {\r\n    currenTime.innerText = formatTime(Math.floor(video.currentTime));\r\n    timeLine.value=video.currentTime;\r\n}\r\nconst handleTimeLineChange = (event) => {\r\n    const {\r\n        target : { value },\r\n    } = event;\r\n    video.currentTime=value;\r\n}\r\n\r\nconst handleVideoFullScreen = () =>{\r\n    const fullscreenMode = document.fullscreenElement; //fullscreen일땐 1 \r\n    if(fullscreenMode) {                     \r\n        document.exitFullscreen();\r\n        fullscreen.innerHTML = '<i class=\"fas fa-expand\"></i>'\r\n    }else {\r\n        videoContainer.requestFullscreen();\r\n        fullscreen.innerHTML='<i class=\"fas fa-compress\"></i>';\r\n    }\r\n}\r\n\r\n\r\nconst handleMouseMove = () => {\r\n    if(controlsTimeout){        //떠났을때\r\n        clearTimeout(controlsTimeout);\r\n        controlsTimeout=null;\r\n    }\r\n    \r\n    if(controlsMovementTimeout){\r\n        clearTimeout(controlsMovementTimeout);\r\n        controlsMovementTimeout=null;\r\n    }\r\n\r\n    videoControls.classList.add(\"showing\");\r\n    controlsMovementTimeout = setTimeout( ()=> {\r\n        videoControls.classList.remove(\"showing\");\r\n    }, 3000);\r\n    \r\n}\r\n\r\nconst handleMouseLeave = () => {\r\n    controlsTimeout = setTimeout( ()=> {\r\n        videoControls.classList.remove(\"showing\");\r\n    }, 3000);\r\n}\r\n\r\n\r\n\r\nconst handleEnded = () => {\r\n    const { id } = videoContainer.dataset;\r\n    node_fetch__WEBPACK_IMPORTED_MODULE_0___default()(`/api/videos/${id}/view`, {\r\n        method:\"POST\",\r\n    });\r\n}\r\n\r\nplayBtn.addEventListener(\"click\", handlePlayClick);\r\nmuteBtn.addEventListener(\"click\", handleMute);\r\nvolumeRange.addEventListener(\"input\", handleVolumeChange);\r\nvideo.addEventListener(\"loadedmetadata\", handleMetaData);\r\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate);\r\ntimeLine.addEventListener(\"input\", handleTimeLineChange);\r\nfullscreen.addEventListener(\"click\", handleVideoFullScreen);\r\nvideo.addEventListener(\"mousemove\", handleMouseMove);\r\nvideo.addEventListener(\"mouseleave\", handleMouseLeave);\r\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate);\r\nvideo.addEventListener(\"ended\", handleEnded);\r\n\r\n\n\n//# sourceURL=webpack://wetube/./src/client/js/videoPlayer.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/js/videoPlayer.js");
/******/ 	
/******/ })()
;