'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'Minimal Vase',
    price: '$59',
    description: 'Elevate your space with our sleek Minimal Vase. Crafted from high-quality ceramic, this versatile piece complements any decor style.',
    images: [
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
    ],
  },
  {
    id: 2,
    name: 'Elegant Chair',
    price: '$199',
    description: 'Add a touch of sophistication to your home with the Elegant Chair, designed for both style and comfort.',
    images: [
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
    ],
  },
  {
    id: 3,
    name: 'Soft Throw',
    price: '$79',
    description: 'Stay cozy with our Soft Throw, made from premium materials to keep you warm on chilly days.',
    images: [
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
    ],
  },
  {
    id: 4,
    name: 'Wooden Table',
    price: '$299',
    description: 'Enhance your dining experience with our Wooden Table, expertly crafted from solid wood for durability and style.',
    images: [
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
    ],
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id, 10) // Convert id to number
  const product = products.find((p) => p.id === productId) // Find matching product

  const [currentImage, setCurrentImage] = useState(0)

  if (!product) {
    return <p>Product not found.</p> // Handle product not found case
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 pt-16">
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-block mb-8 text-sm font-light hover:underline">
          &larr; Back to Home
        </Link>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <Image
                src={product.images[currentImage]}
                alt={`${product.name} Image ${currentImage + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </motion.div>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 dark:bg-black/50 rounded-full p-2"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 dark:bg-black/50 rounded-full p-2"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-light">{product.name}</h1> {/* Only one name display */}
            <p className="text-2xl font-light">{product.price}</p>
            <p className="text-neutral-600 dark:text-neutral-400">
              {product.description}
            </p>
            <button className="w-full bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 py-3 rounded-full text-lg font-light hover:opacity-90 transition-opacity">
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
