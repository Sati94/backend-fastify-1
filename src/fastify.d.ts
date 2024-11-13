import 'fastify';
import { PetService } from './service/pet.service';
import { OwnerService } from './service/owner.service';

declare module 'fastify' {
    interface FastifyInstance {
        petService: PetService;
        ownerService: OwnerService;
    }
}