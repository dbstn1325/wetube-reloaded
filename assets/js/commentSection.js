/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/commentSection.js":
/*!*****************************************!*\
  !*** ./src/client/js/commentSection.js ***!
  \*****************************************/
/***/ (() => {

eval("const form = document.getElementById(\"commentForm\");\r\n\r\nconst videoContainer = document.getElementById(\"videoContainer\");\r\n\r\nconst handleSubmit = (event) => {\r\n    const textarea = form.querySelector(\"textarea\");\r\n    const formBtn = form.querySelector(\"button\");\r\n\r\n    event.preventDefault();\r\n    const text = textarea.value;\r\n    const videoId = videoContainer.dataset.id;\r\n    \r\n    fetch(`/api/videos/${videoId}/comment`,{\r\n        method : \"POST\",\r\n        headers: {\r\n          \"Content-Type\" : \"application/json\",\r\n        },\r\n        body : JSON.stringify({ text : \"clork\", age:\"23\" }),\r\n    });\r\n    \r\n}\r\nif(form){\r\n    form.addEventListener(\"submit\", handleSubmit);\r\n}\r\n\r\n\n\n//# sourceURL=webpack://wetube/./src/client/js/commentSection.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/commentSection.js"]();
/******/ 	
/******/ })()
;