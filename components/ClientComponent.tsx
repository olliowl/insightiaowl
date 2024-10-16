'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Atom } from 'lucide-react'

export default function ClientComponent() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-screen filter blur-xl opacity-70"
          style={{
            background: `radial-gradient(circle, ${['#ff00ff', '#00ffff', '#ffff00', '#ff00ff'][i % 4]} 0%, rgba(255,255,255,0) 70%)`,
            width: `${Math.random() * 300 + 50}px`,
            height: `${Math.random() * 300 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Atom className="h-48 w-48 text-purple-500 opacity-30" />
      </motion.div>
    </div>
  )
}