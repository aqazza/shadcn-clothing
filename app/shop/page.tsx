'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, ChevronDown, X, Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

const products = [
  { id: 1, name: 'Minimal Vase', price: 59, image: '/placeholder.svg?height=400&width=300', hoverImage: '/placeholder.svg?height=400&width=300&text=Hover' },
  { id: 2, name: 'Elegant Chair', price: 199, image: '/placeholder.svg?height=400&width=300', hoverImage: '/placeholder.svg?height=400&width=300&text=Hover' },
  { id: 3, name: 'Soft Throw', price: 79, image: '/placeholder.svg?height=400&width=300', hoverImage: '/placeholder.svg?height=400&width=300&text=Hover' },
  { id: 4, name: 'Wooden Table', price: 299, image: '/placeholder.svg?height=400&width=300', hoverImage: '/placeholder.svg?height=400&width=300&text=Hover' },
  { id: 5, name: 'Modern Lamp', price: 129, image: '/placeholder.svg?height=400&width=300', hoverImage: '/placeholder.svg?height=400&width=300&text=Hover' },
  { id: 6, name: 'Ceramic Plates Set', price: 89, image: '/placeholder.svg?height=400&width=300', hoverImage: '/placeholder.svg?height=400&width=300&text=Hover' },
  { id: 7, name: 'Minimalist Clock', price: 69, image: '/placeholder.svg?height=400&width=300', hoverImage: '/placeholder.svg?height=400&width=300&text=Hover' },
  { id: 8, name: 'Sleek Bookshelf', price: 249, image: '/placeholder.svg?height=400&width=300', hoverImage: '/placeholder.svg?height=400&width=300&text=Hover' },
]

const categories = ['All', 'Furniture', 'Decor', 'Lighting', 'Textiles']
const sortOptions = ['Most Popular', 'New Arrivals', 'Price: Low to High', 'Price: High to Low']

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Most Popular')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const filterRef = useRef<HTMLDivElement>(null)
  const sortRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extralight">MINIMA</Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/shop" className="text-sm font-light hover:underline">Shop</Link>
            <Link href="/about" className="text-sm font-light hover:underline">About</Link>
            <Link href="/cart" className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-64 bg-neutral-100 dark:bg-neutral-800 z-50 p-4"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4">
              <X className="w-6 h-6" />
            </button>
            <ul className="mt-16 space-y-4">
              <li><Link href="/shop" className="text-lg font-light hover:underline">Shop</Link></li>
              <li><Link href="/about" className="text-lg font-light hover:underline">About</Link></li>
              <li><Link href="/cart" className="text-lg font-light hover:underline">Cart</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-3xl font-light mb-4 md:mb-0">Shop Our Collection</h1>
          <div className="flex items-center space-x-4">
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 text-sm font-light focus:outline-none"
              >
                <span>Filter</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`} />
              </button>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 shadow-lg rounded-md overflow-hidden z-10"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsFilterOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm font-light hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center space-x-2 text-sm font-light focus:outline-none"
              >
                <span>Sort</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'transform rotate-180' : ''}`} />
              </button>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 shadow-lg rounded-md overflow-hidden z-10"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option)
                        setIsSortOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm font-light hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <Image
                    src={product.hoverImage}
                    alt={`${product.name} - alternate view`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  />
                </div>
                <h2 className="text-lg font-light">{product.name}</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">${product.price}</p>
              </Link>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white dark:bg-neutral-800 p-2 rounded-md shadow-lg">
                  <button className="px-4 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md text-sm font-light hover:opacity-90 transition-opacity">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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