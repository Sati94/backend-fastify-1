import { OwnerToCreate } from "../entity/owner.type";
import { OwnerRepository } from "../repository/owner.repository";

export class OwnerService {

    private readonly repository: OwnerRepository;

    constructor(repository: OwnerRepository) {
        this.repository = repository;
    }

    async getAll() {
        return await this.repository.read();
    }

    async create(owner: OwnerToCreate) {
        return await this.repository.create(owner);
    }

}