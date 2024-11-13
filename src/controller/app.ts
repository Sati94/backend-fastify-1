import fastify from 'fastify';
import { PetService } from '../service/pet.service';
import { PetRepository } from '../repository/pet.repository';
import { DbClient } from '../db';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { ownerRoutes } from './owner-routes';
import { OwnerRepository } from '../repository/owner.repository';
import { OwnerService } from '../service/owner.service';
import { petRoutes } from './pet-routes';
import { PetKindService } from '../service/petKind.service';
import { PetKindRepository } from '../repository/petKind.repository';
import { petKindRoutes } from './pet-kind-routes';


type Dependencies = {
  dbClient: DbClient;
}

export default function createApp(options = {}, dependencies: Dependencies) {
  const { dbClient } = dependencies;

  const petRepository = new PetRepository(dbClient);
  const petService = new PetService(petRepository);

  const ownerRepository = new OwnerRepository(dbClient);
  const ownerService = new OwnerService(ownerRepository);

  const petKindRepository = new PetKindRepository(dbClient);
  const petKindService = new PetKindService(petKindRepository);


  const app = fastify(options).withTypeProvider<JsonSchemaToTsProvider>();

  app.decorate('petService', petService);
  app.decorate('ownerService', ownerService);
  app.decorate('petKindService', petKindService);

  app.register(ownerRoutes, { ownerService });
  app.register(petRoutes, { petService });
  app.register(petKindRoutes, { petKindService });

  return app;
}