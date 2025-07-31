import { useState, useEffect, useCallback } from 'react'

interface StoryInputData {
  title: string
  content: string
  genre?: string
}

interface ValidationErrors {
  title?: string
  content?: string
  genre?: string
}

interface UseStoryInputReturn {
  title: string
  content: string
  genre: string
  wordCount: number
  charCount: number
  isValid: boolean
  errors: ValidationErrors
  setTitle: (title: string) => void
  setContent: (content: string) => void
  setGenre: (genre: string) => void
  handleFileUpload: (content: string) => void
  resetForm: () => void
}

const MIN_TITLE_LENGTH = 3
const MAX_TITLE_LENGTH = 255
const MIN_CONTENT_LENGTH = 50
const MAX_CONTENT_LENGTH = 50000

export const useStoryInput = (initialData?: StoryInputData): UseStoryInputReturn => {
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [genre, setGenre] = useState(initialData?.genre || '')
  const [errors, setErrors] = useState<ValidationErrors>({})

  // Calculate word and character counts
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length
  const charCount = content.length

  // Validation function
  const validate = useCallback(() => {
    const newErrors: ValidationErrors = {}

    // Title validation
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    } else if (title.length < MIN_TITLE_LENGTH) {
      newErrors.title = `Title must be at least ${MIN_TITLE_LENGTH} characters`
    } else if (title.length > MAX_TITLE_LENGTH) {
      newErrors.title = `Title must be no more than ${MAX_TITLE_LENGTH} characters`
    }

    // Content validation
    if (!content.trim()) {
      newErrors.content = 'Story content is required'
    } else if (content.length < MIN_CONTENT_LENGTH) {
      newErrors.content = `Story must be at least ${MIN_CONTENT_LENGTH} characters`
    } else if (content.length > MAX_CONTENT_LENGTH) {
      newErrors.content = `Story must be no more than ${MAX_CONTENT_LENGTH} characters`
    }

    // Genre validation (optional)
    if (genre && genre.length > 100) {
      newErrors.genre = 'Genre must be no more than 100 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [title, content, genre])

  // Validate on changes
  useEffect(() => {
    validate()
  }, [validate])

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0 && 
                  title.trim().length >= MIN_TITLE_LENGTH && 
                  content.trim().length >= MIN_CONTENT_LENGTH

  // Handle file upload
  const handleFileUpload = useCallback((fileContent: string) => {
    setContent(fileContent)
  }, [])

  // Reset form
  const resetForm = useCallback(() => {
    setTitle('')
    setContent('')
    setGenre('')
    setErrors({})
  }, [])

  return {
    title,
    content,
    genre,
    wordCount,
    charCount,
    isValid,
    errors,
    setTitle,
    setContent,
    setGenre,
    handleFileUpload,
    resetForm,
  }
}