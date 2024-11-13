import { PetKindRepository } from "../repository/petKind.repository";

export class PetKindService {
    private readonly repository;

    constructor(repository: PetKindRepository) {
        this.repository = repository;
    }

    async getAll() {
        const pets = await this.repository.getAllKinds();
        return pets;
    }
}