import Redis from 'redis'
import { logger } from '@/utils/logger'

let redisClient: Redis.RedisClientType

export const connectRedis = async (): Promise<void> => {
  try {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

    redisClient = Redis.createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            logger.error('Redis connection failed after 10 retries')
            return new Error('Redis connection failed')
          }
          return Math.min(retries * 100, 3000)
        },
      },
    })

    redisClient.on('error', (err) => {
      logger.error('Redis Client Error:', err)
    })

    redisClient.on('connect', () => {
      logger.info('Redis client connected')
    })

    redisClient.on('ready', () => {
      logger.info('Redis client ready')
    })

    await redisClient.connect()
  } catch (error) {
    logger.error('Failed to connect to Redis:', error)
    throw error
  }
}

export const getRedisClient = (): Redis.RedisClientType => {
  if (!redisClient) {
    throw new Error('Redis not initialized. Call connectRedis() first.')
  }
  return redisClient
}

export const closeRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit()
    logger.info('Redis connection closed')
  }
}