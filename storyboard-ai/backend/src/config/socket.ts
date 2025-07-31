import { Server } from 'socket.io'
import { logger } from '@/utils/logger'

export const setupSocketIO = (io: Server): void => {
  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`)

    // Join a room for storyboard generation updates
    socket.on('join-storyboard', (storyboardId: string) => {
      socket.join(`storyboard-${storyboardId}`)
      logger.info(`Client ${socket.id} joined storyboard room: ${storyboardId}`)
    })

    // Leave storyboard room
    socket.on('leave-storyboard', (storyboardId: string) => {
      socket.leave(`storyboard-${storyboardId}`)
      logger.info(`Client ${socket.id} left storyboard room: ${storyboardId}`)
    })

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`)
    })
  })

  logger.info('Socket.IO setup completed')
}

// Helper function to emit updates to specific storyboard room
export const emitStoryboardUpdate = (
  io: Server,
  storyboardId: string,
  event: string,
  data: any
): void => {
  io.to(`storyboard-${storyboardId}`).emit(event, data)
  logger.info(`Emitted ${event} to storyboard ${storyboardId}`)
}