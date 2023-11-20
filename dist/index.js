"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _firebaseadmin = /*#__PURE__*/ _interop_require_default(require("firebase-admin"));
require("reflect-metadata");
var _GazeApi = require("./GazeApi");
var _datasource = require("./data-source");
var _Authmiddleware = require("./middleware/Auth.middleware");
var _Indexroute = /*#__PURE__*/ _interop_require_wildcard(require("./route/Index.route"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
var gazeApi = new _GazeApi.GazeApi();
var RouterIndex = Object.values(_Indexroute);
gazeApi.handleRoutes(RouterIndex);
gazeApi.handleMiddleware([
    _Authmiddleware.AuthMiddleware
]);
gazeApi.fastify.addHook("onReady", function() {
    console.log("⚡ ready to use");
});
_datasource.AppDataSource.initialize().then(function() {
    console.log("\uD83D\uDDC3️  database initialized");
}).catch(function(error) {
    console.log("\uD83D\uDDC3️  database initialization failed");
    console.log(error);
});
_firebaseadmin.default.initializeApp({
    credential: _firebaseadmin.default.credential.cert({
        clientEmail: "firebase-adminsdk-xvjq7@animaflix-53e15.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDgjlRWF/apwGsU\nwt3z4oi4Hf+4cDb3oTABf0jW9hRfRYmgmRYPY9/UvMr4siuZfRHBkQ+D7xuW7N9E\nHIiUBsS2oEpzjJhX77wBDr/1MAlosPE7VWkaN9tAus2I0ySUaMw7RqgoQW6VTe+3\nkxaJdrWmXI1l+VzuhthWABtduLGk7/ewGJLJCtn/pWrb4JpFgfs4t9fRj88DXJEj\ntdgdAGEFq5qKBCToVXbARRptJBlJTkLVnWH6v5QNfv3uIZcdaEkDjer+bcuijtED\nYT4DfFgB8TrWYqzIeSOXZ9hhdQG9T0bDu9D4MJC8aJdohWhqPjiAaDfzlI2/wuFI\n/WKUkKqDAgMBAAECggEATKE1dYXK9oXD5PtU27/AETinhezBTULzy2cA1950+EgW\nHbhwF0NpZEMi7rh6eW/9SbVzen3zx87AqBEmqIEgywOrNIBTkpqsaR378rN4WoIb\naDiO29QY3Z+BuUH4dy7GFypXAxnFH21PszEeHT3l4kYuOJDenkVk+QAjVpnLAXIA\nmuG2SlrVRz5I8LI8Ed9dYPtYnH4ZYBOOKLFiXcz4V7DSfd0cIZ25P+BQQixy3igN\nUXB1umrGMV+Yi5nJNjl94amvod9veQgtOBtAt/di05tQXUi4RdPUqqOgtjKaiSRd\nwNBtv3avzSPzWsoZKG9zhvNetPpvNPdUUJDcgX1MpQKBgQD7ohmuMvIJWPNuVaJU\n4momxDbIR5fo5U+RHOS7v3zkZ2Ixms0JaYFSdopebMEcFWMJenxOi27z+knVLDlf\nnB90fS2mAuJbKkOg7NhcBJV2kA84QHyI0hF6xDMvCzu/CSUvmf8sUCTa3xNGkOFL\n0JM0lNWnEcBUNPtPeJhHOiR9vQKBgQDkc++8SZMB1jimMBIFTqIBiiuR4m6OmXtC\nA5sEyG76dizzh3McctnyX5vuAyj+a7GhVRCi8wsuu9TjN2df8L6ZNM5WcaJIc9s8\ncn3/vMvBGi0xQ50DM5SoFNIUD+54hf1P6HW91a89pzdO7BpD6eKlkmGD1apOBvKG\noEbUWGGtPwKBgQD17HzQpPWrcQWoRYT7FLTN4mHv5xhuAv56QhTB8OlsiCWNeU79\n7eD36OZeVkd83OIHt2+Zi+gKBgj2j9watwh+3oAoiRUUKAAkXJUviUNRtoVJYqzT\nQwrWQr4LMh1YHOX82bJraoA6cF30T1AAun3Dm9obB9xB7+3Uw3V/1zEmuQKBgFG1\nZbliV0IA7KID724WgbsrQAodgo1eN8eUoo1DYu4R9mHjwDgcm/ckWxD18GOPASlC\n04B0jTtZ0vqxhje6U3FYgbRJUFG5nmAwUwB09itKwX8tP6s1d6XmTH0AdbqFseQy\nsGoFU3gppo6Dw6EmtfmiMV6FvTPLKFMeYDbypXzhAoGBAL6yzcdH+coB/kvALpkK\nsYYYoOlzhEL2hvfhZvdOaWedim4zRvoDqbgZCaqcnsQyNCJzIA3nnrRMgoNBivFO\ndH7rRDCjSKYdJh3n45YqWMg5p9YL7lufPrwhf8NVKhiDoi+ibFalDKrQSRo4boXT\noaBa3lwJjs4njb7IOUQCC5uX\n-----END PRIVATE KEY-----\n",
        projectId: "animaflix-53e15"
    }),
    databaseURL: "https://animaflix-53e15-default-rtdb.europe-west1.firebasedatabase.app"
});
gazeApi.start(process.env.PORT);
