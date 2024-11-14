import { FastifyInstance } from 'fastify';
import { petKindSchema } from '../entity/schema/petKind-schema';


export async function petKindRoutes(app: FastifyInstance) {

    app.get('/api/pet-kinds', {
        schema: petKindSchema
    }, async (request, reply) => {
        try {
            const kinds = await app.petKindService.getAll();
            return reply.status(200).send(kinds);
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(500).send({ message: error.message });
            }
            return reply.status(500).send({ message: 'An unknown error occurred.' });
        }
    });
}