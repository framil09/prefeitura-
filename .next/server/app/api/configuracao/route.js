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
exports.id = "app/api/configuracao/route";
exports.ids = ["app/api/configuracao/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fconfiguracao%2Froute&page=%2Fapi%2Fconfiguracao%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fconfiguracao%2Froute.ts&appDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fconfiguracao%2Froute&page=%2Fapi%2Fconfiguracao%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fconfiguracao%2Froute.ts&appDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_virtualmachine_Desktop_Documentos_Projetos_prefeitura_lambari_codigo_fonte_app_api_configuracao_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/configuracao/route.ts */ \"(rsc)/./app/api/configuracao/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/configuracao/route\",\n        pathname: \"/api/configuracao\",\n        filename: \"route\",\n        bundlePath: \"app/api/configuracao/route\"\n    },\n    resolvedPagePath: \"/Users/virtualmachine/Desktop/Documentos/Projetos /prefeitura_lambari_codigo_fonte/app/api/configuracao/route.ts\",\n    nextConfigOutput,\n    userland: _Users_virtualmachine_Desktop_Documentos_Projetos_prefeitura_lambari_codigo_fonte_app_api_configuracao_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/configuracao/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjb25maWd1cmFjYW8lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmNvbmZpZ3VyYWNhbyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmNvbmZpZ3VyYWNhbyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnZpcnR1YWxtYWNoaW5lJTJGRGVza3RvcCUyRkRvY3VtZW50b3MlMkZQcm9qZXRvcyUyMCUyRnByZWZlaXR1cmFfbGFtYmFyaV9jb2RpZ29fZm9udGUlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGdmlydHVhbG1hY2hpbmUlMkZEZXNrdG9wJTJGRG9jdW1lbnRvcyUyRlByb2pldG9zJTIwJTJGcHJlZmVpdHVyYV9sYW1iYXJpX2NvZGlnb19mb250ZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDZ0U7QUFDN0k7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHAvP2M1ZWEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL3ZpcnR1YWxtYWNoaW5lL0Rlc2t0b3AvRG9jdW1lbnRvcy9Qcm9qZXRvcyAvcHJlZmVpdHVyYV9sYW1iYXJpX2NvZGlnb19mb250ZS9hcHAvYXBpL2NvbmZpZ3VyYWNhby9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY29uZmlndXJhY2FvL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY29uZmlndXJhY2FvXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9jb25maWd1cmFjYW8vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvdmlydHVhbG1hY2hpbmUvRGVza3RvcC9Eb2N1bWVudG9zL1Byb2pldG9zIC9wcmVmZWl0dXJhX2xhbWJhcmlfY29kaWdvX2ZvbnRlL2FwcC9hcGkvY29uZmlndXJhY2FvL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9jb25maWd1cmFjYW8vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fconfiguracao%2Froute&page=%2Fapi%2Fconfiguracao%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fconfiguracao%2Froute.ts&appDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/configuracao/route.ts":
/*!***************************************!*\
  !*** ./app/api/configuracao/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_auth_options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/auth-options */ \"(rsc)/./lib/auth-options.ts\");\nconst dynamic = \"force-dynamic\";\n\n\n\n\nasync function GET() {\n    try {\n        const config = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.configuracaoSite.findFirst();\n        if (!config) {\n            const newConfig = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.configuracaoSite.create({\n                data: {\n                    nomeCidade: \"Lambari\",\n                    slogan: \"Est\\xe2ncia Hidromineral\"\n                }\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(newConfig);\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(config);\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro ao buscar configura\\xe7\\xe3o\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(req) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_lib_auth_options__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session || session.user?.role !== \"ADMIN\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"N\\xe3o autorizado\"\n            }, {\n                status: 401\n            });\n        }\n        const body = await req.json();\n        // Busca ou cria a configuração\n        let config = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.configuracaoSite.findFirst();\n        if (!config) {\n            config = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.configuracaoSite.create({\n                data: {\n                    nomeCidade: body.nomeCidade || \"Lambari\",\n                    slogan: body.slogan || \"Est\\xe2ncia Hidromineral\",\n                    fotoSlogan: body.fotoSlogan || null,\n                    logoUrl: body.logoUrl || null,\n                    bannerUrl: body.bannerUrl || null,\n                    prefeito: body.prefeito || null,\n                    fotoPrefeito: body.fotoPrefeito || null,\n                    vicePrefeito: body.vicePrefeito || null,\n                    fotoVicePrefeito: body.fotoVicePrefeito || null,\n                    telefone: body.telefone || null,\n                    email: body.email || null,\n                    endereco: body.endereco || null,\n                    horarioAtendimento: body.horarioAtendimento || null,\n                    facebookUrl: body.facebookUrl || null,\n                    instagramUrl: body.instagramUrl || null,\n                    youtubeUrl: body.youtubeUrl || null\n                }\n            });\n        } else {\n            config = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.configuracaoSite.update({\n                where: {\n                    id: config.id\n                },\n                data: {\n                    nomeCidade: body.nomeCidade || config.nomeCidade,\n                    slogan: body.slogan || config.slogan,\n                    fotoSlogan: body.fotoSlogan !== undefined ? body.fotoSlogan : config.fotoSlogan,\n                    logoUrl: body.logoUrl !== undefined ? body.logoUrl : config.logoUrl,\n                    bannerUrl: body.bannerUrl !== undefined ? body.bannerUrl : config.bannerUrl,\n                    prefeito: body.prefeito || config.prefeito,\n                    fotoPrefeito: body.fotoPrefeito || config.fotoPrefeito,\n                    vicePrefeito: body.vicePrefeito || config.vicePrefeito,\n                    fotoVicePrefeito: body.fotoVicePrefeito || config.fotoVicePrefeito,\n                    telefone: body.telefone || config.telefone,\n                    email: body.email || config.email,\n                    endereco: body.endereco || config.endereco,\n                    horarioAtendimento: body.horarioAtendimento || config.horarioAtendimento,\n                    facebookUrl: body.facebookUrl || config.facebookUrl,\n                    instagramUrl: body.instagramUrl || config.instagramUrl,\n                    youtubeUrl: body.youtubeUrl || config.youtubeUrl\n                }\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(config, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Erro ao salvar configura\\xe7\\xe3o:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro ao salvar configura\\xe7\\xe3o\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFTLEdBQUduQixPQUFPbUIsU0FBUztvQkFDM0VDLFVBQVVKLEtBQUtJLFFBQVEsSUFBSXBCLE9BQU9vQixRQUFRO29CQUMxQ0MsY0FBY0wsS0FBS0ssWUFBWSxJQUFJckIsT0FBT3FCLFlBQVk7b0JBQ3REQyxjQUFjTixLQUFLTSxZQUFZLElBQUl0QixPQUFPc0IsWUFBWTtvQkFDdERDLGtCQUFrQlAsS0FBS08sZ0JBQWdCLElBQUl2QixPQUFPdUIsZ0JBQWdCO29CQUNsRUMsVUFBVVIsS0FBS1EsUUFBUSxJQUFJeEIsT0FBT3dCLFFBQVE7b0JBQzFDQyxPQUFPVCxLQUFLUyxLQUFLLElBQUl6QixPQUFPeUIsS0FBSztvQkFDakNDLFVBQVVWLEtBQUtVLFFBQVEsSUFBSTFCLE9BQU8wQixRQUFRO29CQUMxQ0Msb0JBQW9CWCxLQUFLVyxrQkFBa0IsSUFBSTNCLE9BQU8yQixrQkFBa0I7b0JBQ3hFQyxhQUFhWixLQUFLWSxXQUFXLElBQUk1QixPQUFPNEIsV0FBVztvQkFDbkRDLGNBQWNiLEtBQUthLFlBQVksSUFBSTdCLE9BQU82QixZQUFZO29CQUN0REMsWUFBWWQsS0FBS2MsVUFBVSxJQUFJOUIsT0FBTzhCLFVBQVU7Z0JBQ2xEO1lBQ0Y7UUFDRjtRQUVBLE9BQU9uQyxxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDUixRQUFRO1lBQUVVLFFBQVE7UUFBSTtJQUNqRCxFQUFFLE9BQU9ELE9BQU87UUFDZDBCLFFBQVExQixLQUFLLENBQUMsc0NBQWdDQTtRQUM5QyxPQUFPZCxxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBOEIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDbkY7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcC8uL2FwcC9hcGkvY29uZmlndXJhY2FvL3JvdXRlLnRzPzNlMWMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGR5bmFtaWMgPSBcImZvcmNlLWR5bmFtaWNcIjtcbmltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9kYlwiO1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGgtb3B0aW9uc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGNvbnN0IGNvbmZpZyA9IGF3YWl0IHByaXNtYS5jb25maWd1cmFjYW9TaXRlLmZpbmRGaXJzdCgpO1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICBjb25zdCBuZXdDb25maWcgPSBhd2FpdCBwcmlzbWEuY29uZmlndXJhY2FvU2l0ZS5jcmVhdGUoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgbm9tZUNpZGFkZTogXCJMYW1iYXJpXCIsXG4gICAgICAgICAgc2xvZ2FuOiBcIkVzdMOibmNpYSBIaWRyb21pbmVyYWxcIlxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihuZXdDb25maWcpO1xuICAgIH1cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oY29uZmlnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJFcnJvIGFvIGJ1c2NhciBjb25maWd1cmHDp8Ojb1wiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcbiAgICBpZiAoIXNlc3Npb24gfHwgc2Vzc2lvbi51c2VyPy5yb2xlICE9PSBcIkFETUlOXCIpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIk7Do28gYXV0b3JpemFkb1wiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKCk7XG5cbiAgICAvLyBCdXNjYSBvdSBjcmlhIGEgY29uZmlndXJhw6fDo29cbiAgICBsZXQgY29uZmlnID0gYXdhaXQgcHJpc21hLmNvbmZpZ3VyYWNhb1NpdGUuZmluZEZpcnN0KCk7XG5cbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgY29uZmlnID0gYXdhaXQgcHJpc21hLmNvbmZpZ3VyYWNhb1NpdGUuY3JlYXRlKHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIG5vbWVDaWRhZGU6IGJvZHkubm9tZUNpZGFkZSB8fCBcIkxhbWJhcmlcIixcbiAgICAgICAgICBzbG9nYW46IGJvZHkuc2xvZ2FuIHx8IFwiRXN0w6JuY2lhIEhpZHJvbWluZXJhbFwiLFxuICAgICAgICAgIGZvdG9TbG9nYW46IGJvZHkuZm90b1Nsb2dhbiB8fCBudWxsLFxuICAgICAgICAgIGxvZ29Vcmw6IGJvZHkubG9nb1VybCB8fCBudWxsLFxuICAgICAgICAgIGJhbm5lclVybDogYm9keS5iYW5uZXJVcmwgfHwgbnVsbCxcbiAgICAgICAgICBwcmVmZWl0bzogYm9keS5wcmVmZWl0byB8fCBudWxsLFxuICAgICAgICAgIGZvdG9QcmVmZWl0bzogYm9keS5mb3RvUHJlZmVpdG8gfHwgbnVsbCxcbiAgICAgICAgICB2aWNlUHJlZmVpdG86IGJvZHkudmljZVByZWZlaXRvIHx8IG51bGwsXG4gICAgICAgICAgZm90b1ZpY2VQcmVmZWl0bzogYm9keS5mb3RvVmljZVByZWZlaXRvIHx8IG51bGwsXG4gICAgICAgICAgdGVsZWZvbmU6IGJvZHkudGVsZWZvbmUgfHwgbnVsbCxcbiAgICAgICAgICBlbWFpbDogYm9keS5lbWFpbCB8fCBudWxsLFxuICAgICAgICAgIGVuZGVyZWNvOiBib2R5LmVuZGVyZWNvIHx8IG51bGwsXG4gICAgICAgICAgaG9yYXJpb0F0ZW5kaW1lbnRvOiBib2R5LmhvcmFyaW9BdGVuZGltZW50byB8fCBudWxsLFxuICAgICAgICAgIGZhY2Vib29rVXJsOiBib2R5LmZhY2Vib29rVXJsIHx8IG51bGwsXG4gICAgICAgICAgaW5zdGFncmFtVXJsOiBib2R5Lmluc3RhZ3JhbVVybCB8fCBudWxsLFxuICAgICAgICAgIHlvdXR1YmVVcmw6IGJvZHkueW91dHViZVVybCB8fCBudWxsXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcgPSBhd2FpdCBwcmlzbWEuY29uZmlndXJhY2FvU2l0ZS51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogY29uZmlnLmlkIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBub21lQ2lkYWRlOiBib2R5Lm5vbWVDaWRhZGUgfHwgY29uZmlnLm5vbWVDaWRhZGUsXG4gICAgICAgICAgc2xvZ2FuOiBib2R5LnNsb2dhbiB8fCBjb25maWcuc2xvZ2FuLFxuICAgICAgICAgIGZvdG9TbG9nYW46IGJvZHkuZm90b1Nsb2dhbiAhPT0gdW5kZWZpbmVkID8gYm9keS5mb3RvU2xvZ2FuIDogY29uZmlnLmZvdG9TbG9nYW4sXG4gICAgICAgICAgbG9nb1VybDogYm9keS5sb2dvVXJsICE9PSB1bmRlZmluZWQgPyBib2R5LmxvZ29VcmwgOiBjb25maWcubG9nb1VybCxcbiAgICAgICAgICBiYW5uZXJVcmw6IGJvZHkuYmFubmVyVXJsICE9PSB1bmRlZmluZWQgPyBib2R5LmJhbm5lclVybCA6IGNvbmZpZy5iYW5uZXJVcmwsXG4gICAgICAgICAgcHJlZmVpdG86IGJvZHkucHJlZmVpdG8gfHwgY29uZmlnLnByZWZlaXRvLFxuICAgICAgICAgIGZvdG9QcmVmZWl0bzogYm9keS5mb3RvUHJlZmVpdG8gfHwgY29uZmlnLmZvdG9QcmVmZWl0byxcbiAgICAgICAgICB2aWNlUHJlZmVpdG86IGJvZHkudmljZVByZWZlaXRvIHx8IGNvbmZpZy52aWNlUHJlZmVpdG8sXG4gICAgICAgICAgZm90b1ZpY2VQcmVmZWl0bzogYm9keS5mb3RvVmljZVByZWZlaXRvIHx8IGNvbmZpZy5mb3RvVmljZVByZWZlaXRvLFxuICAgICAgICAgIHRlbGVmb25lOiBib2R5LnRlbGVmb25lIHx8IGNvbmZpZy50ZWxlZm9uZSxcbiAgICAgICAgICBlbWFpbDogYm9keS5lbWFpbCB8fCBjb25maWcuZW1haWwsXG4gICAgICAgICAgZW5kZXJlY286IGJvZHkuZW5kZXJlY28gfHwgY29uZmlnLmVuZGVyZWNvLFxuICAgICAgICAgIGhvcmFyaW9BdGVuZGltZW50bzogYm9keS5ob3JhcmlvQXRlbmRpbWVudG8gfHwgY29uZmlnLmhvcmFyaW9BdGVuZGltZW50byxcbiAgICAgICAgICBmYWNlYm9va1VybDogYm9keS5mYWNlYm9va1VybCB8fCBjb25maWcuZmFjZWJvb2tVcmwsXG4gICAgICAgICAgaW5zdGFncmFtVXJsOiBib2R5Lmluc3RhZ3JhbVVybCB8fCBjb25maWcuaW5zdGFncmFtVXJsLFxuICAgICAgICAgIHlvdXR1YmVVcmw6IGJvZHkueW91dHViZVVybCB8fCBjb25maWcueW91dHViZVVybFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oY29uZmlnLCB7IHN0YXR1czogMjAwIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvIGFvIHNhbHZhciBjb25maWd1cmHDp8OjbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkVycm8gYW8gc2FsdmFyIGNvbmZpZ3VyYcOnw6NvXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImR5bmFtaWMiLCJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJHRVQiLCJjb25maWciLCJjb25maWd1cmFjYW9TaXRlIiwiZmluZEZpcnN0IiwibmV3Q29uZmlnIiwiY3JlYXRlIiwiZGF0YSIsIm5vbWVDaWRhZGUiLCJzbG9nYW4iLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJQT1NUIiwicmVxIiwic2Vzc2lvbiIsInVzZXIiLCJyb2xlIiwiYm9keSIsImZvdG9TbG9nYW4iLCJsb2dvVXJsIiwiYmFubmVyVXJsIiwicHJlZmVpdG8iLCJmb3RvUHJlZmVpdG8iLCJ2aWNlUHJlZmVpdG8iLCJmb3RvVmljZVByZWZlaXRvIiwidGVsZWZvbmUiLCJlbWFpbCIsImVuZGVyZWNvIiwiaG9yYXJpb0F0ZW5kaW1lbnRvIiwiZmFjZWJvb2tVcmwiLCJpbnN0YWdyYW1VcmwiLCJ5b3V0dWJlVXJsIiwidXBkYXRlIiwid2hlcmUiLCJpZCIsInVuZGVmaW5lZCIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/configuracao/route.ts\n");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fconfiguracao%2Froute&page=%2Fapi%2Fconfiguracao%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fconfiguracao%2Froute.ts&appDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fvirtualmachine%2FDesktop%2FDocumentos%2FProjetos%20%2Fprefeitura_lambari_codigo_fonte&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();