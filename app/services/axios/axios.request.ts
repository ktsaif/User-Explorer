import Config from "@/config"
import axios, { AxiosInstance } from "axios"

// Create an instance of Axios
const request: AxiosInstance = axios.create()

// Add a request interceptor to set the base URL dynamically
request.interceptors.request.use(async (config) => {
  config.baseURL = Config.API_URL // Set the baseURL dynamically from env
  return config
})

// Export the configured Axios instance
export { request }
