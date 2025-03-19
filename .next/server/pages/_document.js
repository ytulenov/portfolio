"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./lib/theme.js":
/*!**********************!*\
  !*** ./lib/theme.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/theme-tools */ \"@chakra-ui/theme-tools\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__, _chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1__]);\n([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__, _chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n// Define colors directly from env vars\nconst OVERALL_BG_LIGHT = \"#f0fae5\";\nconst OVERALL_BG_DARK = \"#0f051a\";\nconst styles = {\n    global: (props)=>({\n            body: {\n                bg: (0,_chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1__.mode)(OVERALL_BG_LIGHT, OVERALL_BG_DARK)(props),\n                fontFamily: 'Roboto'\n            }\n        })\n};\nconst fonts = {\n    body: 'Roboto'\n};\nconst config = {\n    initialColorMode: 'dark',\n    useSystemColorMode: true\n};\nconst theme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.extendTheme)({\n    config,\n    styles,\n    fonts\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvdGhlbWUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQStDO0FBQ0Q7QUFFOUMsdUNBQXVDO0FBQ3ZDLE1BQU1FLG1CQUFtQkMsU0FBd0M7QUFDakUsTUFBTUcsa0JBQWtCSCxTQUF1QztBQUcvRCxNQUFNSyxTQUFTO0lBQ2JDLFFBQVEsQ0FBQ0MsUUFBVztZQUNsQkMsTUFBTTtnQkFDSkMsSUFBSVgsNERBQUlBLENBQUNDLGtCQUFrQkksaUJBQWlCSTtnQkFDNUNHLFlBQVk7WUFDZDtRQUNGO0FBQ0Y7QUFJQSxNQUFNQyxRQUFRO0lBQ1pILE1BQU07QUFDUjtBQUdBLE1BQU1JLFNBQVM7SUFDYkMsa0JBQWtCO0lBQ2xCQyxvQkFBb0I7QUFDdEI7QUFFQSxNQUFNQyxRQUFRbEIsNkRBQVdBLENBQUM7SUFBRWU7SUFBUVA7SUFBUU07QUFBTTtBQUVsRCxpRUFBZUksS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsiL1VzZXJzL3llcmtpbnR1bGVub3YvcHJvZ3JhbW1pbmcvd2ViL3BvcnRmb2xpby9saWIvdGhlbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXh0ZW5kVGhlbWUgfSBmcm9tICdAY2hha3JhLXVpL3JlYWN0JztcbmltcG9ydCB7IG1vZGUgfSBmcm9tICdAY2hha3JhLXVpL3RoZW1lLXRvb2xzJztcblxuLy8gRGVmaW5lIGNvbG9ycyBkaXJlY3RseSBmcm9tIGVudiB2YXJzXG5jb25zdCBPVkVSQUxMX0JHX0xJR0hUID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfT1ZFUkFMTF9CR19MSUdIVDtcbmNvbnN0IE9WRVJBTExfQkdfREFSSyA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX09WRVJBTExfQkdfREFSSztcblxuXG5jb25zdCBzdHlsZXMgPSB7XG4gIGdsb2JhbDogKHByb3BzKSA9PiAoe1xuICAgIGJvZHk6IHsgXG4gICAgICBiZzogbW9kZShPVkVSQUxMX0JHX0xJR0hULCBPVkVSQUxMX0JHX0RBUkspKHByb3BzKSxcbiAgICAgIGZvbnRGYW1pbHk6ICdSb2JvdG8nLCAvLyBEZWZhdWx0IGZvbnQgZm9yIGJvZHkgdGV4dFxuICAgIH1cbiAgfSksIFxufTtcblxuXG5cbmNvbnN0IGZvbnRzID0ge1xuICBib2R5OiAnUm9ib3RvJywgLy8gRGVmYXVsdCBmb250IGZvciBib2R5IHRleHQgb25seVxufTtcblxuXG5jb25zdCBjb25maWcgPSB7XG4gIGluaXRpYWxDb2xvck1vZGU6ICdkYXJrJyxcbiAgdXNlU3lzdGVtQ29sb3JNb2RlOiB0cnVlLFxufTtcblxuY29uc3QgdGhlbWUgPSBleHRlbmRUaGVtZSh7IGNvbmZpZywgc3R5bGVzLCBmb250cyB9KTtcblxuZXhwb3J0IGRlZmF1bHQgdGhlbWU7Il0sIm5hbWVzIjpbImV4dGVuZFRoZW1lIiwibW9kZSIsIk9WRVJBTExfQkdfTElHSFQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfT1ZFUkFMTF9CR19MSUdIVCIsIk9WRVJBTExfQkdfREFSSyIsIk5FWFRfUFVCTElDX09WRVJBTExfQkdfREFSSyIsInN0eWxlcyIsImdsb2JhbCIsInByb3BzIiwiYm9keSIsImJnIiwiZm9udEZhbWlseSIsImZvbnRzIiwiY29uZmlnIiwiaW5pdGlhbENvbG9yTW9kZSIsInVzZVN5c3RlbUNvbG9yTW9kZSIsInRoZW1lIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./lib/theme.js\n");

