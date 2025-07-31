export const API_ENDPOINTS = {
  // Stories
  STORIES: '/api/stories',
  STORY: (id: string) => `/api/stories/${id}`,
  
  // Storyboards
  STORYBOARDS: '/api/storyboards',
  STORYBOARD: (id: string) => `/api/storyboards/${id}`,
  STORYBOARD_STATUS: (id: string) => `/api/storyboards/${id}/status`,
  
  // Images
  IMAGES: '/api/images',
  IMAGE: (id: string) => `/api/images/${id}`,
  
  // Auth
  AUTH_LOGIN: '/api/auth/login',
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_REFRESH: '/api/auth/refresh',
  
  // Health
  HEALTH: '/health',
} as const

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const

export const API_RESPONSE_MESSAGES = {
  STORY_CREATED: 'Story created successfully',
  STORY_UPDATED: 'Story updated successfully',
  STORY_DELETED: 'Story deleted successfully',
  STORYBOARD_CREATED: 'Storyboard created successfully',
  STORYBOARD_UPDATED: 'Storyboard updated successfully',
  STORYBOARD_DELETED: 'Storyboard deleted successfully',
  IMAGE_GENERATED: 'Image generated successfully',
  IMAGE_DELETED: 'Image deleted successfully',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation error',
  INTERNAL_ERROR: 'Internal server error',
} as const