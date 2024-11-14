import { petSchema } from '../entity/schema/pet-schema';
import { PetToCreate } from '../entity/pet.type';
import { PetDataUpdate } from '../entity/pet.type';
import { FastifyInstance } from 'fastify';
import { petToUpdateSchema } from '../entity/schema/pet-update';


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

    app.patch<{ Params: { id: number }; Body: PetDataUpdate }>('/api/pets/:id', {
        schema: petToUpdateSchema
    }, async (request, reply) => {
        const petId = request.params.id;
        const petData = request.body;

        const updatedPet = await app.petService.modifyPet(petId, petData);

        if (!updatedPet) {
            reply.status(404).send({ message: 'Pet not found or no data to update' });
            return;
        }
        reply.status(200).send(updatedPet);

    })
}
