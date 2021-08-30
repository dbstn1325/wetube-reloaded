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

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("const video = document.querySelector(\"video\");\r\nconst  playBtn = document.getElementById(\"play\");\r\nconst  muteBtn = document.getElementById(\"mute\");\r\nconst  currenTime = document.getElementById(\"currenTime\");\r\nconst  totalTime = document.getElementById(\"totalTime\");\r\nconst  volumeRange = document.getElementById(\"volume\");\r\nconst timeLine = document.getElementById(\"timeLine\");\r\n\r\nlet volumeValue = 0.5;\r\nvideo.volume = volumeValue;\r\n\r\nconst handlePlayClick = (e) =>{\r\n    if(video.paused){   //play라는버튼이눌렀을때(addEvent) video가멈춰져있다면\r\n        video.play();\r\n    } else{\r\n        video.pause();\r\n    }\r\n    playBtn.innerText = video.paused ? \"Play\" : \"Pause\";\r\n}\r\n\r\nconst handleMute = (e) =>{\r\n    muteBtn.innerText = !video.muted ? \"UnMute\" : \"Mute\";   //글자먼저바꾸고 음소거 시키기\r\n    if(!video.muted){\r\n        video.muted=true;\r\n    }else{\r\n        video.muted=false;\r\n    }\r\n\r\n    volumeRange.value = video.muted ? 0 : volumeValue;      //표시되는 볼륨\r\n}\r\n\r\nconst handleVolumeChange = (event) => {\r\n    const {\r\n        target : { value },\r\n    } = event;\r\n    if(video.muted){\r\n        video.muted=false;\r\n        muteBtn.innerText=\"Mute\";\r\n    }\r\n    volumeValue = value;\r\n    video.volume = value;               //실제볼륨\r\n}\r\n\r\n\r\n\r\nconst handlePlay = (e) => playBtn.innerText=\"Play\";\r\nconst handlePause = (e) => playBtn.innerText=\"Pasue\";\r\n\r\nconst formatTime = (seconds) => {\r\n    return new Date(seconds*1000).toISOString().substr(11, 8);\r\n}\r\nconst handleMetaData = () => {\r\n    totalTime.innerText = formatTime(Math.floor(video.duration));\r\n    timeLine.max=video.duration;\r\n}\r\nconst handleTimeUpdate = () => {\r\n    currenTime.innerText = formatTime(Math.floor(video.currentTime));\r\n    timeLine.value=video.currentTime;\r\n}\r\nconst handleTimeLineChange = (event) => {\r\n    const { \r\n        target : { value },\r\n    } = event;\r\n    video.currentTime=value;\r\n}\r\n\r\nplayBtn.addEventListener(\"click\", handlePlayClick);\r\nmuteBtn.addEventListener(\"click\", handleMute);\r\nvolumeRange.addEventListener(\"input\", handleVolumeChange);\r\nvideo.addEventListener(\"loadedmetadata\", handleMetaData);\r\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate);\r\ntimeLine.addEventListener(\"input\", handleTimeLineChange);\n\n//# sourceURL=webpack://wetube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;