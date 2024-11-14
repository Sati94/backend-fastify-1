export const petOwnerSchema = {
    type: 'object',
    properties: {
        owner_id: { type: 'number' },
    },
    required: ['owner_id'],
    additionalProperties: false
} as const;