module.exports = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        required: true
      },
      address: {
        type: 'string',
        required: true
      }
    }
  }
};
