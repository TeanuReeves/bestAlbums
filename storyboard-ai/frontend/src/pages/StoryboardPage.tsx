import { useParams } from 'react-router-dom'

const StoryboardPage = () => {
  const { id } = useParams()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Storyboard Viewer</h1>
      <div className="card">
        <p className="text-gray-600">Storyboard ID: {id}</p>
        <p className="text-gray-600 mt-4">This page will display the generated storyboard images and controls.</p>
      </div>
    </div>
  )
}

export default StoryboardPage