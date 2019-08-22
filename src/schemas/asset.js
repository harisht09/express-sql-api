const bodySchema = {
  type: 'object',
  required: ['name', 'shoppingCentreId', 'location', 'width', 'height'],
  properties: {
    name: {
      type: 'string'
    },
    shoppingCentreId: {
      type: 'string',
      format: 'uuid'
    },
    location: {
      type: 'string'
    },
    width: {
      type: 'integer'
    },
    height: {
      type: 'integer'
    },
    active: {
      type: 'boolean'
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
