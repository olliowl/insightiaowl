import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export default function PricingCard({ title, price, features, highlighted = false }: PricingCardProps) {
  return (
    <motion.div 
      className={`p-6 rounded-lg shadow-lg ${highlighted ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-gray-800 bg-opacity-50 backdrop-blur-lg'}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-4xl font-bold mb-6">{price}<span className="text-xl font-normal">/mo</span></p>
      <ul className="mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <ArrowRight className="h-4 w-4 mr-2 text-purple-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-2 px-4 rounded-full ${highlighted ? 'bg-white text-purple-600' : 'bg-purple-600 text-white'} hover:bg-opacity-90 transition-colors`}>
        Get Started
      </button>
    </motion.div>
  )
}