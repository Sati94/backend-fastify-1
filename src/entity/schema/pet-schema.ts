export const petSchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', minLength: 1, maxLength: 100 },
            age: { type: 'number', minimum: 0 },
            weightInKg: { type: 'number', minimum: 0 },
        },
        required: ['name', 'age', 'weightInKg'],
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