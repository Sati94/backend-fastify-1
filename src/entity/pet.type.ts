export type Pet = {
  id: number,
  name: string,
  age: number,
  weightInKg: number,
  kind_id?: number
};

export type PetToCreate = Omit<Pet, 'id'>;
