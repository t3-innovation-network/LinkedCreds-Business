export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { getAllUsersAnalyticsData, ExportUserData } from '../../firebase/firestore'
import * as XLSX from 'xlsx'

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Optional: Add role-based access control here if you have admin roles
    // For now, any authenticated user can export analytics

    const usersData = await getAllUsersAnalyticsData()

    if (!usersData) {
      return NextResponse.json(
        { error: 'Failed to fetch users analytics data' },
        { status: 500 }
      )
    }

    // Define the column headers for the Excel file
    const headers = [
      'Email',
      'Last Activity',
      'Is Active (30 days)',
      'Skill Credentials',
      'Employment Credentials',
      'Performance Review Credentials',
      'Volunteer Credentials',
      'ID Verification Credentials',
      'Total Credentials',
      'Request Recommendation Clicks',
      'Share Credential Clicks',
      'Total Clicks',
      'Skill VCs Evidence',
      'Employment VCs Evidence',
      'Volunteer VCs Evidence',
      'Performance Reviews Evidence',
      'Total Evidence Attachments'
    ]

    // Convert data to array format for XLSX
    const worksheetData = [
      headers,
      ...usersData.map(user => [
        user.email,
        user.lastActivity,
        user.isActive ? 'Yes' : 'No',
        user.skillCredentials,
        user.employmentCredentials,
        user.performanceReviewCredentials,
        user.volunteerCredentials,
        user.idVerificationCredentials,
        user.totalCredentials,
        user.requestRecommendationClicks,
        user.shareCredentialClicks,
        user.totalClicks,
        user.skillVCsEvidence,
        user.employmentVCsEvidence,
        user.volunteerVCsEvidence,
        user.performanceReviewsEvidence,
        user.totalEvidenceAttachments
      ])
    ]

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)

    // Add some styling to the headers
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1')
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col })
      if (!worksheet[cellAddress]) continue
      worksheet[cellAddress].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: 'D1E4FF' } }
      }
    }

    // Set column widths
    worksheet['!cols'] = [
      { width: 25 }, // Email
      { width: 20 }, // Last Activity
      { width: 18 }, // Is Active
      { width: 15 }, // Skill Credentials
      { width: 18 }, // Employment Credentials
      { width: 22 }, // Performance Review Credentials
      { width: 18 }, // Volunteer Credentials
      { width: 20 }, // ID Verification Credentials
      { width: 16 }, // Total Credentials
      { width: 25 }, // Request Recommendation Clicks
      { width: 20 }, // Share Credential Clicks
      { width: 12 }, // Total Clicks
      { width: 18 }, // Skill VCs Evidence
      { width: 20 }, // Employment VCs Evidence
      { width: 18 }, // Volunteer VCs Evidence
      { width: 22 }, // Performance Reviews Evidence
      { width: 25 } // Total Evidence Attachments
    ]

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'User Analytics')

    // Generate XLSX buffer
    const xlsxBuffer = XLSX.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
      compression: true
    })

    // Create response with XLSX data
    const response = new NextResponse(xlsxBuffer, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="user-analytics-${new Date().toISOString().split('T')[0]}.xlsx"`
      }
    })

    return response
  } catch (error) {
    console.error('Error in export analytics API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
