import { DbClient } from "../db";
import { Pet, PetDataUpdate, PetToCreate } from "../entity/pet.type";

export class PetRepository {
  private readonly client;

  constructor(dbClient: DbClient) {
    this.client = dbClient
  }

  private toEntity(record: any): Pet {
    const { id, name, age, weight_in_kg, kind, owner_id } = record;
    return {
      id,
      name,
      age,
      weightInKg: parseFloat(weight_in_kg),
      kind_id: kind || null,
      owner_id: owner_id || null,
    }
  }

  async read({ limit, offset }: { limit?: number, offset?: number } = {}) {
    const sql =
      `SELECT p.id, p.name, p.age, p.weight_in_kg, p.owner_id, pk.name as kind
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

  async modify(id: number, petData: PetDataUpdate): Promise<Pet | null> {

    const fields = Object.keys(petData);
    const values = Object.values(petData);

    if (fields.length === null) {
      return null;
    }

    const setClauses = fields
      .map((field, index) => {
        if (field === "weightInKg") {
          return `weight_in_kg = $${index + 2}`;
        }
        return `${field} = $${index + 2}`;
      })
      .join(', ');

    const sql = `UPDATE pet SET ${setClauses} WHERE id = $1 RETURNING *;`;

    const rows = await this.client.query(sql, [id, ...values]) as Array<unknown>;
    return rows.length > 0 ? this.toEntity(rows[0]) : null;
  }

  async assignOwnerToPet(petId: number, ownerId: number): Promise<Pet | null> {

    const petCheckSql = 'SELECT id FROM pet WHERE id = $1';
    const petCheckResult = await this.client.query(petCheckSql, [petId]) as Array<unknown>;

    if (petCheckResult.length === 0) {
      throw new Error('Pet not found');
    };

    const ownerCheckSql = 'SELECT id FROM pet_owner WHERE id = $1';
    const ownerCheckResult = await this.client.query(ownerCheckSql, [ownerId]) as Array<unknown>;

    if (ownerCheckResult.length === 0) {
      throw new Error('Owner not found');
    }


    const sql = `
    UPDATE pet
    SET owner_id = $2
    WHERE id = $1
    RETURNING *;
    `;
    const rows = await this.client.query(sql, [petId, ownerId]) as Array<unknown>;

    // Az új kapcsolati rekord visszaadása
    if (rows.length > 0) {
      return this.toEntity(rows[0]);
    }
    return null;

  }
}