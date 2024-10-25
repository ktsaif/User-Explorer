import { flow, types } from "mobx-state-tree"
import { fetchPostsByUserId } from "../services/axios"
import { PAGINATION_LIMIT } from "@/constants"

/**
 * Represents a single post model with fields for essential post details.
 */
export const Post = types.model("Post", {
  id: types.identifierNumber,
  title: types.string,
  body: types.string,
  tags: types.array(types.string),
  reactions: types.model({
    likes: types.number,
    dislikes: types.number,
  }),
  views: types.number,
  userId: types.number,
})

/**
 * PostModel handles an array of posts, pagination properties, and actions for data fetching and state management.
 */
export const PostModel = types
  .model("PostModel", {
    posts: types.array(Post), // Array of post objects
    total: types.number, // Total count of posts available
    skip: types.number, // Current offset for pagination
    limit: types.number, // Number of items per page
    hasNextPage: types.boolean, // Indicates if there are more posts to load
    isFetching: types.boolean, // Tracks the fetching/loading state
  })
  .actions((self) => ({
    /**
     * Resets the PostModel to its default values.
     */
    reset() {
      self.posts.clear() // Clear the list of posts
      self.total = 0 // Reset total count
      self.skip = 0 // Reset offset for pagination
      self.limit = PAGINATION_LIMIT // Set pagination limit to constant
      self.isFetching = false // Ensure fetching state is false
      self.hasNextPage = false // Reset next page indicator
    },

    /**
     * Updates the 'skip' value for pagination by incrementing it by the 'limit'.
     * This is a synchronous update, so it doesn't need to be a flow action.
     */
    updateSkip() {
      self.skip += self.limit
    },

    /**
     * Sets the fetching state to true, indicating a data fetch is in progress.
     */
    setIsFetching() {
      self.isFetching = true
    },

    /**
     * Fetches posts by user ID with pagination support, updating the post array and pagination state.
     * @param userId - The ID of the user whose posts are being fetched.
     * @param limit - The maximum number of posts to fetch per request.
     * @param skip - The number of posts to skip for pagination.
     */
    loadPosts: flow(function* (userId: number, limit: number, skip: number) {
      self.isFetching = true // Indicate that fetching is in progress
      try {
        const response = yield fetchPostsByUserId(userId, limit, skip)
        self.posts.push(...response.posts) // Append new posts to existing array
        self.total = response.total // Update total post count
        self.hasNextPage = response.posts.length === limit // Check if there's more data
      } catch (error) {
        console.error("Failed to load posts:", error) // Log error details for debugging
      } finally {
        self.isFetching = false // Set fetching state to false after loading completes
      }
    }),
  }))

/**
 * Default values for initializing the PostModel instance.
 */
export const DefaultPostModel = {
  posts: [],
  total: 0,
  skip: 0,
  limit: PAGINATION_LIMIT,
  isFetching: false,
  hasNextPage: false,
}
