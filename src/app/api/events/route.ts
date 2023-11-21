import currentProfile from '@/lib/current-profile'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const event = await db.event.create({
      data: {
        ...body,
        profileId: profile.id,
      },
    })

    return NextResponse.json(event, { status: 200 })
  } catch (error) {
    console.log(error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}
