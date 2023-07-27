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

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\nvar React = __webpack_require__(/*! react */ \"react\");\nvar ReactDOMServer = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\nvar AppServer = (__webpack_require__(/*! ../src/AppServer */ \"./src/AppServer.js\")[\"default\"]);\nvar app = express();\nvar PORT = process.env.PORT || 3001;\napp.use(function (req, res, next) {\n  res.header(\"Access-Control-Allow-Origin\", \"*\"); // update to match the domain you will make the request from\n  res.header(\"Access-Control-Allow-Headers\", \"Origin, X-Requested-With, Content-Type, Accept\");\n  next();\n});\napp.use(express.json());\napp.use(express.urlencoded({\n  extended: true\n}));\napp.get('/', function (req, res) {\n  console.log('GET req.params: ', req.params);\n  console.log('GET req.query: ', req.query);\n  var html = \"\\n    <!DOCTYPE html>\\n    <html lang=\\\"en\\\">\\n      <head>\\n        <meta charset=\\\"UTF-8\\\" />\\n        <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\" />\\n        <title>App Server</title>\\n      </head>\\n      <body>\\n        <div id=\\\"root\\\">You've reached the Risk Guard Demo Server</div>\\n      </body>\\n    </html>\";\n  res.send(html);\n});\napp.post('/', function (req, res) {\n  var data = req.body;\n  var content = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(AppServer, {\n    data: data\n  }));\n  res.send(content);\n  res.end();\n});\napp.listen(PORT, function () {\n  console.log(\"Server is listening on port \".concat(PORT));\n});\n\n//# sourceURL=webpack://riskguard+capture_demo_ot_im/./server/index.js?");

/***/ }),

