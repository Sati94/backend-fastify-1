export type Pet = {
  id: number,
  name: string,
  age: number,
  weightInKg: number,
  kind_id?: number,
  owner_id?: number
};

export type PetToCreate = Omit<Pet, 'id'>;
export type PetDataUpdate = Partial<Omit<Pet, 'id'>>;