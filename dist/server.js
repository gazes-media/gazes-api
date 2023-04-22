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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const app_1 = require("./app");
const node_process_1 = __importDefault(require("node:process"));
exports.app = new app_1.App();
exports.app.start(3000);
// stop the server correctly on ctrl+c unix
node_process_1.default.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('SIGINT signal received. Stopping server...');
    yield exports.app.stop();
    node_process_1.default.exit(0);
}));
// stop the server correctly when a unix admin want to stop the server
node_process_1.default.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('SIGTERM signal received. Stopping server...');
    yield exports.app.stop();
    node_process_1.default.exit(0);
}));
