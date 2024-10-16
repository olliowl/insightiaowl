'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Brain, Zap, Sparkles, Star, Atom, Target, Shield, Lightbulb, User, LogOut, ChevronDown, ChevronUp } from 'lucide-react'
import { useUser } from '@auth0/nextjs-auth0/client'
import WaveBackground from './components/WaveBackground'
import OpenAILogo from './components/OpenAILogo'
import V0Logo from './components/V0Logo'

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const { user, error, isLoading } = useUser()
  const router = useRouter()
  const [openFAQ, setOpenFAQ] = useState(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleEvaluateClick = () => {
    if (user) {
      router.push('/evaluate-idea')
    } else {
      router.push('/api/auth/login')
    }
  }

  const loginUrl = `/api/auth/login`

  const features = [
    { icon: <Zap />, title: "Instant Analysis", description: "Get comprehensive insights on your business idea within seconds." },
    { icon: <Sparkles />, title: "Market Research", description: "Understand your target audience and market potential." },
    { icon: <Star />, title: "Risk Assessment", description: "Identify potential challenges and mitigate risks early." },
    { icon: <Target />, title: "Competitor Analysis", description: "Gain insights into your competitors' strategies and market position." },
    { icon: <Shield />, title: "Idea Validation", description: "Validate your concept with data-driven feedback and suggestions." },
    { icon: <Lightbulb />, title: "Innovation Scoring", description: "Receive an innovation score to gauge your idea's uniqueness and potential." },
  ]

  const steps = [
    { number: 1, title: "Input Your Idea", description: "Describe your startup idea and target market in our intuitive interface." },
    { number: 2, title: "AI Analysis", description: "Our advanced AI algorithms analyze your idea against market trends and data." },
    { number: 3, title: "Receive Insights", description: "Get detailed reports and actionable insights to refine and improve your idea." },
  ]

  const faqItems = [
    {
      question: "How accurate is the AI analysis?",
      answer: "Our AI analysis is based on up-to-date market data and trends. While it provides valuable insights, it's important to use it as a tool alongside your own research and expertise."
    },
    {
      question: "Is my idea information kept confidential?",
      answer: "Yes, we take data privacy very seriously. All idea submissions are encrypted and only accessible to you. We do not share or use your ideas for any purpose other than providing you with analysis."
    },
    {
      question: "Can I use Insightia for multiple ideas?",
      answer: "You can evaluate as many ideas as you like. We encourage users to iterate on their ideas based on the insights provided."
    },
    {
      question: "How often is the market data updated?",
      answer: "Our AI model is regularly updated with the latest market trends and data. We strive to provide the most current insights possible."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee if you're not satisfied with our service. Please contact our support team for more information."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white font-sans relative overflow-hidden">
      <WaveBackground />
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="h-10 w-10 text-purple-400"
              >
                <Brain className="h-full w-full" />
              </motion.div>
              <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Insightia</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors font-medium">Features</Link>
              <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors font-medium">How It Works</Link>
              <Link href="#faq" className="text-gray-300 hover:text-white transition-colors font-medium">FAQ</Link>
            </nav>
            {!isLoading && (
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                      <User className="h-6 w-6" />
                    </Link>
                    <Link
                      href="/api/auth/logout"
                      className="px-4 py-2 rounded-full bg-purple-700 hover:bg-purple-600 transition-colors flex items-center font-medium"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Link>
                  </>
                ) : (
                  <Link
                    href={loginUrl}
                    className="px-4 py-2 rounded-full bg-purple-700 hover:bg-purple-600 transition-colors font-medium"
                  >
                    Log In
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <main className="pt-24 pb-16">
          <section className="mt-16 mb-32">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              <motion.div 
                className="sm:text-center lg:text-left lg:col-span-7"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8">
                  <span className="block">The AI platform to</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    evaluate your startup
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    ideas, <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">intelligently</span> <span className="text-yellow-400">✧</span>
                  </span>
                </h1>
                <p className="mt-3 text-xl text-gray-300 sm:mt-5 sm:text-2xl lg:text-xl xl:text-2xl max-w-3xl mx-auto lg:mx-0 font-light">
                  Let AI help you with market research, idea validation, and business planning. Find your next big opportunity with data-driven insights.
                </p>
                <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                  <motion.button 
                    onClick={handleEvaluateClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 text-lg font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    Evaluate your idea now
                    <ArrowRight className="ml-2 inline-block" />
                  </motion.button>
                </div>
                <motion.div
                  className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-lg"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <div className="bg-black rounded-lg p-2 flex items-center">
                      <OpenAILogo />
                      <span className="text-white font-semibold">Powered by OpenAI</span>
                    </div>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-lg"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <div className="bg-black rounded-lg p-2 flex items-center">
                      <V0Logo />
                      <span className="text-white font-semibold">Powered by V0</span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
              <div className="mt-16 lg:mt-0 lg:col-span-5">
                <motion.div 
                  className="relative mx-auto w-full max-w-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Atom className="h-full w-full text-purple-500 opacity-30" />
                    </motion.div>
                    <div className="relative">
                      <motion.div 
                        className="flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Brain className="h-64 w-64 text-purple-400" />
                      </motion.div>
                      <motion.div
                        className="absolute top-0 left-0"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Zap className="h-16 w-16 text-yellow-400" />
                      </motion.div>
                      <motion.div
                        className="absolute bottom-0 right-0"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      >
                        <Sparkles className="h-16 w-16 text-blue-400" />
                      </motion.div>
                      <motion.div
                        className="absolute top-1/2 right-0 transform -translate-y-1/2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      >
                        <Star className="h-16 w-16 text-pink-400" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="features" className="py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-purple-600 to-indigo-700 text-white mb-16"
            >
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="mr-4 text-4xl"><Zap /></div>
                  <h2 className="text-3xl font-bold">Powerful Features</h2>
                </div>
                <p className="text-lg mb-6">Leverage cutting-edge AI to analyze your startup ideas from every angle. Get comprehensive insights on market potential, competitive landscape, and financial projections.</p>
                <motion.a
                  href="#feature-details"
                  className="inline-flex items-center text-lg font-semibold hover:underline"
                  whileHover={{ x: 5 }}
                >
                  Explore Features
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.a>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-32 -mb-32 pointer-events-none" />
            </motion.div>

            <div id="feature-details" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
              ))}
            </div>
          </section>

          <section id="how-it-works" className="py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-pink-600 to-red-700 text-white mb-16"
            >
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="mr-4 text-4xl"><Lightbulb /></div>
                  <h2 className="text-3xl font-bold">How It Works</h2>
                </div>
                <p className="text-lg mb-6">Input your idea, let our AI analyze it, and receive detailed insights within minutes. Iterate and refine your concept based on data-driven recommendations.</p>
                <motion.a
                  href="#steps"
                  className="inline-flex items-center text-lg font-semibold hover:underline"
                  whileHover={{ x: 5 }}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.a>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-32 -mb-32 pointer-events-none" />
            </motion.div>

            <div id="steps" className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
              {steps.map((step, index) => (
                <StepCard key={index} number={step.number} title={step.title} description={step.description} />
              ))}
            </div>
          </section>

          <section id="faq" className="py-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div id="faq-list" className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <FAQItem 
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </div>
          </section>
        </main>

        <footer className="border-t border-gray-800 py-12 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-purple-400 mr-2" />
              <span className="text-lg font-semibold">Insightia</span>
            </div>
            <nav className="flex space-x-4">
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link>
            </nav>
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">© 2024 Insightia. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      className="bg-purple-800 bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="text-pink-400 mb-4 text-3xl"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-purple-200">{description}</p>
    </motion.div>
  )
}

function StepCard({ number, title, description }) {
  return (
    <motion.div 
      className="bg-purple-800 bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-lg text-center w-full md:w-1/3"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="text-pink-400 text-5xl font-bold mb-4"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {number}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-purple-200">{description}</p>
    </motion.div>
  )
}

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <motion.div
      className="mb-4"
      initial={false}
      animate={{ backgroundColor: isOpen ? "rgba(139, 92, 246, 0.1)" : "rgba(88, 28, 135, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        className="flex justify-between items-center w-full text-left font-semibold text-lg p-4 rounded-lg focus:outline-none"
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-purple-800 bg-opacity-50 rounded-lg mt-2">
              <p className="text-purple-200">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}