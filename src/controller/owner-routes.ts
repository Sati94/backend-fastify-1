import { ownerSchema } from '../entity/schema/owner-schema';
import { OwnerToCreate } from '../entity/owner.type';
import { FastifyInstance } from 'fastify';



export async function ownerRoutes(app: FastifyInstance) {

    app.get('/api/owners', async function () {
        const owners = await app.ownerService.getAll();
        return owners;
    });

    app.post('/api/owners', {
        schema: ownerSchema,
    }, async function (request, reply) {
        const ownerToCreate = request.body as OwnerToCreate;
        const createdOwner = await app.ownerService.create(ownerToCreate);
        reply.status(201);
        return createdOwner;
    });
}
