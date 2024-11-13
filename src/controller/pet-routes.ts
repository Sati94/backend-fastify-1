import { petSchema } from '../entity/schema/pet-schema';
import { PetToCreate } from '../entity/pet.type';
import { FastifyInstance } from 'fastify';


export async function petRoutes(app: FastifyInstance) {

    app.get('/api/pets', async () => {
        const pets = await app.petService.getAll();
        return pets;
    });

    app.post('/api/pets', {
        schema: petSchema,
    }, async (request, reply) => {
        const petToCreate = request.body as PetToCreate;
        const createdPet = await app.petService.create(petToCreate);
        reply.status(201);
        return createdPet;
    });
}
