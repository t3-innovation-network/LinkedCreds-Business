export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { getGlobalAnalytics } from '../../firebase/firestore'

export async function GET(request: NextRequest) {
  try {
    // You may want to add authentication/authorization here to ensure only admins can access global analytics
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Optional: Add role-based access control here if you have admin roles
    // For now, any authenticated user can access global analytics

    const globalAnalytics = await getGlobalAnalytics()

    if (!globalAnalytics) {
      return NextResponse.json(
        { error: 'Failed to fetch global analytics' },
        { status: 500 }
      )
    }

    return NextResponse.json(globalAnalytics)
  } catch (error) {
    console.error('Error in global analytics API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
