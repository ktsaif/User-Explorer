import { flow, types } from "mobx-state-tree"
import { fetchUsers, User } from "../services/axios"
import { PAGINATION_LIMIT } from "@/constants"

/**
 * Represents a single user model containing personal, contact, and additional info fields.
 */
export const UserItem = types.model("User", {
  id: types.identifierNumber,
  firstName: types.string,
  lastName: types.string,
  maidenName: types.string,
  age: types.number,
  gender: types.string,
  email: types.string,
  phone: types.string,
  username: types.string,
  password: types.string,
  birthDate: types.string,
  image: types.string,
  bloodGroup: types.string,
  height: types.number,
  weight: types.number,
  eyeColor: types.string,
  hair: types.model({
    color: types.string,
    type: types.string,
  }),
  ip: types.string,
  address: types.model({
    address: types.string,
    city: types.string,
    state: types.string,
    stateCode: types.string,
    postalCode: types.string,
    country: types.string,
    coordinates: types.model({
      lat: types.number,
      lng: types.number,
    }),
  }),
  macAddress: types.string,
  university: types.string,
  bank: types.model({
    cardExpire: types.string,
    cardNumber: types.string,
    cardType: types.string,
    currency: types.string,
    iban: types.string,
  }),
  company: types.model({
    department: types.string,
    name: types.string,
    title: types.string,
    address: types.model({
      address: types.string,
      city: types.string,
      state: types.string,
      stateCode: types.string,
      postalCode: types.string,
      country: types.string,
      coordinates: types.model({
        lat: types.number,
        lng: types.number,
      }),
    }),
  }),
  ein: types.string,
  ssn: types.string,
  userAgent: types.string,
  crypto: types.model({
    coin: types.string,
    wallet: types.string,
    network: types.string,
  }),
  role: types.string,
})

/**
 * Manages a collection of users, pagination properties, and API methods for loading users.
 */
export const UserModel = types
  .model("UserModel", {
    users: types.array(UserItem), // Array to hold user data
    total: types.number, // Total count of users available in the API
    skip: types.number, // Current offset for pagination
    limit: types.number, // Max number of items to fetch per request
    hasNextPage: types.boolean, // Indicates if there are more users to load
    isFetching: types.boolean, // Tracks the loading state for user data
  })
  .actions((self) => ({
    /**
     * Resets the UserModel to its default values, clearing existing data.
     */
    reset() {
      self.users.clear() // Clear users array
      self.total = 0 // Reset total count
      self.skip = 0 // Reset skip value for pagination
      self.limit = PAGINATION_LIMIT // Reapply default limit
      self.isFetching = false // Ensure fetching is not active
      self.hasNextPage = false // Reset next page indicator
    },

    /**
     * Updates the skip value by adding the current limit to it for pagination purposes.
     */
    updateSkip() {
      self.skip += self.limit
    },

    /**
     * Sets the fetching state to true, indicating that a data fetch is in progress.
     */
    setIsFetching() {
      self.isFetching = true
    },

    /**
     * Fetches user data with pagination, updates the user list, and prevents duplicate users.
     * @param limit - The maximum number of users to fetch per request.
     * @param skip - The number of users to skip for pagination.
     */
    loadUsers: flow(function* (limit: number, skip: number) {
      self.isFetching = true // Set fetching state before the API call
      try {
        const response = yield fetchUsers(limit, skip)

        // Remove duplicates based on user ID to avoid repeated users
        const uniqueUsers: User[] = response.users.filter(
          (user: User, index: number, self: User[]) =>
            index === self.findIndex((u: User) => u.id === user.id),
        )

        self.users.push(...uniqueUsers) // Add fetched users to the list
        self.total = response.total // Update total users count
        self.hasNextPage = response.users.length === limit // Check if there are more users to load
      } catch (error) {
        console.error("Failed to load users:", error) // Log error for debugging
      } finally {
        self.isFetching = false // Ensure fetching state is reset
      }
    }),
  }))

/**
 * Default values for initializing UserModel instances.
 */
export const DefaultUserModel = {
  users: [],
  total: 0,
  skip: 0,
  limit: PAGINATION_LIMIT,
  isFetching: false,
  hasNextPage: false,
}
