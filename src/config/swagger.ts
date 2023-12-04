export const swaggerConfig = {
  documentation: {
    info: {
      title: 'Mock Data Service',
      description: 'Service for creating and querying mock data',
      version: '1.0.0'
    }
  }
}

const limitConfig = {
  name: 'limit',
  in: 'query',
  description: 'number of records returned',
  required: true,
  default: 100
}
const offsetConfig = {
  name: 'offset',
  in: 'query',
  description: 'page offset of records returned',
  required: true,
  default: 0
}

export const limitOffsetParams = {
  parameters: [limitConfig, offsetConfig]
}

export const byIdParams = {
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'id of record',
      required: true
    }
  ]
}

export const seedByNumberParams = {
  parameters: [
    {
      name: 'numberOfRecords',
      in: 'path',
      description: 'number of mock records (per table) to generate',
      required: true,
      default: 100
    }
  ]
}

export const MANUAL_MANIPULATION_TAG = 'Manual Resource Manipulation'
export const BFF_TAG = 'Backend for Frontend'
