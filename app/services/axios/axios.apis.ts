import { request } from "./axios.request"
import { apiEndpoints } from "./axios.endpoints"
import { ListUserResponse, ListPostResponse } from "./axios.interface"

// Fetch users from the API
export const fetchUsers = async (limit: number, skip: number): Promise<ListUserResponse> => {
  try {
    const response = await request.get<ListUserResponse>(apiEndpoints.listUser, {
      params: { limit, skip },
    })

    return response.data // Return the user data
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

// Fetch posts for a specific user
export const fetchPostsByUserId = async (
  userId: number,
  limit: number,
  skip: number,
): Promise<ListPostResponse> => {
  try {
    const response = await request.get<ListPostResponse>(
      apiEndpoints.listPost.replace(":userId", `${userId}`),
      {
        params: { limit, skip },
      },
    )

    return response.data // Return the posts data
  } catch (error) {
    console.error("Error fetching posts:", error)
    throw error
  }
}
