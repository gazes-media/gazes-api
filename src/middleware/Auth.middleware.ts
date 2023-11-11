import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import { Middleware } from "./Middleware";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { auth } from "firebase-admin";

/* The `interface FastifyRequestNew` is extending the `FastifyRequest` interface and adding a new
property `user` of type `DecodedIdToken`. This allows us to use `FastifyRequestNew` instead of
`FastifyRequest` in our middleware and have access to the `user` property, which will be set to the
decoded authorization token if it is valid. */
interface FastifyRequestNew extends FastifyRequest {
    user: DecodedIdToken;
}

/* The AuthMiddleware class is a TypeScript class that handles authentication for requests by verifying
the authorization token and setting the user in the request object. */
export class AuthMiddleware extends Middleware {
    public async handle(request: FastifyRequestNew, reply: FastifyReply) {
        if (!request.url.includes("users")) {
            return;
        }

        const authToken = request.headers.authorization;
        if (!authToken || !authToken.startsWith("Bearer ")) {
            reply.status(401).send({ message: "Unauthorized" });
            return;
        }

        try {
            const idToken = authToken.split("Bearer ")[1];
            const decodedToken = await auth().verifyIdToken(idToken);
            request.body = { ...(request.body as any), user: decodedToken };
            return;
        } catch (err) {
            console.log(err);
            reply.status(401).send({ message: "Unauthorized" });
            return;
        }
    }
}
