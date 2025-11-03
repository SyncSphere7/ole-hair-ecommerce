'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiUser, FiMail, FiCalendar, FiEdit2, FiShoppingBag, FiHeart } from 'react-icons/fi'
import { supabase } from '@/lib/auth/supabase-auth'

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  })

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/')
        return
      }

      setUser(session.user)
      setProfileData({
        name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '',
        email: session.user.email || session.user.phone || '',
        phone: session.user.phone || '',
        address: '',
        city: '',
      })
      setLoading(false)
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/')
      } else {
        setUser(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
      <div className="container-custom max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {user.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
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
                <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white transition-colors">
                  {user.user_metadata?.name || user.email?.split('@')[0] || 'User Profile'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 transition-colors">
                  <FiMail className="w-4 h-4" />
                  {user.email || user.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors">
              <h2 className="text-xl font-semibold mb-6 text-black dark:text-white transition-colors">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Full Name</label>
                  <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-black dark:text-white transition-colors">{profileData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Email</label>
                  <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-black dark:text-white transition-colors">{profileData.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors">
              <h3 className="text-lg font-semibold mb-4 text-black dark:text-white transition-colors">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-black dark:text-white">
                  <FiShoppingBag className="w-5 h-5 text-gold" />
                  <span>Order History</span>
                </Link>
                <Link href="/wishlist" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-black dark:text-white">
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