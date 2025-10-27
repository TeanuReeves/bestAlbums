import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X, AlertCircle, CheckCircle } from 'lucide-react'
import { processFile } from '@/utils/fileProcessors'

interface FileUploadProps {
  onFileUpload: (content: string) => void
  acceptedFormats: string[]
  maxSize: number
}

interface UploadedFile {
  name: string
  size: number
  type: string
  content?: string
  error?: string
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, acceptedFormats, maxSize }) => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      const file = acceptedFiles[0]
      setIsProcessing(true)

      try {
        // Validate file size
        if (file.size > maxSize) {
          throw new Error(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`)
        }

        // Validate file type
        const fileExtension = file.name.toLowerCase().split('.').pop()
        const acceptedExtensions = acceptedFormats.map(format => format.replace('.', ''))
        
        if (!acceptedExtensions.includes(fileExtension || '')) {
          throw new Error(`File type not supported. Please upload: ${acceptedFormats.join(', ')}`)
        }

        // Process file content
        const content = await processFile(file)
        
        const uploadedFileData: UploadedFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          content,
        }

        setUploadedFile(uploadedFileData)
        onFileUpload(content)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to process file'
        setUploadedFile({
          name: file.name,
          size: file.size,
          type: file.type,
          error: errorMessage,
        })
      } finally {
        setIsProcessing(false)
      }
    },
    [maxSize, acceptedFormats, onFileUpload]
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedFormats.reduce((acc, format) => {
      const mimeType = format === '.txt' ? 'text/plain' : 
                      format === '.docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                      format === '.pdf' ? 'application/pdf' : ''
      if (mimeType) {
        acc[mimeType] = [format]
      }
      return acc
    }, {} as Record<string, string[]>),
    maxFiles: 1,
    disabled: isProcessing,
  })

  const removeFile = () => {
    setUploadedFile(null)
    onFileUpload('')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragActive
            ? 'border-primary-400 bg-primary-50'
            : isDragReject
            ? 'border-red-400 bg-red-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        
        {isProcessing ? (
          <div className="space-y-2">
            <div className="loading-spinner h-8 w-8 mx-auto" />
            <p className="text-sm text-gray-600">Processing file...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="h-12 w-12 mx-auto text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-900">
                {isDragActive ? 'Drop your file here' : 'Drag & drop your story file'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                or click to browse
              </p>
            </div>
            <div className="text-xs text-gray-500">
              <p>Supported formats: {acceptedFormats.join(', ')}</p>
              <p>Max size: {Math.round(maxSize / 1024 / 1024)}MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Uploaded File Display */}
      {uploadedFile && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {uploadedFile.error ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <File className="h-4 w-4 text-gray-400" />
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {uploadedFile.name}
                  </p>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{formatFileSize(uploadedFile.size)}</span>
                  {uploadedFile.content && (
                    <span>{uploadedFile.content.split(/\s+/).length} words</span>
                  )}
                </div>
                {uploadedFile.error && (
                  <p className="text-xs text-red-600 mt-1">{uploadedFile.error}</p>
                )}
              </div>
            </div>
            <button
              onClick={removeFile}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload