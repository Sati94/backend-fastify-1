import { ownerSchema } from '../entity/schema/owner-schema';
import { OwnerToCreate } from '../entity/owner.type';
import { FastifyInstance } from 'fastify';



export async function ownerRoutes(app: FastifyInstance) {

    app.get('/api/owners', async (request, reply) => {

        try {
            const owners = await app.ownerService.getAll();
            return reply.status(200).send(owners);
        } catch (error) {

            if (error instanceof Error) {
                reply.status(500).send({ message: error.message });
            } else {
                reply.status(500).send({ message: 'An unknown error occurred while fetching owners.' });
            }
        }
    });

    app.post('/api/owners', {
        schema: ownerSchema,
    }, async (request, reply) => {
        try {
            const ownerToCreate = request.body as OwnerToCreate;
            const createdOwner = await app.ownerService.create(ownerToCreate);
            reply.status(201).send(createdOwner);
        } catch (error) {

            if (error instanceof Error) {
                reply.status(500).send({ message: error.message });
            } else {
                reply.status(500).send({ message: 'An unknown error occurred while creating the owner.' });
            }
        }
    });
}