import { DbClient } from "../db";
import { Owner, OwnerToCreate } from "../entity/owner.type";

export class OwnerRepository {
    private readonly client: DbClient;
    constructor(dbClient: DbClient) {
        this.client = dbClient
    }

    private toEntity(record: any): Owner {
        const { id, name, age } = record;
        return {
            id,
            name,
            age
        }
    }

    async read({ limit, offset }: { limit?: number, offset?: number } = {}) {
        const sql = 'SELECT id, name, age FROM pet_owner LIMIT $1 OFFSET $2'
        const rows = await this.client.query(sql, [limit, offset]) as Array<unknown>;
        return rows.map(this.toEntity)
    }

    async create(owner: OwnerToCreate) {
        const { name, age } = owner;
        const sql = `
        INSERT INTO pet_owner (name,age) VALUES
        ($1, $2)
        RETURNING *
        `
        const rows = await this.client.query(sql, [name, age]) as Array<unknown>;
        return rows.map(this.toEntity)[0]
    }
}