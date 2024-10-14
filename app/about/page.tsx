import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 pt-16">
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-block mb-8 text-sm font-light hover:underline">&larr; Back to Home</Link>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-light mb-8">About MINIMA</h1>
          <div className="relative aspect-[16/9] mb-8">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="MINIMA studio"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <p className="text-lg font-light mb-6">
            MINIMA was born from a passion for simplicity and a belief in the power of minimalist design. We curate and create pieces that bring calm and purpose to your living spaces.
          </p>
          <p className="text-lg font-light mb-6">
            Our journey began in a small studio, with a vision to transform how people interact with their environments. We believe that by surrounding ourselves with thoughtfully designed objects, we can cultivate a more intentional and harmonious way of living.
          </p>
          <p className="text-lg font-light">
            Each piece in our collection is carefully selected or crafted to embody our core principles: simplicity, functionality, and beauty. We work with skilled artisans and innovative designers who share our commitment to quality and sustainability.
          </p>
        </div>
      </main>
    </div>
  )
}