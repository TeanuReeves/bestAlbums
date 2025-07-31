import React, { useRef, useEffect } from 'react'
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo } from 'lucide-react'

interface TextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: number
}

interface EditorButtonProps {
  onClick: () => void
  icon: React.ReactNode
  title: string
  isActive?: boolean
}

const EditorButton: React.FC<EditorButtonProps> = ({ onClick, icon, title, isActive = false }) => (
  <button
    onClick={onClick}
    title={title}
    className={`p-2 rounded hover:bg-gray-100 transition-colors ${
      isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
    }`}
  >
    {icon}
  </button>
)

const TextEditor: React.FC<TextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Start writing your story...",
  minHeight = 300 
}) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, minHeight)}px`
    }
  }, [value, minHeight])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const formatText = (command: string, value?: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value || textarea.value.substring(start, end)
    const beforeText = textarea.value.substring(0, start)
    const afterText = textarea.value.substring(end)

    let formattedText = selectedText

    switch (command) {
      case 'bold':
        formattedText = `**${selectedText}**`
        break
      case 'italic':
        formattedText = `*${selectedText}*`
        break
      case 'quote':
        formattedText = `> ${selectedText}`
        break
      case 'bullet':
        formattedText = `• ${selectedText}`
        break
      case 'numbered':
        formattedText = `1. ${selectedText}`
        break
      default:
        return
    }

    const newValue = beforeText + formattedText + afterText
    onChange(newValue)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start, start + formattedText.length)
    }, 0)
  }

  const insertText = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const beforeText = textarea.value.substring(0, start)
    const afterText = textarea.value.substring(start)

    const newValue = beforeText + text + afterText
    onChange(newValue)

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Tab key support
    if (e.key === 'Tab') {
      e.preventDefault()
      insertText('  ') // Insert 2 spaces
    }
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-1">
          <EditorButton
            onClick={() => formatText('bold')}
            icon={<Bold className="h-4 w-4" />}
            title="Bold (Ctrl+B)"
          />
          <EditorButton
            onClick={() => formatText('italic')}
            icon={<Italic className="h-4 w-4" />}
            title="Italic (Ctrl+I)"
          />
          <div className="w-px h-6 bg-gray-300 mx-2" />
          <EditorButton
            onClick={() => formatText('bullet')}
            icon={<List className="h-4 w-4" />}
            title="Bullet List"
          />
          <EditorButton
            onClick={() => formatText('numbered')}
            icon={<ListOrdered className="h-4 w-4" />}
            title="Numbered List"
          />
          <EditorButton
            onClick={() => formatText('quote')}
            icon={<Quote className="h-4 w-4" />}
            title="Quote"
          />
        </div>
        
        <div className="flex items-center space-x-1">
          <EditorButton
            onClick={() => {
              // Undo functionality would require state management
              // For now, just a placeholder
            }}
            icon={<Undo className="h-4 w-4" />}
            title="Undo (Ctrl+Z)"
          />
          <EditorButton
            onClick={() => {
              // Redo functionality would require state management
              // For now, just a placeholder
            }}
            icon={<Redo className="h-4 w-4" />}
            title="Redo (Ctrl+Y)"
          />
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full p-4 resize-none border-0 focus:outline-none focus:ring-0"
          style={{ minHeight: `${minHeight}px` }}
        />
        
        {/* Character count overlay */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white px-2 py-1 rounded">
          {value.length} characters
        </div>
      </div>
    </div>
  )
}

export default TextEditor