import currentProfile from '@/lib/current-profile'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { address, ...body } = await req.json()
    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const event = await db.event.create({
      data: {
        ...body,
        address: {
          create: {
            ...address,
          },
        },
        profile: {
          connect: {
            id: profile.id,
          },
        },
      },
    })

    return NextResponse.json(event, { status: 200 })
  } catch (error) {
    console.log(error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function GET() {
  try {
    const events = await db.event.findMany({
      include: {
        address: true,
      },
    })

    return NextResponse.json(events, { status: 200 })
  } catch (error) {
    console.log(error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}
