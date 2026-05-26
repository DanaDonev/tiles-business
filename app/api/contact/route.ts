import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabaseClient'

// Rate limiting - simple in-memory store (not suitable for production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitStore.get(ip)

  if (!limit || limit.resetTime < now) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 3600000 }) // 1 hour
    return true
  }

  if (limit.count >= 5) {
    return false
  }

  limit.count++
  return true
}

async function sendEmail(email: string, subject: string, message: string, name: string) {
  // Using SendGrid - make sure to set SENDGRID_API_KEY in environment variables
  const sendgridKey = process.env.SENDGRID_API_KEY

  if (!sendgridKey) {
    console.warn('SendGrid API key not configured. Emails will not be sent.')
    return true // Pretend to succeed for demo purposes
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendgridKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: 'support@tilespro.com' }],
            subject: `New Contact Form: ${subject}`
          }
        ],
        from: { email: 'noreply@tilespro.com', name: 'TilesPro' },
        reply_to: { email },
        content: [
          {
            type: 'text/html',
            value: `
              <h2>New Contact Form Submission</h2>
              <p><strong>From:</strong> ${name} (${email})</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            `
          }
        ]
      })
    })

    return response.ok
  } catch (error) {
    console.error('SendGrid error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { name, email, subject, message } = await request.json()

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      )
    }

    // Save contact to database using Supabase
    const { error } = await db.contacts()
      .insert({
        name,
        email,
        subject,
        message
      })

    if (error) {
      throw error
    }

    // Send email
    const emailSent = await sendEmail(email, subject, message, name)

    if (!emailSent) {
      console.warn('Email delivery may have failed, but contact was saved')
    }

    return NextResponse.json({
      message: 'Your message has been submitted successfully. We will get back to you soon.'
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
