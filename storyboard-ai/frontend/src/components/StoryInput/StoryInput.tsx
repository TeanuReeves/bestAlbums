import React, { useState } from 'react'
import { FileText, Upload, AlertCircle, CheckCircle } from 'lucide-react'
import { useStoryInput } from '@/hooks/useStoryInput'
import FileUpload from './FileUpload'
import TextEditor from './TextEditor'

interface StoryInputProps {
  onSubmit: (story: { title: string; content: string; genre?: string }) => void
  isLoading?: boolean
  initialData?: {
    title: string
    content: string
    genre?: string
  }
}

const StoryInput: React.FC<StoryInputProps> = ({ onSubmit, isLoading = false, initialData }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text')
  const {
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
  } = useStoryInput(initialData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      onSubmit({ title, content, genre })
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Story</h2>
          <p className="text-gray-600">
            Upload a file or type your story directly. We'll analyze it and generate a beautiful storyboard.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'text'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Type Story</span>
          </button>
          <button
            onClick={() => setActiveTab('file')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'file'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Upload className="h-4 w-4" />
            <span>Upload File</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Story Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              placeholder="Enter your story title..."
              maxLength={255}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Genre Input */}
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
              Genre (Optional)
            </label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="input-field"
            >
              <option value="">Select a genre...</option>
              <option value="fantasy">Fantasy</option>
              <option value="science-fiction">Science Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
              <option value="thriller">Thriller</option>
              <option value="horror">Horror</option>
              <option value="adventure">Adventure</option>
              <option value="drama">Drama</option>
              <option value="comedy">Comedy</option>
              <option value="historical">Historical</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Story Content *
            </label>
            {activeTab === 'text' ? (
              <TextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your story here..."
              />
            ) : (
              <FileUpload
                onFileUpload={handleFileUpload}
                acceptedFormats={['.txt', '.docx', '.pdf']}
                maxSize={10 * 1024 * 1024} // 10MB
              />
            )}
            {errors.content && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.content}
              </p>
            )}
          </div>

          {/* Stats and Validation */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{wordCount}</span> words
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">{charCount}</span> characters
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isValid ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Ready to generate</span>
                </div>
              ) : (
                <div className="flex items-center text-amber-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Please complete all required fields</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={resetForm}
              className="btn-secondary"
              disabled={isLoading}
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="loading-spinner h-4 w-4" />
                  <span>Processing...</span>
                </div>
              ) : (
                'Generate Storyboard'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StoryInput