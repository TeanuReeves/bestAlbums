import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/Layout'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const StoryPage = lazy(() => import('./pages/StoryPage'))
const StoryboardPage = lazy(() => import('./pages/StoryboardPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/story/:id" element={<StoryPage />} />
          <Route path="/storyboard/:id" element={<StoryboardPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App