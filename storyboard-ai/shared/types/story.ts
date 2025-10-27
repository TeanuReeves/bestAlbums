export interface Story {
  id: string
  title: string
  content: string
  summary?: string
  genre?: string
  wordCount: number
  createdAt: Date
  updatedAt: Date
  userId?: string
}

export interface CreateStoryRequest {
  title: string
  content: string
  genre?: string
}

export interface UpdateStoryRequest {
  title?: string
  content?: string
  genre?: string
}

export interface StoryAnalysis {
  storyId: string
  scenes: Scene[]
  characters: Character[]
  themes: string[]
  summary: string
  estimatedImages: number
}

export interface Scene {
  id: string
  title: string
  description: string
  characters: string[]
  location: string
  mood: string
  importance: 'high' | 'medium' | 'low'
  estimatedImages: number
}

export interface Character {
  id: string
  name: string
  description: string
  role: 'protagonist' | 'antagonist' | 'supporting' | 'minor'
  appearance: string
  personality: string
}