'use client'

import { useState } from 'react'
import { useCompletion } from 'ai/react'

export default function InsightiaForm() {
  const [idea, setIdea] = useState('')
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/analyze',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    complete(idea)
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Enter your business idea here..."
          rows={4}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Idea'}
        </button>
      </form>
      {completion && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(JSON.parse(completion), null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}