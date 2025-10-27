import { Sequelize } from 'sequelize-typescript'
import { logger } from '@/utils/logger'

let sequelize: Sequelize

export const connectDatabase = async (): Promise<void> => {
  try {
    const databaseUrl = process.env.DATABASE_URL

    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is required')
    }

    sequelize = new Sequelize(databaseUrl, {
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'development' ? logger.info : false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      },
    })

    // Test the connection
    await sequelize.authenticate()
    logger.info('Database connection has been established successfully')

    // Sync models (in development)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true })
      logger.info('Database models synchronized')
    }
  } catch (error) {
    logger.error('Unable to connect to the database:', error)
    throw error
  }
}

export const getSequelize = (): Sequelize => {
  if (!sequelize) {
    throw new Error('Database not initialized. Call connectDatabase() first.')
  }
  return sequelize
}

export const closeDatabase = async (): Promise<void> => {
  if (sequelize) {
    await sequelize.close()
    logger.info('Database connection closed')
  }
}