/***/ "./src/AppServer.js":
/*!**************************!*\
  !*** ./src/AppServer.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AppServer)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./properties */ \"./src/properties.js\");\n\n\nfunction AppServer(props) {\n  var data = props.data;\n  var patientName = data.find(function (_ref) {\n    var name = _ref.name;\n    return name === \"PatientName\";\n  }).data[0].value;\n  var patientDOB = data.find(function (_ref2) {\n    var name = _ref2.name;\n    return name === \"PatientDOB\";\n  }).data[0].value;\n  var physicianName = data.find(function (_ref3) {\n    var name = _ref3.name;\n    return name === \"PhysicianName\";\n  }).data[0].value;\n  var accessionNumber = data.find(function (_ref4) {\n    var name = _ref4.name;\n    return name === \"AccessionNumber\";\n  }).data[0].value;\n  var dateCollected = data.find(function (_ref5) {\n    var name = _ref5.name;\n    return name === \"DateCollected\";\n  }).data[0].value;\n  var dateReceived = data.find(function (_ref6) {\n    var name = _ref6.name;\n    return name === \"DateReceived\";\n  }).data[0].value;\n  var dateCompleted = data.find(function (_ref7) {\n    var name = _ref7.name;\n    return name === \"DateCompleted\";\n  }).data[0].value;\n  var labName = data.find(function (_ref8) {\n    var name = _ref8.name;\n    return name === \"LabName\";\n  }).data[0].value;\n  var labAddress = data.find(function (_ref9) {\n    var name = _ref9.name;\n    return name === \"LabAddress\";\n  }).data[0].value;\n  var labPhone = data.find(function (_ref10) {\n    var name = _ref10.name;\n    return name === \"LabPhone\";\n  }).data[0].value;\n  var pathogensNames = data.find(function (_ref11) {\n    var name = _ref11.name;\n    return name === \"Pathogens_Name\";\n  }).data;\n  var pathogensResults = data.find(function (_ref12) {\n    var name = _ref12.name;\n    return name === \"Pathogens_Result\";\n  }).data;\n  var pathogensExpected = data.find(function (_ref13) {\n    var name = _ref13.name;\n    return name === \"Pathogens_Expected\";\n  }).data;\n  var pathogensIndicator = data.find(function (_ref14) {\n    var name = _ref14.name;\n    return name === \"Pathogens_Indicator\";\n  }).data;\n  var pathogenTypes = ['Bacterial Pathogens', 'Parasitic Pathogens', 'Viral Pathogens', 'H. pylori'];\n  var insertLabReportQuery = \"insert into lab_reports (patient_name, patient_dob, physician_name, accession_number, date_collected, date_received, date_completed, lab_name, lab_address, lab_phone) value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\";\n  var insertPathogensQuery = \"insert into lab_report_pathogens (report_id, pathogen_type, pathogen_name, pathogen_result, pathogen_expected, pathogen_indicator) value (?, ?, ?, ?, ?, ?)\";\n  var mysql = __webpack_require__(/*! mysql2 */ \"mysql2\");\n  var connection = mysql.createConnection({\n    host: _properties__WEBPACK_IMPORTED_MODULE_1__.properties.db_host,\n    port: _properties__WEBPACK_IMPORTED_MODULE_1__.properties.db_port,\n    user: _properties__WEBPACK_IMPORTED_MODULE_1__.properties.db_user,\n    password: _properties__WEBPACK_IMPORTED_MODULE_1__.properties.db_password,\n    database: _properties__WEBPACK_IMPORTED_MODULE_1__.properties.db_database\n  });\n  connection.connect(function (error) {\n    if (error) throw error;\n    console.log('\\nConnected to database with conneciton id ' + connection.threadId);\n  });\n  connection.execute(insertLabReportQuery, [patientName, patientDOB, physicianName, accessionNumber, dateCollected, dateReceived, dateCompleted, labName, labAddress, labPhone], function (error, results, fields) {\n    if (error) {\n      console.log(\"error: \", error);\n      throw error;\n    }\n    var reportId = results.insertId;\n    console.log('New lab report added with report Id: ', reportId);\n    var pathogenType = '';\n    for (var i = 0; i < pathogensNames.length; i++) {\n      if (pathogenTypes.includes(pathogensNames.at(i).value)) {\n        pathogenType = pathogensNames.at(i).value;\n        continue;\n      }\n      connection.execute(insertPathogensQuery, [reportId, pathogenType, pathogensNames.at(i).value, pathogensResults.at(i).value, pathogensExpected.at(i).value, pathogensIndicator.at(i).value], function (error, results, fields) {\n        if (error) throw error;\n        //console.log('Pathogen result added with pathogen Id: ', results.insertId); \n      });\n    }\n  });\n\n  return \"Successfully added extracted data into local database\";\n}\n\n//# sourceURL=webpack://riskguard+capture_demo_ot_im/./src/AppServer.js?");

/***/ }),

/***/ "./src/properties.js":
/*!***************************!*\
  !*** ./src/properties.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   properties: () => (/* binding */ properties)\n/* harmony export */ });\nvar properties = {\n  base_url: \"https://na-1-dev.api.opentext.com\",\n  css_url: \"https://css.na-1-dev.api.opentext.com\",\n  tenant_id: \"e6dd831e-ffc9-43ee-b5e8-3da002424d5a\",\n  username: \"smithani@opentext.com\",\n  password: \"ThinkVision2*\",\n  client_id: \"424R1i8qGN4wxH3wQNlL1tBl0gQZUiqJ\",\n  client_secret: \"Fsb1E67uIxF8bqtN\",\n  db_host: 'localhost',\n  db_port: '3306',\n  db_user: 'dbadmin',\n  db_password: 'ThinkVision1*',\n  db_database: 'imservicesdb',\n  server_url: 'http://localhost:3001/'\n};\n\n//# sourceURL=webpack://riskguard+capture_demo_ot_im/./src/properties.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "mysql2":
/*!*************************!*\
  !*** external "mysql2" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("mysql2");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom/server");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./server/index.js");
/******/ 	
/******/ })()
;