import { ownerSchema } from '../entity/schema/owner-schema';
import { OwnerToCreate } from '../entity/owner.type';
import { FastifyInstance } from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';


export async function ownerRoutes(app: FastifyInstance) {

    const typeApp = app.withTypeProvider<JsonSchemaToTsProvider>();


    typeApp.get('/api/owners', async function () {
        const owners = await app.ownerService.getAll();
        return owners;
    });

    typeApp.post('/api/owners', {
        schema: ownerSchema,
    }, async function (request, reply) {
        const ownerToCreate = request.body as OwnerToCreate;
        const createdOwner = await app.ownerService.create(ownerToCreate);
        reply.status(201);
        return createdOwner;
    });
}
