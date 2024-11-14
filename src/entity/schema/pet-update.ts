export const petToUpdateSchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', minLength: 1 },
            age: { type: 'integer', minimum: 0 },
            weightInKg: { type: 'number', minimum: 0 },
            kind_id: { type: 'integer', minimum: 1 }
        },
        additionalProperties: false,
    },
} as const