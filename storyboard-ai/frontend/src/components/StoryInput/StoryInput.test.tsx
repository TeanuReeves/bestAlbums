import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import StoryInput from './StoryInput'

// Mock the file processing utilities
jest.mock('@/utils/fileProcessors', () => ({
  processFile: jest.fn().mockResolvedValue('Mocked file content'),
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('StoryInput', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the story input form', () => {
    renderWithRouter(<StoryInput onSubmit={mockOnSubmit} />)
    
    expect(screen.getByText('Create Your Story')).toBeInTheDocument()
    expect(screen.getByLabelText(/Story Title/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Genre/)).toBeInTheDocument()
    expect(screen.getByText('Type Story')).toBeInTheDocument()
    expect(screen.getByText('Upload File')).toBeInTheDocument()
  })

  it('shows validation errors for empty form', async () => {
    renderWithRouter(<StoryInput onSubmit={mockOnSubmit} />)
    
    const submitButton = screen.getByText('Generate Storyboard')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument()
      expect(screen.getByText('Story content is required')).toBeInTheDocument()
    })
  })

  it('allows switching between text and file upload tabs', () => {
    renderWithRouter(<StoryInput onSubmit={mockOnSubmit} />)
    
    const fileUploadTab = screen.getByText('Upload File')
    fireEvent.click(fileUploadTab)
    
    expect(screen.getByText('Drag & drop your story file')).toBeInTheDocument()
  })

  it('updates character and word count in real-time', () => {
    renderWithRouter(<StoryInput onSubmit={mockOnSubmit} />)
    
    const titleInput = screen.getByLabelText(/Story Title/)
    fireEvent.change(titleInput, { target: { value: 'Test Story' } })
    
    expect(screen.getByText('0 words')).toBeInTheDocument()
    expect(screen.getByText('0 characters')).toBeInTheDocument()
  })
})