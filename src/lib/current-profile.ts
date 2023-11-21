import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'

export default async function currentProfile() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  })

  return profile
}
