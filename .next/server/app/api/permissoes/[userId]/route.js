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
exports.id = "app/api/permissoes/[userId]/route";
exports.ids = ["app/api/permissoes/[userId]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fpermissoes%2F%5BuserId%5D%2Froute&page=%2Fapi%2Fpermissoes%2F%5BuserId%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpermissoes%2F%5BuserId%5D%2Froute.ts&appDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fpermissoes%2F%5BuserId%5D%2Froute&page=%2Fapi%2Fpermissoes%2F%5BuserId%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpermissoes%2F%5BuserId%5D%2Froute.ts&appDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_virtualmachine_Desktop_Documentos_Projetos_prefeitura_lambari_codigo_fonte_app_api_permissoes_userId_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/permissoes/[userId]/route.ts */ \"(rsc)/./app/api/permissoes/[userId]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/permissoes/[userId]/route\",\n        pathname: \"/api/permissoes/[userId]\",\n        filename: \"route\",\n        bundlePath: \"app/api/permissoes/[userId]/route\"\n    },\n    resolvedPagePath: \"/Users/virtualmachine/Desktop/Documentos/Projetos /prefeitura_lambari_codigo_fonte/app/api/permissoes/[userId]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_virtualmachine_Desktop_Documentos_Projetos_prefeitura_lambari_codigo_fonte_app_api_permissoes_userId_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/permissoes/[userId]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZwZXJtaXNzb2VzJTJGJTVCdXNlcklkJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZwZXJtaXNzb2VzJTJGJTVCdXNlcklkJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcGVybWlzc29lcyUyRiU1QnVzZXJJZCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnZpcnR1YWxtYWNoaW5lJTJGRGVza3RvcCUyRkRvY3VtZW50b3MlMkZQcm9qZXRvcyUyMCUyRnByZWZlaXR1cmFfbGFtYmFyaV9jb2RpZ29fZm9udGUlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGdmlydHVhbG1hY2hpbmUlMkZEZXNrdG9wJTJGRG9jdW1lbnRvcyUyRlByb2pldG9zJTIwJTJGcHJlZmVpdHVyYV9sYW1iYXJpX2NvZGlnb19mb250ZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDdUU7QUFDcEo7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHAvPzMxODUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL3ZpcnR1YWxtYWNoaW5lL0Rlc2t0b3AvRG9jdW1lbnRvcy9Qcm9qZXRvcyAvcHJlZmVpdHVyYV9sYW1iYXJpX2NvZGlnb19mb250ZS9hcHAvYXBpL3Blcm1pc3NvZXMvW3VzZXJJZF0vcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3Blcm1pc3NvZXMvW3VzZXJJZF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9wZXJtaXNzb2VzL1t1c2VySWRdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9wZXJtaXNzb2VzL1t1c2VySWRdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL3ZpcnR1YWxtYWNoaW5lL0Rlc2t0b3AvRG9jdW1lbnRvcy9Qcm9qZXRvcyAvcHJlZmVpdHVyYV9sYW1iYXJpX2NvZGlnb19mb250ZS9hcHAvYXBpL3Blcm1pc3NvZXMvW3VzZXJJZF0vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3Blcm1pc3NvZXMvW3VzZXJJZF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fpermissoes%2F%5BuserId%5D%2Froute&page=%2Fapi%2Fpermissoes%2F%5BuserId%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpermissoes%2F%5BuserId%5D%2Froute.ts&appDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/permissoes/[userId]/route.ts":
/*!**********************************************!*\
  !*** ./app/api/permissoes/[userId]/route.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth-options */ \"(rsc)/./lib/auth-options.ts\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/cache */ \"(rsc)/./node_modules/next/cache.js\");\n/* harmony import */ var next_cache__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_cache__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nasync function GET(req, { params }) {\n    try {\n        const permissoes = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.prisma.permissao.findMany({\n            where: {\n                userId: params.userId\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json(permissoes);\n    } catch (error) {\n        console.error(\"Erro ao buscar permiss\\xf5es:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n            error: \"Erro ao buscar permiss\\xf5es\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function PUT(req, { params }) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_lib_auth_options__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n        if (!session || session.user.role !== \"ADMIN\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n                error: \"N\\xe3o autorizado\"\n            }, {\n                status: 401\n            });\n        }\n        const body = await req.json();\n        const { secao, permitido } = body;\n        if (!secao) {\n            return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n                error: \"Se\\xe7\\xe3o \\xe9 obrigat\\xf3ria\"\n            }, {\n                status: 400\n            });\n        }\n        const permissao = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.prisma.permissao.upsert({\n            where: {\n                userId_secao: {\n                    userId: params.userId,\n                    secao: secao\n                }\n            },\n            update: {\n                permitido\n            },\n            create: {\n                userId: params.userId,\n                secao,\n                permitido: permitido !== undefined ? permitido : true\n            }\n        });\n        (0,next_cache__WEBPACK_IMPORTED_MODULE_4__.revalidatePath)(\"/admin\");\n        return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json(permissao);\n    } catch (error) {\n        console.error(\"Erro ao atualizar permiss\\xe3o:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n            error: \"Erro ao atualizar permiss\\xe3o\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Blcm1pc3NvZXMvW3VzZXJJZF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQTZDO0FBQ0k7QUFDZjtBQUNzQjtBQUNaO0FBRXJDLGVBQWVLLElBQ3BCQyxHQUFnQixFQUNoQixFQUFFQyxNQUFNLEVBQWtDO0lBRTFDLElBQUk7UUFDRixNQUFNQyxhQUFhLE1BQU1OLDJDQUFNQSxDQUFDTyxTQUFTLENBQUNDLFFBQVEsQ0FBQztZQUNqREMsT0FBTztnQkFBRUMsUUFBUUwsT0FBT0ssTUFBTTtZQUFDO1FBQ2pDO1FBRUEsT0FBT1QscURBQVlBLENBQUNVLElBQUksQ0FBQ0w7SUFDM0IsRUFBRSxPQUFPTSxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxpQ0FBOEJBO1FBQzVDLE9BQU9YLHFEQUFZQSxDQUFDVSxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBNEIsR0FDckM7WUFBRUUsUUFBUTtRQUFJO0lBRWxCO0FBQ0Y7QUFFTyxlQUFlQyxJQUNwQlgsR0FBZ0IsRUFDaEIsRUFBRUMsTUFBTSxFQUFrQztJQUUxQyxJQUFJO1FBQ0YsTUFBTVcsVUFBVSxNQUFNbEIsMkRBQWdCQSxDQUFDQywwREFBV0E7UUFFbEQsSUFBSSxDQUFDaUIsV0FBV0EsUUFBUUMsSUFBSSxDQUFDQyxJQUFJLEtBQUssU0FBUztZQUM3QyxPQUFPakIscURBQVlBLENBQUNVLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFpQixHQUFHO2dCQUFFRSxRQUFRO1lBQUk7UUFDdEU7UUFFQSxNQUFNSyxPQUFPLE1BQU1mLElBQUlPLElBQUk7UUFDM0IsTUFBTSxFQUFFUyxLQUFLLEVBQUVDLFNBQVMsRUFBRSxHQUFHRjtRQUU3QixJQUFJLENBQUNDLE9BQU87WUFDVixPQUFPbkIscURBQVlBLENBQUNVLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBc0IsR0FDL0I7Z0JBQUVFLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU1QLFlBQVksTUFBTVAsMkNBQU1BLENBQUNPLFNBQVMsQ0FBQ2UsTUFBTSxDQUFDO1lBQzlDYixPQUFPO2dCQUNMYyxjQUFjO29CQUNaYixRQUFRTCxPQUFPSyxNQUFNO29CQUNyQlUsT0FBT0E7Z0JBQ1Q7WUFDRjtZQUNBSSxRQUFRO2dCQUFFSDtZQUFVO1lBQ3BCSSxRQUFRO2dCQUNOZixRQUFRTCxPQUFPSyxNQUFNO2dCQUNyQlU7Z0JBQ0FDLFdBQVdBLGNBQWNLLFlBQVlMLFlBQVk7WUFDbkQ7UUFDRjtRQUVBbkIsMERBQWNBLENBQUM7UUFFZixPQUFPRCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDSjtJQUMzQixFQUFFLE9BQU9LLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLG1DQUFnQ0E7UUFDOUMsT0FBT1gscURBQVlBLENBQUNVLElBQUksQ0FDdEI7WUFBRUMsT0FBTztRQUE4QixHQUN2QztZQUFFRSxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcC8uL2FwcC9hcGkvcGVybWlzc29lcy9bdXNlcklkXS9yb3V0ZS50cz9hYzg3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL2xpYi9hdXRoLW9wdGlvbnNcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9kYlwiO1xuaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKFxuICByZXE6IE5leHRSZXF1ZXN0LFxuICB7IHBhcmFtcyB9OiB7IHBhcmFtczogeyB1c2VySWQ6IHN0cmluZyB9IH1cbikge1xuICB0cnkge1xuICAgIGNvbnN0IHBlcm1pc3NvZXMgPSBhd2FpdCBwcmlzbWEucGVybWlzc2FvLmZpbmRNYW55KHtcbiAgICAgIHdoZXJlOiB7IHVzZXJJZDogcGFyYW1zLnVzZXJJZCB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHBlcm1pc3NvZXMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvIGFvIGJ1c2NhciBwZXJtaXNzw7VlczpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6IFwiRXJybyBhbyBidXNjYXIgcGVybWlzc8O1ZXNcIiB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUFVUKFxuICByZXE6IE5leHRSZXF1ZXN0LFxuICB7IHBhcmFtcyB9OiB7IHBhcmFtczogeyB1c2VySWQ6IHN0cmluZyB9IH1cbikge1xuICB0cnkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcblxuICAgIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gXCJBRE1JTlwiKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJOw6NvIGF1dG9yaXphZG9cIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xuICAgIGNvbnN0IHsgc2VjYW8sIHBlcm1pdGlkbyB9ID0gYm9keTtcblxuICAgIGlmICghc2VjYW8pIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogXCJTZcOnw6NvIMOpIG9icmlnYXTDs3JpYVwiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJtaXNzYW8gPSBhd2FpdCBwcmlzbWEucGVybWlzc2FvLnVwc2VydCh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB1c2VySWRfc2VjYW86IHtcbiAgICAgICAgICB1c2VySWQ6IHBhcmFtcy51c2VySWQsXG4gICAgICAgICAgc2VjYW86IHNlY2FvLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHVwZGF0ZTogeyBwZXJtaXRpZG8gfSxcbiAgICAgIGNyZWF0ZToge1xuICAgICAgICB1c2VySWQ6IHBhcmFtcy51c2VySWQsXG4gICAgICAgIHNlY2FvLFxuICAgICAgICBwZXJtaXRpZG86IHBlcm1pdGlkbyAhPT0gdW5kZWZpbmVkID8gcGVybWl0aWRvIDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXZhbGlkYXRlUGF0aChcIi9hZG1pblwiKTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihwZXJtaXNzYW8pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvIGFvIGF0dWFsaXphciBwZXJtaXNzw6NvOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogXCJFcnJvIGFvIGF0dWFsaXphciBwZXJtaXNzw6NvXCIgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJwcmlzbWEiLCJOZXh0UmVzcG9uc2UiLCJyZXZhbGlkYXRlUGF0aCIsIkdFVCIsInJlcSIsInBhcmFtcyIsInBlcm1pc3NvZXMiLCJwZXJtaXNzYW8iLCJmaW5kTWFueSIsIndoZXJlIiwidXNlcklkIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsInN0YXR1cyIsIlBVVCIsInNlc3Npb24iLCJ1c2VyIiwicm9sZSIsImJvZHkiLCJzZWNhbyIsInBlcm1pdGlkbyIsInVwc2VydCIsInVzZXJJZF9zZWNhbyIsInVwZGF0ZSIsImNyZWF0ZSIsInVuZGVmaW5lZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/permissoes/[userId]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth-options.ts":
/*!*****************************!*\
  !*** ./lib/auth-options.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(_lib_db__WEBPACK_IMPORTED_MODULE_2__.prisma),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Senha\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const user = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    },\n                    include: {\n                        secretaria: true\n                    }\n                });\n                if (!user) return null;\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, user.password);\n                if (!isValid) return null;\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role,\n                    secretariaId: user.secretariaId,\n                    secretariaNome: user.secretaria?.nome\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n                token.secretariaId = user.secretariaId;\n                token.secretariaNome = user.secretariaNome;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                session.user.secretariaId = token.secretariaId;\n                session.user.secretariaNome = token.secretariaNome;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/admin/login\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC1vcHRpb25zLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNrRTtBQUNSO0FBQ3hCO0FBQ0o7QUFFdkIsTUFBTUksY0FBK0I7SUFDMUNDLFNBQVNKLHdFQUFhQSxDQUFDQywyQ0FBTUE7SUFDN0JJLFdBQVc7UUFDVE4sMkVBQW1CQSxDQUFDO1lBQ2xCTyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFTQyxNQUFNO2dCQUFXO1lBQy9DO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pELE9BQU87Z0JBQ1Q7Z0JBQ0EsTUFBTUUsT0FBTyxNQUFNWiwyQ0FBTUEsQ0FBQ1ksSUFBSSxDQUFDQyxVQUFVLENBQUM7b0JBQ3hDQyxPQUFPO3dCQUFFUCxPQUFPRCxZQUFZQyxLQUFLO29CQUFDO29CQUNsQ1EsU0FBUzt3QkFBRUMsWUFBWTtvQkFBSztnQkFDOUI7Z0JBQ0EsSUFBSSxDQUFDSixNQUFNLE9BQU87Z0JBQ2xCLE1BQU1LLFVBQVUsTUFBTWhCLHVEQUFjLENBQUNLLFlBQVlJLFFBQVEsRUFBRUUsS0FBS0YsUUFBUTtnQkFDeEUsSUFBSSxDQUFDTyxTQUFTLE9BQU87Z0JBQ3JCLE9BQU87b0JBQ0xFLElBQUlQLEtBQUtPLEVBQUU7b0JBQ1haLE9BQU9LLEtBQUtMLEtBQUs7b0JBQ2pCRixNQUFNTyxLQUFLUCxJQUFJO29CQUNmZSxNQUFNUixLQUFLUSxJQUFJO29CQUNmQyxjQUFjVCxLQUFLUyxZQUFZO29CQUMvQkMsZ0JBQWdCVixLQUFLSSxVQUFVLEVBQUVPO2dCQUNuQztZQUNGO1FBQ0Y7S0FDRDtJQUNEQyxTQUFTO1FBQUVDLFVBQVU7SUFBTTtJQUMzQkMsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFaEIsSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1JnQixNQUFNVCxFQUFFLEdBQUdQLEtBQUtPLEVBQUU7Z0JBQ2xCUyxNQUFNUixJQUFJLEdBQUcsS0FBY0EsSUFBSTtnQkFDL0JRLE1BQU1QLFlBQVksR0FBRyxLQUFjQSxZQUFZO2dCQUMvQ08sTUFBTU4sY0FBYyxHQUFHLEtBQWNBLGNBQWM7WUFDckQ7WUFDQSxPQUFPTTtRQUNUO1FBQ0EsTUFBTUosU0FBUSxFQUFFQSxPQUFPLEVBQUVJLEtBQUssRUFBRTtZQUM5QixJQUFJSixRQUFRWixJQUFJLEVBQUU7Z0JBQ2ZZLFFBQVFaLElBQUksQ0FBU08sRUFBRSxHQUFHUyxNQUFNVCxFQUFFO2dCQUNsQ0ssUUFBUVosSUFBSSxDQUFTUSxJQUFJLEdBQUdRLE1BQU1SLElBQUk7Z0JBQ3RDSSxRQUFRWixJQUFJLENBQVNTLFlBQVksR0FBR08sTUFBTVAsWUFBWTtnQkFDdERHLFFBQVFaLElBQUksQ0FBU1UsY0FBYyxHQUFHTSxNQUFNTixjQUFjO1lBQzdEO1lBQ0EsT0FBT0U7UUFDVDtJQUNGO0lBQ0FLLE9BQU87UUFDTEMsUUFBUTtJQUNWO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcC8uL2xpYi9hdXRoLW9wdGlvbnMudHM/YWE3MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gXCJAbmV4dC1hdXRoL3ByaXNtYS1hZGFwdGVyXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvZGJcIjtcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xuICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksXG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogXCJjcmVkZW50aWFsc1wiLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlNlbmhhXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgd2hlcmU6IHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0sXG4gICAgICAgICAgaW5jbHVkZTogeyBzZWNyZXRhcmlhOiB0cnVlIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdXNlcikgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG4gICAgICAgIGlmICghaXNWYWxpZCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICBzZWNyZXRhcmlhSWQ6IHVzZXIuc2VjcmV0YXJpYUlkLFxuICAgICAgICAgIHNlY3JldGFyaWFOb21lOiB1c2VyLnNlY3JldGFyaWE/Lm5vbWVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICBzZXNzaW9uOiB7IHN0cmF0ZWd5OiBcImp3dFwiIH0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcbiAgICAgICAgdG9rZW4ucm9sZSA9ICh1c2VyIGFzIGFueSkucm9sZTtcbiAgICAgICAgdG9rZW4uc2VjcmV0YXJpYUlkID0gKHVzZXIgYXMgYW55KS5zZWNyZXRhcmlhSWQ7XG4gICAgICAgIHRva2VuLnNlY3JldGFyaWFOb21lID0gKHVzZXIgYXMgYW55KS5zZWNyZXRhcmlhTm9tZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAoc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5pZCA9IHRva2VuLmlkO1xuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkucm9sZSA9IHRva2VuLnJvbGU7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5zZWNyZXRhcmlhSWQgPSB0b2tlbi5zZWNyZXRhcmlhSWQ7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5zZWNyZXRhcmlhTm9tZSA9IHRva2VuLnNlY3JldGFyaWFOb21lO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfVxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogXCIvYWRtaW4vbG9naW5cIlxuICB9XG59O1xuIl0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJQcmlzbWFBZGFwdGVyIiwicHJpc21hIiwiYmNyeXB0IiwiYXV0aE9wdGlvbnMiLCJhZGFwdGVyIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpbmNsdWRlIiwic2VjcmV0YXJpYSIsImlzVmFsaWQiLCJjb21wYXJlIiwiaWQiLCJyb2xlIiwic2VjcmV0YXJpYUlkIiwic2VjcmV0YXJpYU5vbWUiLCJub21lIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJwYWdlcyIsInNpZ25JbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth-options.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTZDO0FBRTdDLE1BQU1DLGtCQUFrQkM7QUFJakIsTUFBTUMsU0FBU0YsZ0JBQWdCRSxNQUFNLElBQUksSUFBSUgsd0RBQVlBLEdBQUU7QUFFbEUsSUFBSUksSUFBeUIsRUFBY0gsZ0JBQWdCRSxNQUFNLEdBQUdBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwLy4vbGliL2RiLnRzPzFkZjAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7XG4gIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/IG5ldyBQcmlzbWFDbGllbnQoKVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYVxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fpermissoes%2F%5BuserId%5D%2Froute&page=%2Fapi%2Fpermissoes%2F%5BuserId%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpermissoes%2F%5BuserId%5D%2Froute.ts&appDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();