import { Router } from 'express'

const router = Router()

// GET /api/storyboards - Get all storyboards
router.get('/', (req, res) => {
  res.json({ message: 'Get all storyboards - TODO' })
})

// POST /api/storyboards - Create a new storyboard
router.post('/', (req, res) => {
  res.json({ message: 'Create storyboard - TODO' })
})

// GET /api/storyboards/:id - Get storyboard by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get storyboard ${req.params.id} - TODO` })
})

// GET /api/storyboards/:id/status - Get storyboard status
router.get('/:id/status', (req, res) => {
  res.json({ message: `Get storyboard status ${req.params.id} - TODO` })
})

// DELETE /api/storyboards/:id - Delete storyboard
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete storyboard ${req.params.id} - TODO` })
})

export default router