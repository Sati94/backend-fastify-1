import { petSchema } from '../entity/schema/pet-schema';
import { PetToCreate } from '../entity/pet.type';
import { FastifyInstance } from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

export async function petRoutes(app: FastifyInstance) {

    const typeApp = app.withTypeProvider<JsonSchemaToTsProvider>();


    typeApp.get('/api/pets', async () => {
        const pets = await app.petService.getAll();
        return pets;
    });

    typeApp.post('/api/pets', {
        schema: petSchema,
    }, async (request, reply) => {
        const petToCreate = request.body as PetToCreate;
        const createdPet = await app.petService.create(petToCreate);
        reply.status(201);
        return createdPet;
    });
}
