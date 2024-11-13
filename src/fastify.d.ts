import 'fastify';
import { PetService } from './service/pet.service';
import { OwnerService } from './service/owner.service';
import { PetKindService } from './service/petKind.service';

declare module 'fastify' {
    interface FastifyInstance {
        petService: PetService;
        ownerService: OwnerService;
        petKindService: PetKindService;
    }
}