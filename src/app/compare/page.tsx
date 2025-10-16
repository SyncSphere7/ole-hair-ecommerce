'use client'

import { useCompareStore } from '@/store/compareStore'
import Link from 'next/link'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utils'
import { FiX } from 'react-icons/fi'

export default function ComparePage() {
  const items = useCompareStore((state) => state.items)
  const removeItem = useCompareStore((state) => state.removeItem)
  const clearCompare = useCompareStore((state) => state.clearCompare)

  if (items.length === 0) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-serif mb-4">Product Comparison</h1>
          <p className="text-gray-600 mb-8">Add products to compare their features</p>
          <Link href="/products" className="btn-primary inline-block">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif">Compare Products</h1>
          <button
            onClick={clearCompare}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-4 text-left font-semibold">Feature</th>
                {items.map((product) => (
                  <th key={product.id} className="p-4 text-center min-w-[250px]">
                    <div className="relative">
                      <button
                        onClick={() => removeItem(product.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                      <div className="relative h-48 bg-gray-100 rounded-lg mb-3">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <Link href={`/products/${product.id}`} className="font-serif text-lg hover:text-gold">
                        {product.name}
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-4 font-semibold">Price</td>
                {items.map((product) => (
                  <td key={product.id} className="p-4 text-center text-xl font-bold text-gold">
                    {formatCurrency(product.price)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="p-4 font-semibold">Category</td>
                {items.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    {product.category === 'wig' ? 'Wig' : 'Hair Bundle'}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-4 font-semibold">Type</td>
                {items.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    {product.type}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="p-4 font-semibold">Size/Length</td>
                {items.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    {product.size || product.length || '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-4 font-semibold">Stock Status</td>
                {items.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    {product.inStock ? (
                      <span className="text-green-600 font-medium">In Stock</span>
                    ) : (
                      <span className="text-red-600 font-medium">Out of Stock</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 font-semibold">Description</td>
                {items.map((product) => (
                  <td key={product.id} className="p-4 text-center text-sm text-gray-600">
                    {product.description}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4"></td>
                {items.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <Link href={`/products/${product.id}`} className="btn-primary inline-block">
                      View Details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
