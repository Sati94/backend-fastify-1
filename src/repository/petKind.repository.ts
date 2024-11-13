import { DbClient } from "../db";

export class PetKindRepository {

    private readonly dbClient: DbClient;

    constructor(client: DbClient) {
        this.dbClient = client;
    }
    private toEntity(record: any): { id: number, name: string } {
        const { id, name } = record;
        return { id, name };
    }

    async getAllKinds() {
        const sql = 'SELECT id, name FROM pet_kind';
        const rows = await this.dbClient.query(sql) as Array<unknown>;
        return rows.map(this.toEntity);
    }


}