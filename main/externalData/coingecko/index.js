"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.listMarkets = exports.listCoins = exports.getCoin = exports.tokenPrices = exports.coinPrices = exports.listAssetPlatforms = void 0;
var node_fetch_1 = require("node-fetch");
var electron_log_1 = require("electron-log");
var apiVersion = process.env.COIN_GECKO_API_VERSION || 'v3';
var baseUrl = "https://api.coingecko.com/api/" + apiVersion;
function handleJsonResponse(response) {
    return __awaiter(this, void 0, void 0, function () {
        var body;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, response.json()];
                case 1:
                    body = _a.sent();
                    if (response.status !== 200)
                        throw new Error(JSON.stringify(body));
                    return [2 /*return*/, body];
            }
        });
    });
}
function call(path, params) {
    if (params === void 0) { params = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var queryStr, url;
        return __generator(this, function (_a) {
            queryStr = Object.entries(params).map(function (param) { return param.join('='); }).join('&');
            url = "" + path + (queryStr ? '?' + queryStr : '');
            electron_log_1["default"].debug("loading coingecko data from " + url);
            return [2 /*return*/, node_fetch_1["default"](url, {}).then(handleJsonResponse)];
        });
    });
}
function listAssetPlatforms(chainIds) {
    if (chainIds === void 0) { chainIds = []; }
    return __awaiter(this, void 0, void 0, function () {
        var chainIdFilter, allPlatforms;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chainIdFilter = chainIds.map(function (id) { return id.toString(); });
                    return [4 /*yield*/, call(baseUrl + "/asset_platforms")];
                case 1:
                    allPlatforms = _a.sent();
                    return [2 /*return*/, chainIds.length > 0
                            ? allPlatforms.filter(function (p) { return chainIdFilter.includes((p.chain_identifier || "").toString()); })
                            : allPlatforms];
            }
        });
    });
}
exports.listAssetPlatforms = listAssetPlatforms;
function coinPrices(ids, currencies) {
    if (currencies === void 0) { currencies = ['usd']; }
    return __awaiter(this, void 0, void 0, function () {
        var queryParams;
        return __generator(this, function (_a) {
            queryParams = {
                ids: ids.join(','),
                vs_currencies: currencies.join(','),
                include_market_cap: 'true',
                include_24hr_vol: 'true',
                include_24hr_change: 'true'
            };
            return [2 /*return*/, call(baseUrl + "/simple/price", queryParams)];
        });
    });
}
exports.coinPrices = coinPrices;
function tokenPrices(addresses, asset_platform, currencies) {
    if (currencies === void 0) { currencies = ['usd']; }
    return __awaiter(this, void 0, void 0, function () {
        var queryParams;
        return __generator(this, function (_a) {
            queryParams = {
                contract_addresses: addresses.join(','),
                vs_currencies: currencies.join(','),
                include_market_cap: 'true',
                include_24hr_vol: 'true',
                include_24hr_change: 'true'
            };
            return [2 /*return*/, call(baseUrl + "/simple/token_price/" + asset_platform, queryParams)];
        });
    });
}
exports.tokenPrices = tokenPrices;
function getCoin(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, call(baseUrl + "/coins/" + id)];
        });
    });
}
exports.getCoin = getCoin;
function listCoins(include_platform) {
    if (include_platform === void 0) { include_platform = true; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, call(baseUrl + "/coins/list?include_platform=" + include_platform)];
        });
    });
}
exports.listCoins = listCoins;
function listMarkets(ids, vsCurrency) {
    if (vsCurrency === void 0) { vsCurrency = 'usd'; }
    return __awaiter(this, void 0, void 0, function () {
        var queryParams;
        return __generator(this, function (_a) {
            queryParams = {
                vs_currency: vsCurrency,
                ids: ids.join(',')
            };
            return [2 /*return*/, call(baseUrl + "/coins/markets", queryParams)];
        });
    });
}
exports.listMarkets = listMarkets;
