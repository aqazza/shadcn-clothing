'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Menu, X, ShoppingBag, Moon, Sun } from 'lucide-react'

const products = [
  { id: 1, name: 'Minimal Vase', price: '$59', image: '/placeholder.svg?height=400&width=300' },
  { id: 2, name: 'Elegant Chair', price: '$199', image: '/placeholder.svg?height=400&width=300' },
  { id: 3, name: 'Soft Throw', price: '$79', image: '/placeholder.svg?height=400&width=300' },
  { id: 4, name: 'Wooden Table', price: '$299', image: '/placeholder.svg?height=400&width=300' },
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 transition-colors duration-300">
      <header className="fixed top-0 left-0 w-full z-50 bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-2xl font-light"
            onClick={toggleMenu}
          >
            <Menu className="w-6 h-6" />
          </motion.button>
          <Link href="/" className="text-2xl font-extralight">MINIMA</Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 rounded-full w-4 h-4 text-xs flex items-center justify-center">
              0
            </span>
          </motion.button>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 w-64 h-full bg-neutral-100 dark:bg-neutral-800 z-50 p-4"
          >
            <button onClick={toggleMenu} className="absolute top-4 right-4">
              <X className="w-6 h-6" />
            </button>
            <ul className="mt-16 space-y-4">
              <li><Link href="/" className="text-lg font-light hover:underline">Home</Link></li>
              <li><Link href="/products/1" className="text-lg font-light hover:underline">Shop</Link></li>
              <li><Link href="/cart" className="text-lg font-light hover:underline">Cart</Link></li>
              <li><Link href="/about" className="text-lg font-light hover:underline">About</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        <section className="h-screen flex items-center justify-center bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
          <div className="text-center text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-extralight mb-4"
            >
              Elevate Your Space
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl font-light mb-8"
            >
              Minimalist design for modern living
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/products/1" className="bg-white text-black px-8 py-3 rounded-full text-lg font-light hover:bg-opacity-90 transition-colors">
                Shop Now
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h3 className="text-2xl font-light mb-8">Top-Selling Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-lg font-light">{product.name}</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{product.price}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 text-center">
          <h3 className="text-2xl font-light mb-4">Experience Minimalism</h3>
          <p className="text-lg font-light mb-8 max-w-2xl mx-auto">
            Discover our curated collection of minimalist designs that bring simplicity and elegance to your living space.
          </p>
          <Link href="/products/1" className="inline-block border border-current px-8 py-3 rounded-full text-lg font-light hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 transition-colors">
            Explore Collection
          </Link>
        </section>
      </main>

      <footer className="bg-neutral-100 dark:bg-neutral-800 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
          <p>&copy; 2023 MINIMA. All rights reserved.</p>
        </div>
      </footer>

      {mounted && (
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="fixed bottom-4 right-4 p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200"
        >
          {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      )}
    </div>
  )
}