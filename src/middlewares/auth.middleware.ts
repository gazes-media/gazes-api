import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from "fastify";
import { app } from "../server";
import { auth } from "firebase-admin";

app.addMiddleware('preHandler', async (request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => {

    const authToken = request.headers.authorization;
    if (!authToken || !authToken.startsWith('Bearer ')) return reply.status(401).send({ message: 'Unauthorized' });

    const idToken = authToken.split('Bearer ')[1];
    try {
        const decodedToken = await auth().verifyIdToken(idToken);
        (request as any).user = decodedToken;

        return;
    } catch (error) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }

});