import fastify, { FastifyInstance } from 'fastify'
import { glob } from 'glob'
import { cert, initializeApp } from 'firebase-admin/app'
import { Animes } from './store/animes.store'

/* The App class initializes a server, handles routes and middleware, starts and stops the server, and
toggles a smart cache feature for Animes. */
export class App {
    private server: FastifyInstance

    constructor() {
        this.server = fastify({ logger: true })
    }

    /**
     * This function handles routes by importing all files with the pattern "*.route.*" and logging
     * their paths.
     */
    public async handleRoutes() {
        let routes = await glob('**/*.route.*')
        routes.forEach((routePath) => {
            console.log(routePath)
            import(routePath.replace('src', '.'))
        })
    }

    /**
     * This function imports all middleware files in the project.
     */
    public async handleMiddlewares() {
        let middlewares = await glob('**/*.middleware.*')
        middlewares.forEach((MiddlewarePath) => {
            import(MiddlewarePath.replace('src', '.'))
        })
    }

    /**
     * This function adds a route to a server using a specified path and callback function.
     */
    public addRoute(path: string, cb: any) {
        this.server.get(path, cb)
    }

    /**
     * This function adds middleware to a server using a specified type and callback function.
     * @param {any} type - The type parameter is the type of middleware hook to be added. It could be
     * "preHandler", "onRequest", "onResponse", "onSend", or "onError".
     * @param {any} cb - cb stands for "callback" and is a function that will be executed when the
     * middleware is called. It takes in three parameters: request, response, and next. The request
     * parameter represents the incoming HTTP request, the response parameter represents the outgoing
     * HTTP response, and the next parameter is a function that is
     */
    public addMiddleware(type: any, cb: any) {
        this.server.addHook(type, cb)
    }

    /**
     * This function starts a server on a specified port and initializes a Firebase app with a service
     * account.
     * @param {number} port - The port number on which the server will listen for incoming requests.
     */
    public async start(port: number) {
        try {
            const serviceAccount = require('./animaflix-53e15-firebase-adminsdk-xvjq7-2c13172613.json')
            initializeApp({
                credential: cert(serviceAccount),
                databaseURL: 'https://animaflix-53e15-default-rtdb.europe-west1.firebasedatabase.app/',
            })

            this.toggleSmartCache()

            await this.handleMiddlewares()
            await this.handleRoutes()
            await this.server.listen({ port })

            console.log(`⚡ server running on port ${port}`)
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * This function stops a server and logs a message indicating that the server has been stopped.
     */
    public async stop() {
        try {
            await this.server.close()
            console.log('server stopped')
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * This function toggles a smart cache for Animes and refreshes it every 10 minutes.
     */
    private toggleSmartCache() {
        if (!Animes.all[0]) {
            Animes.fetch()
        }

        setInterval(() => {
            Animes.fetch()
            console.log('♻️ cache refreshed')
        }, 600000)
    }
}
