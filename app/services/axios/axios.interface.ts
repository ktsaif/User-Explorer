/**
 * These types indicate the shape of the data expect to receive from list user
 * API endpoint
 */
interface Hair {
  color: string
  type: string
}
interface Coordinates {
  lat: number
  lng: number
}
interface Address {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  country: string
  coordinates: Coordinates
}
interface Bank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}
interface Company {
  department: string
  name: string
  title: string
  address: Address
}
interface Crypto {
  coin: string
  wallet: string
  network: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: Hair
  ip: string
  address: Address
  macAddress: string
  university: string
  bank: Bank
  company: Company
  ein: string
  ssn: string
  userAgent: string
  crypto: Crypto
  role: string
}

export interface ListUserResponse {
  users: User[] // Array of users
  total: number // Total number of users
  skip: number // Number of users skipped for pagination
  limit: number // Limit of users per request
}

/**
 * These types indicate the shape of the data expected to receive from the list post
 * API endpoint
 */

interface Reactions {
  likes: number // Number of likes
  dislikes: number // Number of dislikes
}

export interface Post {
  id: number // Unique identifier for the post
  title: string // Title of the post
  body: string // Body/content of the post
  tags: string[] // Tags associated with the post
  reactions: Reactions // Reactions to the post
  views: number // Number of views the post has received
  userId: number // ID of the user who created the post
}

export interface ListPostResponse {
  posts: Post[] // Array of posts
  total: number // Total number of posts
  skip: number // Number of posts skipped for pagination
  limit: number // Limit of posts per request
}
