import { Router } from 'express'

const router = Router()

// GET /api/stories - Get all stories
router.get('/', (req, res) => {
  res.json({ message: 'Get all stories - TODO' })
})

// POST /api/stories - Create a new story
router.post('/', (req, res) => {
  res.json({ message: 'Create story - TODO' })
})

// GET /api/stories/:id - Get story by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get story ${req.params.id} - TODO` })
})

// PUT /api/stories/:id - Update story
router.put('/:id', (req, res) => {
  res.json({ message: `Update story ${req.params.id} - TODO` })
})

// DELETE /api/stories/:id - Delete story
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete story ${req.params.id} - TODO` })
})

export default router