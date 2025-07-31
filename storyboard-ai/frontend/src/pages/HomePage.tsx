import { Link } from 'react-router-dom'
import { BookOpen, Image, Zap, Sparkles } from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Story Analysis',
      description: 'Upload your story and let AI analyze the narrative structure, characters, and key scenes.',
    },
    {
      icon: Zap,
      title: 'AI-Powered Generation',
      description: 'Generate 300 high-quality storyboard images using advanced AI models from OpenAI and Flux AI.',
    },
    {
      icon: Image,
      title: 'Visual Storyboarding',
      description: 'Transform your written story into a comprehensive visual storyboard with consistent styling.',
    },
    {
      icon: Sparkles,
      title: 'Real-time Progress',
      description: 'Track generation progress in real-time with live updates and status notifications.',
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Transform Your Stories into
          <span className="text-gradient block">Stunning Storyboards</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Upload your story and watch as AI analyzes your narrative and generates 300 beautiful storyboard images. 
          Powered by OpenAI and Flux AI for professional-quality results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/story/new"
            className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
          >
            <BookOpen className="h-5 w-5" />
            <span>Create Your First Storyboard</span>
          </Link>
          <Link
            to="/gallery"
            className="btn-secondary text-lg px-8 py-3 inline-flex items-center space-x-2"
          >
            <Image className="h-5 w-5" />
            <span>View Gallery</span>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-full">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Bring Your Stories to Life?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of creators who are already using AI to transform their stories into stunning visual narratives.
        </p>
        <Link
          to="/story/new"
          className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
        >
          <Sparkles className="h-5 w-5" />
          <span>Start Creating Now</span>
        </Link>
      </section>
    </div>
  )
}

export default HomePage