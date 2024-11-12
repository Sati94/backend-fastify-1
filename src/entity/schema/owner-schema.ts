export const ownerSchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', minLength: 1, maxLength: 50 },
            age: { type: 'number', minimum: 0 }
        },
        required: ['name', 'age'],
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

} as const