import { OwnerService } from '../service/owner.service';
import { ownerSchema } from '../entity/schema/owner-schema';
import { OwnerToCreate } from '../entity/owner.type';
import { FastifyInstance } from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

type RoutesDependencies = {
    ownerService: OwnerService
}
export async function ownerRoutes(
    app: FastifyInstance,
    dependencies: RoutesDependencies

) {
    const { ownerService } = dependencies;
    const typeApp = app.withTypeProvider<JsonSchemaToTsProvider>();


    typeApp.get('/api/owners', async () => {
        const owners = await ownerService.getAll();
        return owners;
    });

    typeApp.post('/api/owners', {
        schema: ownerSchema,
    }, async (request, reply) => {
        const ownerToCreate = request.body as OwnerToCreate;
        const createdOwner = await ownerService.create(ownerToCreate);
        reply.status(201);
        return createdOwner;
    });
}
