export interface Storyboard {
  id: string
  storyId: string
  title: string
  status: StoryboardStatus
  totalImages: number
  generatedImages: number
  progress: number
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  images: StoryboardImage[]
  settings: StoryboardSettings
}

export type StoryboardStatus = 
  | 'pending'
  | 'analyzing'
  | 'generating'
  | 'completed'
  | 'failed'
  | 'cancelled'

export interface StoryboardImage {
  id: string
  storyboardId: string
  sceneId: string
  url: string
  thumbnailUrl: string
  prompt: string
  order: number
  status: ImageStatus
  createdAt: Date
  metadata?: ImageMetadata
}

export type ImageStatus = 
  | 'pending'
  | 'generating'
  | 'completed'
  | 'failed'

export interface ImageMetadata {
  model: string
  seed: number
  steps: number
  cfgScale: number
  width: number
  height: number
  negativePrompt?: string
}

export interface StoryboardSettings {
  style: string
  aspectRatio: '16:9' | '4:3' | '1:1' | '3:2'
  imageQuality: 'low' | 'medium' | 'high'
  maxImages: number
  includeCharacters: boolean
  includeBackgrounds: boolean
  colorScheme?: string
  artStyle?: string
}

export interface CreateStoryboardRequest {
  storyId: string
  title: string
  settings: StoryboardSettings
}

export interface StoryboardProgress {
  storyboardId: string
  status: StoryboardStatus
  progress: number
  currentImage: number
  totalImages: number
  estimatedTimeRemaining?: number
  currentScene?: string
}