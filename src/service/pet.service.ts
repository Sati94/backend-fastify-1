import { PetToCreate } from "../entity/pet.type";
import { PetRepository } from "../repository/pet.repository"

export class PetService {
  private readonly repository;

  constructor(repository: PetRepository) {
    this.repository = repository;
  }

  async getAll() {
    const pets = await this.repository.read();
    return pets;
  }

  async create(pet: PetToCreate) {
    return await this.repository.create(pet);
  }
}