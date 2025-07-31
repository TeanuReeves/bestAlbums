import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { StoryInput } from '@/components/StoryInput'

const StoryPage = () => {
  const { id } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStorySubmit = async (story: { title: string; content: string; genre?: string }) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Story submitted:', story)
      toast.success('Story submitted successfully!')
      
      // Here you would typically navigate to the storyboard generation page
      // or show a success message
    } catch (error) {
      console.error('Error submitting story:', error)
      toast.error('Failed to submit story. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // If we have an ID, we're editing an existing story
  if (id && id !== 'new') {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Story</h1>
        <div className="card">
          <p className="text-gray-600">Story ID: {id}</p>
          <p className="text-gray-600 mt-4">This page will contain the story editing interface.</p>
        </div>
      </div>
    )
  }

  // Otherwise, we're creating a new story
  return (
    <div className="space-y-6">
      <StoryInput 
        onSubmit={handleStorySubmit}
        isLoading={isSubmitting}
      />
    </div>
  )
}

export default StoryPage