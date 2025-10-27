# Storyboard AI Generator

An AI-powered story-to-storyboard generator that processes written stories through OpenAI analysis and generates 300 images via Flux AI.

## 🚀 Features

- **Story Processing**: Analyze written stories using OpenAI's GPT models
- **Image Generation**: Generate 300 storyboard images using Flux AI
- **Real-time Updates**: Live progress tracking and status updates
- **Queue Processing**: Robust job queue system with Redis
- **Cloud Storage**: Secure image storage and management
- **Modern UI**: Beautiful React frontend with TypeScript

## 🏗️ Architecture

```
storyboard-ai/
├── frontend/                 # React TypeScript app
├── backend/                  # Node.js Express API
├── shared/                   # Shared TypeScript types
├── docker-compose.yml        # Development environment
└── README.md                # Project documentation
```

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- React Query for state management
- Socket.io client for real-time updates

### Backend
- Node.js with Express
- TypeScript for type safety
- PostgreSQL for data persistence
- Redis for job queue management
- OpenAI API integration
- Flux AI API integration

### Infrastructure
- Docker Compose for development
- Environment-based configuration
- ESLint and Prettier for code quality

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- PostgreSQL
- Redis

### Development Setup

1. **Clone and install dependencies:**
   ```bash
   cd storyboard-ai
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **Environment Configuration:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

3. **Start development environment:**
   ```bash
   docker-compose up -d
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Database: localhost:5432
   - Redis: localhost:6379

## 📁 Project Structure

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   └── styles/             # CSS and styling
├── public/                 # Static assets
└── package.json
```

### Backend (`/backend`)
```
backend/
├── src/
│   ├── controllers/        # Route controllers
│   ├── services/           # Business logic
│   ├── models/             # Database models
│   ├── middleware/         # Express middleware
│   ├── routes/             # API routes
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   └── config/             # Configuration files
├── tests/                  # Test files
└── package.json
```

### Shared (`/shared`)
```
shared/
├── types/                  # Shared TypeScript types
├── constants/              # Shared constants
└── utils/                  # Shared utility functions
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/storyboard_ai
REDIS_URL=redis://localhost:6379

# OpenAI
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4

# Flux AI
FLUX_AI_API_KEY=your_flux_ai_api_key
FLUX_AI_BASE_URL=https://api.flux.ai

# Server
PORT=8000
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:8000
VITE_SOCKET_URL=http://localhost:8000
```

## 📝 API Endpoints

### Stories
- `POST /api/stories` - Create a new story
- `GET /api/stories` - Get all stories
- `GET /api/stories/:id` - Get story by ID
- `PUT /api/stories/:id` - Update story
- `DELETE /api/stories/:id` - Delete story

### Storyboards
- `POST /api/storyboards` - Generate storyboard
- `GET /api/storyboards` - Get all storyboards
- `GET /api/storyboards/:id` - Get storyboard by ID
- `GET /api/storyboards/:id/status` - Get generation status

### Images
- `GET /api/images/:id` - Get image by ID
- `DELETE /api/images/:id` - Delete image

## 🧪 Testing

```bash
# Run all tests
npm test

# Run frontend tests
cd frontend && npm test

# Run backend tests
cd backend && npm test
```

## 🚀 Deployment

### Production Build

```bash
# Build frontend
cd frontend && npm run build

# Build backend
cd backend && npm run build

# Start production servers
npm run start:prod
```

### Docker Deployment

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions, please open an issue in the repository.