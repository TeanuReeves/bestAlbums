import { useParams } from 'react-router-dom'

const StoryPage = () => {
  const { id } = useParams()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Story Details</h1>
      <div className="card">
        <p className="text-gray-600">Story ID: {id}</p>
        <p className="text-gray-600 mt-4">This page will contain the story creation and editing interface.</p>
      </div>
    </div>
  )
}

export default StoryPage