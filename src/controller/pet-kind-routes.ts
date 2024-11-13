import { FastifyInstance } from 'fastify';
import { petKindSchema } from '../entity/schema/petKind-schema';


export async function petKindRoutes(app: FastifyInstance) {

    app.get('/api/pet-kinds', {
        schema: petKindSchema
    }, async () => {
        const kinds = await app.petKindService.getAll();
        return kinds;
    });
}