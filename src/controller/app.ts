import fastify from 'fastify';
import { PetService } from '../service/pet.service';
import { PetRepository } from '../repository/pet.repository';
import { DbClient } from '../db';
import { OwnerRepository } from '../repository/owner.repository';
import { OwnerService } from '../service/owner.service';
import { petSchema } from '../entity/schema/pet-schema';
import { ownerSchema } from '../entity/schema/owner-schema';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';


type Dependencies = {
  dbClient: DbClient;
}

export default function createApp(options = {}, dependencies: Dependencies) {
  const { dbClient } = dependencies;

  const petRepository = new PetRepository(dbClient);
  const petService = new PetService(petRepository);
  const ownerRepository = new OwnerRepository(dbClient);
  const ownerService = new OwnerService(ownerRepository);


  const app = fastify(options).withTypeProvider<JsonSchemaToTsProvider>();

  app.get('/api/pets', async () => {
    const pets = await petService.getAll();
    return pets;
  })

  app.post('/api/pets', {
    schema: petSchema
  }, async (request, reply) => {
    const petToCreate = request.body;
    const created = await petService.create(petToCreate);
    reply.status(201);
    return created;
  });

  app.get('/api/owners', async () => {
    const owners = await ownerService.getAll();
    return owners;
  });

  app.post('/api/owners', {
    schema: ownerSchema
  }, async (request, reply) => {
    const ownerToCreate = request.body;
    const created = await ownerService.create(ownerToCreate);
    reply.status(201);
    return created;
  })

  return app;
}