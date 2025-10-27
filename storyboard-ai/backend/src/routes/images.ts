import { Router } from 'express'

const router = Router()

// GET /api/images/:id - Get image by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get image ${req.params.id} - TODO` })
})

// DELETE /api/images/:id - Delete image
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete image ${req.params.id} - TODO` })
})

export default router