/***/ }),

/***/ "./pages/_document.js":
/*!****************************!*\
  !*** ./pages/_document.js ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Document)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/document */ \"./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/theme */ \"./lib/theme.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__, _lib_theme__WEBPACK_IMPORTED_MODULE_3__]);\n([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__, _lib_theme__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\nclass Document extends (next_document__WEBPACK_IMPORTED_MODULE_2___default()) {\n    render() {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Html, {\n            lang: \"en\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Head, {}, void 0, false, {\n                    fileName: \"/Users/yerkintulenov/programming/web/portfolio/pages/_document.js\",\n                    lineNumber: 9,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.ColorModeScript, {\n                            initialColorMode: _lib_theme__WEBPACK_IMPORTED_MODULE_3__[\"default\"].config.initialColorMode\n                        }, void 0, false, {\n                            fileName: \"/Users/yerkintulenov/programming/web/portfolio/pages/_document.js\",\n                            lineNumber: 11,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Main, {}, void 0, false, {\n                            fileName: \"/Users/yerkintulenov/programming/web/portfolio/pages/_document.js\",\n                            lineNumber: 12,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.NextScript, {}, void 0, false, {\n                            fileName: \"/Users/yerkintulenov/programming/web/portfolio/pages/_document.js\",\n                            lineNumber: 13,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/yerkintulenov/programming/web/portfolio/pages/_document.js\",\n                    lineNumber: 10,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/yerkintulenov/programming/web/portfolio/pages/_document.js\",\n            lineNumber: 8,\n            columnNumber: 7\n        }, this);\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fZG9jdW1lbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDd0I7QUFDMUM7QUFFbEIsTUFBTU8saUJBQWlCTixzREFBWUE7SUFDaERPLFNBQVM7UUFDUCxxQkFDRSw4REFBQ04sK0NBQUlBO1lBQUNPLE1BQUs7OzhCQUNULDhEQUFDTiwrQ0FBSUE7Ozs7OzhCQUNMLDhEQUFDTzs7c0NBQ0MsOERBQUNWLDZEQUFlQTs0QkFBQ1csa0JBQWtCTCx5REFBWSxDQUFDSyxnQkFBZ0I7Ozs7OztzQ0FDaEUsOERBQUNQLCtDQUFJQTs7Ozs7c0NBQ0wsOERBQUNDLHFEQUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJbkI7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL3llcmtpbnR1bGVub3YvcHJvZ3JhbW1pbmcvd2ViL3BvcnRmb2xpby9wYWdlcy9fZG9jdW1lbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sb3JNb2RlU2NyaXB0IH0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCc7XG5pbXBvcnQgTmV4dERvY3VtZW50LCB7IEh0bWwsIEhlYWQsIE1haW4sIE5leHRTY3JpcHQgfSBmcm9tICduZXh0L2RvY3VtZW50JztcbmltcG9ydCB0aGVtZSBmcm9tICcuLi9saWIvdGhlbWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIE5leHREb2N1bWVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEh0bWwgbGFuZz1cImVuXCI+XG4gICAgICAgIDxIZWFkLz5cbiAgICAgICAgPGJvZHk+XG4gICAgICAgICAgPENvbG9yTW9kZVNjcmlwdCBpbml0aWFsQ29sb3JNb2RlPXt0aGVtZS5jb25maWcuaW5pdGlhbENvbG9yTW9kZX0gLz5cbiAgICAgICAgICA8TWFpbiAvPlxuICAgICAgICAgIDxOZXh0U2NyaXB0IC8+XG4gICAgICAgIDwvYm9keT5cbiAgICAgIDwvSHRtbD5cbiAgICApO1xuICB9XG59Il0sIm5hbWVzIjpbIkNvbG9yTW9kZVNjcmlwdCIsIk5leHREb2N1bWVudCIsIkh0bWwiLCJIZWFkIiwiTWFpbiIsIk5leHRTY3JpcHQiLCJ0aGVtZSIsIkRvY3VtZW50IiwicmVuZGVyIiwibGFuZyIsImJvZHkiLCJpbml0aWFsQ29sb3JNb2RlIiwiY29uZmlnIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_document.js\n");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("@chakra-ui/react");;

/***/ }),

/***/ "@chakra-ui/theme-tools":
/*!*****************************************!*\
  !*** external "@chakra-ui/theme-tools" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = import("@chakra-ui/theme-tools");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_document.js")));
module.exports = __webpack_exports__;

})();