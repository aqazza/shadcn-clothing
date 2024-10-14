'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const cartItems = [
  { id: 1, name: 'Minimal Vase', price: 59, quantity: 1, image: '/placeholder.svg?height=100&width=100' },
  { id: 2, name: 'Elegant Chair', price: 199, quantity: 2, image: '/placeholder.svg?height=100&width=100' },
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ).filter(item => item.quantity > 0))
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 pt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-light mb-8">Your Cart</h1>
        {items.length === 0 ? (
          <p className="text-center text-lg font-light">Your cart is empty.</p>
        ) : (
          <div className="space-y-8">
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-4"
              >
                <Image src={item.image} alt={item.name} width={100} height={100} className="rounded-lg" />
                <div className="flex-grow">
                  <h2 className="text-lg font-light">{item.name}</h2>
                  <p className="text-neutral-600 dark:text-neutral-400">${item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-2xl">-</button>
                  <span className="text-lg font-light">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-2xl">+</button>
                </div>
              </motion.div>
            ))}
            <div className="border-t pt-4">
              <p className="text-xl font-light">Total: ${total}</p>
            </div>
            <button className="w-full bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 py-3 rounded-full text-lg font-light hover:opacity-90 transition-opacity">
              Proceed to Checkout
            </button>
          
          </div>
        )}
      </main>
    </div>
  )
}