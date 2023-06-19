import { FastifyRequest } from "fastify";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export type FastifyRequestNew = FastifyRequest & { user: DecodedIdToken };
