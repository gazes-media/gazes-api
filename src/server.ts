import { join } from 'node:path'
import { App } from './app'
import process from 'node:process'

export const app = new App()
app.start(4236)

// stop the server correctly on ctrl+c unix
process.on('SIGINT', async () => {
    console.log('SIGINT signal received. Stopping server...')
    await app.stop()
    process.exit(0)
})

// stop the server correctly when a unix admin want to stop the server
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received. Stopping server...')
    await app.stop()
    process.exit(0)
})
