import { DbClient } from "../db";
import { Pet, PetToCreate } from "../entity/pet.type";

export class PetRepository {
  private readonly client;

  constructor(dbClient: DbClient) {
    this.client = dbClient
  }

  private toEntity(record: any): Pet {
    const { id, name, age, weight_in_kg, kind } = record;
    return {
      id,
      name,
      age,
      weightInKg: parseFloat(weight_in_kg),
      kind_id: kind || null
    }
  }

  async read({ limit, offset }: { limit?: number, offset?: number } = {}) {
    const sql =
      `SELECT p.id, p.name, p.age, p.weight_in_kg, pk.name as kind
       FROM pet p
       LEFT JOIN pet_kind pk ON p.kind_id = pk.id  
       LIMIT $1 OFFSET $2;`
      ;
    const rows = await this.client.query(sql, [limit, offset]) as Array<unknown>;
    return rows.map(this.toEntity)
  }

  async create(pet: PetToCreate) {
    const { name, age, weightInKg, kind_id } = pet;
    const sql = `
      INSERT INTO pet (name, age, weight_in_kg, kind_id) VALUES 
        ($1, $2, $3, $4) 
      RETURNING *
    `
    const rows = await this.client.query(sql, [name, age, weightInKg, kind_id]) as Array<unknown>
    return rows.map(this.toEntity)[0]
  }
}