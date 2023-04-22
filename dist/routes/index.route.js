"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
server_1.app.addRoute('/', (request, reply) => {
    reply.send({ message: 'hello world from another file' });
});
