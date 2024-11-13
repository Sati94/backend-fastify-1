import { PetService } from '../service/pet.service';
import { petSchema } from '../entity/schema/pet-schema';
import { PetToCreate } from '../entity/pet.type';
import { FastifyInstance } from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

type RoutesDependencies = {
    petService: PetService
}
export async function petRoutes(
    app: FastifyInstance,
    dependencies: RoutesDependencies

) {
    const { petService } = dependencies;
    const typeApp = app.withTypeProvider<JsonSchemaToTsProvider>();


    typeApp.get('/api/pets', async () => {
        const pets = await petService.getAll();
        return pets;
    });

    typeApp.post('/api/pets', {
        schema: petSchema,
    }, async (request, reply) => {
        const petToCreate = request.body as PetToCreate;
        const createdPet = await petService.create(petToCreate);
        reply.status(201);
        return createdPet;
    });
}
