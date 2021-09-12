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

/***/ "./src/client/js/recorder.js":
/*!***********************************!*\
  !*** ./src/client/js/recorder.js ***!
  \***********************************/
/***/ (() => {

eval("const startBtn = document.getElementById(\"startBtn\");\r\nconst preview = document.getElementById(\"preview\");\r\n\r\nlet stream;\r\nlet recorder;\r\nlet videoSrc;\r\n\r\nconst handleDownloadBtn = () => {\r\n    const a = document.createElement(\"a\");\r\n    a.href=videoSrc;\r\n    a.download=\"MyRecording.webm\";\r\n    document.body.appendChild(a);\r\n    a.click();\r\n}\r\n\r\nconst handleStopBtn = () => {\r\n    startBtn.innerText = \"Download Record\";\r\n    \r\n    recorder.stop();    \r\n    startBtn.removeEventListener(\"click\", handleStopBtn);\r\n    startBtn.addEventListener(\"click\", handleDownloadBtn);\r\n    \r\n}\r\n\r\nconst handleStartBtn = () =>{\r\n    startBtn.innerText = \"Stop Recording\";\r\n\r\n    recorder = new MediaRecorder(stream);\r\n    recorder.ondataavailable = (e) => {\r\n        videoSrc = URL.createObjectURL(e.data);\r\n        preview.src = videoSrc;\r\n        preview.srcObject = null;\r\n        preview.loop = true;\r\n        preview.play();\r\n    };\r\n\r\n    recorder.start();\r\n    startBtn.removeEventListener(\"click\", handleStartBtn);\r\n    startBtn.addEventListener(\"click\", handleStopBtn);\r\n    \r\n}\r\n\r\nconst init = async() =>{\r\n    stream = await navigator.mediaDevices.getUserMedia({\r\n        video: { width: 100, height: 200},\r\n        audio: true,\r\n    });\r\n    preview.srcObject = stream;\r\n    preview.play();\r\n}\r\n\r\n//init();\r\n\r\nstartBtn.addEventListener(\"click\", handleStartBtn);\r\n\n\n//# sourceURL=webpack://wetube/./src/client/js/recorder.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/recorder.js"]();
/******/ 	
/******/ })()
;