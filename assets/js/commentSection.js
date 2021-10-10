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

eval("const form = document.getElementById(\"commentForm\");\r\n\r\nconst videoContainer = document.getElementById(\"videoContainer\");\r\n\r\n\r\n\r\n\r\nconst addComment = (text, commentId) =>{\r\n    const videoComment=document.querySelector(\".video__comments ul\");\r\n    const li = document.createElement(\"li\");\r\n    const i = document.createElement(\"i\");\r\n    const span = document.createElement(\"span\");\r\n    const trashIcon = document.createElement(\"i\");\r\n    \r\n\r\n    // const span2 = dcoument.createElement(\"span2\");\r\n    \r\n    i.className=\"class fas fa-comments\";\r\n    trashIcon.className=\"class fas fa-trash-alt\";\r\n    li.className=\"video__comment\";\r\n    li.dataset.id = commentId;\r\n\r\n    span.innerText = `${text}`;\r\n    li.appendChild(i);\r\n    li.appendChild(span);\r\n    li.appendChild(trashIcon);\r\n    \r\n    videoComment.prepend(li);\r\n    trashIcon.addEventListener(\"click\", handleDelete);\r\n    // console.log(videoComment);\r\n}\r\nconst handleDelete = async(event) =>{\r\n    const videoComment = document.querySelector(\".video__comments ul\");\r\n    li=event.currentTarget.parentNode;\r\n    commentId=li.dataset.id\r\n\r\n    videoComment.removeChild(li);\r\n    await fetch(`/api/${commentId}/comment`,{\r\n        method:\"DELETE\",\r\n    });\r\n    \r\n}\r\n\r\nconst handleSubmit = async(event) => {\r\n    const textarea = form.querySelector(\"textarea\");\r\n    const formBtn = form.querySelector(\"button\");\r\n\r\n    event.preventDefault();\r\n    const text = textarea.value;\r\n    const videoId = videoContainer.dataset.id;\r\n    \r\n    if(text==\"\"){\r\n        return ;\r\n    }\r\n\r\n    const response = await fetch(`/api/videos/${videoId}/comment`,{\r\n        method : \"POST\",\r\n        headers: {\r\n          \"Content-Type\" : \"application/json\",\r\n        },\r\n        body : JSON.stringify({ text : text }),\r\n    });\r\n    textarea.value=\"\";\r\n    const status = response.status;\r\n    \r\n    \r\n    if(status==201){\r\n        const json=await response.json();\r\n        addComment(text, json.commentId);\r\n        \r\n    }\r\n    \r\n    //window.location.reload();\r\n\r\n    \r\n}\r\n\r\nif(form){\r\n    form.addEventListener(\"submit\", handleSubmit);\r\n}\r\n\r\n\n\n//# sourceURL=webpack://wetube/./src/client/js/commentSection.js?");

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