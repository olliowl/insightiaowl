'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Brain, Loader2, Home, Lightbulb, Target, Zap, DollarSign, ChevronDown, ArrowLeft, Clock, AlertCircle } from 'lucide-react'

export default function EvaluateIdea() {
  const { user, error, isLoading } = useUser()
  const router = useRouter()
  const [formData, setFormData] = useState({
    ideaTitle: '',
    ideaDescription: '',
    targetMarket: '',
    uniqueSellingPoint: '',
    budget: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentEvaluation, setCurrentEvaluation] = useState(null)
  const [savedEvaluations, setSavedEvaluations] = useState([])
  const [showEvaluation, setShowEvaluation] = useState(false)
  const [activeSections, setActiveSections] = useState([0])
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        const saved = localStorage.getItem(`savedEvaluations_${user.sub}`)
        if (saved) {
          try {
            setSavedEvaluations(JSON.parse(saved))
          } catch (error) {
            console.error('Error parsing saved evaluations:', error)
            localStorage.removeItem(`savedEvaluations_${user.sub}`)
          }
        }
      } else {
        router.push('/api/auth/login')
      }
      setPageLoaded(true)
    }
  }, [user, isLoading, router])

  if (!pageLoaded) {
    return <LoadingScreen />
  }

  if (error) {
    return <ErrorScreen message={error.message} />
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
    if (formErrors[name]) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    Object.keys(formData).forEach(key => {
      if (!formData[key].trim()) {
        errors[key] = 'This field is required'
      }
    })
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (response.ok) {
        const newEvaluation = {
          ...data.evaluation,
          ideaTitle: formData.ideaTitle,
          date: new Date().toISOString(),
        }
        setCurrentEvaluation(newEvaluation)
        setSavedEvaluations(prev => {
          const updated = [newEvaluation, ...prev].slice(0, 5)
          localStorage.setItem(`savedEvaluations_${user.sub}`, JSON.stringify(updated))
          return updated
        })
        setShowEvaluation(true)
      } else {
        throw new Error(data.error || 'Failed to evaluate idea')
      }
    } catch (error) {
      console.error('Error:', error)
      setCurrentEvaluation({ error: 'Failed to evaluate idea. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleSection = (index) => {
    setActiveSections(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const formSections = [
    { icon: Lightbulb, title: "Idea Overview", color: "yellow", fields: ['ideaTitle', 'ideaDescription'] },
    { icon: Target, title: "Target Market", color: "green", fields: ['targetMarket'] },
    { icon: Zap, title: "Unique Selling Point", color: "blue", fields: ['uniqueSellingPoint'] },
    { icon: DollarSign, title: "Project Budget", color: "purple", fields: ['budget'] },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-4">
      <header className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors">
          <Brain className="w-8 h-8 text-purple-400" />
          <span className="text-2xl font-bold">Insightia</span>
        </Link>
        <Link href="/dashboard" className="flex items-center text-white hover:text-purple-300 transition-colors">
          <Home className="w-6 h-6 mr-2" />
          <span className="text-lg font-semibold">Dashboard</span>
        </Link>
      </header>

      <main className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {!showEvaluation ? (
            <>
              <h1 className="text-4xl font-bold text-center mb-8">Evaluate Your Idea</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                {formSections.map((section, index) => (
                  <FormSection 
                    key={section.title}
                    section={section}
                    index={index}
                    isActive={activeSections.includes(index)}
                    toggleSection={toggleSection}
                    formData={formData}
                    handleChange={handleChange}
                    formErrors={formErrors}
                  />
                ))}
                <div className="flex justify-center mt-8">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg transition-all duration-200 ease-in-out focus:outline-none hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                    ) : (
                      'Evaluate Idea'
                    )}
                  </motion.button>
                </div>
              </form>
            </>
          ) : (
            <EvaluationResults 
              currentEvaluation={currentEvaluation} 
              setShowEvaluation={setShowEvaluation}
            />
          )}
        </div>
        <PreviousEvaluations 
          savedEvaluations={savedEvaluations}
          setCurrentEvaluation={setCurrentEvaluation}
          setShowEvaluation={setShowEvaluation}
        />
      </main>
    </div>
  )
}

function FormSection({ section, index, isActive, toggleSection, formData, handleChange, formErrors }) {
  return (
    <motion.div 
      className="bg-white bg-opacity-10 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <button
        type="button"
        onClick={() => toggleSection(index)}
        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center">
          <section.icon className={`w-6 h-6 text-${section.color}-400 mr-3`} />
          <h2 className="text-xl font-semibold">{section.title}</h2>
        </div>
        <ChevronDown className={`transition-transform duration-300 ${isActive ? 'transform rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-4"
          >
            {section.fields.map(field => (
              <div key={field} className="mb-4">
                {field === 'ideaDescription' ? (
                  <textarea
                    name={field}
                    placeholder={field === 'ideaDescription' ? "Describe your idea" : `Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    value={formData[field]}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full p-2 bg-gray-700 rounded text-white placeholder-gray-400 ${formErrors[field] ? 'border-red-500' : ''}`}
                  ></textarea>
                ) : (
                  <input
                    type="text"
                    name={field}
                    placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`w-full p-2 bg-gray-700 rounded text-white placeholder-gray-400 ${formErrors[field] ? 'border-red-500' : ''}`}
                  />
                )}
                {formErrors[field] && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {formErrors[field]}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function EvaluationResults({ currentEvaluation, setShowEvaluation }) {
  return (
    <motion.div 
      className="bg-white bg-opacity-10 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setShowEvaluation(false)}
        className="mb-4 flex items-center text-purple-300 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Form
      </button>
      <h2 className="text-2xl font-bold mb-4">Evaluation Results</h2>
      {currentEvaluation && currentEvaluation.error ? (
        <p className="text-red-400">{currentEvaluation.error}</p>
      ) : (
        currentEvaluation && (
          <div className="space-y-4">
            <EvaluationSection title="Market Analysis" content={currentEvaluation.marketAnalysis} />
            <EvaluationSection title="Competitive Landscape" content={currentEvaluation.competitiveLandscape} />
            <EvaluationSection title="Financial Projections" content={currentEvaluation.financialProjections} />
            <EvaluationSection title="Risks and Challenges" content={currentEvaluation.risksAndChallenges} />
            <EvaluationSection title="Recommendations" content={currentEvaluation.recommendations} />
          </div>
        )
      )}
    </motion.div>
  )
}

function EvaluationSection({ title, content }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-purple-500 border-opacity-50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-purple-800 bg-opacity-50 flex justify-between items-center"
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-purple-900 bg-opacity-30"
          >
            <p className="text-gray-300 whitespace-pre-wrap">{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PreviousEvaluations({ savedEvaluations, setCurrentEvaluation, setShowEvaluation }) {
  return (
    <motion.div 
      className="w-full lg:w-64 flex-shrink-0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="sticky top-4 bg-white bg-opacity-10 rounded-lg p-4">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Previous Evaluations
        </h3>
        {savedEvaluations && savedEvaluations.length > 0 ? (
          <ul className="space-y-2">
            {savedEvaluations.map((evaluation, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <button
                  onClick={() => {
                    setCurrentEvaluation(evaluation)
                    setShowEvaluation(true)
                  }}
                  className="w-full text-left p-2 hover:bg-white hover:bg-opacity-10 rounded transition-colors"
                >
                  <p className="font-semibold truncate">{evaluation.ideaTitle}</p>
                  <p className="text-xs text-gray-400">{new Date(evaluation.date).toLocaleDateString()}</p>
                </button>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No previous evaluations</p>
        )}
      </div>
    </motion.div>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Brain className="w-16 h-16 text-purple-400" />
      </motion.div>
    </div>
  )
}

function ErrorScreen({ message }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h1>
        <p className="text-gray-300">{message}</p>
      </div>
    </div>
  )
}