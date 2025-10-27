// File processing utilities for different document formats

interface ProcessedFile {
  content: string
  wordCount: number
  charCount: number
}

/**
 * Process a file and extract text content
 */
export const processFile = async (file: File): Promise<string> => {
  const fileExtension = file.name.toLowerCase().split('.').pop()
  
  switch (fileExtension) {
    case 'txt':
      return await processTextFile(file)
    case 'docx':
      return await processDocxFile(file)
    case 'pdf':
      return await processPdfFile(file)
    default:
      throw new Error(`Unsupported file format: ${fileExtension}`)
  }
}

/**
 * Process plain text files
 */
const processTextFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        const cleanedContent = cleanTextContent(content)
        resolve(cleanedContent)
      } catch (error) {
        reject(new Error('Failed to read text file'))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    
    reader.readAsText(file)
  })
}

/**
 * Process DOCX files using mammoth.js
 */
const processDocxFile = async (file: File): Promise<string> => {
  try {
    // Dynamically import mammoth to avoid bundling issues
    const mammoth = await import('mammoth')
    
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    
    if (result.messages.length > 0) {
      console.warn('DOCX processing warnings:', result.messages)
    }
    
    const cleanedContent = cleanTextContent(result.value)
    return cleanedContent
  } catch (error) {
    throw new Error('Failed to process DOCX file. Please ensure the file is not corrupted.')
  }
}

/**
 * Process PDF files using pdf-parse
 */
const processPdfFile = async (file: File): Promise<string> => {
  try {
    // Dynamically import pdf-parse to avoid bundling issues
    const pdfParse = await import('pdf-parse')
    
    const arrayBuffer = await file.arrayBuffer()
    const data = await pdfParse.default(Buffer.from(arrayBuffer))
    
    const cleanedContent = cleanTextContent(data.text)
    return cleanedContent
  } catch (error) {
    throw new Error('Failed to process PDF file. Please ensure the file is not corrupted or password-protected.')
  }
}

/**
 * Clean and normalize text content
 */
const cleanTextContent = (content: string): string => {
  return content
    // Remove excessive whitespace
    .replace(/\s+/g, ' ')
    // Remove excessive newlines
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    // Remove leading/trailing whitespace
    .trim()
    // Normalize line endings
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
}

/**
 * Get file statistics
 */
export const getFileStats = (content: string): { wordCount: number; charCount: number } => {
  const words = content.split(/\s+/).filter(word => word.length > 0)
  return {
    wordCount: words.length,
    charCount: content.length,
  }
}

/**
 * Validate file content
 */
export const validateFileContent = (content: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!content.trim()) {
    errors.push('File appears to be empty')
  }
  
  if (content.length < 50) {
    errors.push('Content is too short (minimum 50 characters)')
  }
  
  if (content.length > 50000) {
    errors.push('Content is too long (maximum 50,000 characters)')
  }
  
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length
  if (wordCount < 10) {
    errors.push('Content has too few words (minimum 10 words)')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Extract title from content (first line or first sentence)
 */
export const extractTitleFromContent = (content: string): string => {
  const lines = content.split('\n').filter(line => line.trim().length > 0)
  if (lines.length === 0) return ''
  
  const firstLine = lines[0].trim()
  
  // If first line is short and looks like a title, use it
  if (firstLine.length <= 100 && !firstLine.includes('.') && !firstLine.includes('!') && !firstLine.includes('?')) {
    return firstLine
  }
  
  // Otherwise, extract first sentence
  const sentences = content.split(/[.!?]/).filter(sentence => sentence.trim().length > 0)
  if (sentences.length === 0) return ''
  
  return sentences[0].trim()
}

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}