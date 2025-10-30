'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiUser, FiMail, FiCalendar, FiEdit2, FiShoppingBag, FiHeart } from 'react-icons/fi'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/')
      return
    }

    setProfileData({
      name: session.user?.name || '',
      email: session.user?.email || '',
      phone: '',
      address: '',
      city: '',
    })
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-gold"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center">
                  <FiUser className="w-10 h-10 text-black" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900">
                  {session.user?.name || 'User Profile'}
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <FiMail className="w-4 h-4" />
                  {session.user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">{profileData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">{profileData.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <FiShoppingBag className="w-5 h-5 text-gold" />
                  <span>Order History</span>
                </Link>
                <Link href="/wishlist" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <FiHeart className="w-5 h-5 text-gold" />
                  <span>Wishlist</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}