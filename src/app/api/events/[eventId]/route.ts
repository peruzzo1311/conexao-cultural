import currentProfile from '@/lib/current-profile'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PATCH(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const profile = await currentProfile()
    const { highlight } = await request.json()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const event = await db.event.update({
      where: { id: params.eventId },
      data: { highlight, published: true },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.log(error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE({ params }: { params: { eventId: string } }) {
  try {
    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const event = await db.event.delete({
      where: { id: params.eventId },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.log(error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}
