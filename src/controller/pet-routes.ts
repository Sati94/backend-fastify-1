import { petSchema } from '../entity/schema/pet-schema';
import { PetToCreate } from '../entity/pet.type';
import { PetDataUpdate } from '../entity/pet.type';
import { FastifyInstance } from 'fastify';
import { petToUpdateSchema } from '../entity/schema/pet-update';
import { petOwnerSchema } from '../entity/schema/pet-owner-schema';


export async function petRoutes(app: FastifyInstance) {

    app.get('/api/pets', async (request, reply) => {
        try {
            const pets = await app.petService.getAll();
            reply.status(200).send(pets);
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(500).send({ message: error.message });
            }
            return reply.status(500).send({ message: 'An unknown error occurred.' });
        }

    });

    app.post('/api/pets', {
        schema: petSchema,
    }, async (request, reply) => {
        const petToCreate = request.body as PetToCreate;
        try {
            const createdPet = await app.petService.create(petToCreate);
            reply.status(201);
            return createdPet;
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(500).send({ message: error.message });
            }
            return reply.status(500).send({ message: 'An unknown error occurred.' });
        }

    });

    app.patch<{ Params: { id: number }; Body: PetDataUpdate }>('/api/pets/:id', {
        schema: petToUpdateSchema
    }, async (request, reply) => {
        const petId = request.params.id;
        const petData = request.body;
        try {
            const updatedPet = await app.petService.modifyPet(petId, petData);
            if (!updatedPet) {
                reply.status(404).send({ message: 'Pet not found or no data to update' });
                return;
            }
            reply.status(200).send(updatedPet);
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(500).send({ message: error.message });
            }
            return reply.status(500).send({ message: 'An unknown error occurred.' });
        }




    });

    app.patch<{ Params: { petId: number }; Body: { owner_id: number } }>('/api/pets/:petId/assign-owner', {
        schema: {
            body: petOwnerSchema
        },
    }, async (request, reply) => {
        const { petId } = request.params;
        const { owner_id } = request.body;

        try {
            const pet = await app.petService.addOwnerToPet(petId, owner_id);
            if (!pet) {
                return reply.status(404).send({ message: 'Pet or owner not found, or failed to assign.' });
            }
            return pet;
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(500).send({ message: error.message });
            }
            return reply.status(500).send({ message: 'An unknown error occurred.' });
        }
    });
}
