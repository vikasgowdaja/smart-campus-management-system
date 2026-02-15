const swaggerJSDoc = require('swagger-jsdoc');
const env = require('../config/env');

const PORT = env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Smart Campus Event System API',
      version: '1.0.0',
      description: 'Production-hardened API documentation'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        UserRegister: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Admin User' },
            email: { type: 'string', example: 'admin@campus.edu' },
            password: { type: 'string', example: 'AdminPass123' },
            role: { type: 'string', example: 'admin' }
          }
        },
        UserLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'admin@campus.edu' },
            password: { type: 'string', example: 'AdminPass123' }
          }
        },
        EventCreate: {
          type: 'object',
          required: ['title', 'event_date', 'location', 'created_by'],
          properties: {
            title: { type: 'string', example: 'AI Workshop' },
            description: { type: 'string', example: 'Hands-on intro to AI' },
            event_date: { type: 'string', format: 'date-time', example: '2026-03-10T10:00:00Z' },
            location: { type: 'string', example: 'Lab 2' },
            created_by: { type: 'integer', example: 1 }
          }
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJSDoc(options);

swaggerSpec.paths = {
  '/api/health': {
    get: {
      summary: 'Health check',
      responses: {
        200: { description: 'Service status' }
      }
    }
  },
  '/api/users/register': {
    post: {
      summary: 'Register user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UserRegister' }
          }
        }
      },
      responses: {
        201: { description: 'Registered' },
        400: { description: 'Validation error' }
      }
    }
  },
  '/api/users/login': {
    post: {
      summary: 'Login user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UserLogin' }
          }
        }
      },
      responses: {
        200: { description: 'JWT token response' },
        401: { description: 'Invalid credentials' }
      }
    }
  },
  '/api/events': {
    post: {
      summary: 'Create event (admin only)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/EventCreate' }
          }
        }
      },
      responses: {
        201: { description: 'Event created' },
        403: { description: 'Forbidden' }
      }
    },
    get: {
      summary: 'List events',
      responses: {
        200: { description: 'Event list' }
      }
    }
  },
  '/api/events/stats': {
    get: {
      summary: 'Event aggregation stats',
      responses: {
        200: { description: 'Stats response' }
      }
    }
  }
};

module.exports = swaggerSpec;
