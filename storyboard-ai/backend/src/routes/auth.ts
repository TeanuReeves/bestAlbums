import { Router } from 'express'

const router = Router()

// POST /api/auth/login - Login user
router.post('/login', (req, res) => {
  res.json({ message: 'Login - TODO' })
})

// POST /api/auth/register - Register user
router.post('/register', (req, res) => {
  res.json({ message: 'Register - TODO' })
})

// POST /api/auth/logout - Logout user
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout - TODO' })
})

// POST /api/auth/refresh - Refresh token
router.post('/refresh', (req, res) => {
  res.json({ message: 'Refresh token - TODO' })
})

export default router