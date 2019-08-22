const bodySchema = {
  type: 'object',
  required: ['name', 'address'],
  properties: {
    name: {
      type: 'string'
    },
    address: {
      type: 'string'
    }
  }
};

const paramsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    }
  }
};

module.exports = {
  bodySchema,
  paramsSchema
};
