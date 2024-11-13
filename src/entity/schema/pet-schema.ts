export const petSchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', minLength: 1, maxLength: 100 },
            age: { type: 'number', minimum: 0 },
            weightInKg: { type: 'number', minimum: 0 },
            kind_id: { type: 'number', minimum: 1, maximum: 4 }
        },
        required: ['name', 'age', 'weightInKg', 'kind_id'],
        additionalProperties: false,
    },
    response: {
        201: {
            type: 'object',
            properties: {
                name: { type: 'string' },
            },
        },
    },
} as const;