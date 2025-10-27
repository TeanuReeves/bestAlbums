import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'

import { logger } from '@/utils/logger'
import { errorHandler } from '@/middleware/errorHandler'
import { notFoundHandler } from '@/middleware/notFoundHandler'
import { connectDatabase } from '@/config/database'
import { connectRedis } from '@/config/redis'
import { setupSocketIO } from '@/config/socket'

// Load environment variables
dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // allow 50 requests per 15 minutes, then...
  delayMs: 500, // begin adding 500ms of delay per request above 50
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}))
app.use(compression())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }))

// Apply rate limiting to all requests
app.use(limiter)
app.use(speedLimiter)

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  })
})

// API routes
app.use('/api/stories', require('@/routes/stories').default)
app.use('/api/storyboards', require('@/routes/storyboards').default)
app.use('/api/images', require('@/routes/images').default)
app.use('/api/auth', require('@/routes/auth').default)

// Setup Socket.IO
setupSocketIO(io)

// Error handling middleware
app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

async function startServer() {
  try {
    // Connect to database
    await connectDatabase()
    logger.info('Database connected successfully')

    // Connect to Redis
    await connectRedis()
    logger.info('Redis connected successfully')

    // Start server
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
      logger.info(`Environment: ${process.env.NODE_ENV}`)
    })
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully')
  server.close(() => {
    logger.info('Process terminated')
  })
})

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully')
  server.close(() => {
    logger.info('Process terminated')
  })
})

startServer()