export type Profile = {
  id: string
  userId: string
  name: string
  imageUrl: string
  email: string
  admin: boolean

  createdAt: Date
  updatedAt: Date
}

export type Address = {
  id: String
  location: String
  street: String
  number: String
  district: String
  city: String
  state: String
  zip: String
}

export type Event = {
  id: String
  name: String
  description: String
  imageUrl: String
  date: Date
  time: String
  link: String
  category: String
  published: Boolean
  featured: Boolean
  address: Address

  profileId: String
  addressId: String

  createdAt: Date
  updatedAt: Date
}
