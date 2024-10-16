'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, LogOut, Briefcase, Lightbulb, Target, Zap, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900">
        <Link href="/api/auth/login" className="text-white text-xl hover:underline">
          Login to access the dashboard
        </Link>
      </div>
    )
  }

  const features = [
    { icon: Lightbulb, title: 'Idea Generation', description: 'Brainstorm and refine your startup concepts' },
    { icon: Target, title: 'Market Analysis', description: 'Understand your target audience and market potential' },
    { icon: Zap, title: 'Competitive Edge', description: 'Identify your unique selling points and advantages' },
    { icon: TrendingUp, title: 'Growth Projections', description: 'Forecast your startup\'s potential trajectory' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8">
      <header className="max-w-6xl mx-auto mb-12">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Brain className="w-8 h-8 text-purple-400" />
            </motion.div>
            <span className="text-2xl font-bold">Insightia</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/api/auth/logout" className="flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-700 hover:bg-purple-600 transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <section className="mb-16 text-center">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome back, {user.name}!
          </motion.h2>
          <motion.p 
            className="text-xl text-purple-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ready to turn your next big idea into reality?
          </motion.p>
        </section>

        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/evaluate-idea" className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
              <div className="px-8 py-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Evaluate Your Idea</h3>
                  <p className="text-purple-100">Get insights and analysis for your startup concept</p>
                </div>
                <Briefcase className="w-12 h-12 text-white" />
              </div>
            </Link>
          </motion.div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Discover Insightia's Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-purple-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h3 className="text-2xl font-bold mb-4">Need Inspiration?</h3>
            <p className="text-purple-200 mb-6">Explore our curated list of startup ideas and industry trends</p>
            <Link href="#" className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-semibold transition-colors">
              Explore Ideas
            </Link>
          </motion.div>
        </section>
      </main>
    </div>
  )
}