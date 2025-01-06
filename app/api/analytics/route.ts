import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function POST(request: Request) {
  try {
    const events = await request.json()

    // Insert events into database
    await sql`
      INSERT INTO analytics_events (
        type,
        name,
        properties,
        timestamp
      )
      SELECT
        type,
        name,
        properties,
        to_timestamp(timestamp / 1000.0)
      FROM json_to_recordset($1)
      AS x(
        type text,
        name text,
        properties jsonb,
        timestamp bigint
      )
    `(events)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to store analytics:', error)
    return NextResponse.json(
      { error: 'Failed to store analytics' },
      { status: 500 }
    )
  }
}
