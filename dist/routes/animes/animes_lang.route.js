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
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
const animes_store_1 = require("../../store/animes.store");
server_1.app.addRoute('/animes/:lang', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    let lang = request.params.lang;
    if (lang !== "vf" && lang !== "vostfr") {
        reply.status(400).send({
            error: 'lang must be "vf" or "vostfr"!'
        });
        return;
    }
    reply.send(animes_store_1.Animes[lang]);
}));
